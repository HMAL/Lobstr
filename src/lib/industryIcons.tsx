import {
  Baby,
  Briefcase,
  Building2,
  Coffee,
  Flame,
  HardHat,
  IceCreamCone,
  PawPrint,
  Scissors,
  Smile,
  Stethoscope,
  Thermometer,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

// One concrete, subject-specific icon per industry — used on the hub grid and
// the detail-page hero eyebrow. `Briefcase` is only a fallback for a slug that
// isn't mapped yet; every current industry has a real match.
export const industryIcons: Record<string, LucideIcon> = {
  dentists: Smile,
  contractors: HardHat,
  restaurants: UtensilsCrossed,
  hvac: Thermometer,
  daycares: Baby,
  barbers: Scissors,
  'pet-care': PawPrint,
  'auto-repair': Wrench,
  'primary-care': Stethoscope,
  apartments: Building2,
  'ice-cream-shops': IceCreamCone,
  'coffee-shops': Coffee,
  'mexican-restaurants': Flame,
}

// Fallback for a slug that isn't mapped yet — every current industry has a real match.
export const defaultIndustryIcon: LucideIcon = Briefcase
