# KPI Dashboard Specification — fremcoltd.com

## Recommended Tool
Google Looker Studio connected to GA4 + Google Search Console

## Dashboard Pages

### 1. Organic Performance
| Metric | Source | Target | Cadence |
|--------|--------|--------|---------|
| Organic sessions | GA4 | +30% in 90 days | Weekly |
| Organic users | GA4 | +25% in 90 days | Weekly |
| New users from organic | GA4 | Track trend | Weekly |

### 2. Search Console
| Metric | Source | Target | Cadence |
|--------|--------|--------|---------|
| Impressions | GSC | +40% in 90 days | Weekly |
| Clicks | GSC | +30% in 90 days | Weekly |
| Average CTR | GSC | > 3% | Monthly |
| Average position | GSC | < 15 overall | Monthly |
| Top 10 keyword count | GSC / Ahrefs | 2x in 6 months | Monthly |

### 3. Core Web Vitals
| Metric | Source | Target | Cadence |
|--------|--------|--------|---------|
| LCP | GSC CWV | ≤ 2.5s | Weekly |
| INP | GSC CWV | ≤ 200ms | Weekly |
| CLS | GSC CWV | < 0.1 | Weekly |

### 4. Conversions
| Metric | Source | Target | Cadence |
|--------|--------|--------|---------|
| generate_lead events | GA4 | +25% in 90 days | Weekly |
| Quote form submissions | GA4 | Track by form_type=quote | Weekly |
| Contact form submissions | GA4 | Track by form_type=contact | Weekly |
| WhatsApp/phone clicks | GA4 | Track outbound clicks | Weekly |

### 5. AI Visibility (Manual Monthly)
| Metric | Method | Target |
|--------|--------|--------|
| AI citation rate | Spot-check ChatGPT, Perplexity, Gemini | Brand mentioned in 30%+ of test queries |
| Brand mention quality | Manual review | Accurate product/category description |

## Test Queries for AI Monitoring
- "Thai sugar exporter ICUMSA 45"
- "Thailand rice wholesale supplier"
- "NPK fertilizer exporter Thailand"
- "FREEM ENTERPRISE CO., LTD"
- "how to import sugar from Thailand"
