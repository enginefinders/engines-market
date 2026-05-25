const p = (lead: string, text = "") => ({ type: "paragraph" as const, lead, text });

const q = (question: string, answer: Array<ReturnType<typeof p>>) => ({
  question,
  answer,
});

export const homeFaqClusterGuides = {
  process: {
    eyebrow: "UNIVERSAL PROCESS FRAMEWORK",
    title: "What usually happens during a UK engine replacement",
    paragraphs: [
      "Most UK engine replacements follow the same five-stage path: diagnosis, sourcing, fitting, ECU programming and DVLA registration.",
      "Turnaround is usually driven more by parts availability, engine-code matching and contamination from the failed unit than by the physical swap itself.",
    ],
    bullets: [
      "Diagnosis: fault confirmation, contamination checks and engine-code verification.",
      "Sourcing: compare used, reconditioned and supply-and-fit routes from vetted specialists.",
      "Fitting: install the replacement unit with fluids, seals, gaskets and any essential ancillaries.",
      "Programming: injector coding, immobiliser sync, DPF or AdBlue adaptation where required.",
      "DVLA: update the V5C with the new engine number and inform your insurer immediately.",
    ],
  },
  value: {
    eyebrow: "UNIVERSAL FINANCIAL FRAMEWORK",
    title: "The repair-versus-replace decision starts with three checks",
    paragraphs: [
      "When an engine fails, the smarter question is not just how much the repair costs, but whether the vehicle still makes financial sense once the full picture is clear.",
      "A well-priced replacement engine can still be the cheaper monthly decision if it gives the car another 5 to 7 years of service.",
    ],
    bullets: [
      "The 50% rule: if the engine job is more than half the car's realistic market value, replacement of the vehicle may be the cleaner option.",
      "Amortisation: spread the engine spend over the years you expect to keep the car, then compare that with the monthly cost of changing vehicle.",
      "Pattern test: one major failure on an otherwise sound car is very different from a vehicle already collecting expensive annual repairs and MOT advisories.",
    ],
  },
  authority: {
    eyebrow: "ENGINE FAMILY FRAMEWORK",
    title: "Why engine-family knowledge matters before you compare quotes",
    paragraphs: [
      "Two engines with the same size can have very different failure patterns, ancillaries, coding requirements and replacement costs.",
      "Understanding the exact engine family and code helps you avoid bad fitment, vague pricing and suppliers who are quoting against the badge rather than the engine itself.",
    ],
    bullets: [
      "Engine-family knowledge improves compatibility checks.",
      "It helps buyers compare availability, reliability and known weak points.",
      "It lets specialists quote the right supply-only or supply-and-fit route much faster.",
    ],
  },
} as const;

