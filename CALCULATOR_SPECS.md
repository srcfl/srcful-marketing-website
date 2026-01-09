# Calculator Specifications

Detailed specs for 5 calculators following the lead gen pattern from Savings Calculator.

**Lead Gen Pattern:**
1. User fills in inputs
2. Clicks "Calculate"
3. Results shown blurred with email gate
4. Submit email → results unlocked
5. Data sent to Formspark with inputs + calculated results
6. CTA to buy Zap / contact sales

**Shared Components:**
- `CalculatorLayout`, `CalculatorResults`, `ResultCard` from `/components/calculators/`
- Region selector (expanded beyond SE1-SE4)
- Email gate with name/email form

---

## Priority 1: Negative Prices Calculator

**Path:** `/tools/negative-prices`

**Purpose:** Show users how much money they're losing (or could lose) by exporting solar during negative price periods, and how Sourceful helps avoid this.

**Value Proposition:** "Stop paying to export your solar power"

### Inputs

| Input | Type | Range/Options | Default |
|-------|------|---------------|---------|
| Country | Select | Sweden, Norway, Denmark, Finland, Germany | Sweden |
| Price Zone | Select | Dynamic based on country (SE1-4, NO1-5, DK1-2, etc.) | SE3 |
| Solar System Size | Slider | 3-50 kWp | 10 kWp |
| Annual Production | Calculated | kWp × regional factor | Auto |
| Has Battery | Toggle | Yes/No | No |
| Battery Size | Slider (if battery) | 5-30 kWh | 10 kWh |
| Analysis Period | Select | Last 12 months, Last 6 months, 2024, 2023 | Last 12 months |

### Calculation Logic (from negative-price-calc)

```
1. Fetch historical hourly prices for selected region/period from Sourceful API
2. Count negative price hours
3. Estimate hourly production profile (bell curve, peak at noon)
4. Calculate:
   - Hours with negative prices
   - kWh exported during negative prices (without smart control)
   - Revenue lost (kWh × negative price = cost)
   - Potential savings with Sourceful (curtail or store during negative)
```

### Results Display

| Metric | Example | Description |
|--------|---------|-------------|
| Negative Price Hours | 127 h | Hours with prices below 0 |
| Lost Revenue | -1,450 kr | Money paid to export |
| Saveable Amount | 1,320 kr | What Sourceful could save |
| Negative % of Year | 1.5% | Trend indicator |

**Breakdown Chart:** Monthly bar chart showing negative price exposure

**Key Insight:** "In [region], there were [X] hours of negative prices last year. Without smart control, you paid [Y] kr to export power."

### Lead Data Captured

```json
{
  "source": "negative-prices-calculator",
  "country": "Sweden",
  "priceZone": "SE3",
  "solarSize": 10,
  "hasBattery": false,
  "batterySize": 0,
  "analysisPeriod": "last-12-months",
  "negativePriceHours": 127,
  "lostRevenue": 1450,
  "potentialSavings": 1320
}
```

### API Endpoints (Sourceful Mainnet)

**Base URL:** `https://mainnet.srcful.dev`

**Get Spot Prices:**
```
GET /price/electricity/{area}?date={YYYY-MM-DD}&days={1-10}&currency={ISO}
```
- `area`: ENTSO-E code (SE1, SE2, SE3, SE4, NO1-5, DK1-2, FI, DE-LU)
- `date`: Start date (can be historical)
- `days`: Number of days (1-10)
- `currency`: SEK, NOK, DKK, EUR (default EUR)

**Get Available Areas:**
```
GET /price/electricity/areas
```

**Example:** Fetch SE3 prices for Jan 2024:
```
GET /price/electricity/SE3?date=2024-01-01&days=10&currency=SEK
```

**Note:** For 12-month analysis, we'll need to batch requests (iterate through dates in chunks of 10 days) or cache aggregated stats server-side

### Translations Needed

- `tools.negativePrices.title`
- `tools.negativePrices.description`
- `tools.negativePrices.inputs.*`
- `tools.negativePrices.results.*`

---

## Priority 2: V2X Savings Calculator

**Path:** `/tools/v2x-savings`

**Purpose:** Calculate potential savings from vehicle-to-home (V2H) or vehicle-to-grid (V2G) bidirectional charging.

**Value Proposition:** "Turn your EV into a home battery"

### Inputs

