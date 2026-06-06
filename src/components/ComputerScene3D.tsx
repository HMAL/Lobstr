'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Shared smoothed mouse
const mouse = { x: 0, y: 0, sx: 0, sy: 0 }

// Single shared blink state — both eyes read this, only BlinkController writes it
const blink = { active: false, progress: 0, nextAt: 2.5, scaleY: 0 }

function BlinkController() {
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (!blink.active && t > blink.nextAt) {
      blink.active = true
      blink.progress = 0
    }
    if (blink.active) {
      blink.progress += delta * 10
      // 0→1: close, 1→2: open
      blink.scaleY = blink.progress < 1
        ? blink.progress
        : Math.max(0, 2 - blink.progress)
      if (blink.progress >= 2) {
        blink.active = false
        blink.scaleY = 0
        blink.nextAt = t + 2.5 + Math.random() * 3
      }
    }
  })
  return null
}

const SCREEN_COLOR = '#f4f4f4'

function Eye({ position }: { position: [number, number, number] }) {
  const pupilGroupRef = useRef<THREE.Group>(null!)
  const eyelidRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    // Pupil tracks smoothed mouse
    if (pupilGroupRef.current) {
      pupilGroupRef.current.position.x = THREE.MathUtils.lerp(
        pupilGroupRef.current.position.x, mouse.sx * 0.07, 0.1
      )
      pupilGroupRef.current.position.y = THREE.MathUtils.lerp(
        pupilGroupRef.current.position.y, mouse.sy * 0.05, 0.1
      )
    }
    // Apply shared blink scale
    if (eyelidRef.current) {
      eyelidRef.current.scale.y = blink.scaleY
    }
  })

  return (
    <group position={position}>
      {/* Sclera */}
      <mesh>
        <circleGeometry args={[0.28, 48]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Iris + pupil group — moves for tracking */}
      <group ref={pupilGroupRef}>
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.16, 32]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <circleGeometry args={[0.10, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Catch light */}
        <mesh position={[0.055, 0.055, 0.003]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      {/* Eyelid — same color as screen so it blends when closed */}
      <mesh ref={eyelidRef} position={[0, 0, 0.005]} scale={[1, 0, 1]}>
        <boxGeometry args={[0.62, 0.62, 0.004]} />
        <meshStandardMaterial color={SCREEN_COLOR} />
      </mesh>
    </group>
  )
}

function Computer() {
  const groupRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    mouse.sx = THREE.MathUtils.lerp(mouse.sx, mouse.x, 0.06)
    mouse.sy = THREE.MathUtils.lerp(mouse.sy, mouse.y, 0.06)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, mouse.sx * 0.18, 0.035
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, -mouse.sy * 0.12, 0.035
      )
    }
  })

  const frame = '#111111'
  const monY = 0.28

  return (
    <Float speed={1.4} rotationIntensity={0.04} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Monitor bezel */}
        <mesh position={[0, monY, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.18]} />
          <meshStandardMaterial color={frame} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Screen face */}
        <mesh position={[0, monY, 0.092]}>
          <boxGeometry args={[3.1, 2.1, 0.02]} />
          <meshStandardMaterial color={SCREEN_COLOR} />
        </mesh>

        {/* Eyes */}
        <Eye position={[-0.68, monY + 0.18, 0.11]} />
        <Eye position={[ 0.68, monY + 0.18, 0.11]} />

        {/* Smile arc */}
        <mesh position={[0, monY - 0.35, 0.11]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.44, 0.055, 8, 64, Math.PI * 0.62]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Power dot */}
        <mesh position={[0, monY - 0.88, 0.1]}>
          <circleGeometry args={[0.055, 16]} />
          <meshStandardMaterial color="#444444" />
        </mesh>

        {/* Stand */}
        <mesh position={[0, monY - 1.52, 0]}>
          <boxGeometry args={[0.24, 0.62, 0.14]} />
          <meshStandardMaterial color={frame} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Base */}
        <mesh position={[0, monY - 1.85, 0]}>
          <boxGeometry args={[1.5, 0.1, 0.6]} />
          <meshStandardMaterial color={frame} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

export default function ComputerScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.8], fov: 44 }}
      style={{ background: 'white' }}
    >
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[5, 5, 4]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-4, -3, 2]} intensity={0.3} color="#ffffff" />
      <BlinkController />
      <Computer />
    </Canvas>
  )
}