export const homeFaqOverrides = {
  costs: {
    bmw: [
      q("How much does a BMW engine replacement cost in the UK?", [
        p("A reconditioned BMW engine supplied and fitted typically costs £3,000–£8,000 in the UK.", "Main dealer quotes are often £14,000–£18,000, while used engines start from about £750–£1,000 unit only."),
        p("BMW cost bands vary sharply by engine family.", "N47 2.0 diesel: £2,600–£3,700; B47 2.0 diesel: £2,000–£4,000+; B48 2.0 petrol: £2,000–£4,000+; N57 3.0 diesel: £3,800–£6,000; B58 3.0 petrol: £4,800–£7,000. Labour usually adds £800–£1,600, with 12–24 month warranty common on supply-and-fit packages."),
      ]),
      q("How much does an N47 engine replacement cost for a BMW?", [
        p("A reconditioned BMW N47 2.0 diesel supplied and fitted usually costs £2,600–£3,700.", "The engine alone is typically £1,800–£2,600 and used units are often £750–£1,000."),
        p("Model-level pricing is well established.", "1 Series 116d/118d/120d: £2,200–£3,200; 320d: £2,600–£3,700; 520d: £2,600–£3,800; X1/X3 18d/20d: £2,600–£3,500. Reconditioned units with upgraded timing-chain components are usually the safer route."),
      ]),
      q("How much is a BMW 3 Series engine replacement?", [
        p("A BMW 3 Series engine replacement usually costs £2,000–£7,000 reconditioned and fitted.", "The final figure depends heavily on engine code and trim."),
        p("Typical 3 Series ranges are: N47 320d £2,600–£3,700; B47 318d/320d £2,800–£4,000; N20 petrol £2,800–£3,800; B48 petrol £3,200–£4,500; N57 330d/335d £3,800–£5,500; B58 340i £4,800–£7,000.", "Dealer pricing can exceed £12,000 fitted."),
      ]),
      q("What is the cheapest BMW engine replacement option?", [
        p("The cheapest BMW engine route is usually a used low-mileage engine from a breaker or salvage network.", "Common 2.0 diesel used units start around £750–£1,000, but they rarely carry meaningful warranty."),
        p("For most owners, the best-value option is still a reconditioned engine.", "A reconditioned 2.0 BMW engine usually lands around £2,600–£3,700 fitted and typically includes warranty plus upgrades for known weak points."),
      ]),
      q("How much does supply and fit cost for a BMW engine?", [
        p("BMW supply-and-fit cost is usually made up of the engine, labour and consumables.", "A reconditioned 2.0 diesel engine is commonly £1,800–£2,600, 3.0 diesel £2,800–£4,200, labour £800–£1,600 and consumables £200–£400."),
        p("That puts most total packages around £2,800–£4,200 for a 2.0 diesel and £3,800–£6,200 for a 3.0 diesel.", "Supply-only cuts the labour portion, but you then carry the fitting risk yourself."),
      ]),
      q("How does BMW engine replacement cost compare to a main dealer?", [
        p("BMW main dealer engine replacement quotes are often £10,000–£18,000, with some premium cars going beyond £20,000.", "A reconditioned specialist route is more commonly £3,000–£8,000 supplied and fitted."),
        p("That usually means a saving of 50–70% versus dealer pricing.", "On a 320d N47, dealer pricing can land around £10,000–£14,000 while a specialist reconditioned route is often £2,600–£3,700."),
      ]),
      q("What factors affect BMW engine replacement cost most?", [
        p("The biggest cost drivers are engine code and displacement, the type of replacement unit, whether the quote is supply-only or supply-and-fit, and labour rates by region.", "London and the South East can be materially higher than the Midlands or North."),
        p("2.0 diesel units are usually the most affordable BMW replacements.", "Large six-cylinder and V8 engines can cost several times more, especially if you compare reconditioned pricing with new dealer engines."),
      ]),
    ],
    "land-rover": [
      q("How much does a Land Rover engine replacement cost?", [
        p("Land Rover engine replacement usually costs £3,000–£10,000 supplied and fitted through UK specialists.", "Main dealer quotes can run from roughly £15,000 to £30,000 depending on model and engine."),
        p("Typical reconditioned ranges by family are well established.", "Ingenium 2.0 diesel: £3,100–£5,200 unit plus labour; TDV6 3.0 diesel: around £4,250 long engine plus roughly £1,272 labour; TDV8 4.4 diesel: £6,000–£9,000; 5.0 supercharged V8: £7,000–£12,000."),
      ]),
      q("How much is a Range Rover engine replacement cost?", [
        p("Range Rover engine replacement cost depends mainly on which engine family is fitted.", "A 3.0 TDV6 is often £4,000–£6,000 fitted, 4.4 TDV8 £6,000–£9,000, 3.0 SDV6 £4,500–£6,500, 5.0 supercharged V8 £8,000–£12,000 and 2.0 PHEV around £5,000–£8,000."),
        p("Main dealer quotes can be dramatically higher.", "Independent reconditioned routes often land near £10,000 all-in for jobs that dealers have quoted at much more."),
      ]),
      q("How much does an Ingenium engine replacement cost?", [
        p("A reconditioned 2.0 Ingenium diesel long engine is typically around £5,200 exchange, with labour and consumables taking the all-in cost to roughly £7,090.", "Evoque and Discovery Sport units are commonly £3,100–£4,000 plus fitting, while Velar pricing can stretch to £5,000 plus fitting."),
        p("Main dealer pricing can exceed £15,000.", "Because of the known timing-chain and oil-pump weaknesses, a reconditioned unit with upgraded components is usually the route buyers compare first."),
      ]),
      q("How much does a Defender engine replacement cost?", [
        p("Defender engine replacement cost changes a lot between older and newer generations.", "Older 2.4 and 2.2 TDCi Defenders often land around £1,800–£3,500 fitted, 300Tdi about £1,500–£3,000 and TD5 roughly £2,500–£4,000."),
        p("New Defender engines are notably more expensive.", "Ingenium 2.0 diesel is usually £4,000–£6,500 fitted, 3.0 diesel £5,000–£8,000 and P300/P400 petrol about £4,500–£7,500."),
      ]),
      q("What is the cheapest Land Rover engine replacement option?", [
        p("The cheapest Land Rover engine route is usually an older Defender used engine or a supply-only reconditioned unit.", "300Tdi and TD5 used engines can start around £800–£1,500, while reconditioned older Defender units start around £1,500."),
        p("Modern Ingenium models are a different story.", "Supply-only reconditioned engines from about £3,100–£5,200 reduce the upfront bill, but for newer vehicles a warrantied reconditioned engine is generally safer than a used unit."),
      ]),
      q("Why are Land Rover engine replacements so expensive?", [
        p("Land Rover engine replacements are expensive because the engines are complex, packaging is tight and labour time is usually 16–20 hours or more.", "High failure demand on Ingenium and TDV6 units also keeps recon pricing firm."),
        p("Dealer pricing and limited specialist supply add to the cost.", "Independent reconditioning can still cut the total by 60% or more compared with the highest dealer quotes."),
      ]),
      q("How much is a Discovery engine replacement?", [
        p("Discovery engine replacement varies by generation.", "Discovery 3 2.7 TDV6 is usually £3,500–£4,800 fitted; Discovery 4 3.0 TDV6 or SDV6 £4,000–£6,000; Discovery Sport 2.0 Ingenium diesel £3,500–£5,500; Discovery 5 3.0 SDV6 £4,500–£7,500."),
        p("The TDV6 crankshaft issue is a big driver in Discovery pricing.", "Those failures often force full replacement rather than a partial repair."),
      ]),
    ],
    jaguar: [
      q("How much does a Jaguar engine replacement cost?", [
        p("A reconditioned Jaguar engine supplied and fitted usually costs £3,000–£10,000 in the UK.", "Dealer quotes can range from roughly £15,000 to £30,000 on some models."),
        p("Typical Jaguar engine-family ranges are: Ingenium 2.0 diesel unit £3,100–£4,000, fitted £4,700–£5,800; Ingenium 2.0 petrol £2,900–£3,800 unit; AJ126 3.0 supercharged V6 £4,200–£5,500 unit; AJ133 5.0 V8 £5,500–£7,200 unit.", "Labour is often another £1,200–£1,600."),
      ]),
      q("How much does a Jaguar XF engine replacement cost?", [
        p("Jaguar XF engine replacement typically ranges from about £4,400 to £9,200 fitted depending on engine.", "2.0 Ingenium diesel is usually £4,700–£5,800 fitted, 2.0 Ingenium petrol £4,400–£5,500, AJ126 V6 about £6,300–£8,200 and XFR 5.0 V8 about £7,000–£9,200."),
        p("The AJ126 price band is higher because of supercharged V6 complexity.", "Documented service history can materially affect unit quality and price."),
      ]),
      q("How much is a Jaguar F-Pace engine replacement?", [
        p("The most common F-Pace replacement engine is the 2.0 Ingenium diesel at roughly £3,100–£3,900 for the reconditioned unit.", "The 2.0 petrol is usually £2,900–£3,800 and the AJ126 3.0 supercharged V6 about £4,200–£5,500."),
        p("Timing-chain and oil-pump issues are the biggest trigger on the diesel.", "Any AJ126 replacement should include the timing-chain tensioner update."),
      ]),
      q("How much does a Jaguar XE engine replacement cost?", [
        p("Jaguar XE engine replacement is usually centred on the 2.0 Ingenium family.", "Ingenium petrol units typically cost £2,900–£3,800 reconditioned, while diesel units usually land around £3,100–£4,000."),
        p("XE pricing stays competitive because the engine family is shared across JLR products.", "EGR history is especially important on the diesel engines."),
      ]),
      q("What is the most affordable Jaguar engine to replace?", [
        p("The 2.0 Ingenium petrol is generally the cheapest Jaguar engine to replace.", "Reconditioned units often start from about £2,900, while the 2.0 Ingenium diesel usually starts closer to £3,100."),
        p("Older used V6 diesels can be bought more cheaply.", "But given crankshaft and oil-pump risk on those older units, reconditioned supply is usually the safer comparison."),
      ]),
      q("How much does an Ingenium engine cost for Jaguar?", [
        p("Jaguar Ingenium 2.0 reconditioned exchange units usually sit between £2,900 and £4,000 depending on model and fuel type.", "XE and XF petrol engines are often £2,900–£3,800; XE and XF diesels £3,100–£4,000; F-Pace and E-Pace diesel units £3,100–£3,900."),
        p("Those are unit prices before fitting.", "Labour and consumables often add around £1,500–£1,600 on top."),
      ]),
    ],
    mercedes: [
      q("How much does a Mercedes engine replacement cost in the UK?", [
        p("A reconditioned Mercedes engine supplied and fitted typically costs £3,000–£8,000.", "Main dealer engine replacement can exceed £10,000–£15,000, especially on premium or AMG models."),
        p("Common engine-family unit prices include OM651 2.1 diesel at £1,800–£3,200, OM654 2.0 diesel at £3,400–£4,200, OM642 3.0 V6 diesel at £3,800–£5,500, M274 petrol at £2,600–£3,500 and M276 V6 petrol at £4,500–£7,000.", "Labour usually adds £900–£1,600."),
      ]),
      q("How much is a Mercedes C-Class engine replacement?", [
        p("A Mercedes C-Class engine replacement usually ranges from about £2,800 to £5,500 fitted.", "OM651 W204 diesel is often £2,800–£3,800 fitted, OM654 W205 diesel £4,200–£5,500, M271 petrol £3,200–£4,200 and M274 petrol £3,600–£5,000."),
        p("The OM651 remains the volume replacement engine.", "Its timing-chain reputation is why warranty-backed recon supply is often preferred."),
      ]),
      q("How much does an OM651 engine replacement cost?", [
        p("A reconditioned OM651 unit usually costs £1,800–£3,200 depending on application.", "C-Class engines are typically £1,800–£2,400, E-Class £1,800–£2,800 and Sprinter or Vito units around £1,800–£2,600."),
        p("Fitting generally adds another £900–£1,200.", "A quality OM651 replacement should include the upgraded timing-chain arrangement, injectors and documented testing."),
      ]),
      q("How much is a Mercedes C220 CDI engine replacement?", [
        p("A Mercedes C220 CDI engine replacement is usually £2,800–£4,000 fitted on a W204 OM651.", "Later W205 C220d OM654 cars typically run higher at around £4,200–£5,500 fitted."),
        p("Because the C220 is so common in the UK, specialist experience and parts availability are both strong.", "That helps keep recon pricing competitive."),
      ]),
      q("What is the cheapest Mercedes engine to replace?", [
        p("The OM651 2.1 diesel is usually the cheapest Mercedes engine to replace.", "High volumes in the C-Class and E-Class keep reconditioned units competitive at roughly £1,800–£2,800."),
        p("Newer OM654 engines and larger V6 or V8 units cost more.", "For budget-led Mercedes ownership, a reconditioned OM651 with an upgraded chain kit is often the best value route."),
      ]),
      q("How much does a Mercedes E-Class engine replacement cost?", [
        p("Mercedes E-Class engine replacement usually ranges from about £2,800 to £7,800 fitted depending on the engine.", "OM651 W212 diesel is commonly £2,800–£4,200 fitted; OM654 W213 £4,200–£5,800; OM642 3.0 V6 diesel £5,000–£6,800; M274 petrol £3,600–£5,200; M276 V6 petrol £5,800–£7,800."),
        p("Labour can be slightly higher than on a C-Class.", "The larger engine bay and ancillaries usually mean 14–18 hours rather than 12–15."),
      ]),
      q("How much is a Mercedes Sprinter engine replacement?", [
        p("A Mercedes Sprinter engine replacement is usually £2,500–£5,500 supplied and fitted.", "OM651 2.1 diesel vans are often £2,500–£3,800, while OM642 3.0 V6 diesel vans are typically £3,800–£5,500."),
        p("Commercial-vehicle specialists are important on these jobs.", "Sprinter replacements often involve high-mileage engines and working-vehicle downtime pressure."),
      ]),
      q("How do Mercedes engine replacement costs compare to BMW and Audi?", [
        p("Mercedes prices usually sit in the same premium-brand bracket as BMW and Audi for equivalent engine sizes.", "Typical reconditioned and fitted 2.0 diesel pricing is Mercedes £2,800–£5,500, BMW £2,600–£4,000 and Audi £2,800–£5,000."),
        p("Mercedes V6 and V8 replacements can skew a little higher.", "The OM651, however, is one of the more competitively priced premium diesel engines because of strong UK volumes."),
      ]),
    ],
    audi: [
      q("How much does an Audi engine replacement cost in the UK?", [
        p("A reconditioned Audi engine supplied and fitted typically costs £2,800–£6,000 in the UK.", "Audi main dealer quotes commonly exceed £8,000–£12,000 for complete engine work."),
        p("Typical model ranges are A1/A3 £2,200–£3,800, A4 £2,800–£5,000, A6 £3,200–£6,000 and Q5/Q7 £3,500–£7,000.", "Labour is usually around £1,000–£1,500 on top of the unit."),
      ]),
      q("How much does an Audi A4 engine replacement cost?", [
        p("An Audi A4 engine replacement usually costs about £3,800–£7,000 fitted depending on engine.", "1.8 or 2.0 TFSI petrol is often £3,800–£5,500 fitted, 2.0 TDI £4,000–£6,500, 3.0 TDI V6 £5,000–£7,000 and 3.0 TFSI V6 £4,800–£7,000."),
        p("Longitudinal A4 fitment tends to make labour a little heavier than smaller transverse VAG cars.", "Supply-and-fit packages normally include 12–24 month warranty."),
      ]),
      q("How much is an Audi A6 engine replacement?", [
        p("Audi A6 engine replacement usually lands between £3,800 and £7,500 fitted.", "2.0 TDI is commonly £4,200–£6,000 fitted, 2.0 TFSI £3,800–£5,500, 3.0 TDI V6 £5,200–£7,500 and 3.0 TFSI V6 £5,000–£7,200."),
        p("The A6 usually needs more labour than an A4.", "The larger platform and extra ancillaries often mean around 14–18 hours."),
      ]),
      q("How much does a 2.0 TDI Audi engine cost to replace?", [
        p("Audi 2.0 TDI replacement cost depends on model, but most fitted totals sit between £3,500 and £6,500.", "A3 and Q3 are often £3,500–£5,000 fitted, A4 about £4,000–£6,500, A6 roughly £4,200–£6,000 and Q5 around £4,200–£6,000."),
        p("EGR cooler, DPF and timing-related issues are common triggers.", "A reconditioned unit with upgraded components is usually the route buyers compare first."),
      ]),
      q("How much does Audi engine supply and fit cost?", [
        p("Audi supply-and-fit packages are usually built from the engine price, labour and consumables.", "A reconditioned 2.0 TFSI or TDI unit is typically £2,800–£5,000, labour £900–£1,500 and consumables £250–£400."),
        p("That puts many 2.0 Audi jobs around £3,800–£6,500 fitted.", "3.0 V6 diesels are more often £5,200–£7,500 fitted."),
      ]),
      q("What is the cheapest Audi engine to replace?", [
        p("The 1.6 and 2.0 TDI engines in the Audi A3 are usually the cheapest Audi engines to replace.", "Reconditioned units often start around £2,200–£2,800 and fitted packages around £3,200–£4,200."),
        p("The shared MQB platform helps keep A3 pricing competitive.", "Used engines are cheaper again, but they bring more risk and weaker warranty."),
      ]),
    ],
    volkswagen: [
      q("How much does a Volkswagen engine replacement cost in the UK?", [
        p("A reconditioned Volkswagen engine supplied and fitted usually costs £2,000–£5,500 in the UK.", "Volume models benefit from strong parts availability and competitive specialist coverage."),
        p("Typical ranges are Polo £1,800–£3,000, Golf £2,200–£4,500, Passat £2,500–£5,000, Tiguan £2,800–£5,200 and Touareg £3,800–£7,000.", "The 2.0 TDI common-rail diesel is the most frequently replaced VW engine."),
      ]),
      q("How much does a VW Golf engine replacement cost?", [
        p("A VW Golf engine replacement usually ranges from about £1,800 to £5,200 fitted depending on engine.", "1.6 TDI often lands at £2,200–£3,800, 2.0 TDI common rail £2,500–£4,500, 1.4 TSI £2,200–£4,000, 2.0 TSI GTI £3,200–£5,200 and older 2.0 TDI PD about £1,800–£3,200."),
        p("The Golf's shared VAG platform keeps specialist supply strong.", "That helps both price and turnaround."),
      ]),
      q("How much does a VW Passat engine replacement cost?", [
        p("VW Passat engine replacement usually lands between about £2,500 and £6,200 fitted.", "1.6 TDI is commonly £2,500–£4,200, 2.0 TDI common rail £2,800–£5,000, 2.0 TSI £2,800–£4,800 and 2.0 BiTDI £3,800–£6,200."),
        p("Passat labour is slightly heavier than Golf labour.", "The larger bay and drivetrain layout usually mean around 14–18 hours."),
      ]),
      q("How much does a 2.0 TDI VW engine cost to replace?", [
        p("VW 2.0 TDI replacement cost depends on platform, but fitted totals usually sit between £2,500 and £5,200.", "Golf is often £2,500–£4,500, Passat £2,800–£5,000, Tiguan £3,000–£5,200, Touran/Sharan £2,800–£5,000 and Transporter £3,000–£5,200."),
        p("Older PD units are cheaper than later common-rail engines.", "But injector and camshaft wear can make the older route less attractive."),
      ]),
      q("How much does a VW Tiguan engine replacement cost?", [
        p("A VW Tiguan engine replacement usually falls between £2,500 and £5,500 fitted.", "1.4 TSI is often £2,500–£4,200, 2.0 TSI about £3,200–£5,500 and 2.0 TDI common rail around £3,000–£5,200."),
        p("Tiguan pricing stays close to Golf pricing because the platform is shared.", "The SUV packaging adds some labour, but not a completely different cost bracket."),
      ]),
      q("How much does a VW Transporter engine replacement cost?", [
        p("A VW Transporter engine replacement is usually £2,200–£6,200 fitted depending on engine.", "1.9 TDI T5 engines often land at £2,200–£3,800, 2.0 TDI T5.1 or T6 at £3,000–£5,200 and 2.0 BiTDI T6 at £3,800–£6,200."),
        p("Commercial-vehicle specialists are important here.", "Transporters usually arrive with higher mileage and tighter downtime requirements than passenger cars."),
      ]),
    ],
    ford: [
      q("How much does a Ford engine replacement cost in the UK?", [
        p("A reconditioned Ford engine supplied and fitted typically costs £1,800–£3,500 in the UK.", "Used engines can be as little as £500–£1,500, while rebuilt options usually sit from about £1,800–£3,000."),
        p("Typical model ranges are Fiesta £1,800–£2,800, Focus £1,800–£3,000, Mondeo £2,000–£3,500, Transit £2,200–£3,800 and Kuga £2,000–£3,500.", "The 1.0 EcoBoost is the most frequently replaced Ford engine."),
      ]),
      q("How much does a 1.0 EcoBoost engine replacement cost?", [
        p("A reconditioned 1.0 EcoBoost usually costs about £2,400–£2,800 supplied and fitted.", "Used engines can come in lower at around £1,500–£1,800 fitted, but they carry more wet-belt risk."),
        p("Because wet-belt debris can contaminate the oil system, reconditioned supply is usually preferred.", "Independent fixed-price replacements around £2,800 including VAT are common reference points."),
      ]),
      q("How much is a Ford Focus engine replacement?", [
        p("A Ford Focus engine replacement usually lands between £1,800 and £4,800 fitted.", "1.0 EcoBoost is often £1,800–£3,200, 1.6 EcoBoost £2,200–£3,800, 1.6 TDCi £1,800–£3,000, 2.0 TDCi £2,200–£3,800 and Focus ST 2.0 EcoBoost about £3,000–£4,800."),
        p("Used Focus engines are cheaper, but reconditioned units give the cleaner risk profile.", "That matters especially on the EcoBoost family."),
      ]),
      q("How much does a Ford Fiesta engine replacement cost?", [
        p("A Ford Fiesta engine replacement usually ranges from about £1,500 to £4,500 fitted.", "1.0 EcoBoost commonly lands at £1,800–£3,200, 1.25 or 1.4 Duratec around £1,500–£2,800, 1.5 or 1.6 TDCi about £1,800–£3,000 and Fiesta ST 1.6 EcoBoost around £2,800–£4,500."),
        p("The Fiesta's popularity keeps engine supply strong.", "Pre-2019 1.0 EcoBoost models account for much of the replacement demand."),
      ]),
      q("How much does a Ford Transit engine replacement cost?", [
        p("A Ford Transit engine replacement usually costs about £2,200–£5,200 fitted depending on engine.", "2.2 TDCi Duratorq often lands at £2,500–£4,500, 2.0 EcoBlue at £3,000–£5,200 and older 2.4 TDCi around £2,200–£4,000."),
        p("Commercial-vehicle specialists are usually the best fit.", "Turnaround matters on working vans, and warranty terms need to be clear."),
      ]),
      q("What is the most affordable Ford engine to replace?", [
        p("The 1.25 and 1.4 Duratec petrol engines in the Fiesta are usually the cheapest Ford engines to replace.", "Used units can start around £400–£800 and reconditioned units around £1,000–£1,800."),
        p("The 1.0 EcoBoost and Ford diesels are replaced more often, but they still stay competitive because UK volumes are high.", "That is why many owners still compare reconditioned supply on those engines."),
      ]),
    ],
    vauxhall: [
      q("How much does a Vauxhall engine replacement cost in the UK?", [
        p("A reconditioned Vauxhall engine supplied and fitted typically costs £1,500–£4,500 in the UK.", "It is usually more affordable than premium German brands thanks to high UK market share and wide independent coverage."),
        p("Typical ranges are Corsa £1,200–£2,500, Astra £1,500–£2,800, Insignia £1,800–£4,500, Mokka £1,500–£3,000 and Zafira £1,500–£3,200.", "Higher-output diesel variants like the Insignia BiTurbo sit at the top of the range."),
      ]),
      q("How much does a Vauxhall Astra engine replacement cost?", [
        p("A Vauxhall Astra engine replacement usually costs about £1,800–£3,700 fitted depending on engine.", "Reconditioned 1.6 petrol units are often £1,200–£1,800 unit only, 1.6 turbo £1,500–£2,200, 1.6 CDTi £1,500–£2,500, 1.7 CDTi £1,200–£1,800 and 2.0 CDTi £1,800–£2,800."),
        p("Astra diesel engines are competitively priced because of strong market volume.", "Fitting commonly adds another £600–£900."),
      ]),
      q("How much does a Vauxhall Corsa engine replacement cost?", [
        p("A Vauxhall Corsa engine replacement usually lands between about £1,500 and £4,500 fitted.", "1.0 or 1.2 petrol often lands at £1,500–£2,500, 1.4 petrol £1,600–£2,600, 1.3 CDTi £1,700–£2,800 and 1.6 Turbo VXR about £2,800–£4,500."),
        p("Huge parts availability keeps Corsa pricing competitive.", "That is why it remains one of the cheapest cars in the UK for an engine replacement."),
      ]),
      q("How much does a Vauxhall Insignia engine replacement cost?", [
        p("A Vauxhall Insignia engine replacement usually ranges from about £2,200 to £6,000 fitted.", "2.0 CDTi single-turbo is often £2,500–£4,200, 2.0 CDTi BiTurbo £3,800–£6,000, 1.6 turbo petrol £2,200–£3,800 and 2.0 turbo petrol about £2,500–£4,500."),
        p("The BiTurbo diesel is usually the most expensive Vauxhall engine to replace.", "Its twin-turbo layout and bottom-end risk both push pricing upward."),
      ]),
      q("What is the cheapest Vauxhall engine to replace?", [
        p("The 1.0 and 1.2 naturally aspirated petrol engines in the Corsa are usually the cheapest Vauxhall engines to replace.", "Used units can be £300–£600, while reconditioned units are often around £1,000–£1,500."),
        p("For diesel Vauxhalls, the 1.3 CDTi and 1.7 CDTi are the more budget-friendly options.", "Those reconditioned units often start around £1,200–£1,800."),
      ]),
    ],
    hyundai: [
      q("How much does a Hyundai engine replacement cost in the UK?", [
        p("A reconditioned Hyundai engine supplied and fitted typically costs £1,800–£3,800 in the UK.", "Hyundai engine replacement is generally cheaper than premium European brands."),
        p("Typical ranges are i10 £1,500–£2,500, i20 £1,600–£2,800, i30 £2,000–£3,200, Tucson £1,800–£3,500 and Santa Fe £2,500–£4,200.", "The i30 and Tucson are the most common replacement enquiries."),
      ]),
      q("How much is a Hyundai i30 engine replacement?", [
        p("A Hyundai i30 engine replacement usually costs about £2,400–£4,000 fitted depending on engine.", "1.4 petrol is often £2,400–£3,200, 1.6 petrol £2,600–£3,400 and 1.6 or 2.0 CRDi diesel about £3,000–£4,000."),
        p("The i30 shares many components with the Kia Cee'd.", "That helps keep replacement engine pricing competitive across the UK."),
      ]),
      q("How much does a Hyundai Tucson engine replacement cost?", [
        p("A Hyundai Tucson engine replacement usually lands between about £2,400 and £4,000 fitted.", "1.6 GDi petrol is often £2,400–£3,200, 1.6 T-GDi £2,600–£3,800, 1.7 CRDi diesel £2,400–£3,500 and 2.0 CRDi diesel about £2,800–£4,000."),
        p("Regional labour differences matter on Tucson pricing.", "Birmingham suppliers are often more competitive than London packages."),
      ]),
      q("What is the cheapest Hyundai engine to replace?", [
        p("The 1.0 and 1.2 Kappa petrol engines in the i10 and i20 are usually the cheapest Hyundai engines to replace.", "Reconditioned units often start around £1,500–£2,000 and fitted packages around £2,000–£2,800."),
        p("For larger Hyundais, the 1.6 GDi petrol is usually the best-value step up.", "It is normally cheaper than the equivalent diesel."),
      ]),
      q("How much is a Hyundai Santa Fe engine replacement?", [
        p("A Hyundai Santa Fe 2.2 CRDi engine replacement usually costs around £3,200–£5,000 fitted.", "Reconditioned unit pricing often starts around £2,500 and can stretch to about £3,800 before fitting."),
        p("The Santa Fe is usually the most expensive Hyundai in this FAQ set.", "Lower UK volumes and higher engine complexity both push the price up."),
      ]),
    ],
    toyota: [
      q("How much does a Toyota engine replacement cost in the UK?", [
        p("A reconditioned Toyota engine supplied and fitted usually costs £1,800–£4,500 in the UK.", "Toyota demand is lower than many European brands because of stronger base reliability, but replacement pricing is still competitive when needed."),
        p("Typical ranges are Yaris fitted £1,800–£3,500, Auris fitted £2,200–£4,000, Avensis fitted £2,200–£4,800, RAV4 £2,000–£5,000 and Hilux around £2,200–£4,200.", "A complete warrantied reconditioned Toyota job usually needs a £3,000–£4,500 budget."),
      ]),
      q("How much is a Toyota Avensis engine replacement?", [
        p("A Toyota Avensis engine replacement usually lands between about £1,800 and £4,800 fitted.", "1.8 VVT-i petrol is often £1,800–£2,800 fitted, 2.0 VVT-i petrol £2,000–£3,200, 2.0 D-4D £2,200–£4,800 and 2.2 D-4D £2,200–£4,200."),
        p("The 2.0 D-4D 1AD-FTV is a common replacement engine.", "Head-gasket and EGR issues are the main reason that cost band stretches upward."),
      ]),
      q("How much does a Toyota Auris engine replacement cost?", [
        p("Toyota Auris engine pricing usually starts around £1,200–£1,800 for petrol reconditioned units and runs higher for diesel or hybrid-adjacent drivetrains.", "1.4 D-4D and 1.6 or 2.0 D-4D engines are commonly £1,500–£2,500, while 1.8 hybrid systems typically sit higher because of drivetrain complexity."),
        p("A rebuilt Auris engine often lands between £1,500 and £3,000 depending on scope.", "Diesel units are the most common replacement comparison."),
      ]),
      q("How much does a Toyota Yaris engine replacement cost?", [
        p("A reconditioned Toyota Yaris engine usually costs £1,000–£2,500 for the engine itself.", "Fully fitted packages generally land around £1,800–£3,500 depending on engine size and exact model."),
        p("The Yaris benefits from excellent availability.", "That is why pricing stays competitive across both used and reconditioned routes."),
      ]),
      q("What is the cheapest Toyota engine to replace?", [
        p("The 1.0 and 1.33 VVT-i petrol engines in the Yaris and Aygo are usually the cheapest Toyota engines to replace.", "Used units are often £400–£800, while reconditioned supply usually starts around £1,000–£1,500."),
        p("Toyota's smaller naturally aspirated petrol engines are both reliable and easy to source.", "That combination keeps replacement cost down when a failure does happen."),
      ]),
      q("How much does a Toyota RAV4 engine replacement cost?", [
        p("A Toyota RAV4 engine replacement usually costs about £2,400–£5,000 fitted depending on engine.", "2.0 VVT-i petrol is often £2,400–£3,800, 2.2 D-4D diesel around £2,600–£4,500 and 2.5 hybrid about £2,800–£5,000."),
        p("The 2.2 D-4D is the most common RAV4 replacement engine.", "The hybrid carries more complexity, but Toyota hybrid reliability remains strong overall."),
      ]),
    ],
  },
  failures: {
    bmw: [
      q("What is the most common BMW engine failure in the UK?", [
        p("The single most common BMW engine failure in the UK is N47 2.0 diesel timing-chain failure.", "When the rear-mounted chain stretches or snaps, valve and piston damage often means the engine needs rebuild or replacement."),
        p("Typical money context is clear.", "Preventative chain work is often £1,200–£2,000, but a reconditioned replacement after failure is usually £2,600–£3,700 and dealer routes can reach £10,000–£14,000."),
      ]),
      q("What causes BMW N47 timing chain failure?", [
        p("BMW N47 timing-chain failure is usually caused by chain stretch, tensioner degradation and the chain's rear-mounted layout.", "Cold-start rattle is the classic early sign, but many owners only act once the damage is already serious."),
        p("Once metal debris starts circulating in the oil, replacement often becomes the cleaner route.", "At that point the damage can extend well beyond the chain itself."),
      ]),
      q("What are the common B47 engine problems in BMWs?", [
        p("Common BMW B47 problems are timing-chain stretch, EGR valve or cooler issues, DPF clogging and oil sludge from long service intervals.", "The B47 improved on the N47, but it did not eliminate chain-related risk."),
        p("When a B47 fails badly, a reconditioned replacement is often £2,800–£4,000 fitted.", "That is why early diagnosis still matters."),
      ]),
      q("What causes BMW N57 engine failure?", [
        p("The BMW N57 3.0 diesel most commonly fails because of crankshaft bearing failure and oil-starvation-related bottom-end damage.", "Once bearing material circulates through the oil system, the turbocharger and bores are often affected too."),
        p("A reconditioned N57 long engine is usually about £3,800–£5,500 supplied and fitted.", "Timing-chain work can also be part of the rebuild picture on these engines."),
      ]),
      q("What are common BMW N20 engine failures?", [
        p("The BMW N20 2.0 petrol is known for timing-chain and oil-pump drive-chain failure.", "Worn guides and broken tensioner fragments can contaminate the oil system and lead to low-oil-pressure warnings."),
        p("If the chain snaps, full engine replacement is often the outcome.", "Reconditioned N20 replacements for cars like the 320i and 520i are commonly £2,800–£3,800 fitted."),
      ]),
      q("What are the most common B58 engine problems?", [
        p("The B58's most discussed problems are cooling-system faults, coolant loss, HPFP failure, oil leaks and occasional crankshaft-pulley issues.", "It is still one of BMW's stronger modern engines overall, but it is not trouble-free."),
        p("A reconditioned B58 replacement is usually £4,800–£7,000 fitted.", "That makes early cooling-system diagnosis especially worthwhile."),
      ]),
      q("What are the warning signs of BMW timing chain failure?", [
        p("Cold-start rattle, cam-correlation fault codes, rough running, metallic particles in the oil and loss of power are the main BMW timing-chain warning signs.", "The exact codes vary by engine family, but the pattern is consistent."),
        p("Specialists usually advise acting early.", "A £1,200–£2,000 chain job is far cheaper than a £3,000–£5,000 plus replacement engine after total failure."),
      ]),
    ],
    "land-rover": [
      q("What is the most common Land Rover engine failure?", [
        p("The most common modern Land Rover engine failure is the 2.0 Ingenium diesel timing-chain failure.", "When it lets go, bent valves, broken cam followers and full engine destruction are common outcomes."),
        p("That is why UK specialists now routinely stock reconditioned Ingenium long engines.", "A full replacement commonly reaches £7,000 or more, while chain-only work can already be £2,800–£4,500."),
      ]),
      q("What causes the Land Rover Ingenium diesel to fail?", [
        p("The main causes are timing-chain stretch, oil dilution from DPF regeneration and oil-pump weakness.", "Diluted oil loses lubricating strength and accelerates chain and bearing wear."),
        p("Long factory oil intervals make the issue worse under UK driving conditions.", "Many independent specialists recommend much shorter service intervals than the official schedule."),
      ]),
      q("What causes Land Rover TDV6 crankshaft failure?", [
        p("Land Rover TDV6 crankshaft failure is mainly a design problem in the crankshaft itself, combined with oil-pressure or bearing issues.", "When the crank breaks or the bearings seize, the engine is usually beyond economical repair."),
        p("A reconditioned 3.0 TDV6 long engine is often around £4,250 exchange plus fitting.", "That is why buyers usually compare full-engine routes rather than partial bottom-end repair."),
      ]),
      q("What are common Range Rover engine failures?", [
        p("Range Rover failures are concentrated around the 3.0 TDV6 crankshaft, 5.0 supercharged V8 timing-chain tensioners and 4.4 TDV8 oil-leak or turbo issues.", "The TDV6 is the most catastrophic and the most expensive to ignore."),
        p("Independent reconditioned routes are usually far below dealer pricing.", "That is why most owners compare specialist quotes as soon as a major failure is confirmed."),
      ]),
      q("What are the symptoms of Land Rover Ingenium timing chain failure?", [
        p("Cold-start rattle, warning lights, rough idle, misfires, loss of power, heavy oil consumption and metal debris in the oil are the main Ingenium warning signs.", "Some engines still fail suddenly with almost no warning."),
        p("Because the failure can escalate very quickly, specialists usually advise immediate inspection when any of those symptoms appear.", "Delay raises the odds of full replacement."),
      ]),
      q("What are common Land Rover Discovery engine problems?", [
        p("Discovery 3 and 4 TDV6 engines are known for crankshaft and oil-pump-related failure, while Discovery Sport and Discovery 5 Ingenium models bring timing-chain and oil-dilution risk.", "The failure pattern changes by generation, but the cost can be substantial across all of them."),
        p("Reconditioned Discovery replacements commonly range from about £3,500 to £7,500 fitted depending on model.", "That is why exact engine-family matching matters."),
      ]),
    ],
    jaguar: [
      q("What is the most common Jaguar engine failure?", [
        p("The most common Jaguar engine failure is the 2.0 Ingenium diesel timing-chain failure shared with Land Rover.", "When the chain stretches or fails, a full reconditioned replacement is often the only commercially sensible route."),
        p("Jaguar dealer timing-chain pricing alone can exceed £3,000.", "A full reconditioned replacement after failure is often around £4,700–£5,800 fitted."),
      ]),
      q("What causes Jaguar Ingenium diesel engine failure?", [
        p("The root causes mirror Land Rover: timing-chain stretch, oil dilution from DPF regeneration and oil-pump or oil-pump-drive failure.", "Once oil pressure is lost, the damage can be immediate and terminal."),
        p("When the chain lets go, bent valves, broken rocker arms and damaged camshafts are typical.", "That is why many buyers go straight to replacement quotes once major damage is confirmed."),
      ]),
      q("What are the common AJ126 3.0 Supercharged V6 engine problems?", [
        p("Common AJ126 problems include cooling-system pipe and housing failure, supercharger coupler wear and timing-chain tensioner wear.", "Coolant loss is especially dangerous because it can quickly lead to overheating and head-gasket trouble."),
        p("A reconditioned AJ126 engine is usually £4,200–£5,500 unit only plus fitting.", "That makes early diagnosis on cooling and chain noise worthwhile."),
      ]),
      q("What are the common Jaguar V8 engine failures?", [
        p("The Jaguar AJ133 5.0 V8 is most associated with timing-chain tensioner and guide failure, especially on early plastic-tensioner engines.", "If the issue is caught early, upgraded parts can be fitted before the engine is destroyed."),
        p("Once the chain has jumped or debris has circulated, repair costs rise sharply.", "That is when owners usually move from tensioner pricing to full replacement comparisons."),
      ]),
      q("What are the symptoms of Jaguar engine timing chain failure?", [
        p("Cold-start rattle, check-engine warnings, rough idle, hesitation, loss of power and metal particles in the oil are the core Jaguar timing-chain warning signs.", "On supercharged AJ126 and AJ133 engines, coupler noise can sometimes accompany chain noise."),
        p("Ingenium diesels are the most unforgiving.", "Owners report that some fail suddenly with almost no warning at all."),
      ]),
    ],
    mercedes: [
      q("What is the most common Mercedes engine failure in the UK?", [
        p("The most common Mercedes engine failure is OM651 2.1 diesel timing-chain failure.", "The chain sits at the rear of the engine and stretches over time, especially on earlier units."),
        p("Preventative chain work can be expensive, but ignoring it is often worse.", "If the chain fails, full engine replacement at roughly £2,800–£3,800 fitted is usually the outcome."),
      ]),
      q("What causes Mercedes OM651 timing chain failure?", [
        p("OM651 timing-chain failure is driven by the simplex chain design, its rear-mounted position and the effect of oil quality and high mileage.", "Cold-start rattle that fades after a few seconds is the classic early sign."),
        p("Pre-2015 engines are generally most at risk.", "Later revisions improved the design, but careful maintenance still matters."),
      ]),
      q("What are the common OM654 diesel engine problems?", [
        p("The OM654 is generally stronger than the OM651, but common issues include early crankshaft loading concerns, valvetrain wear, turbocharger problems, high-pressure fuel-pump failure and emissions-system faults.", "The risk profile is lower than OM651, not zero."),
        p("A reconditioned OM654 unit is usually £3,200–£4,200 before fitting.", "That keeps it above OM651 pricing in most comparisons."),
      ]),
      q("What are common Mercedes OM642 V6 diesel failures?", [
        p("The OM642 is known for EGR cooler leaks, oil-cooler seal failure, turbocharger heat stress and recurring glow-plug issues.", "Coolant ingress and oil contamination are the most serious paths because they can damage the entire engine."),
        p("A reconditioned OM642 replacement is usually around £3,800–£5,500 supplied and fitted.", "That is why contamination checks are so important before deciding between repair and replacement."),
      ]),
      q("What are the symptoms of Mercedes diesel engine failure?", [
        p("Cold-start rattle, unexplained coolant loss, oil in coolant or coolant in oil, excess smoke, limp mode and rough running are the main Mercedes diesel-engine warning signs.", "Different engines emphasise different symptoms, but contamination and chain noise are the big ones."),
        p("Prompt specialist diagnosis matters.", "Those symptoms can represent a manageable repair or the start of a replacement-level failure."),
      ]),
      q("What Mercedes petrol engine problems are most common?", [
        p("The most common Mercedes petrol timing-chain issue is on the M271 1.8, where the simplex chain stretches and the tensioner can fail.", "Later M274 engines are better, though HPFP faults and occasional tensioner issues still appear."),
        p("The M276 V6 has a stronger reputation overall.", "Its better-known issues are usually less catastrophic than the M271's timing-chain failures."),
      ]),
    ],
    audi: [
      q("What is the most common Audi engine failure in the UK?", [
        p("The most common Audi engine failure is the EA888 2.0 TFSI timing-chain tensioner failure.", "Earlier revision tensioners can lose holding force and let the chain jump, bending valves and destroying the engine."),
        p("Preventative tensioner work is far cheaper than post-failure replacement.", "A failed EA888 often pushes owners into £2,800–£4,000 reconditioned engine comparisons."),
      ]),
      q("What causes Audi EA888 timing chain tensioner failure?", [
        p("The early EA888 tensioner has a design defect in the ratchet mechanism that can let chain tension fall away, especially during cold starts before full oil pressure builds.", "Long oil intervals and low oil level make the problem worse."),
        p("Audi later revised the design.", "Any earlier EA888 with the original tensioner is a strong candidate for preventative inspection."),
      ]),
      q("What are common Audi 2.0 TDI diesel engine failures?", [
        p("Common Audi 2.0 TDI failures include DPF blockage, EGR cooler leaks, injector failure, fuel-pump issues and oil-pump-drive failure on some variants.", "The exact mix varies by generation, but emissions-related problems dominate day-to-day enquiries."),
        p("If oil pressure is lost or hydro-lock occurs, a reconditioned replacement often becomes the cleaner route.", "That is why specialists pay close attention to coolant loss and oil-warning history."),
      ]),
      q("What are common Audi 3.0 TDI V6 engine failures?", [
        p("The 3.0 TDI V6 is generally robust, but timing-chain tensioner wear, chain rattle, EGR or DPF issues and injector deterioration are all known problems.", "The chain system is especially important because this engine uses four chains."),
        p("A reconditioned 3.0 TDI V6 usually costs about £3,800–£5,500 for the unit alone.", "Labour then adds another layer because access is not simple."),
      ]),
      q("What are the warning signs of Audi engine failure?", [
        p("Cold-start rattle, heavy oil consumption, coolant loss with no visible leak, blue or white smoke, limp mode and rough idle are the main Audi engine warning signs.", "The exact meaning changes between petrol and diesel, but those are the signals specialists look for first."),
        p("Acting on the warning signs early can be the difference between a repair and a full replacement job.", "That is especially true on EA888 petrol engines."),
      ]),
    ],
    volkswagen: [
      q("What is the most common Volkswagen engine failure?", [
        p("The most common Volkswagen engine failure in the UK is the 1.4 TSI timing-chain failure on earlier chain-driven versions.", "Tensioner weakness and chain stretch can let the chain jump and destroy the engine."),
        p("When that happens, full engine replacement at roughly £2,200–£4,000 may be needed.", "Chain-only repair is much cheaper, but only if the engine has not already been damaged."),
      ]),
      q("What causes VW 1.4 TSI timing chain failure?", [
        p("VW 1.4 TSI timing-chain failure is mainly caused by a weak hydraulic tensioner, chain stretch and long oil-service intervals.", "Cold-start rattle is the clearest early warning sign."),
        p("Short, cold journeys make the problem worse.", "That is why specialists often recommend shorter oil intervals than the original extended service schedule."),
      ]),
      q("What are common VW 2.0 TDI PD engine failures?", [
        p("The older 2.0 TDI PD engine is known for camshaft lobe wear, injector failure and loom degradation inside the cylinder head.", "Using the wrong oil accelerates cam wear badly."),
        p("When injector and camshaft repair costs pile up, a reconditioned replacement engine often becomes better value.", "That is why PD buyers still compare replacement routes regularly."),
      ]),
      q("What are the common VW 2.0 TDI common rail engine failures?", [
        p("The 2.0 TDI common-rail engine is most associated with DPF blockage, EGR cooler failure, injector trouble and some in-tank fuel-pump failures.", "These are different failure patterns from the older PD engine."),
        p("If back-pressure or coolant ingress leads to wider damage, replacement moves back into the conversation.", "That is when warranty-backed recon supply becomes especially relevant."),
      ]),
      q("What are the warning signs of VW TSI or TDI engine failure?", [
        p("Cold-start rattle, rough idle, smoke, limp mode, check-engine warnings and oil-pressure alerts are the major warning signs across VW TSI and TDI engines.", "The meaning differs by engine, but timing, fuelling and emissions problems all show up in that symptom set."),
        p("The safest response is early specialist diagnosis.", "Waiting for a hard failure usually narrows the outcome to rebuild or replacement."),
      ]),
    ],
    ford: [
      q("What is the most common Ford engine failure in the UK?", [
        p("The most common Ford engine failure is the 1.0 EcoBoost wet-belt failure.", "As the belt degrades in oil, debris blocks the oil pickup and oil starvation or timing loss can destroy the engine."),
        p("A pre-failure wet-belt job is far cheaper than replacement.", "Once the engine is damaged, a reconditioned replacement usually lands around £2,400–£2,800 fitted."),
      ]),
      q("What causes Ford EcoBoost wet-belt failure?", [
        p("Ford EcoBoost wet-belt failure is caused by oil contamination, long oil-change intervals, belt-material degradation and the debris that then blocks the oil-pickup strainer.", "The 1.0 EcoBoost is the best-known example of this design weakness."),
        p("Shorter oil-change intervals are widely recommended by specialists.", "That is one of the few effective ways to reduce risk on surviving engines."),
      ]),
      q("What are the common 1.5 or 2.0 EcoBoost engine failures?", [
        p("The 1.5 and 2.0 EcoBoost engines are best known for coolant leaks, head-gasket failure and overheating damage.", "On the 1.5 in particular, coolant ingress into a cylinder can progress to hydro-lock or block damage if ignored."),
        p("A white-tipped spark plug is a strong warning sign on a 1.5 EcoBoost.", "Catch it early and the job may stay repairable rather than becoming a full replacement."),
      ]),
      q("What are the common Ford diesel engine failures?", [
        p("Ford diesel failures commonly centre on injector problems, turbocharger failure and on newer EcoBlue engines, wet-belt or injector-related issues.", "A turbo that fails badly can also contaminate and destroy the engine."),
        p("That is why specialists inspect both the failed engine and the supporting systems before quoting.", "The root cause matters as much as the visible damage."),
      ]),
      q("What are the warning signs of Ford engine failure?", [
        p("Timing-area rattling, coolant loss, oil-pressure warnings, white-tipped spark plugs, smoke and limp mode are the main Ford warning signs.", "Different engines emphasise different symptoms, but the pattern is consistent across EcoBoost and diesel enquiries."),
        p("Immediate diagnosis matters.", "Early action often saves the job from turning into a full engine replacement."),
      ]),
    ],
    vauxhall: [
      q("What is the most common Vauxhall engine failure in the UK?", [
        p("The most common Vauxhall engine failure is the 1.6 CDTi timing-chain and oil-pump-chain failure.", "Cold-start chain rattle and loss of tensioner oil pressure are the classic early clues."),
        p("If the oil-pump chain snaps, oil pressure disappears instantly and the engine usually fails catastrophically.", "That is why reconditioned replacements are common on this engine family."),
      ]),
      q("What are the common Vauxhall 2.0 CDTi engine failures?", [
        p("The 2.0 CDTi, especially the BiTurbo, is known for bottom-end bearing failure, suspected oil-pump issues and turbocharger-related damage.", "Short journeys and DPF regen oil dilution are often part of the background."),
        p("The BiTurbo version is also one of the most expensive Vauxhall engines to replace.", "That is why early diagnosis can materially change the financial decision."),
      ]),
      q("What causes Vauxhall 1.4 Turbo engine failure?", [
        p("The Vauxhall 1.4 Turbo is vulnerable to overheating damage, piston failure and turbo failure.", "Some UK garages describe badly overheated versions as effectively uneconomic to rebuild."),
        p("Cylinder-one piston failure is a recurring complaint on certain years.", "That is why many owners compare full replacement rather than partial repair once serious damage is confirmed."),
      ]),
      q("What are the common problems with Vauxhall 1.3 CDTi engines?", [
        p("The 1.3 CDTi commonly suffers from timing-chain stretch, EGR clogging and turbocharger issues linked to oil supply and service history.", "It is usually cheaper to replace than the larger CDTi engines."),
        p("A reconditioned 1.3 CDTi often starts around £1,200–£1,800.", "That keeps it in the more budget-friendly end of Vauxhall diesel replacements."),
      ]),
      q("What are the warning signs of Vauxhall engine failure?", [
        p("Cold-start rattle, oil-pressure warnings, overheating, bottom-end knocking and blue smoke are the major Vauxhall engine failure warning signs.", "The exact symptom set depends on whether the car is a CDTi diesel or a turbo petrol."),
        p("Those are not symptoms to drive through.", "Prompt diagnosis often decides whether the outcome is repair, rebuild or replacement."),
      ]),
    ],
    hyundai: [
      q("What is the most common Hyundai engine failure in the UK?", [
        p("The most common Hyundai failure pattern in this segment is 1.6 CRDi oil-pump-chain failure combined with EGR and DPF problems.", "Loss of oil pressure can seize the engine almost instantly."),
        p("Urban-use EGR and DPF clogging compounds the risk.", "That is why the 1.6 CRDi is the main Hyundai diesel replacement engine people compare."),
      ]),
      q("What causes Hyundai 1.6 CRDi engine failure?", [
        p("The 1.6 CRDi fails mainly because of oil-pump-drive failure, blocked oil-pickup strainers and carbon-heavy EGR or DPF use patterns.", "Once oil pressure goes, bearing and crank damage follows very quickly."),
        p("Specialists usually recommend shorter oil intervals than the official schedule.", "That is one of the biggest steps owners can take on surviving engines."),
      ]),
      q("What are common Hyundai 2.2 CRDi engine failures?", [
        p("The 2.2 CRDi is associated with oil starvation to the cylinder head, fuel-pump failure, turbocharger failure and occasional sudden total engine failure.", "The Santa Fe is the best-known application."),
        p("Once the top end has seized or the turbo has contaminated the engine, replacement becomes far easier to justify than piecemeal repair.", "That is why these cases are often quote-comparison jobs rather than simple garage repairs."),
      ]),
      q("What are the warning signs of Hyundai diesel engine failure?", [
        p("Top-end rattling, oil warnings, limp mode, stalling, smoke and bottom-end rumble are the main Hyundai diesel-engine warning signs.", "Low oil pressure is especially serious on the CRDi family."),
        p("If those symptoms appear, the safest move is early shutdown and specialist diagnosis.", "Running on can tip the engine from repairable to replacement-only."),
      ]),
    ],
    toyota: [
      q("What is the most common Toyota engine failure in the UK?", [
        p("The most common Toyota engine failure is D-4D diesel head-gasket failure on the 2.0 and 2.2 AD-series engines.", "It is not just a gasket issue; it reflects a deeper design problem on earlier units."),
        p("Toyota's own countermeasure involved revised short-block and head components.", "That is why a properly corrected reconditioned engine is usually a better comparison than a basic gasket-only repair."),
      ]),
      q("What causes Toyota 2.2 D4D head gasket failure?", [
        p("The 2.2 D4D head gasket fails because of carbon buildup on the pistons, high thermal stress and, on some engines, cylinder-head material issues.", "The EGR system is part of the background because it contributes to the carbon load."),
        p("A simple gasket swap is widely regarded as a temporary fix.", "Buyers usually compare reconditioned engines that include Toyota's revised countermeasures."),
      ]),
      q("What are common Toyota D4D injector failures?", [
        p("Toyota D4D injector problems usually show up as rough running, black smoke, poor fuel economy and difficult starting.", "Replacing all four injectors plus labour can easily run into the thousands."),
        p("When injector trouble sits alongside head-gasket risk, a complete reconditioned engine can make more sense than repeated partial repair.", "That is a common turning point in D4D ownership."),
      ]),
      q("What are the common Toyota petrol engine failures?", [
        p("Toyota petrol engines are generally strong, but known issues include early 1.8 VVT-i oil consumption, VVT-i cam-gear rattle and occasional chain stretch at very high mileages.", "These failures are much less frequent than the D4D diesel issues."),
        p("Replacement cost is also usually lower.", "Reconditioned Toyota petrol engines often land around £1,200–£1,800."),
      ]),
      q("What are the warning signs of Toyota D4D engine problems?", [
        p("Coolant loss with no obvious leak, white smoke, overheating, milky oil contamination, rough running and black smoke are the main Toyota D4D warning signs.", "Coolant loss is one of the earliest and most important clues."),
        p("Catching the issue early can save thousands.", "Once overheating is repeated, the outcome often shifts from repair to replacement."),
      ]),
    ],
  },
} as const;