| Input | Type | Range/Options | Default |
|-------|------|---------------|---------|
| Country | Select | Sweden, Norway, Denmark, Finland, Germany | Sweden |
| Price Zone | Select | Dynamic based on country | SE3 |
| EV Model | Select | Popular V2X capable models (or "Generic") | Generic |
| Battery Capacity | Number (if Generic) | 40-100 kWh | 60 kWh |
| Usable for V2X | Slider | 10-50% of battery | 30% |
| Daily Driving Distance | Slider | 0-100 km | 30 km |
| Has Solar | Toggle | Yes/No | No |
| Solar Size | Slider (if solar) | 3-30 kWp | 10 kWp |
| Electricity Contract | Select | Spot price, Fixed | Spot price |

### V2X Capable EV Models (for dropdown)

- Hyundai Ioniq 5 (72.6 kWh)
- Hyundai Ioniq 6 (77.4 kWh)
- Kia EV6 (77.4 kWh)
- Kia EV9 (99.8 kWh)
- Ford F-150 Lightning (131 kWh)
- Nissan Leaf (40/62 kWh)
- Genesis GV60/70 (77.4 kWh)
- BYD models
- Generic (user inputs capacity)

### Calculation Logic

```
1. Calculate usable V2X capacity: battery × usablePercent
2. Calculate daily driving consumption: (dailyKm / 100) × 18 kWh
3. Calculate available V2X cycles per day: ~0.5-1 (conservative)
4. Fetch price spread for region (peak vs off-peak)
5. Calculate arbitrage savings:
   - Charge during low prices (night)
   - Discharge to home during peak (morning/evening)
   - Annual savings = usableCapacity × cycles × priceSpread × 365 × efficiency
6. If has solar: additional savings from storing excess solar
```

### Results Display

| Metric | Example | Description |
|--------|---------|-------------|
| Annual V2X Savings | 8,500 kr | From arbitrage |
| Solar Boost | +2,200 kr | If has solar |
| Total Savings | 10,700 kr | Combined |
| CO2 Avoided | 450 kg | Grid optimization benefit |
| V2X Cycles/Year | 300 | Estimated usage |

**Breakdown:**
- Peak shaving savings
- Solar storage savings (if applicable)
- Grid services potential (future)

**Battery Health Note:** "V2X uses only [X]% of your battery capacity, preserving battery health while maximizing value."

### Lead Data Captured

```json
{
  "source": "v2x-savings-calculator",
  "country": "Sweden",
  "priceZone": "SE3",
  "evModel": "Hyundai Ioniq 5",
  "batteryCapacity": 72.6,
  "usableForV2X": 30,
  "dailyDrivingKm": 30,
  "hasSolar": true,
  "solarSize": 10,
  "annualSavings": 10700
}
```

### Translations Needed

- `tools.v2xSavings.title`
- `tools.v2xSavings.description`
- `tools.v2xSavings.inputs.*`
- `tools.v2xSavings.results.*`
- `tools.v2xSavings.evModels.*`

---

## Priority 3: Battery Sizing Calculator

**Path:** `/tools/battery-sizing`

**Purpose:** Help users determine optimal battery size for their home based on consumption patterns and goals.

**Value Proposition:** "Find your perfect battery size"

### Inputs

| Input | Type | Range/Options | Default |
|-------|------|---------------|---------|
| Country | Select | Sweden, Norway, Denmark, Finland, Germany | Sweden |
| Price Zone | Select | Dynamic | SE3 |
| Annual Consumption | Number | 5,000-50,000 kWh | 15,000 |
| Has Solar | Toggle | Yes/No | Yes |
| Solar Size | Slider (if solar) | 3-30 kWp | 10 kWp |
| Primary Goal | Select | Self-consumption, Backup power, Arbitrage, All | Self-consumption |
| Backup Hours Needed | Slider (if backup) | 2-24 hours | 8 hours |
| Average Load (kW) | Number (if backup) | 1-10 kW | 3 kW |

### Calculation Logic

```
For Self-Consumption Goal:
1. Estimate daily solar production = solarSize × 2.5 kWh (Sweden avg)
2. Estimate daily consumption = annualConsumption / 365
3. Estimate excess solar (midday) = 40-60% of production
4. Recommended size = excess solar × 1.2 (buffer)

For Backup Power Goal:
1. Required capacity = backupHours × averageLoad
2. Add 20% buffer for efficiency losses

For Arbitrage Goal:
1. Calculate daily price spread potential
2. Optimal size based on ROI curve (diminishing returns after ~15 kWh)

Combined: Take maximum of all applicable calculations
```

