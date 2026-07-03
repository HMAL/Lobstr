# AI Search Readiness (GEO) — mylobstr.com

Score: **55/100** · Audited 2026-07-02

## The central contradiction
The site publishes an excellent `/llms.txt` (and references `/llms-full.txt`) written specifically to be consumed by AI systems — pricing facts, service areas, page summaries, all in citable form. **But the Cloudflare-managed robots.txt simultaneously blocks the crawlers that would consume it:**

| Crawler | Status | What it feeds |
|---|---|---|
| GPTBot | ❌ Disallow / | OpenAI training corpus |
| ClaudeBot | ❌ Disallow / | Anthropic training corpus |
| CCBot | ❌ Disallow / | Common Crawl → many models + research |
| Google-Extended | ❌ Disallow / | Gemini training/grounding |
| Amazonbot, Applebot-Extended, meta-externalagent, Bytespider | ❌ | Alexa/Rufus, Apple Intelligence, Meta AI, ByteDance |
| Googlebot | ✅ Allowed | **Google Search + AI Overviews** (unaffected) |
| OAI-SearchBot | ✅ Not blocked | **ChatGPT live web search** |
| PerplexityBot | ✅ Not blocked | **Perplexity retrieval** |

Plus `Content-Signal: search=yes, ai-train=no, use=reference`.

**Net effect:** live AI *search* (AI Overviews, ChatGPT search, Perplexity) can still retrieve and cite the site today. What's blocked is *training-corpus presence* — the long-term "the model just knows MyLobstr is the affordable Albany web studio" effect, which is precisely what a brand-building small business wants and what llms.txt was written for.

### HIGH — Decide the AI-crawler policy deliberately
This looks like Cloudflare's "block AI bots" toggle left on default, not a decision. Two coherent positions:
1. **Open (recommended for this business):** turn off the Cloudflare AI-bot block (Dashboard → Security → Bots → AI bots / Content Signals), keeping Bytespider blocked if desired. A marketing site's content *is* the product ad; being in training corpora is free distribution.
2. **Closed:** keep the block, but then stop investing in llms.txt/llms-full.txt beyond what live search uses.

**Falsifiable check:** after change, `curl -s https://mylobstr.com/robots.txt` no longer disallows GPTBot/ClaudeBot/CCBot.
**Leading indicator:** brand-name queries in ChatGPT/Perplexity ("affordable web designer Albany NY") start naming MyLobstr — spot-check monthly.

## What works
- `/llms.txt` is genuinely good: key facts (flat $300, no monthly, city list), per-page summaries, contact, pointer to llms-full.txt. Better than 95% of small-business sites.
- Highly citable atomic facts: exact prices per tier, ~1-week turnaround, hand-coded/no-WordPress, city coverage. These are the kinds of extractable claims answer engines quote.
- FAQPage + Article + ProfessionalService schema gives AI parsers clean entity data.

## Findings

### MEDIUM — Verify `/llms-full.txt` exists and stays in sync
llms.txt links it; if it 404s or drifts from real pricing, cited answers will be wrong. Add it to the deploy checklist alongside sitemap.

### LOW — Question-shaped headings
Blog posts do this well ("How Much Does a Website Cost…"). Money pages less so — /pricing could carry an H2 like "How much does a small business website cost in Albany?" whose first paragraph answers in one self-contained sentence.