### Results Display

| Metric | Example | Description |
|--------|---------|-------------|
| Recommended Size | 13.5 kWh | Optimal for your needs |
| Min Viable | 8 kWh | Minimum useful size |
| Max Practical | 20 kWh | Before diminishing returns |
| Est. Annual Savings | 6,500 kr | At recommended size |
| Payback Period | 8.2 years | At current prices |

**Size Comparison Chart:** Show savings at different battery sizes (5, 10, 15, 20, 25 kWh)

**Popular Options:** Show compatible batteries (Tesla Powerwall, BYD, Pixii, etc.)

### Lead Data Captured

```json
{
  "source": "battery-sizing-calculator",
  "country": "Sweden",
  "priceZone": "SE3",
  "annualConsumption": 15000,
  "hasSolar": true,
  "solarSize": 10,
  "primaryGoal": "self-consumption",
  "recommendedSize": 13.5,
  "estimatedSavings": 6500
}
```

---

## Priority 4: Solar ROI Calculator

**Path:** `/tools/solar-roi`

**Purpose:** Calculate return on investment for solar panel installation with and without Sourceful optimization.

**Value Proposition:** "See your solar payback period"

### Inputs

| Input | Type | Range/Options | Default |
|-------|------|---------------|---------|
| Country | Select | Sweden, Norway, Denmark, Finland, Germany | Sweden |
| Price Zone | Select | Dynamic | SE3 |
| Roof Area | Number | 20-200 m² | 50 m² |
| Roof Orientation | Select | South, SE/SW, East/West, Mixed | South |
| Roof Tilt | Slider | 0-60° | 30° |
| Shading | Select | None, Light, Moderate, Heavy | None |
| Annual Consumption | Number | 5,000-50,000 kWh | 15,000 |
| Current Annual Bill | Number | 10,000-100,000 kr | 25,000 |
| Installation Quote | Number (optional) | - | Calculated |
| Add Battery | Toggle | Yes/No | No |
| Add Sourceful | Toggle | Yes/No | Yes |

### Calculation Logic

```
1. Calculate installable capacity:
   - Capacity = roofArea × 0.18 (18% efficiency panels)
   - Adjust for orientation (South=100%, SE/SW=95%, E/W=85%)
   - Adjust for shading

2. Calculate annual production:
   - Base: 900 kWh/kWp (Sweden)
   - Adjust for tilt (optimal ~30-40°)
   - Adjust for orientation

3. Calculate self-consumption:
   - Without Sourceful: 35-45%
   - With Sourceful: 55-70%
   - With Sourceful + Battery: 75-90%

4. Calculate savings:
   - Self-consumed × retail price
   - Exported × export price (~50% of retail)

5. Calculate ROI:
   - Installation cost (if not provided): ~15,000 kr/kWp
   - Annual savings
   - Payback = cost / annual savings
   - 25-year NPV
```

### Results Display

| Metric | Example | Description |
|--------|---------|-------------|
| System Size | 9 kWp | Based on roof |
| Annual Production | 8,100 kWh | Expected output |
| Self-Consumption | 65% | With Sourceful |
| Annual Savings | 12,500 kr | First year |
| Payback Period | 10.8 years | Simple payback |
| 25-Year Savings | 285,000 kr | Total benefit |

**Comparison Table:** Show ROI without Sourceful vs with Sourceful vs with Sourceful + Battery

### Lead Data Captured

```json
{
  "source": "solar-roi-calculator",
  "country": "Sweden",
  "priceZone": "SE3",
  "roofArea": 50,
  "orientation": "south",
  "calculatedSize": 9,
  "annualProduction": 8100,
  "paybackYears": 10.8,
  "withSourceful": true
}
```

---

## Priority 5: EV Charging Calculator

**Path:** `/tools/ev-charging`

**Purpose:** Calculate savings from smart EV charging vs "dumb" charging, with/without solar.

**Value Proposition:** "Charge smarter, save more"

### Inputs

| Input | Type | Range/Options | Default |
|-------|------|---------------|---------|
| Country | Select | Sweden, Norway, Denmark, Finland, Germany | Sweden |
| Price Zone | Select | Dynamic | SE3 |
| Annual Driving | Slider | 5,000-50,000 km | 15,000 |
| EV Consumption | Select/Auto | 15-25 kWh/100km | 18 |
| Charging Location | Select | Home only, Home + Work, Public mix | Home only |
| Has Solar | Toggle | Yes/No | No |
| Solar Size | Slider (if solar) | 3-30 kWp | 10 kWp |
| Charger Type | Select | 3.7kW, 7kW, 11kW, 22kW | 11kW |
| Current Charging | Select | Random, Night only, Already optimized | Random |

### Calculation Logic

```
1. Calculate annual charging need:
   - kWh = (annualKm / 100) × consumption

2. Calculate current cost:
   - Random charging: average price × kWh
   - Night charging: off-peak × kWh × 0.7 + peak × kWh × 0.3

3. Calculate smart charging cost:
   - Optimize for lowest prices
   - Consider charging speed constraints
   - Average savings: 20-40% vs random

4. Calculate solar charging bonus:
   - Mid-day charging from excess solar
   - Additional 10-30% savings
```

### Results Display

| Metric | Example | Description |
|--------|---------|-------------|
| Annual Charging | 2,700 kWh | Energy needed |
| Current Cost | 3,800 kr | Your pattern |
| Smart Charging Cost | 2,400 kr | With Sourceful |
| Annual Savings | 1,400 kr | Difference |
| Solar Bonus | +800 kr | If applicable |

**Price Heatmap:** Show weekly charging cost patterns

### Lead Data Captured

```json
{
  "source": "ev-charging-calculator",
  "country": "Sweden",
  "priceZone": "SE3",
  "annualDrivingKm": 15000,
  "chargingNeedKwh": 2700,
  "hasSolar": true,
  "estimatedSavings": 2200
}
```

---

## Shared: Country/Region Configuration

### Supported Countries & Zones

```typescript
const countries = {
  sweden: {
    zones: ["SE1", "SE2", "SE3", "SE4"],
    currency: "SEK",
    currencySymbol: "kr",
    solarYield: 900, // kWh/kWp/year
  },
  norway: {
    zones: ["NO1", "NO2", "NO3", "NO4", "NO5"],
    currency: "NOK",
    currencySymbol: "kr",
    solarYield: 800,
  },
  denmark: {
    zones: ["DK1", "DK2"],
    currency: "DKK",
    currencySymbol: "kr",
    solarYield: 950,
  },
  finland: {
    zones: ["FI"],
    currency: "EUR",
    currencySymbol: "€",
    solarYield: 850,
  },
  germany: {
    zones: ["DE-LU"],
    currency: "EUR",
    currencySymbol: "€",
    solarYield: 1000,
  },
};
```

### Price Data API

Need to confirm Sourceful API endpoints for:
- Historical hourly prices by zone
- Current/forecast prices
- Average peak/off-peak by zone

---

## Implementation Order

1. **Negative Prices Calculator** (Priority 1)
   - Build shared country/zone selector component
   - Integrate with Sourceful price API
   - Implement calculation logic from negative-price-calc

2. **V2X Savings Calculator** (Priority 2)
   - Build EV model selector
   - Implement V2X-specific calculations
   - Add solar integration option

3. **Battery Sizing Calculator**
   - Build recommendation engine
   - Add size comparison visualization

4. **Solar ROI Calculator**
   - Build roof configuration inputs
   - Implement NPV calculations

5. **EV Charging Calculator**
   - Build charging pattern visualization
   - Implement smart charging simulation

---

## Decisions Made

1. **Price API**: Using Sourceful Mainnet API at `https://mainnet.srcful.dev/price/electricity/`
2. **Formspark Form ID**: Same form (6ZFZTUMW1) for all calculators - differentiate by `source` field
3. **Localization**: English-first, translate to Swedish later

## Remaining Questions

1. **V2X Chargers**: Should we recommend specific V2X chargers alongside EVs? (e.g., Wallbox Quasar, Fermata)
2. **Battery Recommendations**: Link to specific battery products in our integrations, or keep generic?
3. **Analytics**: Track which calculator inputs lead to most conversions for future optimization?
4. **Historical Data Strategy**: For 12-month negative price analysis, should we:
   - a) Make ~37 API calls client-side (10 days × 37 = 370 days)
   - b) Create a server-side endpoint that pre-aggregates negative price stats
   - c) Cache aggregated stats and update weekly
