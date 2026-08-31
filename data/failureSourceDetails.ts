// Generated from public/failures/*.html by scripts/extract-failure-guide-details.mjs.
// Do not hand-edit: update the static source and regenerate when source content changes.

export type FailureSourceTable = { headers: string[]; rows: string[][] };
export type FailureSourceSection = { title: string; paragraphs: string[]; bullets: string[]; tables: FailureSourceTable[]; additionalText: string };
export type FailureSourceFaq = { question: string; answer: string };
export type FailureSourceDetails = { sections: FailureSourceSection[]; faqs: FailureSourceFaq[] };

export const failureSourceDetails: Record<string, FailureSourceDetails> = {
  "camshaft-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Acting early is the difference between a £400 repair and a £2,500+ engine replacement.",
          "Cam lobe or follower beginning to wear - low oil pressure or poor lubrication. Early warning.",
          "Book a diagnostic inspection. Oil system inspection and compression test will identify the cause.",
          "£100-£250 for diagnostic + oil system inspection. Labour: 1-3 hours.",
          "Worn cam lobe reduces valve lift - cylinder not breathing properly. Misfire and fault codes present.",
          "Stop driving if fault codes present on interference engine. Book camshaft replacement.",
          "£400-£900 for single cam + followers. Labour: 5-8 hours at £65-£95/hr.",
          "Multiple lobes worn or cam journal damage - extensive valve train wear. Oil system may be contaminated.",
          "Full valve train inspection. Both cams + followers + lifters likely needed. Evaluate vehicle value.",
          "£800-£1,800 for both cams + followers + lifters. Labour: 6-10 hours.",
          "Cam journal seized or lobe completely gone - debris circulating throughout engine.",
          "Stop driving. Full cylinder head replacement or engine replacement needed - evaluate vehicle value.",
          "£1,000-£3,000+ for cylinder head replacement. Labour: 10-16 hours.",
          "On interference engine, cam failure caused valve/piston contact - bent valves, damaged pistons.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the head and block are damaged.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Acting early is the difference between a £400 repair and a £2,500+ engine replacement. £100 Tapping/ticking noise from top of engine, rough idle Cam lobe or follower beginning to wear £100 - £250 (diagnostic + oil system inspection) £400 Misfire on one cylinder, loss of power, engine light (P0016-P0019) Worn cam lobe - cylinder not breathing properly £400 - £900 (single cam + followers) £800 Constant misfire, rough running, metallic tapping, failed emissions Multiple lobes worn or cam journal damage £800 - £1,800 (both cams + followers) £1,000 Metal debris in oil, runs poorly on multiple cylinders Cam journal seized or lobe completely gone - debris throughout engine £1,000 - £3,000+ (cylinder head replacement) £6,500+ Engine knock, sudden stop, bent valves On interference engine, valve hit piston - catastrophic £2,500 - £6,500+ (engine replacement) Likely cause Cam lobe or follower beginning to wear - low oil pressure or poor lubrication. Early warning. What to do Book a diagnostic inspection. Oil system inspection and compression test will identify the cause. Repair cost £100-£250 for diagnostic + oil system inspection. Labour: 1-3 hours. Likely cause Worn cam lobe reduces valve lift - cylinder not breathing properly. Misfire and fault codes present. What to do Stop driving if fault codes present on interference engine. Book camshaft replacement. Repair cost £400-£900 for single cam + followers. Labour: 5-8 hours at £65-£95/hr. Likely cause Multiple lobes worn or cam journal damage - extensive valve train wear. Oil system may be contaminated. What to do Full valve train inspection. Both cams + followers + lifters likely needed. Evaluate vehicle value. Repair cost £800-£1,800 for both cams + followers + lifters. Labour: 6-10 hours. Likely cause Cam journal seized or lobe completely gone - debris circulating throughout engine. What to do Stop driving. Full cylinder head replacement or engine replacement needed - evaluate vehicle value. Repair cost £1,000-£3,000+ for cylinder head replacement. Labour: 10-16 hours. Likely cause On interference engine, cam failure caused valve/piston contact - bent valves, damaged pistons. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the head and block are damaged. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of camshaft failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Tapping or ticking noise from the top of the engine",
          "• Rough idle that smooths out at higher RPM",
          "• Loss of power, especially at low RPM",
          "• Engine management light - P0016-P0019 (cam/crank correlation)",
          "• Constant misfire on one or more cylinders",
          "• Metallic knocking noise from cylinder head",
          "• Failed emissions test - high hydrocarbons",
          "• Metal debris in oil (visible glitter during oil change)",
          "• Engine runs rough constantly, not just at idle"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book diagnostic soon) • Tapping or ticking noise from the top of the engine • Rough idle that smooths out at higher RPM • Loss of power, especially at low RPM • Engine management light - P0016-P0019 (cam/crank correlation) 🔴 PROGRESSED DAMAGE (Book diagnostic immediately) • Constant misfire on one or more cylinders • Metallic knocking noise from cylinder head • Failed emissions test - high hydrocarbons • Metal debris in oil (visible glitter during oil change) • Engine runs rough constantly, not just at idle 🚨 Critical warning on interference engines: Many modern engines are interference designs (pistons and valves occupy the same space at different times). If a cam lobe wears down, valve timing can drift far enough for a piston to strike a valve. This bends valves, damages pistons, and often requires complete engine replacement. If you have camshaft-related fault codes, do not ignore them. Camshaft replacement cost by engine type"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: camshaft replacement 4-10 hours at £65-£95/hr indie."
        ],
        "bullets": [
          "• New camshaft(s) (OEM quality)",
          "• New cam followers/lifters (essential)",
          "• New cam seals",
          "• New timing belt or chain gaskets (if disturbed)",
          "• New engine oil and filter",
          "• Timing reset/calibration"
        ],
        "tables": [
          {
            "headers": [
              "Engine Type",
              "Typical Cost (Parts + Labour)",
              "Labour Hours",
              "Common Applications"
            ],
            "rows": [
              [
                "Single overhead cam (SOHC) - 4 cylinder",
                "£400 - £700",
                "4 - 6 hrs",
                "Older Ford, Vauxhall, some Japanese"
              ],
              [
                "Dual overhead cam (DOHC) - 4 cylinder (one cam fails)",
                "£500 - £900",
                "5 - 8 hrs",
                "Most modern 4-cylinder engines"
              ],
              [
                "Dual overhead cam (DOHC) - 4 cylinder (both cams)",
                "£800 - £1,500",
                "6 - 10 hrs",
                "Most modern 4-cylinder engines"
              ],
              [
                "V6 - both banks",
                "£1,200 - £2,500",
                "8 - 14 hrs",
                "V6 engines - labour intensive"
              ],
              [
                "V8 - both banks",
                "£1,500 - £3,500+",
                "10 - 18 hrs",
                "V8 engines - significant labour"
              ],
              [
                "Cam journal polishing (minor damage)",
                "£65 - £105 (add to labour)",
                "N/A",
                "If scoring is minor and within spec"
              ]
            ]
          }
        ],
        "additionalText": "Engine Type Typical Cost (Parts + Labour) Labour Hours Common Applications Single overhead cam (SOHC) - 4 cylinder £400 - £700 4 - 6 hrs Older Ford, Vauxhall, some Japanese Dual overhead cam (DOHC) - 4 cylinder (one cam fails) £500 - £900 5 - 8 hrs Most modern 4-cylinder engines Dual overhead cam (DOHC) - 4 cylinder (both cams) £800 - £1,500 6 - 10 hrs Most modern 4-cylinder engines V6 - both banks £1,200 - £2,500 8 - 14 hrs V6 engines - labour intensive V8 - both banks £1,500 - £3,500+ 10 - 18 hrs V8 engines - significant labour Cam journal polishing (minor damage) £65 - £105 (add to labour) N/A If scoring is minor and within spec Cost ranges [INDUSTRY ESTIMATE]. Labour: camshaft replacement 4-10 hours at £65-£95/hr indie. What's included in a proper camshaft replacement job • New camshaft(s) (OEM quality) • New cam followers/lifters (essential) • New cam seals • New timing belt or chain gaskets (if disturbed) • New engine oil and filter • Timing reset/calibration Important: Replacing a camshaft without replacing the followers is false economy. Worn followers have a worn surface pattern that will rapidly destroy a new camshaft. Always replace followers with cams. Common causes of camshaft failure"
      },
      {
        "title": "Why cams fail",
        "paragraphs": [
          "Market context: Based on Engines Market enquiry volumes, BMW N47D20C (1,450 requests [EM-VERIFIED]), Mercedes OM651 (1,250), VW/Audi EA189 (1,050), and Land Rover 204DTD (1,150) are among the most frequently requested diesel engines. Camshaft wear is one of several valve train faults specialists may investigate when diagnosing misfire or tapping noise. [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Most Common On",
              "Prevention"
            ],
            "rows": [
              [
                "Oil starvation",
                "Sludge or low oil pressure blocks oil passages to cylinder head",
                "Poorly maintained engines, long oil change intervals",
                "Regular oil changes (correct spec), quality filter"
              ],
              [
                "Worn cam followers/lifters",
                "Follower wears through, metal contacts cam lobe directly",
                "High-mileage engines",
                "Replace followers when replacing cams"
              ],
              [
                "Broken timing chain/belt",
                "Valves and pistons collide - cams stop turning while crank continues",
                "Interference engines",
                "Replace timing components on schedule"
              ],
              [
                "Incorrect oil grade",
                "Oil too thin or wrong specification - insufficient cam lubrication",
                "VW/Audi, BMW (needs specific spec)",
                "Use manufacturer-spec oil"
              ],
              [
                "Extended oil change intervals",
                "Oil degrades, forms sludge, blocks oil passages",
                "Vehicles on long-life service plans",
                "Reduce intervals or use quality oil"
              ],
              [
                "Cam journal scoring",
                "Debris in oil or oil starvation damages bearing surfaces",
                "Neglected maintenance, failed oil pump",
                "Regular oil changes, fix oil pressure issues"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Engines with known valve train issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain stretch - chain debris can contaminate oil, affecting cam bearings. Regular oil changes critical. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Timing chain tensioner wear - chain issues can affect cam timing. Oil quality affects cam life. Land Rover 204DTD (Ingenium) 60k-120k 1,150 [EM-VERIFIED] Timing chain tensioner failure - chain debris in oil. Oil dilution from DPF regen affects lubrication. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Camshaft generally robust, but oil specification critical. Use VW 507.00 oil. VW/Audi EA888 Gen1/Gen2 2.0 TSI 60k-100k [THIRD-PARTY] Cam follower failure (HPFP). If follower wears through, it damages cam lobe. Replace follower at 60k-80k. VW/Seat EA111 1.4 TSI 60k-100k 140 [EM-VERIFIED] Timing chain tensioner failure - chain issues affect cam timing. Twincharger has multiple failure points. Third-party note on VAG 2.0 TSI cam follower: On earlier VW/Audi EA888 Gen1 and Gen2 engines (not listed in EM request table - [THIRD-PARTY]), the high-pressure fuel pump cam follower was a known wear item. If the follower wore through, it would damage the camshaft lobe that drives the fuel pump. Replacement cost: £400-£800 including cam follower and camshaft inspection. Gen3 engines (2013+) have an improved design. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: camshaft replacement 4-10 hours at £65-£95/hr indie."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Damage Severity",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Minor cam journal scoring (within spec)",
                "Cam journal polishing",
                "£65 - £105 (plus labour)",
                "If scoring is light and within manufacturer tolerance"
              ],
              [
                "One worn cam lobe (SOHC or one DOHC cam)",
                "Single camshaft replacement + followers",
                "£400 - £900",
                "Viable if engine otherwise good and oil system cleaned"
              ],
              [
                "Both cams worn (DOHC)",
                "Both camshafts + followers + lifters",
                "£800 - £1,800",
                "Evaluate vehicle value - major repair"
              ],
              [
                "Cam journal seized - head damaged",
                "Cylinder head replacement (used or reconditioned)",
                "£1,000 - £3,000+",
                "Only viable on vehicles worth £4,000+"
              ],
              [
                "Valve/piston contact (interference engine)",
                "Engine replacement or full rebuild",
                "£2,500 - £6,500+",
                "Only on high-value vehicles (£6,000+)"
              ],
              [
                "Oil system contaminated with debris",
                "Oil system flush + new oil pump + cam replacement",
                "£1,500 - £3,500+",
                "Risk of repeat failure - consider engine replacement"
              ]
            ]
          }
        ],
        "additionalText": "Damage Severity Repair Option Typical Cost When to Choose Minor cam journal scoring (within spec) Cam journal polishing £65 - £105 (plus labour) If scoring is light and within manufacturer tolerance One worn cam lobe (SOHC or one DOHC cam) Single camshaft replacement + followers £400 - £900 Viable if engine otherwise good and oil system cleaned Both cams worn (DOHC) Both camshafts + followers + lifters £800 - £1,800 Evaluate vehicle value - major repair Cam journal seized - head damaged Cylinder head replacement (used or reconditioned) £1,000 - £3,000+ Only viable on vehicles worth £4,000+ Valve/piston contact (interference engine) Engine replacement or full rebuild £2,500 - £6,500+ Only on high-value vehicles (£6,000+) Oil system contaminated with debris Oil system flush + new oil pump + cam replacement £1,500 - £3,500+ Risk of repeat failure - consider engine replacement Cost ranges [INDUSTRY ESTIMATE]. Labour: camshaft replacement 4-10 hours at £65-£95/hr indie. Vehicle Value Threshold: Under £2,000 - If camshaft failed, consider scrap or used cylinder head. £2,000-£4,000 - Single cam replacement (£400-£900) viable. Both cams- Evaluate carefully. £4,000-£8,000 - Cam replacement or used cylinder head justified. £8,000+ - Any repair - even full cylinder head replacement. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored tapping noise - cam lobe or follower wearing £100 - £250 Stage 2 Driven with misfire (weeks) - cam lobe worn down £400 - £900 Stage 3 Driven with metal debris - cam journal scoring £800 - £1,800 Stage 4 Cam seizure (interference engine) - valve/piston contact £2,500 - £6,500+ Stage 5 Oil starvation across engine - bottom-end damage £2,500 - £6,500+ The maths of ignoring camshaft wear: Diagnose now: £100-£250. Fix now (cam + followers): £400-£900. Ignore until misfire develops (cylinder head damage): £1,000-£3,000+. Wait until valve/piston contact (interference engine): £2,500-£6,500. Consequences of ignoring fault codes P0016-P0019"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored tapping noise - cam lobe or follower wearing £100 - £250 Stage 2 Driven with misfire (weeks) - cam lobe worn down £400 - £900 Stage 3 Driven with metal debris - cam journal scoring £800 - £1,800 Stage 4 Cam seizure (interference engine) - valve/piston contact £2,500 - £6,500+ Stage 5 Oil starvation across engine - bottom-end damage £2,500 - £6,500+ The maths of ignoring camshaft wear: Diagnose now: £100-£250. Fix now (cam + followers): £400-£900. Ignore until misfire develops (cylinder head damage): £1,000-£3,000+. Wait until valve/piston contact (interference engine): £2,500-£6,500. Consequences of ignoring fault codes P0016-P0019"
      },
      {
        "title": "Cam/crank correlation codes - do not ignore",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Fault Code",
              "Meaning",
              "Consequence of Ignoring"
            ],
            "rows": [
              [
                "P0016",
                "Crank/cam correlation (Bank 1 Sensor A)",
                "Cam timing off - possible valve/piston contact on interference engine"
              ],
              [
                "P0017",
                "Crank/cam correlation (Bank 1 Sensor B)",
                "Same as above - cylinder head damage risk"
              ],
              [
                "P0018",
                "Crank/cam correlation (Bank 2 Sensor A)",
                "V6/V8 engines - risk on one bank"
              ],
              [
                "P0019",
                "Crank/cam correlation (Bank 2 Sensor B)",
                "Same as above"
              ]
            ]
          }
        ],
        "additionalText": "Fault Code Meaning Consequence of Ignoring P0016 Crank/cam correlation (Bank 1 Sensor A) Cam timing off - possible valve/piston contact on interference engine P0017 Crank/cam correlation (Bank 1 Sensor B) Same as above - cylinder head damage risk P0018 Crank/cam correlation (Bank 2 Sensor A) V6/V8 engines - risk on one bank P0019 Crank/cam correlation (Bank 2 Sensor B) Same as above Specialist rule: \"A cam/crank correlation code (P0016-P0019) means the ECU has detected that the camshaft and crankshaft are not synchronised correctly. On an interference engine, this is an emergency. If the timing is off enough, pistons will hit valves. Don't clear the code and hope - diagnose immediately.\" Preventative maintenance"
      },
      {
        "title": "Avoiding camshaft failure",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Very high",
                "Every 6,000-10,000 miles"
              ],
              [
                "Use manufacturer-approved oil grade",
                "£0 (choice)",
                "Very high",
                "Every oil change"
              ],
              [
                "Oil filter quality (OEM or premium)",
                "£5 - £15 extra",
                "High",
                "Every oil change"
              ],
              [
                "Regular oil level checks",
                "£0",
                "High",
                "Monthly or before long journeys"
              ],
              [
                "Address tapping noises immediately",
                "£100 - £250",
                "Very high",
                "When noise is heard"
              ],
              [
                "Timing chain/belt replacement (interference engines)",
                "£300 - £1,800",
                "Very high",
                "Per manufacturer (60k-100k miles)"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Regular oil changes (correct spec) £50 - £150 Very high Every 6,000-10,000 miles Use manufacturer-approved oil grade £0 (choice) Very high Every oil change Oil filter quality (OEM or premium) £5 - £15 extra High Every oil change Regular oil level checks £0 High Monthly or before long journeys Address tapping noises immediately £100 - £250 Very high When noise is heard Timing chain/belt replacement (interference engines) £300 - £1,800 Very high Per manufacturer (60k-100k miles) Correct oil specifications for common engines: BMW (N47, B47, N57, B57): BMW Longlife-04 (LL-04) - 5W-30 or 0W-30 VW/Audi (EA189, EA288, EA888): VW 507.00 (diesel) / VW 504.00 (petrol) - 5W-30 Mercedes (OM651, OM642, OM654): MB 229.51 or 229.52 - 5W-30 Ford (DV6, EcoBoost): Ford WSS-M2C913-D or WSS-M2C948-B - 5W-20/5W-30 Specialist rule of thumb (UK): \"The single biggest cause of camshaft failure is oil starvation from sludge. A BMW or VW on a 18,000-mile long-life service plan is a gamble. Change the oil every 8,000-10,000 miles with the correct spec. That £100 oil change is cheap insurance against a £1,500 camshaft repair.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does camshaft replacement cost in the UK",
        "answer": "Single cam (SOHC or one DOHC cam): £400-£900. Both cams (DOHC): £800-£1,800. Cam journal polishing: £65-£105. Complete cylinder head replacement: £1,000-£3,000+. Engine replacement: £2,500-£6,500+. Labour: 4-10 hours at £65-£95/hr indie. → Engine repair cost guide"
      },
      {
        "question": "What causes camshaft failure",
        "answer": "Most common: oil starvation (sludge or low oil pressure), worn cam followers (high mileage), broken timing chain/belt (interference engines), incorrect oil grade, or extended oil change intervals leading to sludge formation."
      },
      {
        "question": "What are the signs of camshaft failure",
        "answer": "Tapping/ticking noise from top of engine, rough idle, loss of power, engine management light with cam/crank correlation codes (P0016-P0019), constant misfire, metal debris in oil."
      },
      {
        "question": "Can I drive with a worn camshaft",
        "answer": "If you have a tapping noise but no misfire, you can drive to a garage for diagnostic. If you have a misfire or cam/crank correlation codes (P0016-P0019), stop driving - especially on interference engines. Ignoring cam timing faults risks valve/piston contact and complete engine destruction."
      },
      {
        "question": "Do I need to replace cam followers when replacing a camshaft",
        "answer": "Yes. Worn followers have a wear pattern that matches the old cam lobe. Fitting new cams with old followers will destroy the new cams within weeks. Always replace followers (and lifters) when replacing camshafts. This is non-negotiable."
      },
      {
        "question": "Is camshaft failure covered under warranty",
        "answer": "On reconditioned engines, the valvetrain is typically covered as part of the engine warranty (12-24 months). However, failure caused by oil starvation or sludge is often excluded. On used cars, camshaft failure may be considered wear and tear. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "Which engines have the most camshaft problems",
        "answer": "Based on Engines Market enquiry volumes, BMW N47D20C (1,450 requests), Mercedes OM651 (1,250), VW/Audi EA189 (1,050), and Land Rover 204DTD (1,150) are among the most frequently requested diesel engines. Camshaft wear is one of several valve train faults specialists may investigate. Regular oil changes with correct spec oil are critical. [EM-VERIFIED]"
      }
    ]
  },
  "coolant-contamination": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Contaminated oil destroys bearings within minutes - act immediately.",
          "Oil cooler beginning to leak. Oil is entering the cooling system through a failing cooler or seal. Most common on diesel engines.",
          "Book a diagnostic. Oil cooler replacement likely needed (£400-£1,000). If caught very early, a coolant flush may be sufficient to monitor.",
          "£100-£300 for coolant flush + monitor. If oil cooler confirmed: £400-£1,000. Labour: 3-6 hours.",
          "Oil cooler failure OR head gasket leak. Oil pressure is higher than coolant pressure, so oil pushes into the cooling system.",
          "Stop driving. Full diagnostic required. Oil cooler is most common on diesels - replace first if oil looks clean.",
          "£400-£1,000 for oil cooler. £550-£1,200 for head gasket. Labour: 3-6 hrs (oil cooler) or 8-15 hrs (head gasket).",
          "Head gasket failure. Coolant is entering the oil galleries - this is the most dangerous contamination type.",
          "Stop driving immediately. Call recovery. Do not start the engine - bearings will fail within minutes.",
          "£550-£1,200 for head gasket + flush. Labour: 8-15 hours. If bearings damaged: £2,500-£6,500+ for engine replacement.",
          "Cracked cylinder head - often from overheating. Crack between oil and coolant passages allows mixing.",
          "Stop driving. Full diagnostic required. Cylinder head replacement may be needed - evaluate vehicle value.",
          "£1,200-£3,500 for cylinder head replacement. Labour: 10-16 hours. If block also damaged: £2,500-£6,500+ for engine replacement.",
          "Bearings destroyed by contaminated oil. Coolant in oil has no lubricating properties - metal-on-metal contact destroys bearings.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the crankshaft and bearings are scrap.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Contaminated oil destroys bearings within minutes - act immediately. £100 Brown sludge in coolant tank, oil looks normal Oil cooler beginning to leak - most common on diesels £100 - £300 (coolant flush + monitor) £400 Thick brown sludge in coolant, oil on coolant surface Oil cooler failure OR head gasket leak £400 - £1,000 (oil cooler) or £550 - £1,200 (head gasket) £550 Milky emulsion on dipstick, overheating, white smoke Head gasket failure - coolant entering oil galleries £550 - £1,200 (head gasket + flush) - do not drive £1,200 Constant white smoke, coolant loss, milky oil Cracked cylinder head - common after overheating £1,200 - £3,500 (cylinder head replacement) £6,500+ Engine knock, low oil pressure, seizure Bearings destroyed by contaminated oil £2,500 - £6,500+ (engine replacement) Likely cause Oil cooler beginning to leak. Oil is entering the cooling system through a failing cooler or seal. Most common on diesel engines. What to do Book a diagnostic. Oil cooler replacement likely needed (£400-£1,000). If caught very early, a coolant flush may be sufficient to monitor. Repair cost £100-£300 for coolant flush + monitor. If oil cooler confirmed: £400-£1,000. Labour: 3-6 hours. Likely cause Oil cooler failure OR head gasket leak. Oil pressure is higher than coolant pressure, so oil pushes into the cooling system. What to do Stop driving. Full diagnostic required. Oil cooler is most common on diesels - replace first if oil looks clean. Repair cost £400-£1,000 for oil cooler. £550-£1,200 for head gasket. Labour: 3-6 hrs (oil cooler) or 8-15 hrs (head gasket). Likely cause Head gasket failure. Coolant is entering the oil galleries - this is the most dangerous contamination type. What to do Stop driving immediately. Call recovery. Do not start the engine - bearings will fail within minutes. Repair cost £550-£1,200 for head gasket + flush. Labour: 8-15 hours. If bearings damaged: £2,500-£6,500+ for engine replacement. Likely cause Cracked cylinder head - often from overheating. Crack between oil and coolant passages allows mixing. What to do Stop driving. Full diagnostic required. Cylinder head replacement may be needed - evaluate vehicle value. Repair cost £1,200-£3,500 for cylinder head replacement. Labour: 10-16 hours. If block also damaged: £2,500-£6,500+ for engine replacement. Likely cause Bearings destroyed by contaminated oil. Coolant in oil has no lubricating properties - metal-on-metal contact destroys bearings. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the crankshaft and bearings are scrap. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of coolant contamination"
      },
      {
        "title": "Stop driving if you see these",
        "paragraphs": [],
        "bullets": [
          "• Milky brown emulsion on dipstick - coolant in oil - bearings will fail within minutes",
          "• Brown sludge in coolant expansion tank - oil floating on coolant",
          "• Constant white smoke from exhaust - coolant burning in cylinders",
          "• Oil level rising - coolant leaking into sump",
          "• Brown sludge in coolant tank only - oil in coolant, oil on dipstick still clean",
          "• Overheating with no external leak - internal issue likely",
          "• Sweet smell from exhaust - coolant burning (minor leak)"
        ],
        "tables": [],
        "additionalText": "🔴 STOP DRIVING IMMEDIATELY • Milky brown emulsion on dipstick - coolant in oil - bearings will fail within minutes • Brown sludge in coolant expansion tank - oil floating on coolant • Constant white smoke from exhaust - coolant burning in cylinders • Oil level rising - coolant leaking into sump 🔶 BOOK DIAGNOSTIC (Drive only if oil on dipstick is clean) • Brown sludge in coolant tank only - oil in coolant, oil on dipstick still clean • Overheating with no external leak - internal issue likely • Sweet smell from exhaust - coolant burning (minor leak) Types of contamination"
      },
      {
        "title": "What each means",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Contamination Type",
              "What You See",
              "Most Likely Cause",
              "Typical Cost",
              "Urgency"
            ],
            "rows": [
              [
                "Oil in coolant only",
                "Brown sludge in coolant tank, oil on dipstick normal",
                "Oil cooler failure (diesel) or head gasket",
                "£400 - £1,000",
                "⚠️ Book repair"
              ],
              [
                "Coolant in oil only",
                "Milky oil on dipstick, coolant looks normal",
                "Head gasket failure or cracked head",
                "£550 - £1,200",
                "🚨 Stop driving"
              ],
              [
                "Both directions",
                "Milky oil AND sludge in coolant",
                "Advanced head gasket failure or cracked head",
                "£550 - £2,000+",
                "🚨 Stop driving"
              ]
            ]
          }
        ],
        "additionalText": "Contamination Type What You See Most Likely Cause Typical Cost Urgency Oil in coolant only Brown sludge in coolant tank, oil on dipstick normal Oil cooler failure (diesel) or head gasket £400 - £1,000 ⚠️ Book repair Coolant in oil only Milky oil on dipstick, coolant looks normal Head gasket failure or cracked head £550 - £1,200 🚨 Stop driving Both directions Milky oil AND sludge in coolant Advanced head gasket failure or cracked head £550 - £2,000+ 🚨 Stop driving Specialist rule (diesel engines): \"Oil in the coolant is usually the oil cooler. Coolant in the oil is usually the head gasket or cracked head. Always diagnose - don't assume.\" Common causes"
      },
      {
        "title": "Why coolant and oil mix",
        "paragraphs": [
          "Market context: Based on 24,650 quote requests in 2025, coolant contamination is most common on high-mileage diesels - BMW N47, VW EA189, Mercedes OM651, Land Rover 204DTD. The oil cooler is the primary suspect."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Most Common On",
              "Typical Cost"
            ],
            "rows": [
              [
                "Oil cooler failure",
                "Internal leak between oil and coolant passages",
                "BMW N47, Mercedes OM651, VW EA189, Ford DV6",
                "£400 - £1,000"
              ],
              [
                "Head gasket failure",
                "Gasket fails between oil and coolant galleries",
                "All engines, especially after overheating",
                "£550 - £1,200"
              ],
              [
                "Cracked cylinder head",
                "Crack between oil and coolant passages",
                "BMW N47, some VAG, older Ford",
                "£1,200 - £3,500"
              ],
              [
                "Cracked engine block",
                "Crack in block casting - rare but catastrophic",
                "Severe overheating, freeze damage",
                "£2,500 - £6,500+"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Oil cooler vs head gasket",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Test",
              "What It Tells You",
              "Cost"
            ],
            "rows": [
              [
                "1",
                "Visual inspection",
                "Oil in coolant- Milky oil on dipstick-",
                "£0 - £50"
              ],
              [
                "2",
                "Cooling system pressure test",
                "Confirms system holds pressure",
                "£50 - £100"
              ],
              [
                "3",
                "Chemical block test (sniffer)",
                "Detects combustion gases in coolant - confirms head gasket or cracked head",
                "£50 - £150"
              ],
              [
                "4",
                "Oil sample analysis",
                "Confirms coolant contamination in oil",
                "£30 - £50"
              ],
              [
                "5",
                "Oil cooler pressure test",
                "Isolates oil cooler as source",
                "£100 - £200"
              ]
            ]
          }
        ],
        "additionalText": "Step Test What It Tells You Cost 1 Visual inspection Oil in coolant- Milky oil on dipstick- £0 - £50 2 Cooling system pressure test Confirms system holds pressure £50 - £100 3 Chemical block test (sniffer) Detects combustion gases in coolant - confirms head gasket or cracked head £50 - £150 4 Oil sample analysis Confirms coolant contamination in oil £30 - £50 5 Oil cooler pressure test Isolates oil cooler as source £100 - £200 Specialist rule: \"On a diesel with oil in coolant but clean oil on the dipstick, 90% of the time it's the oil cooler. Replace it first - it's a £600 repair. Don't jump to head gasket.\" Red flag engines - known patterns"
      },
      {
        "title": "Engines with known contamination issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 80k-150k 1,450 [EM-VERIFIED] Oil cooler failure (common), cracked head. Oil cooler: £500-£900; Head gasket: £1,200-£2,500. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Oil cooler seal leaks. Oil cooler seals: £400-£800. Land Rover 204DTD (Ingenium) 60k-120k 1,150 [EM-VERIFIED] Oil cooler failure, EGR cooler leaks. Oil cooler: £600-£1,200. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Oil cooler failure - common on high-mileage. Oil cooler: £400-£800. Toyota 2AD-FTV (D4D) 60k-120k 260 [EM-VERIFIED] Head gasket weakness - known design flaw. Head gasket: £1,500-£3,000 - check warranty first. Market Intelligence (Toyota D4D): The Toyota 2AD-FTV (260 requests [EM-VERIFIED]) has a known head gasket weakness. Toyota issued a warranty extension on some vehicles. Check with a dealer before paying for repair. [KNOWN FAILURE PATTERNS] Diagnostic decisions"
      },
      {
        "title": "Oil cooler vs head gasket",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Symptom",
              "Most Likely Cause",
              "Next Step",
              "Cost"
            ],
            "rows": [
              [
                "Oil in coolant (sludge), but oil on dipstick clean",
                "Oil cooler failure (90% on diesels)",
                "Replace oil cooler",
                "£400 - £1,000"
              ],
              [
                "Coolant in oil (milky dipstick), coolant looks normal",
                "Head gasket or cracked head",
                "Stop driving. Block test + compression test",
                "£550 - £1,200"
              ],
              [
                "Both directions",
                "Severe head gasket or cracked head",
                "Stop driving. Full diagnostic",
                "£550 - £5,000+"
              ]
            ]
          }
        ],
        "additionalText": "Symptom Most Likely Cause Next Step Cost Oil in coolant (sludge), but oil on dipstick clean Oil cooler failure (90% on diesels) Replace oil cooler £400 - £1,000 Coolant in oil (milky dipstick), coolant looks normal Head gasket or cracked head Stop driving. Block test + compression test £550 - £1,200 Both directions Severe head gasket or cracked head Stop driving. Full diagnostic £550 - £5,000+ Specialist rule: \"On a diesel with oil in coolant but clean oil, replace the oil cooler first. It's a £600 repair. Don't jump to head gasket - that's £1,200+. If the oil cooler doesn't fix it, then diagnose further.\" Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: oil cooler 3-6 hrs, head gasket 8-15 hrs at £65-£95/hr indie."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Damage",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Oil in coolant (oil cooler failed)",
                "Oil cooler replacement + flushes",
                "£400 - £1,000",
                "Always - cheapest fix on diesels"
              ],
              [
                "Head gasket (no warping)",
                "Head gasket + skim + flushes",
                "£550 - £1,200",
                "Viable on vehicles worth £2,500+"
              ],
              [
                "Head gasket with warped head",
                "Cylinder head replacement",
                "£1,200 - £3,500",
                "Evaluate vehicle value"
              ],
              [
                "Cracked cylinder head",
                "Cylinder head replacement",
                "£1,200 - £3,500",
                "Only on vehicles worth £3,000+"
              ],
              [
                "Coolant in oil driven any distance",
                "Engine replacement (bearings damaged)",
                "£2,500 - £6,500+",
                "Milky oil destroys bearings immediately"
              ]
            ]
          }
        ],
        "additionalText": "Damage Repair Option Typical Cost When to Choose Oil in coolant (oil cooler failed) Oil cooler replacement + flushes £400 - £1,000 Always - cheapest fix on diesels Head gasket (no warping) Head gasket + skim + flushes £550 - £1,200 Viable on vehicles worth £2,500+ Head gasket with warped head Cylinder head replacement £1,200 - £3,500 Evaluate vehicle value Cracked cylinder head Cylinder head replacement £1,200 - £3,500 Only on vehicles worth £3,000+ Coolant in oil driven any distance Engine replacement (bearings damaged) £2,500 - £6,500+ Milky oil destroys bearings immediately Cost ranges [INDUSTRY ESTIMATE]. Labour: oil cooler 3-6 hrs, head gasket 8-15 hrs at £65-£95/hr indie. Vehicle Value Threshold: Under £2,000 - Oil cooler repair viable. Head gasket- Consider scrap. £2,000-£4,000 - Oil cooler or head gasket viable. Cracked head- Evaluate carefully. £4,000-£8,000 - Head gasket or head replacement justified. £8,000+ - Any repair - even full engine replacement. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored oil in coolant (sludge) - oil cooler continues leaking £400 - £1,000 Stage 2 Ignored milky oil for a few miles - bearings starved £2,000 - £5,000 Stage 3 Driven with milky oil until knock - bearings destroyed £2,500 - £6,500+ Stage 4 Driven until seizure - engine locks up £2,500 - £6,500+ The maths: Stop immediately + diagnostic: £50-£150. Head gasket repair (caught early): £550-£1,200. Drive 10 miles with milky oil: £2,000-£5,000. Drive until knock: £2,500-£6,500+. Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored oil in coolant (sludge) - oil cooler continues leaking £400 - £1,000 Stage 2 Ignored milky oil for a few miles - bearings starved £2,000 - £5,000 Stage 3 Driven with milky oil until knock - bearings destroyed £2,500 - £6,500+ Stage 4 Driven until seizure - engine locks up £2,500 - £6,500+ The maths: Stop immediately + diagnostic: £50-£150. Head gasket repair (caught early): £550-£1,200. Drive 10 miles with milky oil: £2,000-£5,000. Drive until knock: £2,500-£6,500+. Preventative maintenance"
      },
      {
        "title": "Avoiding contamination",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Method",
              "Cost",
              "Frequency"
            ],
            "rows": [
              [
                "Check coolant expansion tank monthly",
                "£0",
                "Monthly"
              ],
              [
                "Check oil dipstick monthly",
                "£0",
                "Monthly"
              ],
              [
                "Coolant change",
                "£50 - £150",
                "Every 3-5 years"
              ],
              [
                "Avoid overheating",
                "£0",
                "Immediate stop if gauge rises"
              ],
              [
                "Oil cooler replacement (preventative) on high-mileage diesels",
                "£400 - £800",
                "Every 80k-100k miles"
              ]
            ]
          }
        ],
        "additionalText": "Method Cost Frequency Check coolant expansion tank monthly £0 Monthly Check oil dipstick monthly £0 Monthly Coolant change £50 - £150 Every 3-5 years Avoid overheating £0 Immediate stop if gauge rises Oil cooler replacement (preventative) on high-mileage diesels £400 - £800 Every 80k-100k miles Specialist rule: \"Check your dipstick and coolant tank once a month. Brown sludge in coolant means book a repair. Milky oil on dipstick means call recovery. That habit separates a £600 repair from a £3,000 engine replacement.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does coolant contamination repair cost in the UK",
        "answer": "Coolant flush: £100-£300. Oil cooler: £400-£1,000. Head gasket: £550-£1,200. Cylinder head: £1,200-£3,500. Engine replacement: £2,500-£6,500+. Diagnostic: £50-£150. → Engine repair cost guide"
      },
      {
        "question": "What causes oil in coolant but not coolant in oil",
        "answer": "Oil cooler failure (diesel engines) - oil pressure is higher than coolant pressure, so oil pushes into cooling system. Head gasket can also cause this, but oil cooler is more common on diesels."
      },
      {
        "question": "What causes milky oil on dipstick",
        "answer": "Head gasket failure (most common), cracked cylinder head, or cracked block. Stop driving immediately - coolant destroys bearing lubrication."
      },
      {
        "question": "Can I drive with oil in coolant",
        "answer": "If oil on dipstick is clean and engine isn't overheating, drive carefully to a garage. If you see milky oil on dipstick, do not drive at all."
      },
      {
        "question": "Is it worth repairing coolant contamination on an old car",
        "answer": "If car worth £2,000-£4,000 and repair is oil cooler (£400-£800) or head gasket (£550-£1,200), yes. If head is cracked (£1,200-£3,500) on a car under £2,000, evaluate scrap. → Repair vs replacement"
      },
      {
        "question": "Which engines have the most coolant contamination problems",
        "answer": "Based on 2025 data: BMW N47 (1,450 - oil cooler), VW EA189 (1,050 - oil cooler), Mercedes OM651 (1,250 - oil cooler seals), Toyota 2AD-FTV (260 - head gasket). [EM-VERIFIED]"
      }
    ]
  },
  "crankshaft-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Catching the failure early is critical. Click any stage to see full detail.",
          "Worn main or rod bearings. Oil starvation or degradation has caused bearing material to wear away.",
          "Stop driving immediately. Arrange recovery to a specialist. If caught early, bearing replacement may be possible.",
          "£800-£1,500 for bearing replacement. Labour: 15-20 hours (engine out, sump off).",
          "Bearing wear has progressed to crank journal damage. The crankshaft surface is scored or worn beyond tolerance.",
          "Stop driving. Specialist inspection required - crank may need regrinding or replacement.",
          "£1,200-£2,000 for crank regrind + oversized bearings. If beyond regrind limits: engine replacement.",
          "Connecting rod exited the block (\"windowed block\"). Crankshaft may have snapped or bearing failed catastrophically.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£2,700-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching the failure early is critical. Click any stage to see full detail. £800 Deep knocking noise, increases with RPM Worn main or rod bearings £800 - £1,500 £1,200 Deep knock + low oil pressure warning Bearing wear progressed, crank journal damage £1,200 - £2,000 £10,000+ Loud bang, engine stops, oil on road Connecting rod exited block (\"windowed block\") £2,700 - £10,000+ Likely cause Worn main or rod bearings. Oil starvation or degradation has caused bearing material to wear away. What to do Stop driving immediately. Arrange recovery to a specialist. If caught early, bearing replacement may be possible. Repair cost £800-£1,500 for bearing replacement. Labour: 15-20 hours (engine out, sump off). Likely cause Bearing wear has progressed to crank journal damage. The crankshaft surface is scored or worn beyond tolerance. What to do Stop driving. Specialist inspection required - crank may need regrinding or replacement. Repair cost £1,200-£2,000 for crank regrind + oversized bearings. If beyond regrind limits: engine replacement. Likely cause Connecting rod exited the block (\"windowed block\"). Crankshaft may have snapped or bearing failed catastrophically. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £2,700-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do after a crankshaft failure-",
        "paragraphs": [
          "The financial viability depends heavily on your vehicle's current market value and the extent of the damage.",
          "Not every engine failure requires a full replacement. Where damage is isolated (e.g., bearing wear caught early), targeted repair may be more economical. Our price comparison service focuses on replacement options, but we also provide repair cost guidance."
        ],
        "bullets": [
          "Deep knock just started, oil pressure still normal",
          "Crank journals undamaged (inspect with crank removed)",
          "Vehicle value high enough to justify £1,500-£2,500 spend",
          "Labour: 15-20 hours (engine out, sump off)",
          "Crank journals scored but not cracked",
          "Oversized bearings available for your engine",
          "Total cost £2,000-£3,500 - only economical on higher-value vehicles",
          "Crankshaft snapped or cracked - cannot be repaired",
          "Connecting rod exited block (\"windowed block\")",
          "Crank journal damage beyond regrind limits",
          "Labour to strip, inspect, machine, rebuild exceeds cost of reconditioned engine",
          "Vehicle value under £5,000-£8,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "The financial viability depends heavily on your vehicle's current market value and the extent of the damage. ✓ Choose bearing replacement if: Deep knock just started, oil pressure still normal Crank journals undamaged (inspect with crank removed) Vehicle value high enough to justify £1,500-£2,500 spend Labour: 15-20 hours (engine out, sump off) 🔧 Choose crank regrind / machining if: Crank journals scored but not cracked Oversized bearings available for your engine Total cost £2,000-£3,500 - only economical on higher-value vehicles ⚠ Choose engine replacement if: Crankshaft snapped or cracked - cannot be repaired Connecting rod exited block (\"windowed block\") Crank journal damage beyond regrind limits Labour to strip, inspect, machine, rebuild exceeds cost of reconditioned engine Vehicle value under £5,000-£8,000 - replacement rarely economical \" If you hear a deep knock and it's a Land Rover TDV6/SDV6 or BMW N57, stop driving immediately and get a diagnostic. If the crank has snapped, the engine is scrap. If it's just bearings, you have a narrow window to act. - Specialist rule of thumb (UK) Not every engine failure requires a full replacement. Where damage is isolated (e.g., bearing wear caught early), targeted repair may be more economical. Our price comparison service focuses on replacement options, but we also provide repair cost guidance. Red flag engines - known crankshaft failure patterns"
      },
      {
        "title": "Engines with known crankshaft issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. Land Rover 306DT (SDV6/TDV6 3.0) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure (tin-aluminium coating fatigue). Cold-start knock is early warning. Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - weak point at tensioner mount. Oil pump failure often kills engine. BMW N57D30 80k-150k 830 [EM-VERIFIED] Timing chain stretch (rear-mounted), crankshaft bearing issues in higher-mileage units. Land Rover 368DT (3.6 TDV8) 70k-130k 650 [EM-VERIFIED] Timing chain tensioner failure (early L322). Not the reliable 4.4 TDV8. Ford Duratorq 2.2 TDCi 80k-150k 300 [EM-VERIFIED] Crank failure less common but catastrophic when it occurs. Full engine: £2,500-£6,000. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Injector failure, DPF clogging, turbo failure - secondary crank damage possible. Affected models - crankshaft failure risk"
      },
      {
        "title": "Which models are most at risk-",
        "paragraphs": [
          "Based on per-model request volumes [EM-VERIFIED] and failure pattern data.",
          "Risk levels based on KNOWN FAILURE PATTERNS and workshop consensus [Tier 2]. Vehicle values from EM Model Ownership Decision Tables [ESTIMATED]."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Model (Chassis)",
              "Primary Engine",
              "EM Requests",
              "Risk Level",
              "Typical UK Value",
              "Recommended Action"
            ],
            "rows": [
              [
                "Range Rover Sport L494 (2013-2022)",
                "306DT SDV6 3.0",
                "308",
                "🔴 High",
                "£12k-£55k",
                "Replace engine if crank fails; bearing replacement if caught early"
              ],
              [
                "Range Rover L405 (2012-2021)",
                "306DT / 508PS",
                "284",
                "🔴 High",
                "£14k-£55k",
                "Engine replacement viable given high host value"
              ],
              [
                "Land Rover Discovery 4 L319 (2009-2016)",
                "306DT / 276DT",
                "120",
                "🔴 High",
                "£6k-£18k",
                "⚠️ Watch: sub-£10k examples borderline"
              ],
              [
                "Range Rover Sport L320 (2005-2013)",
                "276DT / 368DT",
                "228",
                "🔴 High",
                "£4k-£14k",
                "⚠️ Watch: sub-£7k examples borderline"
              ],
              [
                "BMW X5 F15 (2013-2018)",
                "N57D30",
                "288",
                "🟡 Medium",
                "£10k-£28k",
                "Bearing inspection at 80k; watch for chain stretch"
              ],
              [
                "BMW 5 Series F10 (2010-2017)",
                "N57D30",
                "300",
                "🟡 Medium",
                "£5k-£16k",
                "⚠️ Watch: sub-£8k hosts borderline"
              ],
              [
                "Ford Focus Mk3 (2011-2018)",
                "DV6 1.6 TDCi",
                "326",
                "🟢 Low",
                "£3.5k-£10k",
                "🔴 Scrap threshold on sub-£4k examples"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [
          "A deep knock isn't a minor issue - it's the sound of your engine destroying itself from the inside."
        ],
        "bullets": [
          "• Deep knocking noise that increases with engine RPM - not a light tick, a heavy \"thud thud thud\"",
          "• Knock is loudest under load - acceleration makes it worse",
          "• Oil pressure gauge reads low - or oil warning light flickers",
          "• Engine feels rough or vibrates excessively",
          "• Knock becomes constant, even at idle",
          "• Metal flakes or glitter in engine oil - bronze/copper particles (bearing material)",
          "• Sudden loss of oil pressure - gauge drops to zero",
          "• Loud bang, engine stops, oil on road - connecting rod has exited the block"
        ],
        "tables": [],
        "additionalText": "A deep knock isn't a minor issue - it's the sound of your engine destroying itself from the inside. 🔵 EARLY WARNING (Act now) • Deep knocking noise that increases with engine RPM - not a light tick, a heavy \"thud thud thud\" • Knock is loudest under load - acceleration makes it worse • Oil pressure gauge reads low - or oil warning light flickers • Engine feels rough or vibrates excessively 🔴 PROGRESSED DAMAGE (Stop driving immediately) • Knock becomes constant, even at idle • Metal flakes or glitter in engine oil - bronze/copper particles (bearing material) • Sudden loss of oil pressure - gauge drops to zero • Loud bang, engine stops, oil on road - connecting rod has exited the block 🚨 STOP DRIVING if: You hear a deep knock that gets louder with RPM. Continuing to drive will turn a £1,500 bearing replacement into a £7,000+ engine replacement - or write off the car entirely. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Every day you delay increases the cost of repair exponentially."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Every day you delay increases the cost of repair exponentially. Stage Damage Cost to Fix Stage 1 Bearing wear - soft bearing material worn £800 - £1,500 Stage 2 Journal damage - crank surface scored £1,200 - £2,000 Stage 3 Crank crack - crankshaft cracked Engine replacement only Stage 4 Windowed block - con rod exits block Car may be scrap Real-world example from specialist forums (anonymised): 2014 Range Rover Sport SDV6, 92,000 miles. Owner ignored cold-start knock for 3 weeks. One morning, the engine made a loud bang and stopped. Connecting rod had exited the block. Total cost: £8,500 for a reconditioned engine fitted. The car was worth £14,000 - replacement was viable, but the owner regretted not investigating the knock earlier. Vehicle value threshold rule"
      },
      {
        "title": "Is repair economically viable-",
        "paragraphs": [
          "Crankshaft repair is rarely economical on lower-value vehicles. Use this framework.",
          "If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap value before committing. - EM Model Ownership Decision Tables."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Crankshaft repair is rarely economical on lower-value vehicles. Use this framework. Vehicle Value Recommended Action Reasoning Under £5,000 Scrap or replace with used engine Crank repair (£2k-£4k) + labour often exceeds vehicle value £5,000 - £8,000 Evaluate both options Crank regrind may be borderline; used engine often cheaper £8,000 - £15,000 Reconditioned engine recommended Warranty justifies cost; repair may still be viable if caught early £15,000+ Reconditioned engine (or rebuild) Replacement cost small relative to vehicle value; repair viable on high-value examples If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap value before committing. - EM Model Ownership Decision Tables. Check your vehicle's value and compare replacement quotes → Get quotes Preventative maintenance"
      },
      {
        "title": "Avoiding crankshaft failure",
        "paragraphs": [
          "Bearing failure is almost always caused by oil starvation or oil degradation. Follow these specialist recommendations."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Bearing failure is almost always caused by oil starvation or oil degradation. Follow these specialist recommendations. 01 Regular oil changes with correct spec oil Use manufacturer-spec oil (Land Rover: 5W30 C1/C2, BMW: LL04, Ford: WSS-M2C913-D). 02 Never ignore low oil pressure warnings Even a momentary flicker is a red flag - stop and investigate immediately. 03 Listen for knocks at every cold start A deep knock that disappears after 1-2 seconds is still a warning sign. 04 Consider oil analysis on high-risk engines Detects bearing material before failure becomes catastrophic. Especially Land Rover TDV6/SDV6. 05 Shorter oil intervals on high-performance vehicles 6k-8k miles instead of 12k-15k - especially if towing or track use. Preventative oil change £80-£150 Correct spec oil + filter VS Catastrophic failure - engine replacement £5,500-£9,500 Land Rover TDV6/SDV6 replacement cost The maths is simple. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980], reflecting the high failure rate of crankshaft bearings. Specialists report crank failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980], reflecting the high failure rate of crankshaft bearings. Specialists report crank failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Land Rover 306DT (SDV6/TDV6) Crankshaft bearing failure - 980 requests in 2025 [EM-VERIFIED] 980 requests [EM-VERIFIED] BMW N57D30 Timing chain stretch + crankshaft bearing issues - 830 requests [EM-VERIFIED] 830 requests [EM-VERIFIED] Ford DV6 1.6 TDCi Secondary crank damage possible - 780 requests [EM-VERIFIED] 780 requests [EM-VERIFIED] Land Rover 276DT (2.7 TDV6) Oil pump housing failure - 700 requests [EM-VERIFIED] 700 requests [EM-VERIFIED] Known failure insight \"The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980], reflecting the high failure rate of crankshaft bearings. Specialists report crank failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Crankshaft failures are over-represented in the catastrophic failure category - a deep knock is often ignored until it's too late. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does crankshaft repair cost in the UK",
        "answer": "Bearing replacement (caught early): £800-£1,500. Crankshaft regrind / machining: £1,200-£2,000. Engine replacement (catastrophic failure): £2,700-£10,000+ depending on engine and condition. Labour: 15-25+ hours at £65-£95/hr (independent). → Engine replacement cost guide"
      },
      {
        "question": "Can a snapped crankshaft be repaired",
        "answer": "No. A snapped or cracked crankshaft cannot be repaired. The only solution is a replacement engine (reconditioned, used, or rebuilt). On lower-value vehicles, this often means scrapping the car."
      },
      {
        "question": "What causes crankshaft failure",
        "answer": "Most common causes: oil starvation (low oil level, oil pump failure), oil degradation (missed service intervals), bearing material fatigue (common on Land Rover TDV6/SDV6 from 80k-140k miles), or manufacturing defect (rare)."
      },
      {
        "question": "Which engines have the most crankshaft problems",
        "answer": "Based on 2025 quote data and KNOWN FAILURE PATTERNS: Land Rover 306DT SDV6/TDV6 (980 requests), Land Rover 276DT (700 requests), BMW N57D30 (830 requests). [EM-VERIFIED]"
      },
      {
        "question": "Is crankshaft failure covered under warranty",
        "answer": "On reconditioned engines, warranty typically covers internal component failure including crankshaft and bearings (12-24 months). Pre-existing damage or failure caused by oil starvation/oil neglect is not covered. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "My car is worth £4,000 and has a crankshaft knock - what should I do",
        "answer": "If repair cost exceeds £2,500-£3,000, evaluate scrap value first. A reconditioned engine may cost £3,000-£5,000 fitted - often more than the car's value. Consider a used engine (£1,500-£2,500 fitted) if the car is otherwise sound, or scrap the vehicle and replace it."
      }
    ]
  },
  "cylinder-bore-damage": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Cylinder bore damage is expensive - act early.",
          "Light vertical scratches - rings not fully sealing. Early bore wear or minor scoring.",
          "Book a borescope inspection. If caught very early, honing + new rings may be possible.",
          "£500-£1,000 for honing + rings if caught very early. Labour: 15-20 hours.",
          "Deep scoring - compression loss, oil bypassing rings. Bore is damaged beyond honing.",
          "Full diagnostic required. Rebore + oversize piston for one cylinder may be viable if rest of engine is good.",
          "£1,500-£3,000 for rebore + oversize piston for one cylinder. Labour: 20-30 hours.",
          "Severe scoring or piston seizure - bore irreparable without a cylinder liner.",
          "Stop driving. Cylinder liner installation may be possible for one cylinder. Compare to replacement engine cost.",
          "£2,000-£4,000 for cylinder liner installation for one cylinder. Labour: 20-25 hours.",
          "Multiple damaged bores - engine worn out. All cylinders need attention.",
          "Full rebore + all pistons required. On common engines, replacement is cheaper - evaluate carefully.",
          "£7,000-£10,000+ for full rebore + all pistons + labour. Labour: 25-35 hours.",
          "Piston welded to bore or bore cracked. Block is scrap.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block cannot be repaired.",
          "£2,500-£10,000+ for replacement engine. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Cylinder bore damage is expensive - act early. £500 Slight blue smoke, minor oil consumption Light vertical scratches - rings not fully sealing £500 - £1,000 (honing + rings if caught early) £1,500 Constant blue smoke, 1L/500-1000 miles, misfire Deep scoring - compression loss, oil bypassing rings £1,500 - £3,000 (rebore + oversize piston for one cylinder) £2,000 Engine knock, metal in oil, massive oil consumption Severe scoring or piston seizure - bore irreparable without liner £2,000 - £4,000 (cylinder liner installation for one cylinder) £7,000 Engine runs poorly on all cylinders, constant misfire, won't idle Multiple damaged bores - engine worn out £7,000 - £10,000+ (full rebore + all pistons + labour) £10,000+ Engine seized - won't turn over Piston welded to bore or bore cracked £2,500 - £10,000+ (replacement engine) or scrap Likely cause Light vertical scratches - rings not fully sealing. Early bore wear or minor scoring. What to do Book a borescope inspection. If caught very early, honing + new rings may be possible. Repair cost £500-£1,000 for honing + rings if caught very early. Labour: 15-20 hours. Likely cause Deep scoring - compression loss, oil bypassing rings. Bore is damaged beyond honing. What to do Full diagnostic required. Rebore + oversize piston for one cylinder may be viable if rest of engine is good. Repair cost £1,500-£3,000 for rebore + oversize piston for one cylinder. Labour: 20-30 hours. Likely cause Severe scoring or piston seizure - bore irreparable without a cylinder liner. What to do Stop driving. Cylinder liner installation may be possible for one cylinder. Compare to replacement engine cost. Repair cost £2,000-£4,000 for cylinder liner installation for one cylinder. Labour: 20-25 hours. Likely cause Multiple damaged bores - engine worn out. All cylinders need attention. What to do Full rebore + all pistons required. On common engines, replacement is cheaper - evaluate carefully. Repair cost £7,000-£10,000+ for full rebore + all pistons + labour. Labour: 25-35 hours. Likely cause Piston welded to bore or bore cracked. Block is scrap. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block cannot be repaired. Repair cost £2,500-£10,000+ for replacement engine. On lower-value vehicles, this often means scrapping the car. Signs of cylinder bore damage"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Blue smoke on acceleration - oil burning from worn rings AND damaged bore",
          "• Excessive oil consumption - 1 litre every 500-1,000 miles",
          "• Loss of power - especially noticeable under load or uphill",
          "• Misfire on one cylinder - fault code P030X",
          "• Low compression on one cylinder - confirmed by compression test",
          "• Engine knock - deep, rhythmic knocking (piston slap in damaged bore)",
          "• Metal shavings in oil - visible glitter - cylinder wall material in oil",
          "• Constant blue smoke - severe oil burning",
          "• Failed MOT on emissions - high hydrocarbons or excessive smoke",
          "• Engine seizure - piston seized in bore - engine won't turn over"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book compression test immediately) • Blue smoke on acceleration - oil burning from worn rings AND damaged bore • Excessive oil consumption - 1 litre every 500-1,000 miles • Loss of power - especially noticeable under load or uphill • Misfire on one cylinder - fault code P030X • Low compression on one cylinder - confirmed by compression test 🔴 PROGRESSED DAMAGE (Stop driving - call recovery) • Engine knock - deep, rhythmic knocking (piston slap in damaged bore) • Metal shavings in oil - visible glitter - cylinder wall material in oil • Constant blue smoke - severe oil burning • Failed MOT on emissions - high hydrocarbons or excessive smoke • Engine seizure - piston seized in bore - engine won't turn over 🚨 Critical distinction: Low compression that improves when oil is added to the cylinder indicates worn piston rings. Low compression that does NOT improve with oil indicates cylinder bore damage or valve problems. A leak-down test (air escaping past rings into crankcase) confirms bore damage. Don't assume rings are the only problem. Common causes of cylinder bore damage"
      },
      {
        "title": "Why bores fail",
        "paragraphs": [
          "Market context: Based on 24,650 quote requests in 2025, cylinder bore damage is most common on high-mileage diesel engines (BMW N47, VW EA189) and tuned petrol engines (Ford EcoBoost). [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Most Common On",
              "Prevention"
            ],
            "rows": [
              [
                "Piston ring failure (ringland contact)",
                "Cracked ringland allows ring to score bore wall",
                "Ford EcoBoost, Subaru EJ, BMW N54/N55",
                "Forged pistons, proper tuning, avoid detonation"
              ],
              [
                "Broken piston ring",
                "Ring snaps - sharp ends gouge bore",
                "High-mileage engines, overheating",
                "Regular maintenance, avoid overheating"
              ],
              [
                "Piston seizure (overheating)",
                "Piston expands, seizes in bore - material transfer scars bore",
                "Any engine after severe overheating",
                "Cooling system maintenance, stop driving if gauge rises"
              ],
              [
                "Foreign object ingestion",
                "Debris enters cylinder - hammered into bore",
                "Air intake failure, timing failure",
                "Maintain intake system, replace timing components"
              ],
              [
                "Detonation / pre-ignition",
                "Explosion before spark - pounds piston rings into bore wall",
                "Tuned engines, poor fuel quality",
                "Premium fuel, reputable tuner, avoid aggressive timing"
              ],
              [
                "Oil starvation",
                "No lubrication - metal-on-metal contact scores bore",
                "Oil pump failure, low oil level",
                "Regular oil changes, maintain oil level"
              ],
              [
                "High mileage wear (oval bores)",
                "Normal wear over 150k+ miles - bore becomes oval",
                "All high-mileage engines",
                "Acceptable wear - may still run fine but consume oil"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Confirming bore damage",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Test",
              "What It Tells You",
              "Typical Cost"
            ],
            "rows": [
              [
                "1",
                "Compression test",
                "Which cylinders have low compression",
                "£80 - £150"
              ],
              [
                "2",
                "Wet compression test (add oil to cylinder)",
                "If compression improves → rings. If no improvement → bore or valves",
                "Included in compression test"
              ],
              [
                "3",
                "Leak-down test",
                "Air escaping past rings (crankcase) confirms bore or ring damage",
                "£150 - £250"
              ],
              [
                "4",
                "Borescope inspection",
                "Visual inspection of bore wall - see scoring, scratches, or piston damage",
                "£50 - £150"
              ]
            ]
          }
        ],
        "additionalText": "Step Test What It Tells You Typical Cost 1 Compression test Which cylinders have low compression £80 - £150 2 Wet compression test (add oil to cylinder) If compression improves → rings. If no improvement → bore or valves Included in compression test 3 Leak-down test Air escaping past rings (crankcase) confirms bore or ring damage £150 - £250 4 Borescope inspection Visual inspection of bore wall - see scoring, scratches, or piston damage £50 - £150 Specialist rule of thumb: \"A borescope tells the whole story. If you see vertical scratches in the bore, it's damaged. If you can see the scratches clearly, it's beyond honing. A good specialist will borescope every cylinder before quoting a rebuild - or they're guessing.\" Red flag engines - known bore damage patterns"
      },
      {
        "title": "Engines with known bore issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. Ford EcoBoost 1.6/2.0 60k-100k 175 [EM-VERIFIED] Ringland failure scores bore wall - common on tuned engines. Replacement engine: £2,500-£5,000; Rebuild: £5,000-£8,000. Ford EcoBoost 1.0 (early) 60k-100k 185 [EM-VERIFIED] Wet belt debris clogs oil pickup - oil starvation scores bore. Engine replacement: £2,500-£5,000. BMW N47D20C 80k-150k 1,450 [EM-VERIFIED] Timing chain debris in oil can score bores. Replacement engine: £3,200-£5,500. VW/Audi EA189 2.0 TDI 150k+ 1,050 [EM-VERIFIED] High mileage bore wear - oval bores common at 150k+ miles. Many run fine with wear. Subaru EJ20/EJ25 60k-100k - Ringland failure scores bore - very common. Replacement engine: £2,500-£5,000; Rebuild: £4,000-£7,000. Market Intelligence (Ford EcoBoost): The Ford 1.5/1.6 EcoBoost (175 requests [EM-VERIFIED]) has a well-documented weakness: ringland failure on tuned or overheated engines. When the ringland cracks, the piston rings can move and score the bore wall. Once the bore is scored, the engine needs either a rebore (oversize pistons) or replacement. On a tuned EcoBoost, forged pistons are the only reliable solution. Repair options"
      },
      {
        "title": "Rebore vs liner vs replacement",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Option",
              "Process",
              "Typical Cost",
              "Best For",
              "Labour Hours"
            ],
            "rows": [
              [
                "Honing (light damage)",
                "Abrasive stones smooth minor scratches",
                "£500 - £1,000 (engine out + reassembly)",
                "Minor glazing or very light scratches",
                "15-20 hrs"
              ],
              [
                "Rebore (oversize pistons)",
                "Bore enlarged, new oversize pistons fitted",
                "£1,500-£3,000 (machine) + £300-£800 (pistons) + labour",
                "One or more damaged bores, engine otherwise good",
                "20-30 hrs"
              ],
              [
                "Cylinder liner (sleeve)",
                "Steel sleeve pressed into damaged bore",
                "£2,000 - £4,000 (per cylinder)",
                "One or two damaged bores, rare/valuable engine",
                "20-25 hrs"
              ],
              [
                "Full engine rebuild (all bores)",
                "Strip, rebore all cylinders, new pistons, rings, bearings",
                "£7,000 - £10,000+",
                "High-value classic, performance build",
                "25-35 hrs"
              ],
              [
                "Replacement engine (used)",
                "Remove old engine, fit lower-mileage used unit",
                "£2,500 - £10,000+",
                "Most common engines - cheapest option",
                "10-16 hrs"
              ],
              [
                "Reconditioned engine",
                "Professionally rebuilt engine with warranty",
                "£3,200 - £12,000+",
                "Peace of mind, warranty coverage",
                "10-16 hrs"
              ]
            ]
          }
        ],
        "additionalText": "Option Process Typical Cost Best For Labour Hours Honing (light damage) Abrasive stones smooth minor scratches £500 - £1,000 (engine out + reassembly) Minor glazing or very light scratches 15-20 hrs Rebore (oversize pistons) Bore enlarged, new oversize pistons fitted £1,500-£3,000 (machine) + £300-£800 (pistons) + labour One or more damaged bores, engine otherwise good 20-30 hrs Cylinder liner (sleeve) Steel sleeve pressed into damaged bore £2,000 - £4,000 (per cylinder) One or two damaged bores, rare/valuable engine 20-25 hrs Full engine rebuild (all bores) Strip, rebore all cylinders, new pistons, rings, bearings £7,000 - £10,000+ High-value classic, performance build 25-35 hrs Replacement engine (used) Remove old engine, fit lower-mileage used unit £2,500 - £10,000+ Most common engines - cheapest option 10-16 hrs Reconditioned engine Professionally rebuilt engine with warranty £3,200 - £12,000+ Peace of mind, warranty coverage 10-16 hrs Specialist rule of thumb (UK): \"On a common engine like a Ford EcoBoost, VW EA189, or BMW N47, a used or reconditioned engine is almost always cheaper than a rebore. The machine work alone is £1,500-£3,000 before you've bought pistons or paid for reassembly. A used engine is £2,500-£4,500 fitted. The maths is simple.\" Repair vs replace - decision framework"
      },
      {
        "title": "The brutal maths",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: rebore (engine out, strip, machine, rebuild) 20-30+ hours at £65-£95/hr indie."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Vehicle Value",
              "Engine Type",
              "Recommended Action"
            ],
            "rows": [
              [
                "Under £2,000",
                "Any",
                "Scrap - repair cost exceeds vehicle value"
              ],
              [
                "£2,000 - £4,000",
                "Common (EcoBoost, EA189, DV6)",
                "Used replacement engine (£2,500-£4,500 fitted) - cheaper than rebore"
              ],
              [
                "£2,000 - £4,000",
                "Rare/classic",
                "Evaluate carefully - sentimental value may justify spend"
              ],
              [
                "£4,000 - £8,000",
                "Common - one damaged bore",
                "Used engine or reconditioned - compare both"
              ],
              [
                "£4,000 - £8,000",
                "Common - all cylinders worn",
                "Reconditioned engine (£3,500-£7,000) - warranty justified"
              ],
              [
                "£8,000 - £15,000",
                "Performance/premium",
                "Rebore or replacement - both viable, compare costs"
              ],
              [
                "£15,000+",
                "Any",
                "Full rebuild or reconditioned engine - vehicle value justifies"
              ],
              [
                "High-value classic",
                "Any",
                "Full rebuild with rebore - preservation justifies £7k-£10k+"
              ]
            ]
          }
        ],
        "additionalText": "Vehicle Value Engine Type Recommended Action Under £2,000 Any Scrap - repair cost exceeds vehicle value £2,000 - £4,000 Common (EcoBoost, EA189, DV6) Used replacement engine (£2,500-£4,500 fitted) - cheaper than rebore £2,000 - £4,000 Rare/classic Evaluate carefully - sentimental value may justify spend £4,000 - £8,000 Common - one damaged bore Used engine or reconditioned - compare both £4,000 - £8,000 Common - all cylinders worn Reconditioned engine (£3,500-£7,000) - warranty justified £8,000 - £15,000 Performance/premium Rebore or replacement - both viable, compare costs £15,000+ Any Full rebuild or reconditioned engine - vehicle value justifies High-value classic Any Full rebuild with rebore - preservation justifies £7k-£10k+ Cost ranges [INDUSTRY ESTIMATE]. Labour: rebore (engine out, strip, machine, rebuild) 20-30+ hours at £65-£95/hr indie. The brutal maths (EcoBoost 1.6): Rebore + one piston + labour £3,000 - £5,000 Expensive, other bores still original wear Full rebore + all pistons + labour £5,000 - £8,000 Engine new - but very expensive Used replacement engine (supply + fit) £2,500 - £4,000 Cheaper, faster Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored scoring - mild scoring, oil consumption £500 - £1,000 Stage 2 Driven with scoring - scoring deepens, compression drops £1,500 - £3,000 Stage 3 Driven with knocking - piston seizure imminent, debris in oil £2,000 - £4,000 (liner) or £2,500 - £6,500 (replacement) Stage 4 Engine seizure - piston welded to bore, rod exits block £2,500 - £10,000+ (replacement) The truth most pages won't tell you: on a common engine, a used replacement is almost always cheaper than repairing the bore. Don't let sentiment drive your wallet. Frequently asked questions"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored scoring - mild scoring, oil consumption £500 - £1,000 Stage 2 Driven with scoring - scoring deepens, compression drops £1,500 - £3,000 Stage 3 Driven with knocking - piston seizure imminent, debris in oil £2,000 - £4,000 (liner) or £2,500 - £6,500 (replacement) Stage 4 Engine seizure - piston welded to bore, rod exits block £2,500 - £10,000+ (replacement) The truth most pages won't tell you: on a common engine, a used replacement is almost always cheaper than repairing the bore. Don't let sentiment drive your wallet. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does cylinder bore damage repair cost in the UK",
        "answer": "Honing (minor glazing): £500-£1,000. Rebore (one cylinder + oversize piston): £1,500-£3,000 + pistons. Cylinder liner installation: £2,000-£4,000 per cylinder. Full engine rebuild with rebore: £7,000-£10,000+. Replacement engine (used): £2,500-£10,000+. Diagnostic: £100-£250. → Engine replacement cost guide"
      },
      {
        "question": "What causes cylinder bore damage",
        "answer": "Most common: ringland failure (tuned engines - scores bore), broken piston rings, piston seizure (overheating), foreign object ingestion, detonation (poor fuel/aggressive tuning), oil starvation, high mileage wear (oval bores)."
      },
      {
        "question": "Can a scored cylinder bore be repaired without removing the engine",
        "answer": "No. The engine must be removed, completely stripped, and the block sent to a machine shop for reboring or sleeving. There are no \"in-situ\" fixes for bore damage. Any product claiming to repair bore damage without disassembly is a temporary bodge at best."
      },
      {
        "question": "How do I know if my bore is damaged",
        "answer": "Compression test + wet compression test + leak-down test + borescope inspection. If compression does NOT improve with oil added to the cylinder, and a borescope shows vertical scratches in the bore wall, the bore is damaged."
      },
      {
        "question": "Is it cheaper to rebore or replace the engine",
        "answer": "On common engines (Ford EcoBoost, VW EA189, BMW N47, Ford DV6), a used or reconditioned engine is almost always cheaper than a rebore. Example: Ford EcoBoost 1.6 reconditioned engine costs £1,800-£3,200 fitted. A rebore + one oversize piston + reassembly costs £3,000-£5,000. Replacement is cheaper and faster."
      },
      {
        "question": "When should I rebuild (rebore) instead of replacing",
        "answer": "Only if: the vehicle is high-value (over £8,000-£10,000), the engine is rare (no used units available), the vehicle has sentimental value, or you are building a performance engine with forged pistons. For 95% of vehicles on UK roads, replacement is the right answer."
      },
      {
        "question": "Which specialist reboring services are available in the UK",
        "answer": "Ivor Searle (Soham, Cambridgeshire) - one of the UK's largest engine remanufacturers. Puma Racing Engines (Nottingham) - performance reboring. AES (Doncaster) - engine machining. Local engine machining shops - search \"engine rebore near me\". Most independent engine specialists outsource reboring - ask for their recommended machine shop."
      }
    ]
  },
  "dpf-failure": {
    "sections": [
      {
        "title": "Understanding the stage of your DPF blockage",
        "paragraphs": [
          "Understanding the stage of your DPF blockage is critical to avoiding unnecessary replacement costs. Click any stage to see full detail.",
          "Soot accumulation preventing passive regeneration. Often caused by short journeys and urban driving.",
          "Take the vehicle on a 20-30 minute motorway drive to allow regeneration. If light persists, book forced regeneration.",
          "£85-£300 for forced regeneration. Labour: 1-2 hours at £65-£95/hr.",
          "Heavy soot and early ash buildup. Regeneration cycles have failed repeatedly.",
          "Book professional DPF cleaning. The filter is removed and chemically or thermally cleaned off-car.",
          "£150-£400 for professional cleaning. Labour: 2-4 hours at £65-£95/hr.",
          "Physical damage - cracked, melted, or collapsed substrate. Or chronic engine faults destroying the DPF.",
          "Full DPF replacement required. Also address underlying engine faults or the new DPF will fail again.",
          "£1,000-£3,500+ for full DPF replacement. Labour: 3-6 hours at £65-£95/hr."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Understanding the stage of your DPF blockage is critical to avoiding unnecessary replacement costs. Click any stage to see full detail. £85 DPF warning light, slight hesitation Soot accumulation preventing passive regeneration £85 - £300 £150 Limp mode, increased fuel consumption Heavy soot and early ash buildup £150 - £400 £3,500+ Chronic limp mode, excessive smoke, failed MOT Physical damage, melted substrate, or chronic engine faults £1,000 - £3,500+ Likely cause Soot accumulation preventing passive regeneration. Often caused by short journeys and urban driving. What to do Take the vehicle on a 20-30 minute motorway drive to allow regeneration. If light persists, book forced regeneration. Repair cost £85-£300 for forced regeneration. Labour: 1-2 hours at £65-£95/hr. Likely cause Heavy soot and early ash buildup. Regeneration cycles have failed repeatedly. What to do Book professional DPF cleaning. The filter is removed and chemically or thermally cleaned off-car. Repair cost £150-£400 for professional cleaning. Labour: 2-4 hours at £65-£95/hr. Likely cause Physical damage - cracked, melted, or collapsed substrate. Or chronic engine faults destroying the DPF. What to do Full DPF replacement required. Also address underlying engine faults or the new DPF will fail again. Repair cost £1,000-£3,500+ for full DPF replacement. Labour: 3-6 hours at £65-£95/hr. ⚠️ Illegal DPF Removal - Do Not Allow This Under UK law (The Road Vehicles (Construction and Use) Regulations 1986), removing or modifying a Diesel Particulate Filter is illegal. It is classified as tampering with the vehicle's emissions control system. It will result in an automatic MOT failure, can void your vehicle insurance, and is harmful to the environment. Always choose professional cleaning or legitimate replacement over illegal removal. Clean vs replace - decision framework"
      },
      {
        "title": "Not every DPF issue requires a full replacement",
        "paragraphs": [
          "Where the filter structure is intact, targeted cleaning is the most economical and environmentally responsible choice.",
          "Not every engine component failure requires a full replacement. Where damage is isolated, targeted repair or cleaning may be more economical. Our price comparison service focuses on replacement options, but we also provide cleaning cost guidance to help you make the right decision."
        ],
        "bullets": [
          "The DPF warning light has just appeared",
          "The vehicle has not been driven at motorway speeds recently",
          "There are no underlying mechanical faults",
          "Vehicle is in limp mode or failing to complete passive regeneration",
          "Filter is heavily sooted but the internal substrate is intact",
          "Labour: 2-4 hours - filter removed and chemically/thermally cleaned",
          "DPF has physically cracked, melted, or suffered structural collapse",
          "Chronic unresolved engine damage (e.g., severe turbo oil leaks or blown injectors) will destroy a newly cleaned filter",
          "Filter has reached end of designed lifespan (typically 100,000+ miles) and ash accumulation is beyond cleaning limits",
          "Labour: 3-6 hours"
        ],
        "tables": [],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [
          "Ignoring early DPF warnings can turn a simple £150 clean into a £3,000+ replacement."
        ],
        "bullets": [
          "• Amber/Orange DPF Warning Light - The primary indicator that the filter needs a regeneration cycle",
          "• Reduced Power / Limp Mode - ECU restricts engine performance to prevent further soot buildup",
          "• Increased Fuel Consumption - Engine runs richer to attempt high-temperature regeneration",
          "• Failed MOT Emissions Test - Excessive particulate matter results in automatic failure",
          "• Unusual Smells or Smoke - Sulphurous smell or excessive black/grey smoke indicates filter is no longer trapping particulates",
          "• Short Journeys - The most common cause. Passive regeneration requires sustained motorway driving (20-30 minutes) for exhaust temps above 600°C",
          "• Incorrect Oil Grade - Using standard oil instead of low-ash DPF-safe oil (ACEA C1/C2/C3) causes non-combustible ash buildup",
          "• Faulty EGR Valves or Injectors - Dumps excess fuel or soot into the exhaust, overwhelming DPF capacity",
          "• Faulty Differential Pressure Sensors - Prevents ECU from triggering regeneration cycles when needed"
        ],
        "tables": [],
        "additionalText": ""
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on Engines Market's internal quote data from 2025, DPF clogging is a primary concern for owners of modern diesel vehicles used predominantly in urban environments."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on Engines Market's internal quote data from 2025, DPF clogging is a primary concern for owners of modern diesel vehicles used predominantly in urban environments. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Mercedes OM651 DPF and EGR clogging in urban use - 1,250 requests [EM-VERIFIED] 1,250 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI DPF blockage exacerbated by software updates and urban driving - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Ford DV6 1.6 TDCi Highly susceptible to DPF clogging on short journeys - 780 requests [EM-VERIFIED] 780 requests [EM-VERIFIED] Workshop consensus Workshop consensus indicates that the vast majority of DPF warnings can be resolved with professional cleaning or forced regeneration, avoiding the need for a full replacement, provided any underlying mechanical faults are addressed first [INDUSTRY ESTIMATE]. Based on 24,650 real UK quotes in 2025. DPF issues are often misdiagnosed - cleaning should always be considered before replacement. Prevention"
      },
      {
        "title": "How to protect your DPF",
        "paragraphs": [
          "You can significantly extend the life of your DPF and avoid costly replacements by following these specialist recommendations."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "You can significantly extend the life of your DPF and avoid costly replacements by following these specialist recommendations. 01 Drive for regeneration Once a week, take the vehicle on a 20-30 minute drive at sustained motorway speeds (above 40 mph in a high gear) to allow the ECU to complete a passive regeneration cycle. 02 Use the correct oil Always ensure your mechanic uses the exact low-ash, DPF-safe oil specified in your vehicle's handbook (e.g., 5W30 C1/C2/C3). 03 Address faults promptly If the engine management light illuminates, get it diagnosed immediately. A minor £150 EGR or injector repair today can prevent a £2,000 DPF replacement tomorrow. 04 Don't ignore the warning light If the DPF light appears, do not continue to make short journeys. Drive the vehicle at speed to clear it, or book a diagnostic immediately. Preventative maintenance £0-£150 Motorway drives + correct oil VS Full DPF replacement £1,000-£3,500+ Parts + labour Prevention is always cheaper than replacement. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does professional DPF cleaning cost",
        "answer": "Professional DPF cleaning typically costs between £150 and £400, depending on the severity of the blockage and the vehicle model. This includes removing the filter, chemically or thermally cleaning it, and resetting the ECU. Labour typically takes 2-4 hours [INDUSTRY ESTIMATE]."
      },
      {
        "question": "Can I clean my DPF myself with additives",
        "answer": "While DPF cleaning additives can help clear minor soot buildup during a long drive, they cannot remove non-combustible ash or clear a severe, hardened blockage. For moderate to severe blockages, professional off-car cleaning is required."
      },
      {
        "question": "How much does a full DPF replacement cost",
        "answer": "If the DPF is physically damaged or beyond cleaning, a full replacement typically costs between £1,000 and £3,500+, including parts and 3-6 hours of labour [INDUSTRY ESTIMATE]. → DPF replacement cost guide"
      },
      {
        "question": "Is DPF removal illegal in the UK",
        "answer": "Yes. Removing or gutting a DPF is illegal under UK law. It modifies the emissions system, will result in an automatic MOT failure, and can void your vehicle insurance."
      },
      {
        "question": "Why does my DPF keep blocking after cleaning",
        "answer": "If a DPF repeatedly blocks shortly after cleaning, there is an underlying mechanical fault. Common culprits include a faulty EGR valve, leaking fuel injectors, a failing turbocharger, or the use of incorrect engine oil. These must be diagnosed and fixed before the DPF is cleaned or replaced."
      },
      {
        "question": "Is DPF cleaning covered under warranty",
        "answer": "On reconditioned engines, the DPF is typically covered as part of the engine warranty (12-24 months). However, blockage caused by short journeys or poor maintenance is often excluded. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      }
    ]
  },
  "egr-failure": {
    "sections": [
      {
        "title": "Understanding The Severity Of Your EGR Issue",
        "paragraphs": [
          "Understanding the severity of your EGR issue is critical to avoiding unnecessary replacement costs.",
          "Slight loss of power, occasional rough idle",
          "Minor carbon accumulation",
          "Persistent rough idle, black smoke, increased fuel consumption",
          "Heavy carbon build-up – valve mechanically stuck",
          "Engine management light, limp mode, failed MOT emissions",
          "Valve motor failure, cracked housing, or severe blockage",
          "Minor carbon accumulation restricting valve movement. Often caused by short journeys and urban driving.",
          "Book professional EGR cleaning. The valve is removed and chemically cleaned to dissolve carbon deposits.",
          "£70–£120 for professional cleaning. Labour: 1–2 hours at £65–£95/hr.",
          "Under UK law (The Road Vehicles (Construction and Use) Regulations 1986), removing, blanking, or modifying an EGR system is illegal. It is classified as tampering with the vehicle's mandatory emissions control system. It will result in an automatic MOT failure , can void your vehicle insurance, and is harmful to the environment. Always choose professional cleaning or legitimate replacement over illegal modifications."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Understanding the severity of your EGR issue is critical to avoiding unnecessary replacement costs. STAGE 1 £70 Slight loss of power, occasional rough idle Minor carbon accumulation £70 – £120 STAGE 2 £135 Persistent rough idle, black smoke, increased fuel consumption Heavy carbon build-up – valve mechanically stuck £70–£120 (clean) or £135–£650 (replace) STAGE 3 £650 Engine management light, limp mode, failed MOT emissions Valve motor failure, cracked housing, or severe blockage £135 – £650 LIKELY CAUSE Minor carbon accumulation restricting valve movement. Often caused by short journeys and urban driving. WHAT TO DO Book professional EGR cleaning. The valve is removed and chemically cleaned to dissolve carbon deposits. REPAIR COST £70–£120 for professional cleaning. Labour: 1–2 hours at £65–£95/hr. Illegal EGR Blanking – Do Not Allow This Under UK law (The Road Vehicles (Construction and Use) Regulations 1986), removing, blanking, or modifying an EGR system is illegal. It is classified as tampering with the vehicle's mandatory emissions control system. It will result in an automatic MOT failure , can void your vehicle insurance, and is harmful to the environment. Always choose professional cleaning or legitimate replacement over illegal modifications. WHY EGR VALVES FAIL"
      },
      {
        "title": "THE THREE COMMON FAILURE MODES",
        "paragraphs": [
          "The EGR valve is designed to reduce nitrogen oxide (NOx) emissions by recirculating exhaust gas back into the combustion chamber. While effective, this process introduces soot and unburnt fuel into the intake system.",
          "Frequent short journeys prevent the engine from reaching optimal operating temperature. This causes soot and oil vapour to condense and harden into a thick, tar-like carbon deposit, eventually jamming the valve open or closed.",
          "Over time, the constant movement of the valve flap can cause the internal mechanism to wear out or seize, independent of carbon build-up.",
          "Modern EGR valves are electronically controlled. Faulty wiring, blown fuses, or a failed internal solenoid can prevent the ECU from operating the valve, triggering an engine management light.",
          "Get an EGR diagnostic or cleaning quote Check symptoms first"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "The EGR valve is designed to reduce nitrogen oxide (NOx) emissions by recirculating exhaust gas back into the combustion chamber. While effective, this process introduces soot and unburnt fuel into the intake system. 01 CARBON BUILD-UP (MOST COMMON) Frequent short journeys prevent the engine from reaching optimal operating temperature. This causes soot and oil vapour to condense and harden into a thick, tar-like carbon deposit, eventually jamming the valve open or closed. 02 MECHANICAL FAILURE Over time, the constant movement of the valve flap can cause the internal mechanism to wear out or seize, independent of carbon build-up. 03 ELECTRICAL FAILURE Modern EGR valves are electronically controlled. Faulty wiring, blown fuses, or a failed internal solenoid can prevent the ECU from operating the valve, triggering an engine management light. 100+ UK specialist suppliers 24,650 real quotes in 2025 No obligation Get an EGR diagnostic or cleaning quote Check symptoms first Get Quote → CLEAN VS REPLACE – DECISION FRAMEWORK"
      },
      {
        "title": "NOT EVERY EGR FAULT REQUIRES A NEW PART",
        "paragraphs": [
          "A proper diagnostic is essential to determine the most economical route.",
          "◷ Labour: 1–3 hours",
          "◷ Labour: 2–4 hours"
        ],
        "bullets": [
          "The diagnostic scan indicates the valve is mechanically stuck due to carbon accumulation",
          "The valve’s electrical motor and housing are fully intact and functional",
          "Professional cleaning involves removing the valve and using chemical/ultrasonic processes to dissolve carbon",
          "The diagnostic confirms the internal electrical motor or solenoid has failed",
          "The valve housing is cracked or the internal flap is physically broken",
          "Cleaning has already been attempted but the fault code returns immediately"
        ],
        "tables": [],
        "additionalText": ""
      },
      {
        "title": "THE DOMINO EFFECT",
        "paragraphs": [
          "Ignoring an EGR warning light is a false economy. A stuck-open EGR valve allows excessive exhaust gas into the engine, causing a rich fuel mixture, black smoke, and severe carbon build-up.",
          "Carbon restricts airflow, worsening performance and fuel economy",
          "Excessive soot rapidly clogs the DPF, leading to a £1,000+ replacement",
          "Carbon debris can damage turbo vanes or restrict the variable geometry mechanism",
          "Addressing carbon build-up early can help prevent more costly intake manifold, DPF and turbo repairs.",
          "Engines with known EGR issues",
          "i Note: Request volumes reflect overall engine replacement enquiries, of which EGR and DPF failures are frequently cited as the primary or contributing cause (EM-OBSERVED)."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "ENGINE",
              "HIGH RISK MILEAGE",
              "REQUEST VOLUME"
            ],
            "rows": [
              [
                "VW/Audi EA189 2.0 TDI",
                "80k–150k",
                "1,050 [EM-VERIFIED]"
              ],
              [
                "BMW N47D20C / B47D20A",
                "60k–120k",
                "1,450 + 930 [EM-VERIFIED]"
              ],
              [
                "Ford DV6 1.6 TDCi / Duratorq",
                "80k–150k",
                "780 + 300 [EM-VERIFIED]"
              ],
              [
                "Land Rover 204DTD / 306DT",
                "60k–120k",
                "1,150 + 980 [EM-VERIFIED]"
              ],
              [
                "Peugeot/Citroën DW10 2.0 HDi",
                "80k–150k",
                "290 [EM-VERIFIED]"
              ]
            ]
          }
        ],
        "additionalText": "Ignoring an EGR warning light is a false economy. A stuck-open EGR valve allows excessive exhaust gas into the engine, causing a rich fuel mixture, black smoke, and severe carbon build-up. CARBON SPREADS DOWNSTREAM Intake Manifold Carbon restricts airflow, worsening performance and fuel economy → Diesel Particulate Filter (DPF) Excessive soot rapidly clogs the DPF, leading to a £1,000+ replacement → Turbocharger Carbon debris can damage turbo vanes or restrict the variable geometry mechanism THE COST ESCALATION Today: £70–£120 EGR clean £70–£120 In 6 months: EGR clean + potential DPF repair £1,000+ In 12 months: EGR, DPF and turbo repairs can combine £2,600+ Addressing carbon build-up early can help prevent more costly intake manifold, DPF and turbo repairs. RED FLAG ENGINES – KNOWN EGR FAILURE PATTERNS Engines with known EGR issues ENGINE HIGH RISK MILEAGE REQUEST VOLUME VW/Audi EA189 2.0 TDI 80k–150k 1,050 [EM-VERIFIED] BMW N47D20C / B47D20A 60k–120k 1,450 + 930 [EM-VERIFIED] Ford DV6 1.6 TDCi / Duratorq 80k–150k 780 + 300 [EM-VERIFIED] Land Rover 204DTD / 306DT 60k–120k 1,150 + 980 [EM-VERIFIED] Peugeot/Citroën DW10 2.0 HDi 80k–150k 290 [EM-VERIFIED] i Note: Request volumes reflect overall engine replacement enquiries, of which EGR and DPF failures are frequently cited as the primary or contributing cause (EM-OBSERVED). VEHICLE VALUE THRESHOLD RULE"
      },
      {
        "title": "IS EGR REPAIR ECONOMICAL?",
        "paragraphs": [
          "The decision to repair or replace should be based on a clear analysis of your vehicle’s value versus the viable repair cost.",
          "i If the lowest viable replacement cost exceeds approximately 60% of the vehicle’s current market value, examine scrap value before committing."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "VEHICLE VALUE",
              "RECOMMENDED ACTION",
              "REASONING"
            ],
            "rows": [
              [
                "Under £3,000",
                "✓ Thorough cleaning first (£70–£120)",
                "Replacement (£300–£650) may exceed 20–50% of vehicle value"
              ],
              [
                "£3,000+",
                "✓ Replacement is viable and economical",
                "Restores performance, fuel economy, and MOT compliance"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Avoiding EGR Failure",
        "paragraphs": [
          "You cannot entirely prevent EGR operation, but you can significantly reduce the rate of carbon build-up by following these specialist recommendations.",
          "Ensure the vehicle regularly completes journeys of at least 20–30 minutes at sustained speeds. This allows the engine to reach optimal operating temperature, helping to burn off light carbon deposits naturally.",
          "Occasionally driving the vehicle in a lower gear at higher RPMs (safely and legally) can help increase exhaust temperatures and clear minor soot accumulation.",
          "Premium diesel fuels often contain higher levels of detergents designed to keep the fuel system and intake cleaner.",
          "A faulty injector or leaking turbo seal will dump excess oil or fuel into the intake, accelerating EGR carbon build-up exponentially.",
          "Regular motorway drives + quality fuel",
          "Full system replacement"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "You cannot entirely prevent EGR operation, but you can significantly reduce the rate of carbon build-up by following these specialist recommendations. 01 Regular long drives Ensure the vehicle regularly completes journeys of at least 20–30 minutes at sustained speeds. This allows the engine to reach optimal operating temperature, helping to burn off light carbon deposits naturally. 02 The “Italian Tune-Up” Occasionally driving the vehicle in a lower gear at higher RPMs (safely and legally) can help increase exhaust temperatures and clear minor soot accumulation. 03 Use quality fuel Premium diesel fuels often contain higher levels of detergents designed to keep the fuel system and intake cleaner. 04 Address faults promptly A faulty injector or leaking turbo seal will dump excess oil or fuel into the intake, accelerating EGR carbon build-up exponentially. PREVENTATIVE MAINTENANCE £0–£150 Regular motorway drives + quality fuel CATASTROPHIC FAILURE – EGR + DPF + TURBO £3,000+ Full system replacement Prevention is always cheaper than replacement. FREQUENTLY ASKED QUESTIONS"
      },
      {
        "title": "EXPERIENCING ROUGH IDLE, BLACK SMOKE, OR AN ENGINE MANAGEMENT LIGHT?",
        "paragraphs": [
          "Before you commit to a costly replacement, get a professional diagnostic. In most cases, a simple EGR clean can restore your vehicle’s performance for a fraction of the price. Compare fixed-price EGR cleaning and replacement quotes from 100+ vetted UK specialists.",
          "i No obligation · Based on 24,650 real UK quotes in 2025 · Engines Market is a comparison platform — we connect you with suppliers, we do not supply or fit parts."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Don’t buy a replacement until you’ve explored cleaning Before you commit to a costly replacement, get a professional diagnostic. In most cases, a simple EGR clean can restore your vehicle’s performance for a fraction of the price. Compare fixed-price EGR cleaning and replacement quotes from 100+ vetted UK specialists. Get a free EGR diagnostic or replacement quote → Free No obligation 100+ UK specialists 24,650 real UK quotes in 2025 i No obligation · Based on 24,650 real UK quotes in 2025 · Engines Market is a comparison platform — we connect you with suppliers, we do not supply or fit parts."
      }
    ],
    "faqs": [
      {
        "question": "How much does it cost to replace an EGR valve in the UK?",
        "answer": "Replacement typically costs £135–£650, depending on the vehicle and access. Labour commonly takes 2–4 hours."
      },
      {
        "question": "Can a blocked EGR valve be cleaned instead of replaced?",
        "answer": "Yes. When carbon build-up has mechanically stuck the valve but the motor and housing are intact, professional cleaning usually costs £70–£120 and takes 1–3 hours."
      },
      {
        "question": "What are the main symptoms of a failing EGR valve?",
        "answer": "Rough idle, loss of power, increased fuel consumption, black smoke, an engine management light, and failed MOT emissions are common signs."
      },
      {
        "question": "Is it legal to blank off or delete the EGR valve?",
        "answer": "No. Removing or disabling an emissions-control system can make the vehicle non-compliant and can result in an MOT failure."
      },
      {
        "question": "Will a faulty EGR valve cause my car to fail its MOT?",
        "answer": "It can. A warning light, excessive emissions or an obviously modified emissions system can lead to an MOT failure."
      },
      {
        "question": "Is EGR failure covered under warranty?",
        "answer": "Coverage depends on the vehicle age, warranty terms and whether the fault is considered a covered component failure or maintenance-related carbon build-up."
      }
    ]
  },
  "engine-knock": {
    "sections": [
      {
        "title": "Diagnosis & cost table",
        "paragraphs": [
          "Not all knocks are the same. Use this table to identify which type of knock you're hearing.",
          "Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour: bearing replacement 8-12 hours."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Knock Type",
              "Sound Description",
              "Typical Cause",
              "Repair Cost",
              "Urgency"
            ],
            "rows": [
              [
                "Detonation knock (pinking)",
                "Metallic rattling or pinging under acceleration, especially uphill",
                "Low-octane fuel, carbon deposits, lean mixture",
                "£150 - £400",
                "⚠️ Moderate"
              ],
              [
                "Rod knock",
                "Deep, rhythmic knocking that increases with RPM. Loudest under load.",
                "Worn rod bearings (oil starvation)",
                "£800-£1,500 (bearings) / £2,500-£10,000+ (engine)",
                "🚨 STOP DRIVING"
              ],
              [
                "Main bearing knock",
                "Dull, heavy knock at low RPM, may disappear at higher RPM",
                "Worn main bearings (low oil pressure)",
                "£2,500-£10,000+ (engine replacement)",
                "🚨 STOP DRIVING"
              ],
              [
                "Piston slap",
                "Light knocking that disappears as engine warms up",
                "Worn piston or cylinder bore",
                "£800 - £2,500",
                "⚠️ Monitor"
              ],
              [
                "Accessory knock",
                "Irregular ticking or tapping, changes with accessory load",
                "Worn water pump, alternator bearing, belt tensioner",
                "£100 - £500",
                "ℹ️ Low"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "What it is and why it's critical",
        "paragraphs": [],
        "bullets": [
          "• Oil starvation - low oil level, oil pump failure (70%+ of cases)",
          "• Missed oil changes - oil turns to sludge, blocks oil galleries",
          "• Over-revving - excessive RPM stretches rods, damages bearings",
          "• High mileage wear - bearings naturally fatigue"
        ],
        "tables": [],
        "additionalText": "What is rod knock- Rod knock occurs when the bearings that connect the connecting rod to the crankshaft become worn. Without a proper oil film, metal touches metal. The knock you hear is the rod slapping against the crankshaft journal with each revolution. What causes rod knock- • Oil starvation - low oil level, oil pump failure (70%+ of cases) • Missed oil changes - oil turns to sludge, blocks oil galleries • Over-revving - excessive RPM stretches rods, damages bearings • High mileage wear - bearings naturally fatigue What happens if you ignore rod knock- Continued driving will score the crankshaft journal beyond repair, cause the connecting rod to fail completely, allow the rod to exit the engine block (\"windowed block\"), and lead to engine seizure. Stage Damage Cost to Fix Stage 1 Early rod knock - bearings worn, crank journal undamaged £800 - £1,500 Stage 2 Advanced rod knock - crank journal scored, bearings destroyed £2,500 - £6,000 Stage 3 Catastrophic - con rod snapped, block damaged £3,500 - £10,000+ Engines most at risk for rod knock"
      },
      {
        "title": "Based on KNOWN FAILURE PATTERNS and 2025 data",
        "paragraphs": [
          "Land Rover 306DT (SDV6/TDV6 3.0) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure - cold-start knock is early warning. BMW N57D30 80k-150k 830 [EM-VERIFIED] Oil pump failure; crankshaft bearing issues in higher-mileage units. Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - kills oil pressure. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Oil dilution (Dieselgate \"fix\" increased fuel in oil). Ford 1.0 EcoBoost (early) 60k-100k 185 [EM-VERIFIED] Wet belt degrades, clogs oil pickup - oil starvation. Detonation knock (pinking)"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Land Rover 306DT (SDV6/TDV6 3.0) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure - cold-start knock is early warning. BMW N57D30 80k-150k 830 [EM-VERIFIED] Oil pump failure; crankshaft bearing issues in higher-mileage units. Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - kills oil pressure. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Oil dilution (Dieselgate \"fix\" increased fuel in oil). Ford 1.0 EcoBoost (early) 60k-100k 185 [EM-VERIFIED] Wet belt degrades, clogs oil pickup - oil starvation. Detonation knock (pinking)"
      },
      {
        "title": "Less serious, still needs attention",
        "paragraphs": [
          "Is detonation knock dangerous- Prolonged detonation can damage pistons, ring lands, and head gaskets. However, it is significantly less urgent than rod knock. Address it at your earliest convenience, but it doesn't require towing."
        ],
        "bullets": [
          "• Low-octane fuel - using 95 RON when engine requires 97/98/99 RON",
          "• Carbon deposits - hot carbon spots ignite fuel early",
          "• Lean fuel mixture - air leak or fuel system issue",
          "• Overheating engine - excessive cylinder temperatures"
        ],
        "tables": [],
        "additionalText": "What is detonation knock- Detonation (also called pinking or pinging) occurs when fuel ignites prematurely in the cylinder, causing multiple flame fronts to collide. The result is a metallic rattling or pinging sound, especially under load (acceleration, uphill). What causes detonation knock- • Low-octane fuel - using 95 RON when engine requires 97/98/99 RON • Carbon deposits - hot carbon spots ignite fuel early • Lean fuel mixture - air leak or fuel system issue • Overheating engine - excessive cylinder temperatures Repair options for detonation knock Switch to higher-octane fuel £5-£10 extra per tank Fuel system cleaner / decarbonising £15 - £50 Professional decarbonising £150 - £400 Is detonation knock dangerous- Prolonged detonation can damage pistons, ring lands, and head gaskets. However, it is significantly less urgent than rod knock. Address it at your earliest convenience, but it doesn't require towing. Repair vs replace - engine knock"
      },
      {
        "title": "What should you do after hearing a knock-",
        "paragraphs": [
          "Not every engine failure requires a full replacement. Where damage is isolated (detonation knock, early rod knock), targeted repair may be more economical. However, advanced rod knock almost always requires engine replacement."
        ],
        "bullets": [
          "Rod knock just started (mild noise, not constant)",
          "Oil pressure still normal",
          "Crank journals undamaged (inspect with crank removed)",
          "Vehicle value high enough to justify £800-£1,500 spend",
          "Labour: 8-12 hours",
          "Crank journals scored but not cracked",
          "Oversized bearings available",
          "Total cost £1,500-£2,500 - only economical on higher-value vehicles",
          "Crankshaft damaged or snapped",
          "Connecting rod damaged or snapped",
          "Engine block damaged (\"windowed block\")",
          "Labour to strip, inspect, replace bearings exceeds cost of reconditioned engine",
          "Vehicle value under £4,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "✓ Choose bearing replacement if: Rod knock just started (mild noise, not constant) Oil pressure still normal Crank journals undamaged (inspect with crank removed) Vehicle value high enough to justify £800-£1,500 spend Labour: 8-12 hours 🔧 Choose crank regrind if (rare): Crank journals scored but not cracked Oversized bearings available Total cost £1,500-£2,500 - only economical on higher-value vehicles ⚠ Choose engine replacement if: Crankshaft damaged or snapped Connecting rod damaged or snapped Engine block damaged (\"windowed block\") Labour to strip, inspect, replace bearings exceeds cost of reconditioned engine Vehicle value under £4,000 - replacement rarely economical \" If you hear a deep knock, stop driving immediately and get a diagnostic. If it's early-stage rod knock, bearing replacement is possible. If you've driven more than a few miles with the noise, assume the crank is damaged - replace the engine. - Specialist rule of thumb (UK) Not every engine failure requires a full replacement. Where damage is isolated (detonation knock, early rod knock), targeted repair may be more economical. However, advanced rod knock almost always requires engine replacement. Compare repair vs replacement quotes for your knock → Get quotes How to identify your engine knock"
      },
      {
        "title": "Audio descriptions - what to listen for",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Knock Type",
              "What It Sounds Like",
              "When You Hear It"
            ],
            "rows": [
              [
                "Rod knock",
                "Deep, heavy \"thud thud thud\" - like someone hitting the engine block with a hammer",
                "Increases with engine RPM. Loudest under acceleration."
              ],
              [
                "Detonation knock",
                "Metallic \"rattle\" or \"pinging\" - like shaking a can of marbles",
                "Under load (uphill, accelerating). May disappear at idle."
              ],
              [
                "Main bearing knock",
                "Dull, heavy knock - lower pitch than rod knock",
                "At low RPM. May disappear as RPM increases."
              ],
              [
                "Piston slap",
                "Light tapping or ticking - like a typewriter",
                "On cold start. Usually disappears as engine warms up."
              ],
              [
                "Lifter tick",
                "High-pitched ticking - like a sewing machine",
                "Constant at idle. May change with oil viscosity."
              ]
            ]
          }
        ],
        "additionalText": "Knock Type What It Sounds Like When You Hear It Rod knock Deep, heavy \"thud thud thud\" - like someone hitting the engine block with a hammer Increases with engine RPM. Loudest under acceleration. Detonation knock Metallic \"rattle\" or \"pinging\" - like shaking a can of marbles Under load (uphill, accelerating). May disappear at idle. Main bearing knock Dull, heavy knock - lower pitch than rod knock At low RPM. May disappear as RPM increases. Piston slap Light tapping or ticking - like a typewriter On cold start. Usually disappears as engine warms up. Lifter tick High-pitched ticking - like a sewing machine Constant at idle. May change with oil viscosity. 🚨 If you cannot identify the knock type, assume the worst. A deep knock that increases with RPM is rod knock until proven otherwise. Stop driving and arrange a tow to a mechanic. What to do if you hear engine knock"
      },
      {
        "title": "Step-by-step guide",
        "paragraphs": [
          "Step 1 Identify the knock Use the table above to determine which type of knock you're hearing. Step 2 - If rod knock or main bearing knock STOP DRIVING IMMEDIATELY Turn off the engine. Arrange a tow to a garage. Do not restart the engine. Step 3 - If detonation knock Fill up with higher-octane fuel Use Super Unleaded 97/99 RON. Drive gently until the tank is empty and refill again. If noise persists, book a diagnostic. Step 4 Get a diagnostic A mechanic will perform a stethoscope test, check oil pressure, inspect oil for metal particles, and may remove the oil pan to inspect bearings. Step 5 - Decide on repair or replacement: Get quotes for bearing replacement vs engine replacement. Compare against vehicle value. Get a diagnostic or replacement quote → Get quotes Vehicle value threshold"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Step 1 Identify the knock Use the table above to determine which type of knock you're hearing. Step 2 - If rod knock or main bearing knock STOP DRIVING IMMEDIATELY Turn off the engine. Arrange a tow to a garage. Do not restart the engine. Step 3 - If detonation knock Fill up with higher-octane fuel Use Super Unleaded 97/99 RON. Drive gently until the tank is empty and refill again. If noise persists, book a diagnostic. Step 4 Get a diagnostic A mechanic will perform a stethoscope test, check oil pressure, inspect oil for metal particles, and may remove the oil pan to inspect bearings. Step 5 - Decide on repair or replacement: Get quotes for bearing replacement vs engine replacement. Compare against vehicle value. Get a diagnostic or replacement quote → Get quotes Vehicle value threshold"
      },
      {
        "title": "Is repair economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Rod Knock - Recommended Action Reasoning Under £2,000 Scrap the vehicle Replacement cost (£1,500-£4,000) exceeds value £2,000 - £3,500 Used engine replacement (if car is otherwise excellent) Borderline - evaluate carefully £3,500 - £6,000 Bearing replacement (£800-£1,500) or used engine Evaluate both options £6,000 - £12,000 Bearing replacement (if caught early) or reconditioned engine Repair well within value £12,000+ Bearing replacement or reconditioned engine Replacement cost small relative to value If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], rod knock is one of the most common catastrophic engine issues, particularly on high-mileage diesel engines."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], rod knock is one of the most common catastrophic engine issues, particularly on high-mileage diesel engines. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Land Rover 306DT (SDV6/TDV6) Crankshaft bearing failure - 980 requests [EM-VERIFIED] 980 requests [EM-VERIFIED] BMW N57D30 Oil pump failure - 830 requests [EM-VERIFIED] 830 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI Oil dilution - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Land Rover 276DT (2.7 TDV6) Oil pump housing failure - 700 requests [EM-VERIFIED] 700 requests [EM-VERIFIED] Known failure insight \"The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980]. Specialists report catastrophic bearing failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Rod knock is often ignored until it's too late - early diagnosis (bearing wear only) is your only chance of avoiding a full engine replacement. Preventative maintenance"
      },
      {
        "title": "Avoiding engine knock",
        "paragraphs": [
          "01 Check oil level weekly Low oil is the #1 cause of rod knock. Top up if low. 02 Never ignore the oil pressure warning light Stop immediately - bearings are running dry. 03 Regular oil changes Every 6k-12k miles. Old oil turns to sludge and blocks oil galleries. 04 Use correct octane fuel Check your owner's manual. Premium engines need 97/98/99 RON. 05 Replace timing belt at manufacturer interval Prevents engine damage that can lead to knock. Preventative maintenance (per year) £150-£300 Oil changes, coolant checks, basic servicing VS Catastrophic failure - engine replacement £2,500-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "01 Check oil level weekly Low oil is the #1 cause of rod knock. Top up if low. 02 Never ignore the oil pressure warning light Stop immediately - bearings are running dry. 03 Regular oil changes Every 6k-12k miles. Old oil turns to sludge and blocks oil galleries. 04 Use correct octane fuel Check your owner's manual. Premium engines need 97/98/99 RON. 05 Replace timing belt at manufacturer interval Prevents engine damage that can lead to knock. Preventative maintenance (per year) £150-£300 Oil changes, coolant checks, basic servicing VS Catastrophic failure - engine replacement £2,500-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "What does rod knock sound like",
        "answer": "A deep, rhythmic \"thud thud thud\" that increases with engine RPM. It's a heavy, metallic sound - not a light tick. If you hear this, stop driving immediately."
      },
      {
        "question": "Can you fix rod knock without replacing the engine",
        "answer": "If caught very early (before the crankshaft journal is damaged), bearing replacement is possible for £800-£1,500. However, most rod knock is discovered too late, and the crank is already scored - requiring engine replacement (£2,500-£10,000+)."
      },
      {
        "question": "How much does it cost to fix engine knock",
        "answer": "Detonation knock: £150-£400 (fuel change, decarbonising). Rod knock bearing replacement: £800-£1,500. Rod knock engine replacement: £2,500-£10,000+. → Engine knock repair cost guide and → Engine replacement cost guide"
      },
      {
        "question": "Can I drive with engine knock",
        "answer": "If it's detonation knock (metallic rattle under load), you can drive gently to a garage. If it's rod knock (deep, rhythmic knock), stop driving immediately. Continuing will destroy the engine."
      },
      {
        "question": "What's the difference between rod knock and lifter tick",
        "answer": "Lifter tick is a high-pitched tapping (like a sewing machine) that may change with oil viscosity. Rod knock is a deep, heavy knock (like a hammer hitting the block) that increases with RPM. Lifter tick is less urgent; rod knock is an emergency."
      },
      {
        "question": "Is engine knock covered under warranty",
        "answer": "On reconditioned engines, warranty covers internal component failure but excludes failure caused by oil starvation or neglect. On used cars, engine knock is rarely covered under standard warranties. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      }
    ]
  },
  "engine-management-light": {
    "sections": [
      {
        "title": "Urgency guide",
        "paragraphs": [
          "The colour and behaviour of your engine management light tells you how urgent the problem is."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "The colour and behaviour of your engine management light tells you how urgent the problem is. Amber - steady Fault detected - engine can still run Book diagnostic within 1-2 weeks Amber - flashing Cat/DPF damage occurring Stop driving immediately - call recovery Red engine light Serious fault - oil pressure, coolant temp, or major failure Stop driving immediately - call recovery Light on but car runs fine Likely emissions-related fault Book diagnostic within weeks 🚨 Critical warning: A flashing amber engine management light means unburnt fuel is entering the catalytic converter (petrol) or DPF (diesel). This fuel ignites inside the converter, melting the ceramic substrate. A £100 sensor replacement becomes a £1,000 cat replacement. Stop driving immediately. Common causes of engine management light"
      },
      {
        "title": "What's triggering your EML-",
        "paragraphs": [
          "Market context: Based on Engines Market enquiry volumes, BMW N47D20C (1,450 requests [EM-VERIFIED]), Mercedes OM651 (1,250), VW/Audi EA189 (1,050), and Ford DV6 (780) are among the most frequently requested engines. EML triggers on these engines are often traced to injector issues (diesel), EGR problems, or timing correlation faults. [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Repair Cost",
              "Typical Fault Codes"
            ],
            "rows": [
              [
                "Loose or faulty fuel cap",
                "EVAP leak - cap not sealed",
                "£0 - £30",
                "P0440, P0442, P0455, P0456"
              ],
              [
                "Oxygen (lambda) sensor failure",
                "Sensor wears out - incorrect air/fuel ratio",
                "£100 - £350",
                "P0130-P0139, P0150-P0159"
              ],
              [
                "MAF sensor",
                "Dirty/failed - incorrect air measurement",
                "£80 - £250",
                "P0100-P0104, P0171, P0174"
              ],
              [
                "Ignition coil failure (petrol)",
                "Coil fails - misfire on one cylinder",
                "£70 - £220",
                "P0300-P0308"
              ],
              [
                "Spark plugs (worn)",
                "Electrode worn - weak or no spark",
                "£50 - £150",
                "P0300-P0308"
              ],
              [
                "EGR valve (diesel)",
                "Stuck or clogged with carbon",
                "£135 - £650",
                "P0400-P0409"
              ],
              [
                "DPF pressure sensor (diesel)",
                "Sensor fails - incorrect pressure reading",
                "£150 - £400",
                "P0470-P0474, P2452-P2455"
              ],
              [
                "Catalytic converter",
                "Converter failing or O2 sensors reading incorrectly",
                "£500 - £2,500",
                "P0420, P0430"
              ],
              [
                "Injector failure (diesel)",
                "Injector stuck or leaking",
                "£120 - £900",
                "P0200-P0208"
              ],
              [
                "Cam/crank correlation",
                "Timing chain/belt stretched or jumped",
                "£300 - £1,800",
                "P0016-P0019"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Getting the fault code",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Action",
              "Typical Cost",
              "What You Learn"
            ],
            "rows": [
              [
                "1",
                "OBD2 scan (DIY reader)",
                "£20 - £50",
                "Fault code (e.g., P0420) - limited interpretation"
              ],
              [
                "2",
                "Garage diagnostic scan",
                "£50 - £120",
                "Fault code + live data + freeze frame"
              ],
              [
                "3",
                "Code interpretation",
                "Included",
                "Which system failed and under what conditions"
              ],
              [
                "4",
                "Targeted further diagnosis",
                "£50 - £200",
                "Confirms exact cause before repair"
              ],
              [
                "5",
                "Repair",
                "£50 - £2,500+",
                "Fix the root cause, not just clear the code"
              ]
            ]
          }
        ],
        "additionalText": "Step Action Typical Cost What You Learn 1 OBD2 scan (DIY reader) £20 - £50 Fault code (e.g., P0420) - limited interpretation 2 Garage diagnostic scan £50 - £120 Fault code + live data + freeze frame 3 Code interpretation Included Which system failed and under what conditions 4 Targeted further diagnosis £50 - £200 Confirms exact cause before repair 5 Repair £50 - £2,500+ Fix the root cause, not just clear the code Specialist rule of thumb: \"Never replace a part based only on a fault code. A code is a symptom, not a diagnosis. P0420 doesn't mean 'replace the cat' - it means 'the ECU thinks the cat isn't working efficiently.' That could be the cat, an O2 sensor, an exhaust leak, or even bad fuel. Diagnose before you spend.\" Common fault codes and what they mean"
      },
      {
        "title": "Understanding the code",
        "paragraphs": [
          "Market Intelligence (P0420/P0430): These are among the most common fault codes on higher-mileage petrol vehicles. Based on Engines Market enquiry volumes, BMW N47 (1,450 requests) and VW EA189 (1,050) are frequently requested engines - many owners with high-mileage diesel vehicles also report DPF-related codes (P0470, P2452) which trigger the engine management light. [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Fault Code",
              "Meaning",
              "Most Likely Cause",
              "Typical Repair Cost"
            ],
            "rows": [
              [
                "P0420 / P0430",
                "Catalyst efficiency below threshold",
                "Catalytic converter or oxygen sensor",
                "£150 - £2,500"
              ],
              [
                "P0171 / P0174",
                "System too lean",
                "Vacuum leak, MAF sensor, fuel delivery",
                "£50 - £500"
              ],
              [
                "P0300-P0308",
                "Misfire detected",
                "Spark plugs, ignition coil, injector, or compression",
                "£50 - £3,500+"
              ],
              [
                "P0400-P0409",
                "EGR system malfunction",
                "Clogged EGR valve, position sensor",
                "£135 - £650"
              ],
              [
                "P0440-P0456",
                "EVAP emission system leak",
                "Loose fuel cap (most common), purge valve, leak",
                "£0 - £300"
              ],
              [
                "P0100-P0104",
                "MAF sensor circuit",
                "Dirty/failed MAF sensor, air leak",
                "£80 - £250"
              ],
              [
                "P0130-P0139",
                "Oxygen sensor circuit",
                "Failed lambda sensor, wiring",
                "£100 - £350"
              ],
              [
                "P0016-P0019",
                "Cam/crank correlation",
                "Stretched timing chain/belt, jumped timing",
                "£300 - £1,800"
              ],
              [
                "P0470-P0474",
                "DPF pressure sensor",
                "Failed sensor, blocked DPF",
                "£150 - £800"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Engines with known EML issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain stretch (P0016-P0019), injector failure, EGR cooler (recall). Chain: £650-£1,800. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Injector seal failure (Black Death) - carbon buildup. Seals: £400-£1,200. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] EGR clogging, DPF blockage, injector coking - Dieselgate software increased failures. Land Rover 204DTD (Ingenium) 60k-120k 1,150 [EM-VERIFIED] Timing chain tensioner, EGR cooler leaks, DPF regeneration issues. Pre-2019 most affected. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Injector failure, DPF clogging, EGR valve. One of the most frequent diesel EML repairs. Ford EcoBoost 1.0 (early) 60k-100k 185 [EM-VERIFIED] Wet belt degradation - low oil pressure triggers EML. Belt: £600-£1,500. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Amber light, car runs fine Ignore for months - emissions fault may worsen £50-£120 diagnostic + repair Amber flashing light Continue driving - unburnt fuel destroys cat/DPF £500 - £2,500 + original repair Ignored misfire (EML on) Drive until engine runs rough - cat/DPF damage £500 - £2,500 + repair Ignored timing correlation (P0016-P0019) Continue driving - valves contact pistons £2,500 - £6,500+ Cleared code without repair Fault returns - may have worsened Full repair + possible additional damage Real-world example: A 2013 BMW 320d N47 owner saw the EML come on (amber, steady). Diagnostic showed P0016 (cam/crank correlation). The owner cleared the code and continued driving. The timing chain stretched further over 2,000 miles, eventually jumping teeth and causing valve/piston contact. Total cost: £4,800 for a reconditioned engine. The same owner could have paid £1,200 for a timing chain replacement when the EML first appeared. What NOT to do when the EML comes on"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Amber light, car runs fine Ignore for months - emissions fault may worsen £50-£120 diagnostic + repair Amber flashing light Continue driving - unburnt fuel destroys cat/DPF £500 - £2,500 + original repair Ignored misfire (EML on) Drive until engine runs rough - cat/DPF damage £500 - £2,500 + repair Ignored timing correlation (P0016-P0019) Continue driving - valves contact pistons £2,500 - £6,500+ Cleared code without repair Fault returns - may have worsened Full repair + possible additional damage Real-world example: A 2013 BMW 320d N47 owner saw the EML come on (amber, steady). Diagnostic showed P0016 (cam/crank correlation). The owner cleared the code and continued driving. The timing chain stretched further over 2,000 miles, eventually jumping teeth and causing valve/piston contact. Total cost: £4,800 for a reconditioned engine. The same owner could have paid £1,200 for a timing chain replacement when the EML first appeared. What NOT to do when the EML comes on"
      },
      {
        "title": "Avoid these common mistakes",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Don't",
              "Why"
            ],
            "rows": [
              [
                "Clear the code without investigating",
                "The code is evidence. Clearing it removes the evidence and you lose freeze frame data"
              ],
              [
                "Assume you know the fix from the code alone",
                "P0420 doesn't mean \"replace the cat\" - it could be an O2 sensor, exhaust leak, or wiring"
              ],
              [
                "Ignore a flashing EML",
                "You are destroying your cat (petrol) or DPF (diesel) - £500-£2,500 damage"
              ],
              [
                "Continue driving with a red engine light",
                "On most cars, a red engine light indicates oil pressure or coolant temp - engine damage imminent"
              ],
              [
                "Buy parts before a proper diagnosis",
                "Many people replace oxygen sensors (£150) when the problem was a vacuum leak (£50)"
              ]
            ]
          }
        ],
        "additionalText": "Don't Why Clear the code without investigating The code is evidence. Clearing it removes the evidence and you lose freeze frame data Assume you know the fix from the code alone P0420 doesn't mean \"replace the cat\" - it could be an O2 sensor, exhaust leak, or wiring Ignore a flashing EML You are destroying your cat (petrol) or DPF (diesel) - £500-£2,500 damage Continue driving with a red engine light On most cars, a red engine light indicates oil pressure or coolant temp - engine damage imminent Buy parts before a proper diagnosis Many people replace oxygen sensors (£150) when the problem was a vacuum leak (£50) Specialist rule of thumb: \"The most expensive diagnostic is the one you do yourself by buying parts you don't need. A £100 garage diagnostic is cheaper than a £300 oxygen sensor that doesn't fix the problem.\" Preventative maintenance"
      },
      {
        "title": "Avoiding EML triggers",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Tighten fuel cap after refuelling",
                "£0",
                "High",
                "Every fill-up"
              ],
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Very high",
                "Every 6,000-10,000 miles"
              ],
              [
                "Spark plug replacement (petrol)",
                "£50 - £150",
                "High",
                "Every 60k-80k miles"
              ],
              [
                "Use quality fuel (diesel)",
                "+5-10p per litre",
                "Medium",
                "Every 3-4 fill-ups"
              ],
              [
                "Occasional motorway drive (diesel)",
                "£0",
                "High",
                "Every 2-4 weeks"
              ],
              [
                "Address EML promptly",
                "£50 - £120",
                "Very high",
                "When light appears"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Tighten fuel cap after refuelling £0 High Every fill-up Regular oil changes (correct spec) £50 - £150 Very high Every 6,000-10,000 miles Spark plug replacement (petrol) £50 - £150 High Every 60k-80k miles Use quality fuel (diesel) +5-10p per litre Medium Every 3-4 fill-ups Occasional motorway drive (diesel) £0 High Every 2-4 weeks Address EML promptly £50 - £120 Very high When light appears Specialist rule of thumb: \"The most common reason for an engine management light on a modern diesel is a blocked DPF from too many short journeys. If you only drive short distances, take the car for a 30-minute motorway run every couple of weeks. It prevents thousands of pounds in DPF repairs.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does engine management light diagnosis cost in the UK",
        "answer": "DIY OBD2 code reader: £20-£50 (one-time purchase). Garage diagnostic scan: £50-£120. Professional interpretation includes live data and freeze frame. Some garages offer free scan with subsequent repair. → Engine diagnostic cost guide"
      },
      {
        "question": "What should I do if my engine management light comes on",
        "answer": "If the light is amber and steady, book a diagnostic within 1-2 weeks. If the light is amber and flashing, stop driving immediately - catalytic converter or DPF damage is occurring. If the light is red, stop driving immediately - serious mechanical failure or low oil pressure."
      },
      {
        "question": "Can I drive with the engine management light on",
        "answer": "If the light is amber and steady, and the car runs fine, you can drive gently to a garage for diagnostic. If the light is flashing, do not drive - call recovery. If the light is red, do not drive - call recovery."
      },
      {
        "question": "What does a flashing engine management light mean",
        "answer": "On petrol engines: unburnt fuel is entering the catalytic converter, melting the internal substrate. On diesel engines: unburnt fuel is entering the DPF, causing blockage and potential damage. In both cases, continued driving will cause £500-£2,500 damage."
      },
      {
        "question": "How do I read engine management light fault codes",
        "answer": "You can buy a basic OBD2 code reader (£20-£50) that plugs into the diagnostic port (usually under the steering wheel). It will display a code like P0420. However, a code alone doesn't tell you the whole story. A garage diagnostic (£50-£120) includes professional interpretation and live data - worth the extra cost."
      },
      {
        "question": "Is it safe to clear the engine management light myself",
        "answer": "You can clear the code with a DIY reader, but the light will return if the fault isn't fixed. Worse, you lose the freeze frame data (engine conditions when fault occurred) that helps with accurate diagnosis. Never clear a code without investigating it first."
      },
      {
        "question": "What are the most common engine management light fault codes",
        "answer": "P0420/P0430 (catalyst efficiency), P0171/P0174 (lean mixture), P0300-P0308 (misfire), P0400-P0409 (EGR system), P0440-P0456 (EVAP leak - often loose fuel cap). The most expensive to ignore is P0016-P0019 (cam/crank correlation) - can lead to engine replacement."
      }
    ]
  },
  "engine-seizure": {
    "sections": [
      {
        "title": "How an engine seizes - stage by stage",
        "paragraphs": [
          "Catching warning signs early is your only chance to avoid a full engine replacement. Click any stage to see full detail.",
          "Bearing wear or oil starvation beginning. Oil pressure has dropped below safe levels.",
          "Stop driving immediately. Book a diagnostic inspection. If caught early, bearing replacement may be possible.",
          "£800-£2,000 for bearing replacement if caught immediately. Labour: 15-20 hours.",
          "Bearings failing, piston scoring, cylinder head warping. Internal damage is already extensive.",
          "Stop driving. Arrange recovery. Engine replacement is the likely outcome - repair is no longer viable.",
          "£2,500-£6,000 for reconditioned engine replacement. Used engine may be cheaper but with less warranty.",
          "Pistons seized in cylinders, bearings welded to crankshaft. Complete engine failure.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£1,500-£12,000+ for engine replacement depending on condition (used, reconditioned, or new)."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching warning signs early is your only chance to avoid a full engine replacement. Click any stage to see full detail. £800 Knocking noise, low oil pressure warning Bearing wear or oil starvation beginning £800 - £2,000 £2,500 Loud knock, metal in oil, severe overheating Bearings failing, piston scoring, head warping £2,500 - £6,000 £12,000+ Engine stops - won't turn over Pistons seized, bearings welded to crank £1,500 - £12,000+ Likely cause Bearing wear or oil starvation beginning. Oil pressure has dropped below safe levels. What to do Stop driving immediately. Book a diagnostic inspection. If caught early, bearing replacement may be possible. Repair cost £800-£2,000 for bearing replacement if caught immediately. Labour: 15-20 hours. Likely cause Bearings failing, piston scoring, cylinder head warping. Internal damage is already extensive. What to do Stop driving. Arrange recovery. Engine replacement is the likely outcome - repair is no longer viable. Repair cost £2,500-£6,000 for reconditioned engine replacement. Used engine may be cheaper but with less warranty. Likely cause Pistons seized in cylinders, bearings welded to crankshaft. Complete engine failure. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £1,500-£12,000+ for engine replacement depending on condition (used, reconditioned, or new). What causes engine seizure-"
      },
      {
        "title": "The four failures that seize engines",
        "paragraphs": [
          "Engine seizure is almost always caused by one of four failures."
        ],
        "bullets": [
          "• Low oil level - owner neglected to check or top up",
          "• Oil pump failure - no oil circulation (common on Land Rover 276DT, BMW N57)",
          "• Oil contamination - coolant or fuel in oil destroys lubrication",
          "• Missed oil changes - oil turns to sludge, blocks oil galleries",
          "• Coolant loss - leaking radiator, hose, water pump, or head gasket",
          "• Coolant pump failure - no circulation",
          "• Thermostat stuck closed - engine overheats rapidly",
          "• Driving with overheating - ignoring temperature gauge",
          "• Timing belt snaps on interference engine - valves hit pistons, engine stops",
          "• Timing chain snaps - same catastrophic result",
          "• Blown head gasket fills cylinder with coolant",
          "• Cracked cylinder head or block",
          "• Water ingress - driving through deep water"
        ],
        "tables": [],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warnings",
        "paragraphs": [
          "Most seized engines give clear warnings before failure. If you experience any of these, stop driving immediately."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Warning Sign",
              "What It Means",
              "Urgency"
            ],
            "rows": [
              [
                "Low oil pressure warning light (red oil can)",
                "Oil pressure below safe level - bearings are running dry",
                "🚨 STOP IMMEDIATELY"
              ],
              [
                "Knocking noise that increases with engine RPM",
                "Bearing wear or failure - crank may be damaged",
                "🚨 STOP IMMEDIATELY"
              ],
              [
                "Temperature gauge in red / overheating warning",
                "Coolant loss or circulation failure - engine will warp or seize",
                "🚨 STOP IMMEDIATELY"
              ],
              [
                "Oil light flickering at idle",
                "Oil pressure dangerously low",
                "⚠️ Investigate urgently"
              ],
              [
                "Metal particles / glitter in oil",
                "Bearing or piston material in oil - internal damage occurring",
                "⚠️ Investigate urgently"
              ],
              [
                "Engine loses power, runs rough, misfires",
                "Timing may have jumped; internal damage possible",
                "⚠️ Stop driving"
              ]
            ]
          }
        ],
        "additionalText": "Most seized engines give clear warnings before failure. If you experience any of these, stop driving immediately. Warning Sign What It Means Urgency Low oil pressure warning light (red oil can) Oil pressure below safe level - bearings are running dry 🚨 STOP IMMEDIATELY Knocking noise that increases with engine RPM Bearing wear or failure - crank may be damaged 🚨 STOP IMMEDIATELY Temperature gauge in red / overheating warning Coolant loss or circulation failure - engine will warp or seize 🚨 STOP IMMEDIATELY Oil light flickering at idle Oil pressure dangerously low ⚠️ Investigate urgently Metal particles / glitter in oil Bearing or piston material in oil - internal damage occurring ⚠️ Investigate urgently Engine loses power, runs rough, misfires Timing may have jumped; internal damage possible ⚠️ Stop driving 🚨 Critical warning: If you see a red oil pressure warning light or hear a deep knocking noise, stop driving immediately. Continuing to drive will turn a £800-£2,000 bearing repair into a £2,500-£6,000+ engine replacement. What happens when an engine seizes"
      },
      {
        "title": "The internal destruction explained",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Component",
              "What Happens"
            ],
            "rows": [
              [
                "Pistons",
                "Overheat and expand, welding to cylinder walls. Piston rings collapse."
              ],
              [
                "Bearings (main and rod)",
                "Oil film fails. Bearings melt and weld to the crankshaft journals."
              ],
              [
                "Crankshaft",
                "Journals become scored or seized. May snap if sudden seizure."
              ],
              [
                "Connecting rods",
                "May bend or snap if piston seizes while crank still tries to turn."
              ],
              [
                "Cylinder walls",
                "Scored beyond repair. Rebore or replacement required."
              ],
              [
                "Cylinder head",
                "May crack from overheating. Valves may contact pistons if timing failed."
              ]
            ]
          }
        ],
        "additionalText": "Component What Happens Pistons Overheat and expand, welding to cylinder walls. Piston rings collapse. Bearings (main and rod) Oil film fails. Bearings melt and weld to the crankshaft journals. Crankshaft Journals become scored or seized. May snap if sudden seizure. Connecting rods May bend or snap if piston seizes while crank still tries to turn. Cylinder walls Scored beyond repair. Rebore or replacement required. Cylinder head May crack from overheating. Valves may contact pistons if timing failed. Result: The engine cannot be turned over by hand or by starter motor. The only solution is complete engine replacement. No amount of \"engine flush\" or \"seized engine repair\" products will fix a seized engine. Repair vs replace - why replacement is the only option"
      },
      {
        "title": "Can a seized engine be repaired-",
        "paragraphs": [
          "Not every engine failure requires a full replacement. However, seizure is the exception - internal damage is so extensive that replacement is almost always the only practical option. Our price comparison service focuses on replacement options."
        ],
        "bullets": [
          "No. A seized engine has suffered catastrophic internal damage.",
          "The cost to strip, inspect, machine, and rebuild a seized engine almost always exceeds the cost of a reconditioned replacement engine - often by a significant margin.",
          "Some companies claim to \"unseize\" engines by filling cylinders with penetrating oil and forcing the crank to turn.",
          "This may free a lightly seized engine (often from sitting for years), but it does not repair the underlying damage.",
          "Scored cylinder walls, damaged bearings, and warped components remain. The engine will fail again, usually within months."
        ],
        "tables": [],
        "additionalText": "✓ Can a seized engine be repaired- No. A seized engine has suffered catastrophic internal damage. The cost to strip, inspect, machine, and rebuild a seized engine almost always exceeds the cost of a reconditioned replacement engine - often by a significant margin. ✗ What about \"seized engine repair\" services- Some companies claim to \"unseize\" engines by filling cylinders with penetrating oil and forcing the crank to turn. This may free a lightly seized engine (often from sitting for years), but it does not repair the underlying damage. Scored cylinder walls, damaged bearings, and warped components remain. The engine will fail again, usually within months. Specialist rule of thumb (UK): \"If an engine seized while running, replace it. Don't waste money on repairs. The block is almost certainly damaged, and rebuilding costs will exceed a warranted reconditioned unit.\" Not every engine failure requires a full replacement. However, seizure is the exception - internal damage is so extensive that replacement is almost always the only practical option. Our price comparison service focuses on replacement options. Engine replacement cost by condition"
      },
      {
        "title": "What you should expect to pay for a seized engine replacement",
        "paragraphs": [
          "Cost ranges based on EM_Proprietary_Data_2025 Tier 0 data for reconditioned (£2,100-£3,500 supply) and used engines, scaled for seizure replacement scenarios [ESTIMATED for used/new extremes]. Labour: 6-20 hours depending on engine layout."
        ],
        "bullets": [
          "• Replacement engine (used, reconditioned, rebuilt, or new)",
          "• New gaskets, seals, and timing components (on reconditioned/rebuilt)",
          "• Oil, filter, coolant, and other fluids",
          "• Labour for removal and installation (8-20 hours depending on engine)",
          "• Warranty (varies by supplier and engine condition)"
        ],
        "tables": [
          {
            "headers": [
              "Condition",
              "Supply Only",
              "Fitted (Independent)",
              "Warranty",
              "Best For"
            ],
            "rows": [
              [
                "Used engine",
                "£800 - £2,500",
                "£1,500 - £4,000",
                "1-6 months",
                "Low-value vehicles (under £3k-£4k), budget priority"
              ],
              [
                "Reconditioned engine",
                "£1,800 - £4,500",
                "£2,500 - £6,000",
                "6-24 months",
                "Most owners - best value, warranty protection"
              ],
              [
                "Rebuilt engine",
                "£3,000 - £6,000",
                "£4,000 - £8,000",
                "12-24 months",
                "Long-term ownership, performance upgrades"
              ],
              [
                "New engine",
                "£4,500 - £10,000+",
                "£5,000 - £12,000+",
                "12-24 months",
                "Insurance claims, high-value vehicles"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Is engine replacement economical-",
        "paragraphs": [
          "Engine replacement is expensive. On lower-value vehicles, replacement may cost more than the car is worth.",
          "If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Engine replacement is expensive. On lower-value vehicles, replacement may cost more than the car is worth. Vehicle Value Recommended Action Reasoning Under £2,000 Scrap the vehicle Replacement cost (£1,500+) likely exceeds vehicle value £2,000 - £3,500 Used engine replacement (if car is otherwise excellent) Used engine fitted £1,500-£2,500 - borderline but possible £3,500 - £6,000 Used or reconditioned engine Evaluate both options; reconditioned provides warranty £6,000 - £12,000 Reconditioned or rebuilt engine Warranty justifies cost; replacement well within value £12,000+ Reconditioned, rebuilt, or new engine Replacement cost small relative to vehicle value If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Before scrapping, consider: Is the car otherwise in excellent condition (body, interior, suspension)- Are you emotionally attached- Is the car rare or collectable- Can you source a low-mileage used engine at a reasonable cost- If the answer to most is \"no\", scrapping may be the most economical decision. Check your vehicle's value and compare replacement quotes → Get quotes Affected engines - seizure risk"
      },
      {
        "title": "Based on 2025 data",
        "paragraphs": [
          "Oil starvation and timing failure are the two most common paths to engine seizure, particularly on high-mileage diesel engines."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Oil starvation and timing failure are the two most common paths to engine seizure, particularly on high-mileage diesel engines. Land Rover 306DT (SDV6/TDV6 3.0) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure - 5k oil intervals; investigate cold-start knock immediately BMW N57D30 80k-150k 830 [EM-VERIFIED] Oil pump failure; crankshaft bearing issues - premium oil spec; chain inspection at 80k Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - oil pump inspection via sump; investigate any cold knock VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] DPF blockage can cause overheating; oil dilution - DPF-friendly driving; regular oil changes Ford 1.0 EcoBoost (early) 60k-100k 185 [EM-VERIFIED] Wet belt degrades, blocks oil pickup - preventative belt replacement at 60k or 6 years Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], oil starvation and timing failure are the two most common paths to engine seizure, particularly on high-mileage diesel engines (80k-150k miles)."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], oil starvation and timing failure are the two most common paths to engine seizure, particularly on high-mileage diesel engines (80k-150k miles). 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Land Rover 306DT (SDV6/TDV6) Crankshaft bearing failure - 980 requests [EM-VERIFIED] 980 requests [EM-VERIFIED] BMW N57D30 Oil pump failure - 830 requests [EM-VERIFIED] 830 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI DPF blockage causing overheating - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Land Rover 276DT (2.7 TDV6) Oil pump housing failure - 700 requests [EM-VERIFIED] 700 requests [EM-VERIFIED] Known failure insight \"The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980]. Specialists report catastrophic bearing failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning. Ignoring this knock leads to complete engine seizure.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Preventative maintenance - regular oil changes and timing belt replacement - is the single most effective way to avoid seizure. What to do if your engine has seized"
      },
      {
        "title": "Step-by-step guide",
        "paragraphs": [
          "Step 1 Do NOT try to start the engine If the engine won't turn over, don't keep trying. You'll only cause more damage. Step 2 Confirm seizure Try to turn the crankshaft pulley bolt by hand (with a breaker bar). If it won't move, the engine is seized. A mechanic can perform a \"bar over\" test. Step 3 Decide on replacement or scrap Get quotes for used and reconditioned engine replacement. Compare against your vehicle's current market value. Factor in the car's overall condition. Step 4 Get replacement quotes Engines Market connects you with 100+ UK specialist suppliers. One enquiry, multiple quotes. Compare used, reconditioned, rebuilt, and new options. Get engine replacement quotes for your seized engine → Get quotes Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Step 1 Do NOT try to start the engine If the engine won't turn over, don't keep trying. You'll only cause more damage. Step 2 Confirm seizure Try to turn the crankshaft pulley bolt by hand (with a breaker bar). If it won't move, the engine is seized. A mechanic can perform a \"bar over\" test. Step 3 Decide on replacement or scrap Get quotes for used and reconditioned engine replacement. Compare against your vehicle's current market value. Factor in the car's overall condition. Step 4 Get replacement quotes Engines Market connects you with 100+ UK specialist suppliers. One enquiry, multiple quotes. Compare used, reconditioned, rebuilt, and new options. Get engine replacement quotes for your seized engine → Get quotes Preventative maintenance"
      },
      {
        "title": "Avoiding engine seizure",
        "paragraphs": [
          "Engine seizure is almost entirely preventable with proper maintenance."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Engine seizure is almost entirely preventable with proper maintenance. 01 Check oil level weekly Top up if low. Low oil is the #1 cause of seizure. 02 Never ignore the oil pressure warning light Stop immediately if it comes on - bearings are running dry. 03 Regular oil changes Every 6k-12k miles depending on manufacturer spec. Old oil turns to sludge and blocks oil galleries. 04 Monitor coolant level Slow loss indicates a leak that needs investigation. 05 Never drive with overheating Pull over immediately and investigate. Preventative maintenance (per year) £150-£300 Oil changes, coolant checks, basic servicing VS Catastrophic failure - engine replacement £1,500-£12,000+ Used, reconditioned, or new engine The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "Can a seized engine be repaired",
        "answer": "No. A seized engine has suffered catastrophic internal damage - pistons welded to cylinders, bearings fused to the crankshaft, or connecting rods snapped. The only solution is complete engine replacement. Do not waste money on \"unseizing\" services - they do not fix the underlying damage."
      },
      {
        "question": "How much does it cost to replace a seized engine in the UK",
        "answer": "Used engine fitted: £1,500-£4,000. Reconditioned engine fitted: £2,500-£6,000. New engine fitted: £5,000-£12,000+. Costs vary by engine type, vehicle model, and labour rates. → Engine replacement cost guide"
      },
      {
        "question": "What causes an engine to seize",
        "answer": "Most common causes: oil starvation (low oil, oil pump failure, missed oil changes), overheating (coolant loss, coolant pump failure), timing failure (snapped belt/chain on interference engine), or hydrolock (coolant in cylinders)."
      },
      {
        "question": "What are the signs of an engine about to seize",
        "answer": "Low oil pressure warning light, knocking noise (especially deep knock), overheating, metal particles in oil, loss of power. If you experience any of these, stop driving immediately."
      },
      {
        "question": "Is engine seizure covered under warranty",
        "answer": "On reconditioned engines, warranty typically covers internal component failure but excludes seizure caused by oil starvation, overheating, or neglect. On used cars, engine seizure is rarely covered under standard warranties. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "My car is worth £2,500 and the engine seized - what should I do",
        "answer": "If replacement cost (£1,500-£3,000) exceeds 60% of vehicle value, evaluate scrap/part-ex value. A used engine fitted may be borderline; a reconditioned engine (£2,500-£4,000) is likely not economical. Consider scrapping or selling as a spares/repair vehicle."
      }
    ]
  },
  "engine-vibration": {
    "sections": [
      {
        "title": "At a glance",
        "paragraphs": [
          "Vibration at idle only Worn engine mounts (£150-£500) ✅ Can drive - book diagnostic Vibration under acceleration Misfire (plugs, coils, injectors) - £60-£800 ⚠️ Drive gently - EML flashing = stop Vibration on clutch engagement DMF failing (£500-£1,500) ⚠️ Short-term possible - book soon Constant heavy vibration - worsens with revs Internal engine imbalance (£2,000-£5,000+) 🚨 Stop immediately - call recovery 🚨 Critical warning - internal imbalance: If the whole car shakes violently and the vibration increases with engine RPM, stop driving immediately. This indicates a broken crankshaft, connecting rod failure, or a dropped valve. Continued driving will cause complete engine destruction (£2,500-£6,500+). 🚨 Flashing EML + vibration: If your engine management light is flashing while the engine vibrates, unburnt fuel is destroying your catalytic converter (petrol) or DPF (diesel). Stop driving immediately - repair cost escalates from £60-£800 to £1,000-£2,500. Cause 1 - worn engine mounts"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vibration at idle only Worn engine mounts (£150-£500) ✅ Can drive - book diagnostic Vibration under acceleration Misfire (plugs, coils, injectors) - £60-£800 ⚠️ Drive gently - EML flashing = stop Vibration on clutch engagement DMF failing (£500-£1,500) ⚠️ Short-term possible - book soon Constant heavy vibration - worsens with revs Internal engine imbalance (£2,000-£5,000+) 🚨 Stop immediately - call recovery 🚨 Critical warning - internal imbalance: If the whole car shakes violently and the vibration increases with engine RPM, stop driving immediately. This indicates a broken crankshaft, connecting rod failure, or a dropped valve. Continued driving will cause complete engine destruction (£2,500-£6,500+). 🚨 Flashing EML + vibration: If your engine management light is flashing while the engine vibrates, unburnt fuel is destroying your catalytic converter (petrol) or DPF (diesel). Stop driving immediately - repair cost escalates from £60-£800 to £1,000-£2,500. Cause 1 - worn engine mounts"
      },
      {
        "title": "Vibration at idle",
        "paragraphs": [
          "Engine mounts are rubber and hydraulic components that isolate engine vibration from the chassis. When they wear, crack, or collapse, the engine transmits vibration directly to the body - felt most strongly at idle."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Vehicle Type",
              "Parts Cost (per mount)",
              "Labour Hours",
              "Total Cost (one mount)",
              "Total Cost (full set)"
            ],
            "rows": [
              [
                "Small car (Fiesta, Corsa, Clio)",
                "£30 - £100",
                "1.5 - 2.5 hrs",
                "£100 - £250",
                "£150 - £400"
              ],
              [
                "Family car (Focus, Astra, Golf)",
                "£40 - £150",
                "2 - 3 hrs",
                "£150 - £350",
                "£200 - £500"
              ],
              [
                "Executive / SUV (BMW 3 Series, Q5, X3)",
                "£60 - £250",
                "2.5 - 4 hrs",
                "£200 - £500",
                "£300 - £700"
              ],
              [
                "Premium / Large SUV (Range Rover, X5, Q7)",
                "£80 - £350",
                "3 - 5 hrs",
                "£300 - £650",
                "£450 - £900"
              ]
            ]
          }
        ],
        "additionalText": "Engine mounts are rubber and hydraulic components that isolate engine vibration from the chassis. When they wear, crack, or collapse, the engine transmits vibration directly to the body - felt most strongly at idle. Vibration pattern: Steering wheel or seat vibration when stationary. Vibration reduces or disappears when driving. May also hear a clunk when accelerating or decelerating as the engine rocks on broken mounts. Vehicle Type Parts Cost (per mount) Labour Hours Total Cost (one mount) Total Cost (full set) Small car (Fiesta, Corsa, Clio) £30 - £100 1.5 - 2.5 hrs £100 - £250 £150 - £400 Family car (Focus, Astra, Golf) £40 - £150 2 - 3 hrs £150 - £350 £200 - £500 Executive / SUV (BMW 3 Series, Q5, X3) £60 - £250 2.5 - 4 hrs £200 - £500 £300 - £700 Premium / Large SUV (Range Rover, X5, Q7) £80 - £350 3 - 5 hrs £300 - £650 £450 - £900 Specialist rule of thumb: \"If you feel vibration at idle but the engine runs smoothly when revved in neutral, it's almost always engine mounts. A £200-£500 fix. Don't let anyone sell you spark plugs or injectors for idle vibration.\" Cause 2 - misfire"
      },
      {
        "title": "Vibration under acceleration",
        "paragraphs": [
          "One or more cylinders aren't firing correctly. The engine runs unevenly, producing a shaking or jerking sensation - most noticeable under load (acceleration, uphill)."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Repair Cost",
              "Most Common On"
            ],
            "rows": [
              [
                "Spark plugs (full set)",
                "£50 - £150",
                "All petrol engines >60k miles"
              ],
              [
                "Ignition coil (one)",
                "£70 - £220",
                "Ford EcoBoost, VW TSI, BMW N-series"
              ],
              [
                "Fuel injector (one - petrol/diesel)",
                "£120 - £900",
                "Direct injection petrol, all diesels"
              ],
              [
                "Vacuum / air leak",
                "£50 - £300",
                "All engines"
              ],
              [
                "Low compression (valves, rings)",
                "£800 - £3,500+",
                "High-mileage engines"
              ]
            ]
          }
        ],
        "additionalText": "One or more cylinders aren't firing correctly. The engine runs unevenly, producing a shaking or jerking sensation - most noticeable under load (acceleration, uphill). Vibration pattern: Engine shakes under acceleration, especially between 1,500-3,000 RPM. May be smooth at idle. Often accompanied by loss of power, poor fuel economy, and potentially a flashing engine management light. Cause Repair Cost Most Common On Spark plugs (full set) £50 - £150 All petrol engines >60k miles Ignition coil (one) £70 - £220 Ford EcoBoost, VW TSI, BMW N-series Fuel injector (one - petrol/diesel) £120 - £900 Direct injection petrol, all diesels Vacuum / air leak £50 - £300 All engines Low compression (valves, rings) £800 - £3,500+ High-mileage engines Diagnostic signs: Vibration under acceleration, smooth at idle Loss of power, especially uphill Poor fuel economy Engine management light (steady or flashing) Specialist rule of thumb (petrol): \"On a petrol engine with vibration under acceleration, swap the ignition coil with another cylinder. If the vibration moves, it's a £70-£220 coil. If it doesn't move, check spark plugs first - a full set is £50-£150.\" Cause 3 - dual-mass flywheel (DMF) failure"
      },
      {
        "title": "Vibration on clutch engagement",
        "paragraphs": [
          "The dual-mass flywheel absorbs torsional vibration from the engine. When its internal springs or bearings fail, it produces vibration specifically when engaging the clutch or during gear changes."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Vehicle Type",
              "DMF Parts Cost",
              "Clutch Kit (recommended)",
              "Total Cost (DMF + clutch)"
            ],
            "rows": [
              [
                "Small car (Fiesta, Corsa)",
                "£300 - £500",
                "£100 - £200",
                "£500 - £900"
              ],
              [
                "Family car (Focus, Golf)",
                "£400 - £700",
                "£150 - £300",
                "£650 - £1,200"
              ],
              [
                "Executive / SUV (BMW 3 Series, A4)",
                "£500 - £900",
                "£200 - £400",
                "£800 - £1,500"
              ],
              [
                "Premium / Large SUV (Range Rover, X5)",
                "£600 - £1,200",
                "£300 - £600",
                "£1,000 - £2,000"
              ]
            ]
          }
        ],
        "additionalText": "The dual-mass flywheel absorbs torsional vibration from the engine. When its internal springs or bearings fail, it produces vibration specifically when engaging the clutch or during gear changes. Vibration pattern: Vibration or judder when pulling away from a stop. Rattle or knocking noise at idle that disappears when the clutch pedal is pressed. Vehicle Type DMF Parts Cost Clutch Kit (recommended) Total Cost (DMF + clutch) Small car (Fiesta, Corsa) £300 - £500 £100 - £200 £500 - £900 Family car (Focus, Golf) £400 - £700 £150 - £300 £650 - £1,200 Executive / SUV (BMW 3 Series, A4) £500 - £900 £200 - £400 £800 - £1,500 Premium / Large SUV (Range Rover, X5) £600 - £1,200 £300 - £600 £1,000 - £2,000 Specialist rule of thumb: \"If you hear a rattle at idle that goes away when you press the clutch, it's almost always the dual-mass flywheel. Replace the clutch at the same time - the gearbox is already off, and you'll pay the same labour.\" Cause 4 - internal engine imbalance"
      },
      {
        "title": "Stop driving immediately",
        "paragraphs": [
          "A catastrophic internal failure - broken crankshaft, connecting rod failure, spun bearing, or piston seizure. The rotating assembly is no longer balanced."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Typical Repair Cost",
              "Notes"
            ],
            "rows": [
              [
                "Broken crankshaft",
                "£2,500 - £5,000+",
                "Rare - usually from oil starvation or over-revving"
              ],
              [
                "Connecting rod failure",
                "£2,500 - £6,500+",
                "Often preceded by rod knock"
              ],
              [
                "Spun bearing",
                "£2,500 - £5,000+",
                "Caused by low oil pressure"
              ],
              [
                "Piston seizure",
                "£2,500 - £6,500+",
                "Overheating or oil starvation"
              ]
            ]
          }
        ],
        "additionalText": "A catastrophic internal failure - broken crankshaft, connecting rod failure, spun bearing, or piston seizure. The rotating assembly is no longer balanced. 🚨 This is an emergency. Stop driving immediately. Vibration pattern: Constant, heavy vibration that increases with engine RPM. The whole car shakes. Often accompanied by knocking noises, loss of oil pressure, or metal in oil. Cause Typical Repair Cost Notes Broken crankshaft £2,500 - £5,000+ Rare - usually from oil starvation or over-revving Connecting rod failure £2,500 - £6,500+ Often preceded by rod knock Spun bearing £2,500 - £5,000+ Caused by low oil pressure Piston seizure £2,500 - £6,500+ Overheating or oil starvation Market context - Land Rover 306DT crankshaft failure: Based on KNOWN FAILURE PATTERNS, the Land Rover 306DT (SDV6/TDV6 3.0) generated 980 quote requests in 2025 [EM-VERIFIED] and is known for catastrophic crankshaft bearing failure between 80,000-140,000 miles. Cold-start knock is the early warning. Red flag engines - prone to vibration-related failure"
      },
      {
        "title": "Engines with known vibration issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 2007-2015 1,450 [EM-VERIFIED] Injector failure or timing chain stretch causing vibration Mercedes OM651 2008-2018 1,250 [EM-VERIFIED] Injector seal failure (\"Black Death\") causing misfire vibration Land Rover 204DTD (Ingenium D) 2015-2019 1,150 [EM-VERIFIED] Timing chain tensioner failure or EGR-related vibration Land Rover 306DT (SDV6/TDV6) 2010-2016 980 [EM-VERIFIED] Crankshaft bearing failure - internal imbalance. Cold-start knock is early warning. VW/Audi EA189 2.0 TDI 2008-2015 1,050 [EM-VERIFIED] Injector coking or DPF blockage causing vibration under load Ford EcoBoost 1.0 (early) 2012-2018 185 [EM-VERIFIED] Misfire from ignition coil failure or wet belt debris Diagnostic process"
      },
      {
        "title": "Finding the cause",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Action",
              "Typical Cost",
              "What It Tells You"
            ],
            "rows": [
              [
                "1",
                "Identify vibration pattern",
                "£0",
                "Narrows to mounts, misfire, DMF, or internal damage"
              ],
              [
                "2",
                "Visual inspection of engine mounts",
                "Included",
                "Cracked/collapsed rubber = worn mounts (£150-£500)"
              ],
              [
                "3",
                "OBD2 diagnostic scan",
                "£50 - £120",
                "Fault codes P0300-P0308 = misfire (£60-£800)"
              ],
              [
                "4",
                "Test drive - replicate vibration",
                "Included",
                "Identifies RPM range and conditions"
              ],
              [
                "5",
                "Compression test (if misfire suspected)",
                "£80 - £150",
                "Low compression = internal damage"
              ],
              [
                "6",
                "Clutch pedal test",
                "£0",
                "Rattle disappears when pressed = DMF failure"
              ],
              [
                "7",
                "Oil pressure test (if internal failure suspected)",
                "£50 - £100",
                "Low pressure = bearing or oil pump failure"
              ]
            ]
          }
        ],
        "additionalText": "Step Action Typical Cost What It Tells You 1 Identify vibration pattern £0 Narrows to mounts, misfire, DMF, or internal damage 2 Visual inspection of engine mounts Included Cracked/collapsed rubber = worn mounts (£150-£500) 3 OBD2 diagnostic scan £50 - £120 Fault codes P0300-P0308 = misfire (£60-£800) 4 Test drive - replicate vibration Included Identifies RPM range and conditions 5 Compression test (if misfire suspected) £80 - £150 Low compression = internal damage 6 Clutch pedal test £0 Rattle disappears when pressed = DMF failure 7 Oil pressure test (if internal failure suspected) £50 - £100 Low pressure = bearing or oil pump failure Diagnostic rule: \"Never replace engine mounts based on vibration alone. A misfire can feel like a shaky engine mount at idle. Always do an OBD2 scan first - it's £50-£120 and will tell you if there's a misfire code before you spend £150-£500 on mounts that won't fix the problem.\" Repair or replace-"
      },
      {
        "title": "Vehicle value threshold",
        "paragraphs": [
          "If vibration diagnosis reveals internal engine damage (broken crank, rod failure, spun bearing, or low compression requiring major rebuild), the economics often depend on vehicle value.",
          "For minor vibration causes (mounts, misfire, DMF): Repair is almost always economical regardless of vehicle value, as costs range from £150-£1,500."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "If vibration diagnosis reveals internal engine damage (broken crank, rod failure, spun bearing, or low compression requiring major rebuild), the economics often depend on vehicle value. Vehicle Value Recommended Action Reasoning Under £4,000 Scrap / replace vehicle Engine replacement cost (£2,500-£5,000+) typically exceeds vehicle value £4,000 - £8,000 Evaluate both options Reconditioned engine may be viable if keeping car 2+ years £8,000 - £15,000 Reconditioned engine likely Warranty and reliability justify replacement £15,000+ Reconditioned or rebuilt Replacement cost small relative to vehicle value For minor vibration causes (mounts, misfire, DMF): Repair is almost always economical regardless of vehicle value, as costs range from £150-£1,500. When to stop driving"
      },
      {
        "title": "Urgency matrix",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Symptom",
              "Can You Drive-",
              "Action",
              "Risk of Ignoring"
            ],
            "rows": [
              [
                "Vibration at idle only, smooth when driving",
                "Yes",
                "Book diagnostic within weeks",
                "Strained exhaust, hoses, wiring (£150-£400)"
              ],
              [
                "Vibration under acceleration, EML steady",
                "Yes - book within days",
                "OBD2 scan (£50-£120)",
                "Cat/DPF damage (£500-£2,500)"
              ],
              [
                "Vibration under acceleration, EML flashing",
                "No - stop immediately",
                "Call recovery",
                "Cat/DPF destruction (£500-£2,500) + misfire repair"
              ],
              [
                "Vibration on clutch engagement, rattle at idle",
                "Short-term possible",
                "Book diagnostic soon",
                "DMF disintegrates → gearbox damage (£800-£3,500)"
              ],
              [
                "Constant heavy vibration - worsens with revs",
                "No - stop immediately",
                "Call recovery - engine failure likely",
                "Complete engine destruction (£2,500-£6,500+)"
              ]
            ]
          }
        ],
        "additionalText": ""
      }
    ],
    "faqs": [
      {
        "question": "What causes engine vibration at idle",
        "answer": "The most common cause is worn engine mounts (£150-£500). A misfire can also cause idle vibration - an OBD2 scan (£50-£120) will confirm which."
      },
      {
        "question": "What causes engine vibration under acceleration",
        "answer": "A misfire is the most common cause - worn spark plugs (£50-£150), failed ignition coil (£70-£220), or clogged injector (£120-£900). Many diesel vibration enquiries ultimately trace back to injector faults, although compression testing should be completed before replacing injectors. [EM-OBSERVED]"
      },
      {
        "question": "What causes vibration when pulling away",
        "answer": "Dual-mass flywheel (DMF) failure (£500-£1,500). If you hear a rattle at idle that disappears when you press the clutch pedal, the DMF is failing."
      },
      {
        "question": "How much does engine mount replacement cost",
        "answer": "£150-£500 for a small to family car. £300-£900 for executive cars and SUVs. → Engine mount replacement cost guide"
      },
      {
        "question": "How much does a misfire repair cost",
        "answer": "Spark plugs: £50-£150. Ignition coil: £70-£220. Fuel injector: £120-£900. Diagnostic first (£50-£120) - don't guess. → Misfire repair guide"
      },
      {
        "question": "How much does DMF replacement cost",
        "answer": "£500-£1,500 including clutch kit. Labour is 5-9 hours because the gearbox must be removed. → DMF replacement cost guide"
      },
      {
        "question": "Can I drive with engine vibration",
        "answer": "Vibration at idle (mounts) - yes, but book diagnostic. Vibration under acceleration with flashing EML - no, stop immediately. Constant heavy vibration that worsens with revs - no, stop immediately - internal engine failure."
      },
      {
        "question": "Which engines are most prone to internal imbalance / crankshaft failure",
        "answer": "Based on KNOWN FAILURE PATTERNS, the Land Rover 306DT (SDV6/TDV6) - 980 quote requests [EM-VERIFIED] - is known for crankshaft bearing failure. Cold-start knock is the early warning."
      }
    ]
  },
  "excessive-oil-consumption": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Many owners pay for a full rebuild when a £150 PCV valve would have fixed the problem.",
          "Worn valve stem seals or PCV valve blockage. Oil is entering the combustion chamber from the top of the engine.",
          "Book a diagnostic. Start with PCV valve check - it's the cheapest fix (£100-£250).",
          "£100-£250 for PCV valve. £500-£1,500 for valve stem seals. Labour: 1-2 hrs (PCV) or 6-10 hrs (valve seals).",
          "Worn piston rings or turbo seals. Oil is entering the combustion chamber from the bottom or the turbo.",
          "Full diagnostic - compression test and leak-down test. Identify whether rings or turbo are the cause.",
          "£1,500-£4,000+ for piston rings. £450-£3,000+ for turbo seals. Labour: 12-20 hrs (rings) or 4-8 hrs (turbo).",
          "Severe ring or cylinder wear - compression loss. Oil is being burned constantly, not just on start-up or acceleration.",
          "Engine rebuild or replacement required. Evaluate vehicle value before committing.",
          "£1,500-£4,000+ for rebuild. £2,500-£6,500+ for replacement engine.",
          "Bearing damage from oil starvation. Oil consumption led to critically low oil level, destroying bearings.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Many owners pay for a full rebuild when a £150 PCV valve would have fixed the problem. £100 Oil level drops between services, slight blue smoke on cold start Worn valve stem seals or PCV valve blockage £100-£250 (PCV) or £500-£1,500 (valve seals) £450 Blue smoke on acceleration, oil smell, oil in intake pipes Worn piston rings or turbo seals £1,500-£4,000+ (rings) or £450-£3,000+ (turbo) £1,500 Constant blue smoke, oil light flickers, topping up weekly Severe ring or cylinder wear - compression loss £1,500-£4,000+ (rebuild) or £2,500-£6,500+ (replacement) £6,500+ Engine knock, low oil pressure, seizure Bearing damage from oil starvation £2,500-£6,500+ - car may be scrap Likely cause Worn valve stem seals or PCV valve blockage. Oil is entering the combustion chamber from the top of the engine. What to do Book a diagnostic. Start with PCV valve check - it's the cheapest fix (£100-£250). Repair cost £100-£250 for PCV valve. £500-£1,500 for valve stem seals. Labour: 1-2 hrs (PCV) or 6-10 hrs (valve seals). Likely cause Worn piston rings or turbo seals. Oil is entering the combustion chamber from the bottom or the turbo. What to do Full diagnostic - compression test and leak-down test. Identify whether rings or turbo are the cause. Repair cost £1,500-£4,000+ for piston rings. £450-£3,000+ for turbo seals. Labour: 12-20 hrs (rings) or 4-8 hrs (turbo). Likely cause Severe ring or cylinder wear - compression loss. Oil is being burned constantly, not just on start-up or acceleration. What to do Engine rebuild or replacement required. Evaluate vehicle value before committing. Repair cost £1,500-£4,000+ for rebuild. £2,500-£6,500+ for replacement engine. Likely cause Bearing damage from oil starvation. Oil consumption led to critically low oil level, destroying bearings. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of excessive oil consumption"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Oil level drops between services - needing top-up every 1,000-2,000 miles",
          "• Blue smoke on cold start - a puff that clears after a few seconds (valve stem seals)",
          "• Oil smell from exhaust - distinct acrid smell different from fuel",
          "• Oil in intake pipes - visible residue when inspecting air intake hoses",
          "• Blue smoke on acceleration - constant smoke when pressing throttle (rings or turbo)",
          "• Oil light flickers on corners or hills - oil level critically low",
          "• Topping up oil weekly - consuming more than 1 litre per 600 miles",
          "• Failed MOT on emissions - excessive oil smoke or high hydrocarbons"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book diagnostic within weeks) • Oil level drops between services - needing top-up every 1,000-2,000 miles • Blue smoke on cold start - a puff that clears after a few seconds (valve stem seals) • Oil smell from exhaust - distinct acrid smell different from fuel • Oil in intake pipes - visible residue when inspecting air intake hoses 🔴 PROGRESSED DAMAGE (Book diagnostic immediately) • Blue smoke on acceleration - constant smoke when pressing throttle (rings or turbo) • Oil light flickers on corners or hills - oil level critically low • Topping up oil weekly - consuming more than 1 litre per 600 miles • Failed MOT on emissions - excessive oil smoke or high hydrocarbons Diagnostic hierarchy - start cheap, then escalate"
      },
      {
        "title": "Common causes - cheapest first",
        "paragraphs": [
          "A competent specialist follows this hierarchy. If a garage recommends a piston ring rebuild without checking the PCV valve first, get a second opinion."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Cost",
              "Most Common On"
            ],
            "rows": [
              [
                "Wrong oil grade",
                "Oil too thin burns more easily",
                "£50 - £150 (oil change)",
                "Any engine, especially BMW, VAG, Ford"
              ],
              [
                "External oil leaks",
                "Visible oil on driveway, but not burning",
                "£50 - £500",
                "All vehicles 8+ years old"
              ],
              [
                "PCV valve blocked",
                "Crankcase pressure forces oil into intake",
                "£100 - £250",
                "VW EA189, BMW N47, Ford EcoBoost"
              ],
              [
                "Valve stem seals worn",
                "Oil leaks past valve guides into cylinders",
                "£500 - £1,500",
                "Higher-mileage (80k+), BMW N47, Mercedes OM651"
              ],
              [
                "Turbo seals leaking",
                "Oil leaks from turbo into intake or exhaust",
                "£450 - £3,000+",
                "VW EA189, BMW N47, Ford DV6"
              ],
              [
                "Piston rings worn",
                "Oil passes rings into combustion chamber",
                "£1,500 - £4,000+",
                "High-mileage (120k+), neglected oil changes"
              ]
            ]
          }
        ],
        "additionalText": "A competent specialist follows this hierarchy. If a garage recommends a piston ring rebuild without checking the PCV valve first, get a second opinion. Cause How It Happens Typical Cost Most Common On Wrong oil grade Oil too thin burns more easily £50 - £150 (oil change) Any engine, especially BMW, VAG, Ford External oil leaks Visible oil on driveway, but not burning £50 - £500 All vehicles 8+ years old PCV valve blocked Crankcase pressure forces oil into intake £100 - £250 VW EA189, BMW N47, Ford EcoBoost Valve stem seals worn Oil leaks past valve guides into cylinders £500 - £1,500 Higher-mileage (80k+), BMW N47, Mercedes OM651 Turbo seals leaking Oil leaks from turbo into intake or exhaust £450 - £3,000+ VW EA189, BMW N47, Ford DV6 Piston rings worn Oil passes rings into combustion chamber £1,500 - £4,000+ High-mileage (120k+), neglected oil changes Specialist rule of thumb: \"90% of oil consumption complaints on turbocharged engines are either a blocked PCV valve or worn valve stem seals. A PCV valve is a £150 part and an hour's labour. A piston ring rebuild is £3,000. Always diagnose from the cheapest possibility upward.\" Blue smoke diagnosis"
      },
      {
        "title": "Startup vs acceleration - what it tells you",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Smoke Timing",
              "Most Likely Cause",
              "Typical Cost"
            ],
            "rows": [
              [
                "Blue smoke on cold start only (clears after 10-30 sec)",
                "Valve stem seals",
                "£500 - £1,500"
              ],
              [
                "Blue smoke on acceleration (especially after idling)",
                "Piston rings or turbo seals",
                "£1,500-£4,000+ (rings) or £450-£3,000+ (turbo)"
              ],
              [
                "Constant blue smoke (all the time)",
                "Severe ring or bore wear",
                "£1,500-£4,000+ (rebuild) or £2,500-£6,500+ (replacement)"
              ],
              [
                "No blue smoke but oil level drops",
                "External leak or PCV system",
                "£100 - £500"
              ]
            ]
          }
        ],
        "additionalText": "Smoke Timing Most Likely Cause Typical Cost Blue smoke on cold start only (clears after 10-30 sec) Valve stem seals £500 - £1,500 Blue smoke on acceleration (especially after idling) Piston rings or turbo seals £1,500-£4,000+ (rings) or £450-£3,000+ (turbo) Constant blue smoke (all the time) Severe ring or bore wear £1,500-£4,000+ (rebuild) or £2,500-£6,500+ (replacement) No blue smoke but oil level drops External leak or PCV system £100 - £500 Specialist rule of thumb: \"If you see blue smoke only on cold start, it's almost always valve stem seals - not rings. A £800 valve seal job fixes it. A £3,000 ring job is unnecessary.\" Red flag engines - known oil consumption patterns"
      },
      {
        "title": "Engines with known oil consumption issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 80k-150k 1,450 [EM-VERIFIED] Valve stem seals, PCV blockage, turbo seals. PCV: £100-£250; Valve seals: £800-£1,500. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Valve stem seals, PCV system. PCV: £100-£250; Valve seals: £800-£1,500. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Turbo seals, PCV failure, piston rings (high mileage). PCV: £100-£250; Turbo: £800-£2,000; Rings: £1,800-£3,500. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Turbo seals, valve stem seals, PCV. PCV: £100-£200; Turbo: £600-£1,500. Toyota 2AD-FTV / 1AD-FTV 60k-120k 260 / 250 [EM-VERIFIED] Piston ring design flaw (2006-2009). Rings: £1,500-£3,000 - check Toyota warranty first. Market Intelligence: The Toyota 2AD-FTV engine generated 260 quote requests in 2025 [EM-VERIFIED n=260]. This engine has a known design flaw with piston rings on 2006-2009 models. Toyota issued a warranty extension (some vehicles up to 7 years/111,000 miles). Check with a Toyota dealer before paying for a rebuild - you may be covered. [KNOWN FAILURE PATTERNS] Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored early signs - PCV blocked or valve seals worn £100 - £1,500 Stage 2 Low oil level between services - increased bearing wear £500 - £2,000 Stage 3 Oil light flickers - bearings running dry £1,500 - £4,000 Stage 4 Catalytic converter or DPF damage from burning oil £1,000 - £3,500 + oil consumption fix Stage 5 Engine seizure - bearings fail, engine locks £2,500 - £6,500+ The maths of ignoring: Fix immediately (PCV valve): £100-£250. Wait 6 months (valve seals): £500-£1,500. Wait 12 months (piston rings or engine): £1,500-£6,500. Repair vs replace - decision framework"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored early signs - PCV blocked or valve seals worn £100 - £1,500 Stage 2 Low oil level between services - increased bearing wear £500 - £2,000 Stage 3 Oil light flickers - bearings running dry £1,500 - £4,000 Stage 4 Catalytic converter or DPF damage from burning oil £1,000 - £3,500 + oil consumption fix Stage 5 Engine seizure - bearings fail, engine locks £2,500 - £6,500+ The maths of ignoring: Fix immediately (PCV valve): £100-£250. Wait 6 months (valve seals): £500-£1,500. Wait 12 months (piston rings or engine): £1,500-£6,500. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: PCV 1-2 hrs, valve seals 6-10 hrs, rings 12-20 hrs, turbo 4-8 hrs at £65-£95/hr indie."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Damage Severity",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Wrong oil grade",
                "Oil change with correct spec",
                "£50 - £150",
                "Always - check manufacturer spec (BMW LL-04, VW 507.00)"
              ],
              [
                "PCV valve blocked",
                "PCV valve replacement",
                "£100 - £250",
                "Always - cheapest fix"
              ],
              [
                "Valve stem seals worn",
                "Valve seal replacement",
                "£500 - £1,500",
                "Viable on vehicles worth £2,500+"
              ],
              [
                "Turbo seals leaking",
                "Turbo rebuild or replacement",
                "£450 - £3,000+",
                "Evaluate vehicle value"
              ],
              [
                "Piston rings worn",
                "Engine rebuild (strip, hone, new rings)",
                "£1,500 - £4,000+",
                "Only viable on vehicles worth £4,000+"
              ],
              [
                "Cylinder bore damage",
                "Engine replacement",
                "£2,500 - £6,500+",
                "Only viable on vehicles worth £5,000+"
              ]
            ]
          }
        ],
        "additionalText": "Damage Severity Repair Option Typical Cost When to Choose Wrong oil grade Oil change with correct spec £50 - £150 Always - check manufacturer spec (BMW LL-04, VW 507.00) PCV valve blocked PCV valve replacement £100 - £250 Always - cheapest fix Valve stem seals worn Valve seal replacement £500 - £1,500 Viable on vehicles worth £2,500+ Turbo seals leaking Turbo rebuild or replacement £450 - £3,000+ Evaluate vehicle value Piston rings worn Engine rebuild (strip, hone, new rings) £1,500 - £4,000+ Only viable on vehicles worth £4,000+ Cylinder bore damage Engine replacement £2,500 - £6,500+ Only viable on vehicles worth £5,000+ Cost ranges [INDUSTRY ESTIMATE]. Labour: PCV 1-2 hrs, valve seals 6-10 hrs, rings 12-20 hrs, turbo 4-8 hrs at £65-£95/hr indie. Vehicle Value Threshold: Under £2,000 - PCV only. If valve seals or rings, evaluate scrap. £2,000-£4,000 - Valve seals or turbo viable. Rings- Evaluate carefully. £4,000-£8,000 - Piston ring rebuild or replacement engine justified. £8,000+ - Any repair - even full engine rebuild. Preventative maintenance"
      },
      {
        "title": "Avoiding oil consumption problems",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Frequency"
            ],
            "rows": [
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Every 6,000-10,000 miles"
              ],
              [
                "Use manufacturer-approved oil grade",
                "£0 (choice)",
                "Every oil change"
              ],
              [
                "PCV valve replacement (preventative)",
                "£100 - £250",
                "Every 60k-80k miles on VAG/BMW"
              ],
              [
                "Regular oil level checks",
                "£0",
                "Monthly or before long journeys"
              ],
              [
                "Avoid short journeys (diesel)",
                "£0",
                "Drive longer routes occasionally"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Frequency Regular oil changes (correct spec) £50 - £150 Every 6,000-10,000 miles Use manufacturer-approved oil grade £0 (choice) Every oil change PCV valve replacement (preventative) £100 - £250 Every 60k-80k miles on VAG/BMW Regular oil level checks £0 Monthly or before long journeys Avoid short journeys (diesel) £0 Drive longer routes occasionally Specialist rule of thumb: \"The single biggest cause of oil consumption on modern engines is using the wrong oil spec. A BMW needs LL-04. A VW needs 507.00. Put cheap oil in, and it will burn it. Put the right oil in, and consumption often stops.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does excessive oil consumption repair cost in the UK",
        "answer": "PCV valve: £100-£250. Valve stem seals: £500-£1,500. Piston rings: £1,500-£4,000+. Turbo seals: £450-£3,000+. Engine replacement: £2,500-£6,500+. Diagnostic: £50-£150. → Engine repair cost guide"
      },
      {
        "question": "What causes a car to burn oil",
        "answer": "Blocked PCV valve (cheapest), worn valve stem seals (blue smoke on start-up), worn piston rings (blue smoke on acceleration), turbo seals leaking, wrong oil grade, or external oil leaks."
      },
      {
        "question": "How do I know if I need piston rings or just valve seals",
        "answer": "Blue smoke only on cold start = valve stem seals (£500-£1,500). Blue smoke on acceleration = piston rings or turbo (£1,500-£4,000+). A compression test confirms. Don't pay for rings without this test."
      },
      {
        "question": "Is it worth fixing oil consumption on an old car",
        "answer": "If your car is worth £2,000-£4,000 and the fix is valve seals (£500-£1,500), yes. If under £2,000 and needs rings (£1,500-£4,000+), evaluate scrap first. → Repair vs replacement"
      },
      {
        "question": "Which engines have the most oil consumption problems",
        "answer": "Based on 2025 data: BMW N47D20C (1,450 requests - valve seals), VW EA189 (1,050 - turbo seals), Mercedes OM651 (1,250 - valve seals), Toyota 2AD-FTV (260 - piston rings - known design flaw). [EM-VERIFIED]"
      },
      {
        "question": "Is oil consumption covered under warranty",
        "answer": "On reconditioned engines, oil consumption is typically not covered unless there is a clear component failure. On used cars, oil consumption is almost always considered wear and tear and is not covered. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      }
    ]
  },
  "excessive-smoke": {
    "sections": [
      {
        "title": "At a glance",
        "paragraphs": [
          "Blue / Grey Burning oil - valve seals, piston rings, turbo seals £500 - £4,000+ ⚠️ Short-term possible - monitor oil White (thick) Burning coolant - head gasket, cracked head/block £550 - £5,000+ 🚨 Stop immediately Black Excessive fuel - injector, MAF, EGR £100 - £900 ⚠️ Reduce load - book diagnostic 🚨 Critical - white smoke: Thick white smoke that smells sweet is coolant burning. Continued driving will overheat the engine, leading to seizure (£2,500-£6,500+). Stop immediately. 🚨 Critical - blue smoke: Heavy blue smoke under acceleration or at idle means significant oil loss. Low oil causes bearing failure and seizure. Blue / grey smoke"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Blue / Grey Burning oil - valve seals, piston rings, turbo seals £500 - £4,000+ ⚠️ Short-term possible - monitor oil White (thick) Burning coolant - head gasket, cracked head/block £550 - £5,000+ 🚨 Stop immediately Black Excessive fuel - injector, MAF, EGR £100 - £900 ⚠️ Reduce load - book diagnostic 🚨 Critical - white smoke: Thick white smoke that smells sweet is coolant burning. Continued driving will overheat the engine, leading to seizure (£2,500-£6,500+). Stop immediately. 🚨 Critical - blue smoke: Heavy blue smoke under acceleration or at idle means significant oil loss. Low oil causes bearing failure and seizure. Blue / grey smoke"
      },
      {
        "title": "Burning oil",
        "paragraphs": [
          "Engine oil is entering the combustion chamber. Oil should never be there - something is leaking past a seal or ring."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Repair Cost",
              "Urgency"
            ],
            "rows": [
              [
                "Valve seals (worn)",
                "Rubber seals harden - oil leaks past valve stems",
                "£500 - £1,500",
                "⚠️ Medium"
              ],
              [
                "Piston rings (worn)",
                "Rings fail to seal - oil from crankcase enters cylinder",
                "£1,500 - £4,000+",
                "🚨 High"
              ],
              [
                "Turbocharger seals",
                "Turbo seals fail - oil drains into intake or exhaust",
                "£450 - £3,000+",
                "🚨 High"
              ],
              [
                "PCV valve (stuck)",
                "Crankcase ventilation fails - oil vapour drawn in",
                "£50 - £200",
                "ℹ️ Low"
              ],
              [
                "Cylinder bore scoring",
                "Bore walls damaged - oil bypasses rings",
                "£2,500 - £6,500+",
                "🚨 Critical"
              ]
            ]
          }
        ],
        "additionalText": "Engine oil is entering the combustion chamber. Oil should never be there - something is leaking past a seal or ring. Cause How It Happens Typical Repair Cost Urgency Valve seals (worn) Rubber seals harden - oil leaks past valve stems £500 - £1,500 ⚠️ Medium Piston rings (worn) Rings fail to seal - oil from crankcase enters cylinder £1,500 - £4,000+ 🚨 High Turbocharger seals Turbo seals fail - oil drains into intake or exhaust £450 - £3,000+ 🚨 High PCV valve (stuck) Crankcase ventilation fails - oil vapour drawn in £50 - £200 ℹ️ Low Cylinder bore scoring Bore walls damaged - oil bypasses rings £2,500 - £6,500+ 🚨 Critical Pattern recognition: Blue on cold start only = valve seals (most common on petrol >80k miles) Blue on acceleration = piston rings Blue on deceleration = valve guides Blue under boost = turbo seals Specialist rule of thumb: \"Blue smoke on cold start that clears within 30 seconds is almost always valve seals (£500-£1,500). Blue smoke under hard acceleration that lingers is likely piston rings (£1,500-£4,000+). Get a compression test before committing.\" White / grey smoke"
      },
      {
        "title": "Burning coolant",
        "paragraphs": [
          "Coolant is entering the combustion chamber and being vaporised into steam. The sweet smell is antifreeze burning."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Repair Cost",
              "Urgency"
            ],
            "rows": [
              [
                "Head gasket failure",
                "Gasket fails - coolant leaks into cylinders",
                "£550 - £1,200",
                "🚨 Critical"
              ],
              [
                "Cracked cylinder head",
                "Casting crack allows coolant into combustion chamber",
                "£1,200 - £2,500",
                "🚨 Critical"
              ],
              [
                "Cracked engine block",
                "Block crack - coolant into cylinders or oil",
                "£2,500 - £5,000+",
                "🚨 Critical"
              ],
              [
                "EGR cooler failure (diesel)",
                "Cooler leak - coolant enters exhaust via EGR",
                "£400 - £900",
                "🚨 High"
              ],
              [
                "Inlet manifold gasket",
                "Coolant passage leak - drawn into intake",
                "£200 - £500",
                "⚠️ Medium"
              ]
            ]
          }
        ],
        "additionalText": "Coolant is entering the combustion chamber and being vaporised into steam. The sweet smell is antifreeze burning. Cause How It Happens Typical Repair Cost Urgency Head gasket failure Gasket fails - coolant leaks into cylinders £550 - £1,200 🚨 Critical Cracked cylinder head Casting crack allows coolant into combustion chamber £1,200 - £2,500 🚨 Critical Cracked engine block Block crack - coolant into cylinders or oil £2,500 - £5,000+ 🚨 Critical EGR cooler failure (diesel) Cooler leak - coolant enters exhaust via EGR £400 - £900 🚨 High Inlet manifold gasket Coolant passage leak - drawn into intake £200 - £500 ⚠️ Medium Pattern recognition: Thick white smoke, sweet smell, constant = head gasket or cracked head - stop driving White on cold start that clears quickly = normal condensation White + coolant loss + overheating = definite head gasket failure - stop driving White + misfire on one cylinder = head gasket failure on that cylinder Emergency rule: \"If you see thick white smoke and your coolant level is dropping, stop driving immediately. A £1,000 head gasket job becomes a £5,000 engine replacement.\" Black / dark grey smoke"
      },
      {
        "title": "Excessive fuel",
        "paragraphs": [
          "The engine is receiving too much fuel for the amount of air. Excess fuel doesn't burn completely and exits as black soot. Most common on diesel engines."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Repair Cost",
              "Urgency"
            ],
            "rows": [
              [
                "Fuel injector leak (diesel)",
                "Injector stuck open - over-fuelling",
                "£120 - £900",
                "⚠️ Medium"
              ],
              [
                "Fuel injector leak (petrol)",
                "Injector stuck open or leaking",
                "£150 - £600",
                "⚠️ Medium"
              ],
              [
                "MAF sensor",
                "MAF reading incorrectly - ECU over-fuels",
                "£80 - £250",
                "ℹ️ Low"
              ],
              [
                "EGR valve stuck closed",
                "No exhaust recirculation - over-fuelling",
                "£135 - £650",
                "⚠️ Low-Medium"
              ],
              [
                "Turbocharger leak",
                "Boost leak or oil seal - incorrect air/fuel ratio",
                "£450 - £3,000+",
                "⚠️ Medium"
              ],
              [
                "Oxygen (lambda) sensor",
                "Sensor fails - ECU defaults to rich mixture",
                "£100 - £350",
                "ℹ️ Low"
              ],
              [
                "Restricted air intake",
                "Blocked air filter - not enough air",
                "£20 - £100",
                "ℹ️ Low"
              ]
            ]
          }
        ],
        "additionalText": "The engine is receiving too much fuel for the amount of air. Excess fuel doesn't burn completely and exits as black soot. Most common on diesel engines. Cause How It Happens Typical Repair Cost Urgency Fuel injector leak (diesel) Injector stuck open - over-fuelling £120 - £900 ⚠️ Medium Fuel injector leak (petrol) Injector stuck open or leaking £150 - £600 ⚠️ Medium MAF sensor MAF reading incorrectly - ECU over-fuels £80 - £250 ℹ️ Low EGR valve stuck closed No exhaust recirculation - over-fuelling £135 - £650 ⚠️ Low-Medium Turbocharger leak Boost leak or oil seal - incorrect air/fuel ratio £450 - £3,000+ ⚠️ Medium Oxygen (lambda) sensor Sensor fails - ECU defaults to rich mixture £100 - £350 ℹ️ Low Restricted air intake Blocked air filter - not enough air £20 - £100 ℹ️ Low Pattern recognition: Black smoke under hard acceleration = normal for older diesels (small puff). Heavy = injector or MAF Black smoke at idle = serious injector leak or EGR stuck closed - stop - bore wash risk Black smoke + misfire = injector stuck open on that cylinder Black smoke + poor fuel economy = MAF or oxygen sensor Specialist rule of thumb: \"On a diesel with black smoke, 80% of the time it's an injector that needs cleaning or replacement (£120-£900). But start cheap - check the air filter (£20-£50) and MAF sensor (£80-£250). Use a diagnostic scan first - it will show fuel trim and MAF readings.\" Diagnostic process"
      },
      {
        "title": "Finding the exact cause",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Action",
              "Typical Cost",
              "What It Tells You"
            ],
            "rows": [
              [
                "1",
                "Visual inspection of smoke colour and pattern",
                "£0",
                "Narrow to oil, coolant, or fuel issue"
              ],
              [
                "2",
                "OBD2 diagnostic scan",
                "£50 - £120",
                "Fault codes - misfire, fuel trim, injector, MAF"
              ],
              [
                "3",
                "Compression test",
                "£80 - £150",
                "Low compression = piston rings (blue) or head gasket (white)"
              ],
              [
                "4",
                "Leak-down test",
                "£150 - £250",
                "Identifies where compression escapes"
              ],
              [
                "5",
                "Coolant pressure test",
                "£50 - £100",
                "If pressure drops and white smoke appears = head gasket"
              ],
              [
                "6",
                "Injector test (diesel)",
                "£150 - £400",
                "Confirms injector failure (black smoke)"
              ],
              [
                "7",
                "Turbo inspection",
                "£100 - £200",
                "If oil in intake/exhaust = turbo seals (blue smoke)"
              ],
              [
                "8",
                "Borescope inspection",
                "£50 - £150",
                "Confirms bore scoring (blue) or head gasket failure"
              ]
            ]
          }
        ],
        "additionalText": "Step Action Typical Cost What It Tells You 1 Visual inspection of smoke colour and pattern £0 Narrow to oil, coolant, or fuel issue 2 OBD2 diagnostic scan £50 - £120 Fault codes - misfire, fuel trim, injector, MAF 3 Compression test £80 - £150 Low compression = piston rings (blue) or head gasket (white) 4 Leak-down test £150 - £250 Identifies where compression escapes 5 Coolant pressure test £50 - £100 If pressure drops and white smoke appears = head gasket 6 Injector test (diesel) £150 - £400 Confirms injector failure (black smoke) 7 Turbo inspection £100 - £200 If oil in intake/exhaust = turbo seals (blue smoke) 8 Borescope inspection £50 - £150 Confirms bore scoring (blue) or head gasket failure Diagnostic rule: \"Never replace parts based on smoke colour alone. Blue smoke could be valve seals (£500) or piston rings (£1,500-£4,000). A compression test (£80-£150) tells you which before you spend thousands on the wrong repair.\" Can you keep driving-"
      },
      {
        "title": "Decision matrix",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Smoke Colour & Pattern",
              "Can You Drive-",
              "Action",
              "Risk of Ignoring"
            ],
            "rows": [
              [
                "White - thin, clears when warm",
                "Yes - normal",
                "No action",
                "None"
              ],
              [
                "White - thick, sweet, constant",
                "No - stop immediately",
                "Call recovery",
                "Engine seizure: £2,500-£6,500+"
              ],
              [
                "White - intermittent, on acceleration",
                "No - stop immediately",
                "Head gasket between cylinders",
                "Overheating → engine damage"
              ],
              [
                "Blue - small puff on start-up only",
                "Yes - monitor oil",
                "Book diagnostic within weeks",
                "Increased oil consumption"
              ],
              [
                "Blue - heavy, constant, or under acceleration",
                "Short-term only - check oil daily",
                "Book diagnostic urgently",
                "Low oil → bearing failure → seizure"
              ],
              [
                "Blue - heavy at idle",
                "Stop - assess oil level",
                "Top up if low. Urgent diagnostic.",
                "Engine seizure within miles"
              ],
              [
                "Black - small puff on hard acceleration",
                "Yes - normal for older diesels",
                "Monitor - book if worsens",
                "Increased DPF/cat soot"
              ],
              [
                "Black - heavy, constant, or at idle",
                "Yes - reduce load. Book within days.",
                "Injector or MAF issue",
                "DPF/cat damage: £500-£2,500. Bore wash risk."
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Avoiding smoke issues",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Very high",
                "Every 6,000-10,000 miles"
              ],
              [
                "Use quality fuel (diesel)",
                "+5-10p/litre",
                "Medium",
                "Every 3-4 fill-ups"
              ],
              [
                "Coolant changes every 3-5 years",
                "£50 - £100",
                "High",
                "Every 3-5 years"
              ],
              [
                "Occasional motorway drive (diesel)",
                "£0",
                "High",
                "Every 2-4 weeks"
              ],
              [
                "Don't ignore warning lights",
                "£50 - £120",
                "Very high",
                "When light appears"
              ],
              [
                "Injector cleaning (diesel)",
                "£150 - £300",
                "Medium",
                "Every 60,000-80,000 miles"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Regular oil changes (correct spec) £50 - £150 Very high Every 6,000-10,000 miles Use quality fuel (diesel) +5-10p/litre Medium Every 3-4 fill-ups Coolant changes every 3-5 years £50 - £100 High Every 3-5 years Occasional motorway drive (diesel) £0 High Every 2-4 weeks Don't ignore warning lights £50 - £120 Very high When light appears Injector cleaning (diesel) £150 - £300 Medium Every 60,000-80,000 miles Specialist rule of thumb: \"The most common cause of blue smoke on a high-mileage petrol engine is hardened valve seals from infrequent oil changes. The most common cause of white smoke is a head gasket failure from an overheating event - often a stuck thermostat or failed water pump. The most common cause of black smoke on a diesel is a clogged injector from poor fuel quality. Regular maintenance prevents all three.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "What does blue smoke from exhaust mean",
        "answer": "Blue/grey smoke means the engine is burning oil. Causes: worn valve seals (£500-£1,500), piston rings (£1,500-£4,000+), or turbo seals (£450-£3,000+)."
      },
      {
        "question": "What does white smoke from exhaust mean",
        "answer": "White smoke can be normal condensation (thin, clears quickly) or a serious problem (thick, sweet smell). Thick white smoke means coolant burning - head gasket failure (£550-£1,200) or cracked head (£1,200-£2,500). Stop driving immediately."
      },
      {
        "question": "What does black smoke from exhaust mean",
        "answer": "Black smoke means too much fuel. Most common: injector failure (£120-£900), MAF sensor failure (£80-£250), or restricted air intake (£20-£100)."
      },
      {
        "question": "Can I drive with blue smoke",
        "answer": "A small puff on cold start only - yes, but monitor oil. Heavy blue smoke under acceleration or at idle - check oil level immediately. Low oil causes bearing failure and seizure."
      },
      {
        "question": "Can I drive with white smoke",
        "answer": "No - not if it's thick and sweet-smelling. That's coolant burning. Continued driving causes overheating and engine seizure."
      },
      {
        "question": "How much does smoke diagnosis cost",
        "answer": "A garage diagnostic including smoke assessment, OBD2 scan, and initial inspection costs £50-£150. Compression testing adds £80-£150. → Engine diagnostic cost guide"
      },
      {
        "question": "Which engines most often produce blue smoke from turbo seals",
        "answer": "Based on KNOWN FAILURE PATTERNS, the Ford DV6 1.6 TDCi (780 requests [EM-VERIFIED]), BMW N47 (1,450), and VW EA189 (1,050) are frequently reported for turbo seal failures that produce blue smoke."
      }
    ]
  },
  "fuel-pump-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Acting early can save you thousands.",
          "Failing relay, loose fuse, or corroded wiring. The pump is fine - the electrical supply is intermittent.",
          "Check the fuel pump fuse and relay first. A £5-£20 fix is common, especially on older vehicles.",
          "£5-£50 for relay, fuse, or wiring repair. Don't replace the pump until these are checked.",
          "Electric fuel pump motor wearing out. Whining noise is the motor struggling to maintain pressure.",
          "Replace the low-pressure pump. Book a replacement before it leaves you stranded.",
          "£150-£350 for low-pressure pump replacement. Labour: 1.5-3 hours at £65-£95/hr.",
          "High-pressure fuel pump internal failure. HPFP no longer generating required pressure.",
          "Stop driving. HPFP failure often sends debris through the fuel system - act immediately.",
          "£300-£900+ for HPFP replacement. If debris has reached injectors: £2,500-£6,500+.",
          "HPFP disintegrated - metal debris sent through fuel rail and injectors. Entire fuel system contaminated.",
          "Do not attempt to restart. Full fuel system replacement required - pump, injectors, rail, flush.",
          "£2,500-£6,500+ for HPFP + injectors + fuel rail + system flush. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Acting early can save you thousands. £5 Intermittent no-start, then works fine Failing relay, loose fuse, or corroded wiring £5 - £50 £150 Whining noise, longer crank time, power loss Electric fuel pump motor wearing out £150 - £350 £300 Hard start, limp mode, engine management light HPFP internal failure £300 - £900+ £6,500+ Injector damage, contaminated fuel rail HPFP disintegrates - metal debris destroys injectors £2,500 - £6,500+ Likely cause Failing relay, loose fuse, or corroded wiring. The pump is fine - the electrical supply is intermittent. What to do Check the fuel pump fuse and relay first. A £5-£20 fix is common, especially on older vehicles. Repair cost £5-£50 for relay, fuse, or wiring repair. Don't replace the pump until these are checked. Likely cause Electric fuel pump motor wearing out. Whining noise is the motor struggling to maintain pressure. What to do Replace the low-pressure pump. Book a replacement before it leaves you stranded. Repair cost £150-£350 for low-pressure pump replacement. Labour: 1.5-3 hours at £65-£95/hr. Likely cause High-pressure fuel pump internal failure. HPFP no longer generating required pressure. What to do Stop driving. HPFP failure often sends debris through the fuel system - act immediately. Repair cost £300-£900+ for HPFP replacement. If debris has reached injectors: £2,500-£6,500+. Likely cause HPFP disintegrated - metal debris sent through fuel rail and injectors. Entire fuel system contaminated. What to do Do not attempt to restart. Full fuel system replacement required - pump, injectors, rail, flush. Repair cost £2,500-£6,500+ for HPFP + injectors + fuel rail + system flush. On lower-value vehicles, this often means scrapping the car. Repair vs replace - the diagnostic hierarchy"
      },
      {
        "title": "Most fuel pump failures are misdiagnosed",
        "paragraphs": [
          "Follow this hierarchy before spending £400+ on a pump replacement."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Follow this hierarchy before spending £400+ on a pump replacement. Step Component Typical Cost 1 Fuel pump fuse £1 - £5 2 Fuel pump relay £5 - £20 3 Fuel pump wiring/connector £20 - £100 4 Fuel pump (low-pressure) £150 - £485 5 Fuel pump (high-pressure) £300 - £900+ 💡 The £5 fuse story: A 2014 Vauxhall Astra J with 98,000 miles arrived at a specialist with a \"fuel pump failure\" diagnosis from a national chain (quote: £485). The specialist checked the fuel pump fuse and found it blown. Replaced the fuse for £2. The car started immediately. The original fuse blew due to a failing relay (another £15). Total fix: £17. When to replace the pump: Whining noise from the tank AND symptoms under load. Fuel pressure test shows pressure below spec. Fuse, relay, and wiring are confirmed working. Car won't start and you can't hear the pump prime. When NOT to replace the pump: Fuse or relay is the fault (check first). Clogged fuel filter (replace filter first - £20-£50). Bad fuel or water contamination (drain tank, do not replace pump). Crankshaft position sensor failure (different symptoms). Fuel pump replacement cost by type"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Labour cost notes [INDUSTRY ESTIMATE]: Low-pressure pump replacement requires tank access. On most cars, the tank does not need full removal - access is via a panel under the rear seat (e.g., BMW 3 Series E90, Ford Focus Mk2, Vauxhall Astra H). Labour based on £65-£95/hr indie."
        ],
        "bullets": [
          "• New fuel pump (low-pressure or high-pressure)",
          "• New fuel filter (highly recommended)",
          "• New seals and gaskets",
          "• Fuel pressure test before and after installation",
          "• Diagnostic scan to confirm pump failure"
        ],
        "tables": [
          {
            "headers": [
              "Pump Type",
              "Typical Vehicles / Engines",
              "Parts Cost",
              "Labour Hours",
              "Fitted Cost Range"
            ],
            "rows": [
              [
                "Low-pressure (in-tank)",
                "Most petrol 2005-2015: Ford Focus, Vauxhall Astra, Renault Megane",
                "£80 - £350",
                "1.5 - 3 hrs",
                "£178 - £485"
              ],
              [
                "Low-pressure (under-car)",
                "Some Japanese and older vehicles",
                "£60 - £200",
                "1 - 2 hrs",
                "£125 - £390"
              ],
              [
                "High-pressure (HPFP) - Diesel",
                "BMW N47, Mercedes OM651, VW EA189, Land Rover 204DTD",
                "£250 - £700",
                "2 - 5 hrs",
                "£380 - £1,175+"
              ],
              [
                "High-pressure (HPFP) - Petrol",
                "BMW N53/N54, VW EA888, Ford EcoBoost",
                "£200 - £600",
                "2 - 4 hrs",
                "£330 - £980+"
              ],
              [
                "Complete fuel pump module",
                "Most modern vehicles (pump + sender + regulator)",
                "£150 - £500",
                "1.5 - 3 hrs",
                "£250 - £800"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Whining noise from fuel tank - louder than usual, especially on startup",
          "• Longer crank time - engine takes 2-4 seconds to start instead of instantly firing",
          "• Sputtering under load - hesitation when accelerating uphill or overtaking",
          "• Loss of power on hills - engine feels weak climbing inclines",
          "• Intermittent stalling - engine dies randomly, then restarts after cooling",
          "• Engine cranks but won't start - starter motor turns, engine never fires",
          "• Hard start when hot - starts fine cold, refuses to start after a short stop",
          "• Engine management light - fuel pressure or lean mixture fault codes"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Investigate soon) • Whining noise from fuel tank - louder than usual, especially on startup • Longer crank time - engine takes 2-4 seconds to start instead of instantly firing • Sputtering under load - hesitation when accelerating uphill or overtaking • Loss of power on hills - engine feels weak climbing inclines 🔴 PROGRESSED DAMAGE (Investigate urgently) • Intermittent stalling - engine dies randomly, then restarts after cooling • Engine cranks but won't start - starter motor turns, engine never fires • Hard start when hot - starts fine cold, refuses to start after a short stop • Engine management light - fuel pressure or lean mixture fault codes 🚨 Critical diagnostic tip: If your engine cranks but won't start, check the fuel pump fuse and relay first. On many UK cars (Ford Focus Mk2/Mk3, Vauxhall Astra, VW Golf), the fuel pump relay is a known failure point. A £15 relay fixes what looks like a £400 pump failure. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Whining noise - pump motor wearing out £150 - £485 Stage 2 Intermittent stalling - pump failing when hot £150 - £485 Stage 3 No start (low-pressure) - pump dead £178 - £485 + recovery Stage 4 HPFP debris - metal contamination reaches injectors £380 - £2,075+ Stage 5 HPFP catastrophic - full fuel system contamination £2,500 - £6,500+ Real-world example (anonymised): A 2011 BMW 320d N47 (118,000 miles) owner ignored intermittent stalling for 6 weeks. The high-pressure fuel pump failed catastrophically, sending metal debris through the entire fuel system. The repair required: HPFP (£650), four injectors (£1,200), fuel rail (£300), and a full system flush (£400). Total: £2,550. The same owner could have replaced the HPFP at the first stall for £650. Red flag engines - fuel pump failure patterns"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Whining noise - pump motor wearing out £150 - £485 Stage 2 Intermittent stalling - pump failing when hot £150 - £485 Stage 3 No start (low-pressure) - pump dead £178 - £485 + recovery Stage 4 HPFP debris - metal contamination reaches injectors £380 - £2,075+ Stage 5 HPFP catastrophic - full fuel system contamination £2,500 - £6,500+ Real-world example (anonymised): A 2011 BMW 320d N47 (118,000 miles) owner ignored intermittent stalling for 6 weeks. The high-pressure fuel pump failed catastrophically, sending metal debris through the entire fuel system. The repair required: HPFP (£650), four injectors (£1,200), fuel rail (£300), and a full system flush (£400). Total: £2,550. The same owner could have replaced the HPFP at the first stall for £650. Red flag engines - fuel pump failure patterns"
      },
      {
        "title": "Engines with known pump issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] HPFP failure secondary to chain debris. HPFP: £650-£1,200; Injectors: £300-£800 each. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] HPFP wear on high-mileage. HPFP: £500-£1,000. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] HPFP failure rare - relay failure common. HPFP: £600-£1,200; Relay: £15-£30. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Low-pressure pump failure common. Low-pressure pump: £150-£350. Renault K9K 1.5 dCi 80k-150k 730 [EM-VERIFIED] HPFP failure less common than injector failure. HPFP: £500-£1,000. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], fuel pump failure is a common but frequently misdiagnosed issue."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], fuel pump failure is a common but frequently misdiagnosed issue. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] BMW N47D20C HPFP secondary to chain debris - 1,450 requests [EM-VERIFIED] 1,450 requests [EM-VERIFIED] Mercedes OM651 HPFP wear - 1,250 requests [EM-VERIFIED] 1,250 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI Relay failure common - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Ford DV6 1.6 TDCi Low-pressure pump failure - 780 requests [EM-VERIFIED] 780 requests [EM-VERIFIED] Market insight \"The VW/Audi EA189 2.0 TDI generated 1,050 quote requests in 2025 [EM-VERIFIED n=1,050]. While HPFP failure is relatively rare on this engine, the fuel pump relay is a documented weak point. Many 'no-start' diagnoses on the EA189 are traced to a £15 relay, not a £600 pump. Always check the relay first.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Fuel pump failure is often misdiagnosed - the fuse and relay should always be checked first. Vehicle value threshold"
      },
      {
        "title": "Is fuel pump replacement economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Recommended Action Reasoning Under £1,500 Check fuse/relay first; if pump failed, evaluate scrap Pump replacement (£150-£485) may exceed 30-50% of value £1,500 - £3,000 Low-pressure pump replacement (£150-£485) is usually viable Evaluate both options; reconditioned pump if available £3,000 - £6,000 New low-pressure or HPFP replacement justified Vehicle value supports repair cost £6,000+ Any repair type - new pump or HPFP Warranty and reliability justify full repair If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Check your vehicle's value and compare fuel pump replacement quotes → Get quotes Preventative maintenance"
      },
      {
        "title": "Avoiding fuel pump failure",
        "paragraphs": [
          "01 Keep fuel tank above ¼ full Fuel cools the pump; running low regularly shortens pump life. 02 Change fuel filter at manufacturer interval Typically 20,000-40,000 miles. A clogged filter starves the pump. 03 Use quality fuel from branded stations Contaminated fuel from unbranded stations kills pumps. 04 Diesel specific - consider an additive every 10,000 miles Helps lubricate the HPFP and keep injectors clean. 05 Act on early warnings - whining noise A whining fuel pump is a warning, not an emergency - but ignore it for 6 months and you'll be calling a recovery truck. Preventative maintenance (per 2-3 years) £50-£150 Fuel filter + quality fuel VS Catastrophic failure - HPFP + injectors + flush £2,500-£6,500+ Full fuel system replacement Specialist rule of thumb (UK): \"A whining fuel pump is a warning, not an emergency - but ignore it for 6 months and you'll be calling a recovery truck. Replace it when it starts whining, not when it stops working.\" Frequently asked questions"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "01 Keep fuel tank above ¼ full Fuel cools the pump; running low regularly shortens pump life. 02 Change fuel filter at manufacturer interval Typically 20,000-40,000 miles. A clogged filter starves the pump. 03 Use quality fuel from branded stations Contaminated fuel from unbranded stations kills pumps. 04 Diesel specific - consider an additive every 10,000 miles Helps lubricate the HPFP and keep injectors clean. 05 Act on early warnings - whining noise A whining fuel pump is a warning, not an emergency - but ignore it for 6 months and you'll be calling a recovery truck. Preventative maintenance (per 2-3 years) £50-£150 Fuel filter + quality fuel VS Catastrophic failure - HPFP + injectors + flush £2,500-£6,500+ Full fuel system replacement Specialist rule of thumb (UK): \"A whining fuel pump is a warning, not an emergency - but ignore it for 6 months and you'll be calling a recovery truck. Replace it when it starts whining, not when it stops working.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does fuel pump replacement cost in the UK",
        "answer": "Low-pressure (in-tank) pump: £150-£485 fitted. High-pressure pump (diesel/petrol direct injection): £300-£900+ fitted. Labour: 1.5-3 hours for low-pressure; 2-5 hours for high-pressure at £65-£95/hr (independent). Dealer rates add 40-60%. → Engine repair cost guide"
      },
      {
        "question": "Can a fuel pump be repaired instead of replaced",
        "answer": "Rarely. Low-pressure pump motors are sealed units - replacement is the only reliable repair. HPFP units are precision components that cannot be economically rebuilt (except via specialist exchange programmes). However, the fuel pump relay (£5-£20) and fuse (£1-£5) are replaceable and often misdiagnosed as pump failure."
      },
      {
        "question": "What are the signs of fuel pump failure",
        "answer": "Whining noise from the fuel tank (early warning), longer crank time, loss of power on hills, sputtering under load, intermittent stalling, engine cranks but won't start, and hard starts when hot."
      },
      {
        "question": "What causes fuel pump failure",
        "answer": "Most common causes: running the tank low regularly (fuel cools the pump), contaminated fuel, a clogged fuel filter starving the pump, old age (worn motor brushes), electrical failure (relay or wiring), and HPFP internal wear (high-mileage diesels)."
      },
      {
        "question": "Which engines have the most fuel pump problems",
        "answer": "Based on 2025 data: VW/Audi EA189 2.0 TDI (relay failure common - 1,050 requests), BMW N47D20C (HPFP secondary to chain debris - 1,450 requests), Ford DV6 1.6 TDCi (low-pressure pump wear - 780 requests). [EM-VERIFIED]"
      },
      {
        "question": "Is fuel pump failure covered under warranty",
        "answer": "On reconditioned engines, the fuel pump is typically covered as part of the engine warranty (12-24 months). However, failure caused by contaminated fuel or running the tank dry is often excluded. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "Can I drive with a faulty fuel pump",
        "answer": "If the pump is whining (early stage), you can drive but should book a replacement. If the car is stalling intermittently or losing power under load, avoid long journeys - the car may leave you stranded. If the engine cranks but won't start, the pump has failed and recovery is required."
      }
    ]
  },
  "head-gasket-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Catching head gasket failure early is critical to avoid catastrophic engine damage. Click any stage to see full detail.",
          "Minor gasket weep or condensation from short trips. Common on many cars, but worth investigating.",
          "Book a diagnostic inspection. A simple coolant flush may resolve if it's condensation. If gasket weep is confirmed, plan for replacement.",
          "£100-£300 for diagnostic + coolant flush if minor. Full gasket replacement if confirmed: £550-£2,000.",
          "Blown head gasket - combustion gases leaking into cooling system. Gasket failed between cylinder and coolant jacket.",
          "Stop driving. Arrange recovery. Continued driving will warp the cylinder head and damage the engine.",
          "£550-£1,500 for gasket replacement + head skim if needed. Labour: 8-12 hours (inline 4) or 12-18 hours (V6).",
          "Gasket failure between oil and coolant galleries. Oil contaminated with coolant - destroying bearings.",
          "Stop driving immediately. Full engine inspection required. Bearings may be damaged - engine replacement may be more economical.",
          "£900-£2,000+ for full gasket job + oil flush + bearing inspection. If bearings damaged: £2,000-£5,000+ for engine replacement.",
          "Catastrophic failure - cylinder head cracked, engine block warped, or hydrolock (coolant in cylinders).",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - head and block are scrap.",
          "£2,000-£5,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching head gasket failure early is critical to avoid catastrophic engine damage. Click any stage to see full detail. £100 Milky emulsion under oil cap, no overheating Minor gasket weep, condensation £100 - £300 £550 Overheating, coolant loss, white smoke on start-up Combustion leak into cooling system £550 - £1,500 £900 Coolant in oil, engine knocking, overheating under load Gasket failure - oil/coolant galleries, bearings at risk £900 - £2,000+ £5,000+ Engine won't start, hydrolock, visible crack Catastrophic failure - head cracked or block warped £2,000 - £5,000+ Likely cause Minor gasket weep or condensation from short trips. Common on many cars, but worth investigating. What to do Book a diagnostic inspection. A simple coolant flush may resolve if it's condensation. If gasket weep is confirmed, plan for replacement. Repair cost £100-£300 for diagnostic + coolant flush if minor. Full gasket replacement if confirmed: £550-£2,000. Likely cause Blown head gasket - combustion gases leaking into cooling system. Gasket failed between cylinder and coolant jacket. What to do Stop driving. Arrange recovery. Continued driving will warp the cylinder head and damage the engine. Repair cost £550-£1,500 for gasket replacement + head skim if needed. Labour: 8-12 hours (inline 4) or 12-18 hours (V6). Likely cause Gasket failure between oil and coolant galleries. Oil contaminated with coolant - destroying bearings. What to do Stop driving immediately. Full engine inspection required. Bearings may be damaged - engine replacement may be more economical. Repair cost £900-£2,000+ for full gasket job + oil flush + bearing inspection. If bearings damaged: £2,000-£5,000+ for engine replacement. Likely cause Catastrophic failure - cylinder head cracked, engine block warped, or hydrolock (coolant in cylinders). What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - head and block are scrap. Repair cost £2,000-£5,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. 🚨 STOP DRIVING if: You see thick white smoke that smells sweet (coolant burning), or the temperature gauge hits red. Continuing to drive will warp the cylinder head or crack the block - turning a £800 repair into a £3,000+ engine replacement. Head gasket repair cost by vehicle segment"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Costs vary significantly by engine layout and vehicle segment. Labour is the biggest variable.",
          "Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour based on £65-£95/hr indie (North/Midlands). London/SE rates are 40-60% higher. Main dealer costs add 40-60%."
        ],
        "bullets": [
          "• New head gasket (OEM quality)",
          "• New head bolts (stretch bolts - must be replaced)",
          "• Cylinder head skim (machining flat) - £80-£150",
          "• Pressure test for cracks - £50-£100",
          "• Full coolant flush and replacement",
          "• Oil and filter change (coolant contamination risk)",
          "• Thermostat replacement (recommended)",
          "• Timing belt/chain refit (if disturbed)"
        ],
        "tables": [
          {
            "headers": [
              "Vehicle Segment",
              "Example Models",
              "Typical Repair Cost (Indie)",
              "Labour Hours",
              "Parts + Skimming"
            ],
            "rows": [
              [
                "Small car",
                "Ford Fiesta, Vauxhall Corsa, Renault Clio, Toyota Yaris",
                "£465 - £800",
                "6-9 hrs",
                "Gasket set £80-£150, head skim £80-£120"
              ],
              [
                "Family car",
                "Ford Focus, Vauxhall Astra, VW Golf, Honda Civic",
                "£700 - £1,200",
                "8-12 hrs",
                "Gasket set £100-£200, head skim £80-£120"
              ],
              [
                "Compact SUV / MPV",
                "Nissan Qashqai, Ford Kuga, VW Tiguan, Renault Kadjar",
                "£900 - £1,500",
                "10-14 hrs",
                "Gasket set £120-£250, head skim £100-£150"
              ],
              [
                "Executive / Large SUV",
                "BMW 3 Series, Mercedes C-Class, Audi A4, Land Rover Discovery Sport",
                "£1,200 - £1,850",
                "12-18 hrs",
                "Gasket set £150-£300, head skim £100-£150"
              ],
              [
                "Premium / Performance",
                "BMW X5, Range Rover, Porsche Cayenne, Mercedes E-Class",
                "£1,500 - £2,500+",
                "15-25 hrs",
                "Gasket set £200-£500, head skim £120-£180"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "What should you do after a head gasket failure-",
        "paragraphs": [
          "The financial viability depends heavily on your vehicle's current market value and the extent of the damage.",
          "Not every engine failure requires a full replacement. Where damage is isolated to the head gasket, repair is usually the right answer. However, if the engine has been overheated multiple times or coolant has contaminated the oil for an extended period, engine replacement may be more economical."
        ],
        "bullets": [
          "Head gasket is the only failed component (no cracks, no warping)",
          "Caught early (no overheating damage)",
          "Head skim within tolerance (typically less than 0.1-0.2mm warp)",
          "Vehicle value high enough to justify £800-£2,000 spend",
          "Labour: 8-20 hours depending on engine layout",
          "Head is cracked (common on some engines)",
          "Crack cannot be welded reliably",
          "Total cost: £1,200-£2,500 (used head + gasket job)",
          "Cylinder head cracked beyond repair",
          "Engine block warped or cracked (overheating damage)",
          "Bearings damaged by coolant contamination",
          "Labour to strip, inspect, machine, rebuild exceeds cost of reconditioned engine",
          "Vehicle value under £2,000-£3,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "The financial viability depends heavily on your vehicle's current market value and the extent of the damage. ✓ Choose head gasket replacement if: Head gasket is the only failed component (no cracks, no warping) Caught early (no overheating damage) Head skim within tolerance (typically less than 0.1-0.2mm warp) Vehicle value high enough to justify £800-£2,000 spend Labour: 8-20 hours depending on engine layout 🔧 Choose cylinder head replacement if: Head is cracked (common on some engines) Crack cannot be welded reliably Total cost: £1,200-£2,500 (used head + gasket job) ⚠ Choose engine replacement if: Cylinder head cracked beyond repair Engine block warped or cracked (overheating damage) Bearings damaged by coolant contamination Labour to strip, inspect, machine, rebuild exceeds cost of reconditioned engine Vehicle value under £2,000-£3,000 - replacement rarely economical \" If the head is cracked or the block is warped, fit a reconditioned engine. The labour to strip, inspect, machine, and rebuild almost always exceeds the cost of a warranted replacement unit. - Specialist rule of thumb (UK) Not every engine failure requires a full replacement. Where damage is isolated to the head gasket, repair is usually the right answer. However, if the engine has been overheated multiple times or coolant has contaminated the oil for an extended period, engine replacement may be more economical. Compare repair vs replacement quotes for your vehicle → Get quotes Affected engines - head gasket failure patterns"
      },
      {
        "title": "Engines with known head gasket issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. Toyota 2AD-FTV / 1AD-FTV (D4D) 60k-120k 260 + 250 [EM-VERIFIED] Known weakness in AD series diesels. Coolant flush every 3 years critical. Ford 1.5/1.6 EcoBoost 60k-100k 175 [EM-VERIFIED] Coolant leaks (head gasket/block porosity), overheating. BMW N47D20C 80k-140k 1,450 [EM-VERIFIED] Not primary failure, but overheating from coolant loss can cause secondary head issues. Land Rover 204DTD Ingenium 60k-120k 1,150 [EM-VERIFIED] EGR cooler leaks - can cause coolant loss and overheating. Vauxhall Z19DTH 1.9 CDTi 80k-150k 230 [EM-VERIFIED] Injector failure - not head gasket. But injector seal leaks cause carbon buildup. Subaru Boxer (EJ series) 60k-100k - Flat-four design makes labour intensive; preventative replacement recommended. Signs of head gasket failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [
          "A blown head gasket rarely fails without warning. Learn to spot the signs early."
        ],
        "bullets": [
          "• Milky emulsion under oil cap - often condensation, but worth investigating",
          "• Coolant level dropping slowly - no visible leak on drive",
          "• Slight misfire on cold start that clears - moisture in cylinders",
          "• Sweet smell from exhaust - burning coolant",
          "• Thick white smoke from exhaust - steam from burning coolant",
          "• Engine overheating, especially under load",
          "• Bubbles in coolant expansion tank - combustion gases entering cooling system",
          "• Coolant in oil - milky brown \"mayonnaise\" on dipstick",
          "• Oil in coolant - brown/black sludge in expansion tank",
          "• Engine misfire that doesn't clear - coolant in cylinder",
          "• Hard starting / hydrolock - engine won't turn over"
        ],
        "tables": [],
        "additionalText": "A blown head gasket rarely fails without warning. Learn to spot the signs early. 🔵 EARLY WARNING (Investigate soon) • Milky emulsion under oil cap - often condensation, but worth investigating • Coolant level dropping slowly - no visible leak on drive • Slight misfire on cold start that clears - moisture in cylinders • Sweet smell from exhaust - burning coolant 🔴 PROGRESSED DAMAGE (Stop driving - repair immediately) • Thick white smoke from exhaust - steam from burning coolant • Engine overheating, especially under load • Bubbles in coolant expansion tank - combustion gases entering cooling system • Coolant in oil - milky brown \"mayonnaise\" on dipstick • Oil in coolant - brown/black sludge in expansion tank • Engine misfire that doesn't clear - coolant in cylinder • Hard starting / hydrolock - engine won't turn over If you see white smoke that doesn't stop when the engine warms up, you almost certainly have a blown head gasket or cracked head. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Every day you delay increases the cost of repair exponentially."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Every day you delay increases the cost of repair exponentially. Stage Damage Cost to Fix Stage 1 Gasket weep - minor coolant loss, slight emulsion £100 - £300 Stage 2 Blown gasket (no overheating damage) £550 - £1,500 Stage 3 Overheating damage - head warped, possible crack £1,500 - £2,500 Stage 4 Catastrophic - block cracked, bearings destroyed £2,000 - £5,000+ Real-world example: 2012 Ford Focus 1.6 EcoBoost, 82,000 miles. Owner ignored intermittent overheating and white smoke for 2 weeks. The head gasket failed completely, dumping coolant into cylinder #3. Hydrolock bent the connecting rod. Total cost: £3,200 for a reconditioned engine. The same owner could have paid £900 for a head gasket replacement 10 days earlier. Vehicle value threshold"
      },
      {
        "title": "Is head gasket repair economical-",
        "paragraphs": [
          "Use this framework to decide whether to repair, replace, or scrap.",
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Use this framework to decide whether to repair, replace, or scrap. Vehicle Value Recommended Action Reasoning Under £2,000 Scrap or DIY if mechanically capable Professional repair (£800+) likely exceeds vehicle value £2,000 - £4,000 Used engine or repair if car is otherwise excellent Evaluate carefully; repair may still be borderline £4,000 - £8,000 Head gasket repair (or used engine if head cracked) Repair (£700-£1,500) is usually viable £8,000+ Head gasket repair or reconditioned engine Repair well within vehicle value; full engine replacement also viable if block damaged If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on internal marketplace data from 24,650 quote requests, head gasket failures are most common on certain diesel engines with known design weaknesses."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on internal marketplace data from 24,650 quote requests, head gasket failures are most common on certain diesel engines with known design weaknesses. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] BMW N47D20C Chain stretch primary, but overheating from coolant loss causes secondary head issues 1,450 requests [EM-VERIFIED] Land Rover 204DTD Ingenium EGR cooler leaks - can cause coolant loss and overheating 1,150 requests [EM-VERIFIED] Toyota 2AD-FTV / 1AD-FTV Known head gasket weakness - 260 + 250 requests [EM-VERIFIED] 510 requests [EM-VERIFIED] Ford 1.5/1.6 EcoBoost Coolant leaks (head gasket/block porosity) - 175 requests [EM-VERIFIED] 175 requests [EM-VERIFIED] Known failure insight \"The Toyota 2AD-FTV engine generated 260 quote requests in 2025 [EM-VERIFIED n=260], reflecting the well-documented head gasket weakness in AD series diesels. Specialists report head gasket failure typically occurs between 60,000 and 120,000 miles, with replacement costs ranging from £1,500 to £3,000.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Head gasket failures are often caught late - early diagnosis (white smoke, coolant loss) is your only chance of avoiding a full engine replacement. Preventative maintenance"
      },
      {
        "title": "Avoiding head gasket failure",
        "paragraphs": [
          "Head gasket failure is often caused by overheating or coolant neglect. Follow these specialist recommendations."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Head gasket failure is often caused by overheating or coolant neglect. Follow these specialist recommendations. 01 Never ignore overheating - even once Pull over immediately and investigate. Overheating is the primary cause of head gasket failure. 02 Check coolant level weekly Slow loss is the earliest warning sign. Top up and investigate any drop. 03 Use correct coolant (OEM spec) Incorrect coolant can corrode the gasket and head. Use manufacturer-spec coolant (G12/G13 for VW, etc.). 04 Replace coolant at manufacturer interval Old coolant becomes acidic and attacks gaskets. Typically 5 years or 60,000 miles. 05 On high-risk engines, consider coolant flush every 3 years Prevents electrolytic corrosion of the gasket - especially Toyota 2AD-FTV. Preventative coolant change £50-£150 OEM coolant + flush VS Catastrophic failure - engine replacement £2,000-£5,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does head gasket replacement cost in the UK",
        "answer": "Small car: £465-£800. Family car: £700-£1,200. SUV: £900-£1,500. Executive/premium: £1,200-£2,500+. Labour: 8-20 hours at £65-£95/hr (independent). Parts (gasket set, head bolts, oil, coolant, thermostat): £150-£400. Head skimming: £80-£150. → Head gasket replacement cost guide"
      },
      {
        "question": "Can a blown head gasket be repaired without removing the engine",
        "answer": "Yes, on most inline 4-cylinder engines, the cylinder head can be removed with the engine in the car. On V6 and V8 engines, engine removal is often required for access, significantly increasing labour hours."
      },
      {
        "question": "What are the signs of a blown head gasket",
        "answer": "White/steam from exhaust (sweet smell), coolant loss with no visible leak, milky oil (mayonnaise under oil cap), engine overheating, bubbles in coolant expansion tank, misfire on cold start."
      },
      {
        "question": "Can I drive with a blown head gasket",
        "answer": "No. Driving with a blown head gasket will cause the engine to overheat, warp the cylinder head, and potentially crack the engine block. Coolant in oil destroys bearings. Stop driving immediately."
      },
      {
        "question": "Is head gasket failure covered under warranty",
        "answer": "On reconditioned engines, the head gasket is typically covered as part of the engine warranty (12-24 months). On used cars, head gasket failure may be covered under a dealer warranty if purchased, but wear and tear exclusions often apply. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "My car is worth £2,000 and has a blown head gasket - what should I do",
        "answer": "If repair cost exceeds £1,200-£1,500, evaluate scrap value. A reconditioned engine may cost £2,000-£3,500 fitted - more than the car's value. Consider scrapping or selling as a spares/repair vehicle."
      }
    ]
  },
  "injector-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Acting early can save you thousands.",
          "Injector beginning to fail - partial blockage or wear. Spray pattern degraded.",
          "Book a diagnostic inspection. Injector cleaner may resolve if caught very early.",
          "£50-£150 for diagnostic + injector cleaner. Full replacement if injector is damaged.",
          "Injector stuck open (over-fuelling - black smoke) or stuck closed (under-fuelling - misfire).",
          "Stop driving if black smoke or fuel smell. Arrange recovery to a specialist.",
          "£120-£520 (petrol) or £300-£900 (diesel) per injector. Reconditioned diesel: £90-£190 exchange.",
          "Multiple injectors failed. On high-mileage diesel engines, if one fails, others are often near failure.",
          "Full set replacement recommended. Saves repeat labour costs.",
          "£800-£2,000+ for all four diesel injectors (reconditioned or new). Labour: 4-8 hours.",
          "Unburnt fuel washing cylinder walls, diluting engine oil. Bearings destroyed. DPF or catalytic converter damaged.",
          "Stop driving immediately. Full engine inspection required - bearings may be damaged.",
          "£3,000-£7,000+ for engine or DPF damage + injector replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Acting early can save you thousands. £50 Rough idle, slight misfire, poor fuel economy Partial blockage or wear £50 - £150 £120 Black/white smoke, fuel smell, engine management light Injector stuck open or closed £120 - £900 £800 Hard starting, misfire on multiple cylinders Multiple injectors failed or seized £800 - £2,000+ £7,000+ Engine knock, oil dilution, DPF damage Unburnt fuel washing cylinders, diluting oil £3,000 - £7,000+ Likely cause Injector beginning to fail - partial blockage or wear. Spray pattern degraded. What to do Book a diagnostic inspection. Injector cleaner may resolve if caught very early. Repair cost £50-£150 for diagnostic + injector cleaner. Full replacement if injector is damaged. Likely cause Injector stuck open (over-fuelling - black smoke) or stuck closed (under-fuelling - misfire). What to do Stop driving if black smoke or fuel smell. Arrange recovery to a specialist. Repair cost £120-£520 (petrol) or £300-£900 (diesel) per injector. Reconditioned diesel: £90-£190 exchange. Likely cause Multiple injectors failed. On high-mileage diesel engines, if one fails, others are often near failure. What to do Full set replacement recommended. Saves repeat labour costs. Repair cost £800-£2,000+ for all four diesel injectors (reconditioned or new). Labour: 4-8 hours. Likely cause Unburnt fuel washing cylinder walls, diluting engine oil. Bearings destroyed. DPF or catalytic converter damaged. What to do Stop driving immediately. Full engine inspection required - bearings may be damaged. Repair cost £3,000-£7,000+ for engine or DPF damage + injector replacement. On lower-value vehicles, this often means scrapping the car. 🚨 If you notice oil level rising on the dipstick (diesel), stop driving immediately. Fuel is diluting your oil, destroying bearing lubrication. Engine seizure is imminent. Injector replacement cost by fuel type"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour based on £65-£95/hr indie (North/Midlands). London/SE rates are 40-60% higher."
        ],
        "bullets": [
          "• New or reconditioned injector(s)",
          "• New copper washers/seals",
          "• New leak-off pipes (diesel)",
          "• Coding/calibration of new injectors (diesel - essential)",
          "• Diagnostic before and after"
        ],
        "tables": [
          {
            "headers": [
              "Fuel Type",
              "Cost Per Injector (New)",
              "Reconditioned Option",
              "Labour Hours (Per Injector)"
            ],
            "rows": [
              [
                "Petrol (conventional)",
                "£120 - £300",
                "Not typically available",
                "1-2 hrs"
              ],
              [
                "Petrol (direct injection)",
                "£200 - £520",
                "£100 - £250 (refurbished)",
                "2-3 hrs"
              ],
              [
                "Diesel (common rail)",
                "£300 - £600",
                "£90 - £190 (exchange)",
                "2-3 hrs"
              ],
              [
                "Diesel (performance/premium)",
                "£500 - £900+",
                "£150 - £350",
                "2-4 hrs"
              ],
              [
                "Full set of 4 (diesel)",
                "£1,200 - £2,400+",
                "£400 - £800",
                "4-8 hrs (bulk discount)"
              ]
            ]
          }
        ],
        "additionalText": "Fuel Type Cost Per Injector (New) Reconditioned Option Labour Hours (Per Injector) Petrol (conventional) £120 - £300 Not typically available 1-2 hrs Petrol (direct injection) £200 - £520 £100 - £250 (refurbished) 2-3 hrs Diesel (common rail) £300 - £600 £90 - £190 (exchange) 2-3 hrs Diesel (performance/premium) £500 - £900+ £150 - £350 2-4 hrs Full set of 4 (diesel) £1,200 - £2,400+ £400 - £800 4-8 hrs (bulk discount) Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour based on £65-£95/hr indie (North/Midlands). London/SE rates are 40-60% higher. What's included in a proper injector replacement job • New or reconditioned injector(s) • New copper washers/seals • New leak-off pipes (diesel) • Coding/calibration of new injectors (diesel - essential) • Diagnostic before and after Important: Diesel injectors must be coded to the ECU after replacement. Failure to code will cause rough running, smoke, and potential engine damage. Repair options"
      },
      {
        "title": "New vs reconditioned vs cleaning",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025, exchange reconditioned diesel injectors are the most requested option (approx. 60-70% of cases), reflecting the balance of cost and reliability. [EM-OBSERVED]"
        ],
        "bullets": [
          "Cost: £50 - £150 (off-car ultrasonic)",
          "Best for: Minor clogging, carbon build-up",
          "When to choose: Injector electrically OK but flow reduced",
          "Cost: £90 - £190 (diesel)",
          "Best for: Most owners - best value",
          "When to choose: Worn nozzle or minor internal damage",
          "Cost: £300 - £900+",
          "Best for: Maximum longevity, commercial vehicles",
          "When to choose: Insurance jobs, high-value vehicles, no core return",
          "Cost: £400 - £2,400+",
          "Best for: High-mileage vehicles (100k+ miles)",
          "When to choose: If one fails, others likely near failure"
        ],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025, exchange reconditioned diesel injectors are the most requested option (approx. 60-70% of cases), reflecting the balance of cost and reliability. [EM-OBSERVED] 🧹 Injector cleaning Cost: £50 - £150 (off-car ultrasonic) Best for: Minor clogging, carbon build-up When to choose: Injector electrically OK but flow reduced 🔄 Reconditioned (exchange) Cost: £90 - £190 (diesel) Best for: Most owners - best value When to choose: Worn nozzle or minor internal damage 🆕 Brand new injector Cost: £300 - £900+ Best for: Maximum longevity, commercial vehicles When to choose: Insurance jobs, high-value vehicles, no core return 📦 Full set replacement Cost: £400 - £2,400+ Best for: High-mileage vehicles (100k+ miles) When to choose: If one fails, others likely near failure Diesel injector specifics"
      },
      {
        "title": "What you need to know",
        "paragraphs": [
          "Diesel injectors operate at extremely high pressures (1,600-2,500 bar). They are precision components that wear over time."
        ],
        "bullets": [
          "• Worn nozzle - spray pattern degrades, poor atomisation",
          "• Stuck open - over-fuelling, black smoke, oil dilution",
          "• Stuck closed - misfire, white smoke, loss of power",
          "• Electrical failure - injector not responding to ECU commands",
          "• Seized in cylinder head - carbon build-up locks injector"
        ],
        "tables": [],
        "additionalText": "Diesel injectors operate at extremely high pressures (1,600-2,500 bar). They are precision components that wear over time. Why diesel injectors fail • Worn nozzle - spray pattern degrades, poor atomisation • Stuck open - over-fuelling, black smoke, oil dilution • Stuck closed - misfire, white smoke, loss of power • Electrical failure - injector not responding to ECU commands • Seized in cylinder head - carbon build-up locks injector The coding requirement Diesel injectors have individual calibration codes. After replacement, the ECU must be told which injector is in which cylinder. Failure to code will cause rough idle, excessive smoke, poor fuel economy, and potential engine damage. The \"replace all four\" rule: On high-mileage diesel engines (100k+ miles), if one injector fails, the others are often near failure. Many specialists recommend replacing all four injectors together to avoid repeat labour costs. Specialist rule of thumb (UK): \"On a diesel with over 100,000 miles, replace the full set. Paying labour twice for individual injector failures costs more than doing all four at once.\" Signs of injector failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Rough idle - engine feels uneven or shaky when stationary",
          "• Misfire - especially on cold start or under load",
          "• Poor fuel economy - noticeable drop in MPG",
          "• Engine management light - fault codes for cylinder-specific misfire or injector circuit",
          "• Black smoke (diesel/petrol) - over-fuelling, injector stuck open",
          "• White smoke (diesel only) - under-fuelling or poor atomisation",
          "• Strong fuel smell from exhaust - unburnt fuel passing through",
          "• Hard starting - extended cranking before engine fires",
          "• Failed MOT emissions - excess hydrocarbons or smoke"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Investigate soon) • Rough idle - engine feels uneven or shaky when stationary • Misfire - especially on cold start or under load • Poor fuel economy - noticeable drop in MPG • Engine management light - fault codes for cylinder-specific misfire or injector circuit 🔴 PROGRESSED DAMAGE (Investigate urgently) • Black smoke (diesel/petrol) - over-fuelling, injector stuck open • White smoke (diesel only) - under-fuelling or poor atomisation • Strong fuel smell from exhaust - unburnt fuel passing through • Hard starting - extended cranking before engine fires • Failed MOT emissions - excess hydrocarbons or smoke Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Injector wear - poor atomisation, reduced MPG £50-£150 Stage 2 Injector stuck open - black smoke, fuel in oil £300-£900 Stage 3 Oil dilution - fuel in oil destroys bearings £800-£2,000+ Stage 4 DPF damage - over-fuelling destroys DPF £1,000-£3,500+ Stage 5 Engine seizure - bearings fail, engine locks up £3,000-£10,000+ Real-world example from specialist forums (anonymised): 2012 BMW 320d N47, 112,000 miles. Owner ignored rough idle and black smoke for 3 months. A stuck-open injector dumped fuel into cylinder #3, washing the cylinder walls and diluting the engine oil. The diluted oil destroyed the main bearings. Total cost: £4,800 for a reconditioned engine. The same owner could have paid £450 for one reconditioned injector 10 weeks earlier. Red flag engines - injector failure patterns"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Injector wear - poor atomisation, reduced MPG £50-£150 Stage 2 Injector stuck open - black smoke, fuel in oil £300-£900 Stage 3 Oil dilution - fuel in oil destroys bearings £800-£2,000+ Stage 4 DPF damage - over-fuelling destroys DPF £1,000-£3,500+ Stage 5 Engine seizure - bearings fail, engine locks up £3,000-£10,000+ Real-world example from specialist forums (anonymised): 2012 BMW 320d N47, 112,000 miles. Owner ignored rough idle and black smoke for 3 months. A stuck-open injector dumped fuel into cylinder #3, washing the cylinder walls and diluting the engine oil. The diluted oil destroyed the main bearings. Total cost: £4,800 for a reconditioned engine. The same owner could have paid £450 for one reconditioned injector 10 weeks earlier. Red flag engines - injector failure patterns"
      },
      {
        "title": "Engines with known injector issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. Mercedes OM651 60k-120k 1,250 [EM-VERIFIED] Injector seal failure (\"Black Death\"). Seals: £400-£1,200; Injector: £300-£600. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Injector coking - Dieselgate software increased failures. Cleaning: £200-£500. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Injector failure common on high-mileage units. Injector: £300-£800. Renault K9K 1.5 dCi 80k-150k 730 [EM-VERIFIED] Swarf contamination, electrical faults. Injector: £300-£800. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Not primary failure, but injector issues secondary to chain debris. Injector: £300-£800. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], injector failure is one of the most common causes of engine issues on high-mileage diesel vehicles."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], injector failure is one of the most common causes of engine issues on high-mileage diesel vehicles. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Mercedes OM651 Injector seal failure (\"Black Death\") - 1,250 requests [EM-VERIFIED] 1,250 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI Injector coking - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Ford DV6 1.6 TDCi Injector failure - 780 requests [EM-VERIFIED] 780 requests [EM-VERIFIED] Renault K9K 1.5 dCi Swarf contamination - 730 requests [EM-VERIFIED] 730 requests [EM-VERIFIED] Known failure insight \"The Mercedes OM651 generated 1,250 quote requests in 2025 [EM-VERIFIED n=1,250]. Specialists report injector seal failure ('Black Death') as the most common issue - carbon build-up around injectors caused by leaking seals. If caught early, seal replacement costs £400-£1,200. Ignored, the injector seizes in the head, requiring specialist removal or cylinder head replacement.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Injector failure is often ignored until secondary damage occurs - acting early saves engines and money. Vehicle value threshold"
      },
      {
        "title": "Is injector replacement economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Recommended Action Reasoning Under £2,000 Reconditioned injector(s) or scrap New injectors (£300-£900 each) may exceed value £2,000 - £4,000 Reconditioned injectors (exchange) Best value; new injectors rarely justified £4,000 - £8,000 New or reconditioned injectors Evaluate both; reconditioned usually sufficient £8,000+ New injectors (or reconditioned with warranty) Warranty justifies higher upfront cost If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Check your vehicle's value and compare injector replacement quotes → Get quotes Preventative maintenance"
      },
      {
        "title": "Avoiding injector failure",
        "paragraphs": [
          "01 Use quality fuel from branded stations Supermarket fuel can contain higher levels of contaminants that clog injectors. 02 Change fuel filter at manufacturer interval A clogged filter starves injectors and allows debris through. 03 Diesel additive every 5,000-10,000 miles Helps keep injectors clean (e.g., Millers, Forte, Liqui Moly). 04 Avoid short journeys on diesel Incomplete combustion causes carbon build-up on injector nozzles. 05 If one injector fails on high-mileage diesel, consider replacing all four Prevents repeat labour costs. Labour is often more than the parts. Preventative maintenance (per year) £50-£150 Additives + fuel filter changes VS Catastrophic failure - engine replacement £3,000-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "01 Use quality fuel from branded stations Supermarket fuel can contain higher levels of contaminants that clog injectors. 02 Change fuel filter at manufacturer interval A clogged filter starves injectors and allows debris through. 03 Diesel additive every 5,000-10,000 miles Helps keep injectors clean (e.g., Millers, Forte, Liqui Moly). 04 Avoid short journeys on diesel Incomplete combustion causes carbon build-up on injector nozzles. 05 If one injector fails on high-mileage diesel, consider replacing all four Prevents repeat labour costs. Labour is often more than the parts. Preventative maintenance (per year) £50-£150 Additives + fuel filter changes VS Catastrophic failure - engine replacement £3,000-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does injector replacement cost in the UK",
        "answer": "Petrol injector: £120-£520 per injector. Diesel injector: £300-£900+ per injector. Reconditioned diesel injector: £90-£190 (exchange). Full set of four diesel injectors: £800-£2,400+. Labour: 1-3 hours per injector at £65-£95/hr (independent). → Injector replacement cost guide"
      },
      {
        "question": "Can a fuel injector be repaired instead of replaced",
        "answer": "Yes, depending on damage. Cleaning (£50-£150) works for minor clogging. Reconditioned injectors (£90-£190) replace worn nozzles and internal components. Seized injectors (carbon-locked in cylinder head) are often not repairable without head removal."
      },
      {
        "question": "What are the signs of injector failure",
        "answer": "Rough idle, misfire, poor fuel economy, black smoke (over-fuelling) or white smoke (diesel under-fuelling), fuel smell from exhaust, engine management light, hard starting."
      },
      {
        "question": "What causes injector failure",
        "answer": "Most common causes: fuel contamination (water or debris), worn nozzle (high mileage), electrical failure (coil or solenoid), carbon build-up (diesel short journeys), seized injector (carbon locking in cylinder head)."
      },
      {
        "question": "Which engines have the most injector problems",
        "answer": "Based on 2025 data: Mercedes OM651 (1,250 requests), Ford DV6 1.6 TDCi (780), Renault K9K 1.5 dCi (730), VW/Audi EA189 2.0 TDI (1,050). [EM-VERIFIED]"
      },
      {
        "question": "Is injector failure covered under warranty",
        "answer": "On reconditioned engines, injectors are typically covered as part of the engine warranty (12-24 months). However, failure caused by contaminated fuel or neglect is often excluded. On used cars, injector failure may be covered under a dealer warranty, but wear and tear exclusions often apply. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "Can I drive with a faulty injector",
        "answer": "If the injector is stuck open (black smoke, fuel smell), avoid driving - unburnt fuel will damage the DPF (diesel) or catalytic converter (petrol) and dilute engine oil. If the injector is stuck closed (misfire), you can drive gently to a garage, but continued driving risks catalytic converter damage."
      }
    ]
  },
  "low-compression": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. A compression test and leak-down test tell you exactly where pressure escapes.",
          "One cylinder slightly low - valves or rings beginning to wear. Early warning - book diagnostic.",
          "Book a compression test (£80-£150). If compression is low, follow with a leak-down test (£150-£250).",
          "£100-£200 for diagnostic. Repair cost depends on cause - see stages below.",
          "Burnt or bent valve, worn rings, or head gasket. Localised problem in one or two cylinders.",
          "Leak-down test identifies the cause. Valve job or head gasket may be the solution.",
          "£300-£800 for valve adjustment. £800-£2,000 for valve replacement. £550-£1,200 for head gasket.",
          "Multiple cylinders low - worn rings, valve damage, or head gasket between cylinders.",
          "Full diagnostic required. Engine rebuild or replacement may be needed.",
          "£1,500-£3,500 for rings. £1,200-£2,500 for multi-cylinder valve job. Evaluate vehicle value.",
          "All cylinders low - worn-out engine. Rings, bores, and valves all worn beyond repair.",
          "Engine replacement or full rebuild required. Evaluate vehicle value before committing.",
          "£2,500-£6,500+ for engine replacement. £7,000-£10,000+ for cylinder bore damage repairs."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. A compression test and leak-down test tell you exactly where pressure escapes. £100 Hard starting (cold), slightly rough idle One cylinder slightly low - valves or rings beginning to wear £100 - £200 (compression test + diagnosis) £300 Misfire on one cylinder, loss of power under load One or two cylinders low - burnt valve, worn rings, or head gasket £300 - £2,000 £1,500 Engine cranks unevenly, constant misfire, blue/white smoke Multiple cylinders low - worn rings, valve damage, or head gasket £1,500 - £3,500 £6,500+ Engine barely runs, won't idle, massive oil consumption All cylinders low - worn-out engine £2,500 - £6,500+ Likely cause One cylinder slightly low - valves or rings beginning to wear. Early warning - book diagnostic. What to do Book a compression test (£80-£150). If compression is low, follow with a leak-down test (£150-£250). Repair cost £100-£200 for diagnostic. Repair cost depends on cause - see stages below. Likely cause Burnt or bent valve, worn rings, or head gasket. Localised problem in one or two cylinders. What to do Leak-down test identifies the cause. Valve job or head gasket may be the solution. Repair cost £300-£800 for valve adjustment. £800-£2,000 for valve replacement. £550-£1,200 for head gasket. Likely cause Multiple cylinders low - worn rings, valve damage, or head gasket between cylinders. What to do Full diagnostic required. Engine rebuild or replacement may be needed. Repair cost £1,500-£3,500 for rings. £1,200-£2,500 for multi-cylinder valve job. Evaluate vehicle value. Likely cause All cylinders low - worn-out engine. Rings, bores, and valves all worn beyond repair. What to do Engine replacement or full rebuild required. Evaluate vehicle value before committing. Repair cost £2,500-£6,500+ for engine replacement. £7,000-£10,000+ for cylinder bore damage repairs. Signs of low compression"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Hard starting - cranks 3-5 seconds before firing, especially cold",
          "• Rough idle - engine shakes when stationary",
          "• Misfire - intermittent or constant (fault code P030X)",
          "• Loss of power - sluggish uphill or under load",
          "• Poor fuel economy - 15-30% drop in MPG",
          "• Engine cranks unevenly - sounds like \"skipping\" during cranking",
          "• Constant misfire - runs on fewer than all cylinders",
          "• Blue smoke (oil burning) or white smoke (coolant burning)",
          "• Failed MOT emissions - high hydrocarbons (HC)",
          "• Engine won't start - compression too low to ignite fuel"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book compression test) • Hard starting - cranks 3-5 seconds before firing, especially cold • Rough idle - engine shakes when stationary • Misfire - intermittent or constant (fault code P030X) • Loss of power - sluggish uphill or under load • Poor fuel economy - 15-30% drop in MPG 🔴 PROGRESSED DAMAGE (Book diagnostic immediately) • Engine cranks unevenly - sounds like \"skipping\" during cranking • Constant misfire - runs on fewer than all cylinders • Blue smoke (oil burning) or white smoke (coolant burning) • Failed MOT emissions - high hydrocarbons (HC) • Engine won't start - compression too low to ignite fuel 🚨 Critical: Low compression on one cylinder often allows running (badly). Low compression on two adjacent cylinders usually means head gasket failure between them. Low compression on all cylinders means the engine is worn out - replacement or rebuild is the only answer. Diagnostic process"
      },
      {
        "title": "Compression test & leak-down test",
        "paragraphs": [
          "A proper diagnosis requires two tests. Compression test tells you that compression is low. Leak-down test tells you where it's going."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "A proper diagnosis requires two tests. Compression test tells you that compression is low. Leak-down test tells you where it's going. Step 1: Compression Test (£80-£150) Mechanic removes spark plugs (petrol) or glow plugs (diesel) and screws a gauge into each cylinder. Result Meaning One cylinder significantly lower Localised problem - burnt valve, broken ring, head gasket Two adjacent cylinders low Head gasket failure between cylinders All cylinders evenly low General engine wear - worn rings and bores Low compression that improves with oil Worn rings are the problem Low compression that does NOT improve with oil Valve or head gasket issue Step 2: Leak-Down Test (£150-£250) Pressurised air applied to each cylinder. Listening for where air escapes tells you the cause. Air Escaping From The Problem Oil filler cap or dipstick Worn piston rings Exhaust pipe Burnt exhaust valve Intake manifold Burnt intake valve Coolant expansion tank Blown head gasket or cracked head Adjacent cylinder Head gasket between cylinders Specialist rule of thumb: \"A compression test without a leak-down test is only half the story. Any competent specialist will do both. If a garage quotes a rebuild based only on a compression test, get a second opinion.\" Common causes of low compression"
      },
      {
        "title": "Repair costs by cause",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: compression test 1-2 hrs, leak-down 2-3 hrs, valve job 8-12 hrs, rings 12-20 hrs at £65-£95/hr."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Typical Repair Cost",
              "Labour Hours",
              "Most Common On"
            ],
            "rows": [
              [
                "Burnt exhaust valve",
                "£800 - £2,000",
                "8-12 hrs",
                "High-mileage petrol, LPG-converted"
              ],
              [
                "Bent valve (timing failure)",
                "£1,000 - £2,500",
                "10-16 hrs",
                "Interference engines after timing failure"
              ],
              [
                "Worn piston rings",
                "£1,500 - £3,500",
                "12-20 hrs",
                "High-mileage diesels, neglected petrol"
              ],
              [
                "Blown head gasket",
                "£550 - £1,200",
                "8-15 hrs",
                "BMW N47, Subaru, VW EA189"
              ],
              [
                "Worn valve guides",
                "£800 - £1,800",
                "10-14 hrs",
                "Engines 120k+ miles"
              ],
              [
                "Cylinder bore damage",
                "£7,000 - £10,000+",
                "20-30 hrs",
                "Rare - leads to engine replacement"
              ],
              [
                "Cracked cylinder head",
                "£1,200 - £3,500",
                "10-16 hrs",
                "BMW N47 (cracking between valves)"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Engines with known compression issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain failure (bent valves), cracked head. Valve job: £1,200-£2,500. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Carbon on valves (injector seal leaks), worn rings. Valve cleaning: £300-£600; Rings: £1,800-£3,500. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Worn rings (high mileage), burnt valves, head gasket. Rings: £1,800-£3,500; Valves: £800-£1,800. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Worn rings, burnt valves. Rings: £1,500-£3,000; Valves: £700-£1,500. Toyota 2AD-FTV 60k-120k 260 [EM-VERIFIED] Piston ring design flaw (2006-2009). Rings: £1,500-£3,000 - check Toyota warranty first. Market Intelligence (Toyota 2AD-FTV): This engine (260 requests [EM-VERIFIED]) has a known piston ring design flaw on 2006-2009 models causing oil consumption and eventual low compression. Toyota issued a warranty extension (some vehicles up to 7 years/111,000 miles). Check with a Toyota dealer before paying for a rebuild - you may be covered. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Engine rebuild vs replacement: On common engines (Ford DV6, VW EA189, BMW N47, Vauxhall Z19DTH), a reconditioned engine is often cheaper than a full rebuild. Compare both."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Burnt/bent valve (1-2 cylinders)",
                "Valve replacement + head work",
                "£800 - £2,000",
                "Viable on vehicles worth £2,500+"
              ],
              [
                "Blown head gasket (head not warped)",
                "Head gasket + skim",
                "£550 - £1,200",
                "Viable on most vehicles worth £2,000+"
              ],
              [
                "Blown head gasket (head warped)",
                "Cylinder head replacement + gasket",
                "£1,200 - £3,500",
                "Evaluate vehicle value"
              ],
              [
                "Worn piston rings (one cylinder)",
                "Engine rebuild (rings, bearings)",
                "£1,500 - £3,500",
                "Viable on vehicles worth £3,000+"
              ],
              [
                "Worn rings (all cylinders)",
                "Rebuild or replacement engine",
                "£1,500-£4,000+ (rebuild) or £2,500-£6,500+ (replacement)",
                "Replacement often cheaper on common engines"
              ],
              [
                "Cylinder bore damage",
                "Engine replacement",
                "£2,500 - £6,500+",
                "Only on high-value vehicles (£6,000+)"
              ]
            ]
          }
        ],
        "additionalText": "Cause Repair Option Typical Cost When to Choose Burnt/bent valve (1-2 cylinders) Valve replacement + head work £800 - £2,000 Viable on vehicles worth £2,500+ Blown head gasket (head not warped) Head gasket + skim £550 - £1,200 Viable on most vehicles worth £2,000+ Blown head gasket (head warped) Cylinder head replacement + gasket £1,200 - £3,500 Evaluate vehicle value Worn piston rings (one cylinder) Engine rebuild (rings, bearings) £1,500 - £3,500 Viable on vehicles worth £3,000+ Worn rings (all cylinders) Rebuild or replacement engine £1,500-£4,000+ (rebuild) or £2,500-£6,500+ (replacement) Replacement often cheaper on common engines Cylinder bore damage Engine replacement £2,500 - £6,500+ Only on high-value vehicles (£6,000+) Engine rebuild vs replacement: On common engines (Ford DV6, VW EA189, BMW N47, Vauxhall Z19DTH), a reconditioned engine is often cheaper than a full rebuild. Compare both. Vehicle Value Threshold: Under £2,000 - Simple repairs only. If rings or rebuild needed, consider scrap. £2,000-£4,000 - Valve job or head gasket viable. Piston rings- Evaluate carefully. £4,000-£8,000 - Piston rings or full rebuild justified. £8,000+ - Any repair - even full engine replacement. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored early signs - one cylinder slightly low £100 - £200 (diagnostic only) Stage 2 Driven with misfire (weeks) - cat/DPF damage from unburnt fuel £1,000 - £3,500 + original repair Stage 3 Driven with low oil pressure (worn rings) - bearing damage £2,000 - £5,000 + top end Stage 4 Timing failure (interference engine) - bent valves £2,000 - £5,000 (often cheaper to replace engine) Stage 5 Complete loss of compression - engine won't start £2,500 - £6,500+ The maths: Diagnose now: £100-£200. Fix now (valve job): £800-£2,000. Ignore and drive (cat/DPF damage): £1,000-£3,500 + original repair. Wait until engine fails to start: £2,500-£6,500 (engine replacement). Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored early signs - one cylinder slightly low £100 - £200 (diagnostic only) Stage 2 Driven with misfire (weeks) - cat/DPF damage from unburnt fuel £1,000 - £3,500 + original repair Stage 3 Driven with low oil pressure (worn rings) - bearing damage £2,000 - £5,000 + top end Stage 4 Timing failure (interference engine) - bent valves £2,000 - £5,000 (often cheaper to replace engine) Stage 5 Complete loss of compression - engine won't start £2,500 - £6,500+ The maths: Diagnose now: £100-£200. Fix now (valve job): £800-£2,000. Ignore and drive (cat/DPF damage): £1,000-£3,500 + original repair. Wait until engine fails to start: £2,500-£6,500 (engine replacement). Preventative maintenance"
      },
      {
        "title": "Avoiding low compression",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Frequency"
            ],
            "rows": [
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Every 6,000-10,000 miles"
              ],
              [
                "Coolant changes (prevents head gasket failure)",
                "£50 - £150",
                "Every 3-5 years"
              ],
              [
                "Timing belt/chain replacement",
                "£300 - £1,800",
                "Per manufacturer (60k-100k miles)"
              ],
              [
                "Quality fuel (petrol - prevents burnt valves)",
                "+5-10p per litre",
                "Occasional use"
              ],
              [
                "Avoid overheating",
                "£0",
                "Immediate stop if gauge rises"
              ],
              [
                "Regular compression test (preventative)",
                "£80 - £150",
                "Every 60k-80k miles on high-mileage vehicles"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Frequency Regular oil changes (correct spec) £50 - £150 Every 6,000-10,000 miles Coolant changes (prevents head gasket failure) £50 - £150 Every 3-5 years Timing belt/chain replacement £300 - £1,800 Per manufacturer (60k-100k miles) Quality fuel (petrol - prevents burnt valves) +5-10p per litre Occasional use Avoid overheating £0 Immediate stop if gauge rises Regular compression test (preventative) £80 - £150 Every 60k-80k miles on high-mileage vehicles Specialist rule of thumb: \"On an interference engine (most modern engines), timing belt or chain failure means bent valves. Bent valves mean an £800-£2,500 valve job. Replace your timing belt on schedule - it's cheap insurance against a destroyed top end.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does low compression repair cost in the UK",
        "answer": "Valve adjustment: £300-£800. Valve replacement: £800-£2,000. Head gasket: £550-£1,200. Piston rings: £1,500-£3,500. Cylinder bore damage: £7,000-£10,000+. Engine replacement: £2,500-£6,500+. Diagnostic (compression + leak-down): £100-£250. → Engine repair cost guide"
      },
      {
        "question": "What causes low compression",
        "answer": "Most common: burnt or bent valves (timing failure or high mileage), worn piston rings (high mileage, poor maintenance), blown head gasket (overheating), worn cylinder bores, or cracked cylinder head."
      },
      {
        "question": "How do I know if my engine has low compression",
        "answer": "Symptoms: hard starting (especially cold), rough idle, misfire, loss of power, poor fuel economy, failed MOT emissions. The only definitive test is a compression test (£80-£150)."
      },
      {
        "question": "What is the difference between a compression test and a leak-down test",
        "answer": "Compression test measures maximum pressure - tells you that compression is low. Leak-down test applies pressurised air and listens for escape - tells you where (valves, rings, or head gasket)."
      },
      {
        "question": "Is low compression on one cylinder worth fixing",
        "answer": "Yes, if vehicle worth £2,500+. A valve job (£800-£2,000) or head gasket (£550-£1,200) is often economical. If worn rings on a high-mileage engine, a full rebuild (£1,500-£3,500) may be required - evaluate vehicle value."
      },
      {
        "question": "Is it better to rebuild or replace the engine",
        "answer": "On common engines (Ford DV6, VW EA189, BMW N47), a reconditioned engine is often cheaper than a rebuild. A rebuild uses new parts and may last longer. A used engine is a gamble on its history. Discuss with your specialist."
      },
      {
        "question": "Which engines have the most low compression problems",
        "answer": "Based on 2025 data: BMW N47D20C (1,450 - timing failure causes bent valves), VW EA189 (1,050 - worn rings, burnt valves), Mercedes OM651 (1,250 - carbon on valves), Ford DV6 (780 - worn rings), Toyota 2AD-FTV (260 - piston ring design flaw). [EM-VERIFIED]"
      }
    ]
  },
  "misfiring-engine": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. A flashing EML is an emergency.",
          "Worn spark plugs or minor ignition fault. The most common and cheapest fix on petrol engines.",
          "Book a diagnostic. If spark plugs are due (60k-80k miles), replace them. Cost: £50-£150 for full set.",
          "£50-£150 for spark plugs. Labour: 1-2 hours at £65-£95/hr.",
          "Failed ignition coil (petrol) or fuel injector (petrol/diesel). Constant misfire on a specific cylinder.",
          "Swap ignition coils to see if misfire moves. If yes, replace coil (£70-£220). If no, test injectors.",
          "£70-£220 for coil. £120-£900 for injector. Labour: 1-4 hours.",
          "Multiple cylinders misfiring - unburnt fuel destroying catalytic converter or DPF.",
          "Stop driving immediately. Call recovery. Do not continue - cat/DPF damage is occurring.",
          "£150-£600 for ignition components + possible £500-£2,000 for cat/DPF replacement.",
          "Low compression - valves, piston rings, or head gasket failure. Internal engine damage.",
          "Full diagnostic - compression test and leak-down test. Repair or replace engine based on vehicle value.",
          "£600-£3,500+ for engine repair or head rebuild. Labour: 8-20 hours.",
          "Severe internal damage from ignored misfire - bearings destroyed, pistons damaged.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. A flashing EML is an emergency. £50 Slight rough idle, occasional hesitation Worn spark plugs or minor ignition fault £50 - £150 (spark plugs) £70 Constant misfire on one cylinder, EML steady Failed ignition coil or injector £70 - £220 (coil) or £120 - £900 (injector) £150 Flashing EML, strong misfire, vibration, poor fuel economy Multiple cylinders misfiring - cat/DPF being destroyed £150 - £600 + possible cat/DPF damage £600 Engine barely runs, no power, failed emissions Low compression - valves, rings, or head gasket £600 - £3,500+ £6,500+ Engine knock, metal in oil, seizure Severe internal damage from ignored misfire £2,500 - £6,500+ Likely cause Worn spark plugs or minor ignition fault. The most common and cheapest fix on petrol engines. What to do Book a diagnostic. If spark plugs are due (60k-80k miles), replace them. Cost: £50-£150 for full set. Repair cost £50-£150 for spark plugs. Labour: 1-2 hours at £65-£95/hr. Likely cause Failed ignition coil (petrol) or fuel injector (petrol/diesel). Constant misfire on a specific cylinder. What to do Swap ignition coils to see if misfire moves. If yes, replace coil (£70-£220). If no, test injectors. Repair cost £70-£220 for coil. £120-£900 for injector. Labour: 1-4 hours. Likely cause Multiple cylinders misfiring - unburnt fuel destroying catalytic converter or DPF. What to do Stop driving immediately. Call recovery. Do not continue - cat/DPF damage is occurring. Repair cost £150-£600 for ignition components + possible £500-£2,000 for cat/DPF replacement. Likely cause Low compression - valves, piston rings, or head gasket failure. Internal engine damage. What to do Full diagnostic - compression test and leak-down test. Repair or replace engine based on vehicle value. Repair cost £600-£3,500+ for engine repair or head rebuild. Labour: 8-20 hours. Likely cause Severe internal damage from ignored misfire - bearings destroyed, pistons damaged. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of engine misfire"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Rough idle - engine shakes or vibrates when stationary",
          "• Slight hesitation when accelerating",
          "• Loss of power, especially uphill or under load",
          "• Poor fuel economy - noticeable drop in MPG",
          "• Engine management light steady (not flashing)",
          "• Flashing engine management light - cat/DPF damage occurring",
          "• Constant misfire on one or more cylinders",
          "• Engine vibration at all RPMs",
          "• Failed MOT emissions - high hydrocarbons (HC)",
          "• Petrol smell from exhaust - unburnt fuel",
          "• Engine barely runs or won't start"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book diagnostic soon) • Rough idle - engine shakes or vibrates when stationary • Slight hesitation when accelerating • Loss of power, especially uphill or under load • Poor fuel economy - noticeable drop in MPG • Engine management light steady (not flashing) 🔴 PROGRESSED DAMAGE (Stop driving - immediate action) • Flashing engine management light - cat/DPF damage occurring • Constant misfire on one or more cylinders • Engine vibration at all RPMs • Failed MOT emissions - high hydrocarbons (HC) • Petrol smell from exhaust - unburnt fuel • Engine barely runs or won't start Common causes of engine misfire"
      },
      {
        "title": "Cheapest to most expensive",
        "paragraphs": [
          "Market context: Based on Engines Market enquiry volumes, BMW N47D20C (1,450 requests [EM-VERIFIED]), Mercedes OM651 (1,250), VW/Audi EA189 (1,050), and Ford DV6 (780) are among the most frequently requested engines. Misfire complaints on these engines are often traced to injector issues (diesel) or ignition components (petrol). [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Repair Cost",
              "Most Common On"
            ],
            "rows": [
              [
                "Spark plugs (worn)",
                "Electrode wears out - weak or no spark",
                "£50 - £150 (full set)",
                "All petrol engines, especially high-mileage"
              ],
              [
                "Ignition coil failure",
                "Coil internal failure - no spark to cylinder",
                "£70 - £220 (one coil)",
                "Ford EcoBoost, VW TSI, BMW N-series"
              ],
              [
                "Fuel injector (clogged/failed)",
                "Injector stuck open/closed - incorrect fuel delivery",
                "£120 - £900 (per injector)",
                "Diesel engines, direct-injection petrols"
              ],
              [
                "Vacuum / air leak",
                "Cracked hose or intake gasket - unmetered air",
                "£50 - £300",
                "All engines, especially older models"
              ],
              [
                "EGR valve stuck open",
                "Exhaust gas recirculates at wrong time",
                "£135 - £650",
                "Diesel engines, VW EA189, Mercedes OM651"
              ],
              [
                "Low compression (valves)",
                "Burnt or bent valve - cylinder can't seal",
                "£800 - £2,000",
                "High-mileage petrol, interference engines"
              ],
              [
                "Low compression (rings)",
                "Worn rings - oil in cylinder, poor sealing",
                "£1,500 - £3,500",
                "High-mileage engines, neglected maintenance"
              ],
              [
                "Head gasket failure",
                "Gasket blown between cylinders or into coolant",
                "£550 - £1,200",
                "BMW N47, Subaru, VW EA189, Mercedes OM651"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Finding the cause - cheapest to most expensive",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Step",
              "Test",
              "What It Tells You",
              "Typical Cost"
            ],
            "rows": [
              [
                "1",
                "OBD-II scan",
                "Fault codes identify which cylinder",
                "£30 - £80"
              ],
              [
                "2",
                "Swap ignition coils (petrol)",
                "If misfire moves with coil → bad coil",
                "£0 - £50 diagnostic"
              ],
              [
                "3",
                "Swap spark plugs (petrol)",
                "If misfire moves with plug → bad plug",
                "£50 - £150 (new plugs)"
              ],
              [
                "4",
                "Injector test",
                "Flow test - confirms injector failure",
                "£120 - £900 (replacement)"
              ],
              [
                "5",
                "Vacuum / smoke test",
                "Identifies air leaks",
                "£50 - £150"
              ],
              [
                "6",
                "Compression test",
                "Measures cylinder pressure - low = internal damage",
                "£80 - £150"
              ],
              [
                "7",
                "Leak-down test",
                "Identifies where compression escapes",
                "£150 - £250"
              ],
              [
                "8",
                "Borescope inspection",
                "Visual of cylinder walls, piston, valves",
                "£50 - £150"
              ]
            ]
          }
        ],
        "additionalText": "Step Test What It Tells You Typical Cost 1 OBD-II scan Fault codes identify which cylinder £30 - £80 2 Swap ignition coils (petrol) If misfire moves with coil → bad coil £0 - £50 diagnostic 3 Swap spark plugs (petrol) If misfire moves with plug → bad plug £50 - £150 (new plugs) 4 Injector test Flow test - confirms injector failure £120 - £900 (replacement) 5 Vacuum / smoke test Identifies air leaks £50 - £150 6 Compression test Measures cylinder pressure - low = internal damage £80 - £150 7 Leak-down test Identifies where compression escapes £150 - £250 8 Borescope inspection Visual of cylinder walls, piston, valves £50 - £150 Specialist rule of thumb: \"On a petrol engine with a single-cylinder misfire, swap the ignition coil with another cylinder. If the misfire moves, it's a £70-£220 coil. If it doesn't move, it could be a spark plug, injector, or compression. Diagnose from cheapest to most expensive - always.\" Diagnostic decisions"
      },
      {
        "title": "Interpreting fault codes",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Fault Code",
              "Meaning",
              "Most Likely Cause",
              "Typical Cost"
            ],
            "rows": [
              [
                "P0300",
                "Random/multiple cylinder misfire",
                "Vacuum leak, fuel delivery, or compression",
                "£50 - £3,500+"
              ],
              [
                "P0301",
                "Cylinder 1 misfire",
                "Coil, plug, injector, or compression",
                "£50 - £3,500+"
              ],
              [
                "P0302-P0308",
                "Cylinder-specific misfire",
                "Coil, plug, injector, or compression",
                "£50 - £3,500+"
              ],
              [
                "P0171 / P0174",
                "Lean mixture",
                "Vacuum leak, MAF sensor, fuel delivery",
                "£50 - £500"
              ],
              [
                "P0201-P0208",
                "Injector circuit fault",
                "Failed injector or wiring",
                "£120 - £900"
              ]
            ]
          }
        ],
        "additionalText": "Fault Code Meaning Most Likely Cause Typical Cost P0300 Random/multiple cylinder misfire Vacuum leak, fuel delivery, or compression £50 - £3,500+ P0301 Cylinder 1 misfire Coil, plug, injector, or compression £50 - £3,500+ P0302-P0308 Cylinder-specific misfire Coil, plug, injector, or compression £50 - £3,500+ P0171 / P0174 Lean mixture Vacuum leak, MAF sensor, fuel delivery £50 - £500 P0201-P0208 Injector circuit fault Failed injector or wiring £120 - £900 Urgency matrix: EML off, occasional hesitation Book diagnostic within 2 weeks EML steady on, car runs rough Book diagnostic within days EML flashing Stop driving immediately Red flag engines - known misfire patterns"
      },
      {
        "title": "Engines with known misfire issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. Mercedes OM651 60k-120k 1,250 [EM-VERIFIED] Injector seal failure (Black Death) - carbon buildup. Seals: £400-£1,200; Injector: £300-£600. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Injector failure (secondary to chain debris). Injector: £300-£800. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Injector coking - Dieselgate software increased failure rate. Cleaning: £200-£500; Injector: £300-£800. Ford DV6 1.6 TDCi 80k-150k 780 [EM-VERIFIED] Injector failure - very common on high-mileage. Injector: £300-£800. VW/Audi EA888 Gen3 2.0 TSI 60k-100k 130 [EM-VERIFIED] Ignition coil failure - common on petrol. Coil: £70-£150; Spark plugs: £50-£100. Ford EcoBoost 1.0 (early) 60k-100k 185 [EM-VERIFIED] Wet belt debris - misfire from low oil pressure affecting valve train. Belt replacement: £600-£1,500. Market Intelligence (Mercedes OM651): The OM651 engine generated 1,250 quote requests in 2025 [EM-VERIFIED n=1,250]. Specialists report that injector seal failure (\"Black Death\") - carbon build-up around injectors caused by leaking seals - is the most common failure on this engine. If caught early, seal replacement costs £400-£1,200. Ignored, the injector seizes in the head, requiring specialist removal or cylinder head replacement. [KNOWN FAILURE PATTERNS] Flashing EML - why you must stop immediately"
      },
      {
        "title": "Driving with a flashing EML",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Time Driven with Flashing EML",
              "Damage",
              "Cost to Fix"
            ],
            "rows": [
              [
                "1-2 minutes",
                "Unburnt fuel reaches cat/DPF",
                "Minor - may clear with driving"
              ],
              [
                "5-10 minutes",
                "Cat overheats - substrate begins melting",
                "£500 - £1,200"
              ],
              [
                "20+ minutes",
                "Cat/DPF destroyed, possible engine damage",
                "£1,000 - £2,500 + engine repair"
              ],
              [
                "Extended driving",
                "Bore wash - fuel washes oil from cylinder walls",
                "£2,500 - £6,500+"
              ]
            ]
          }
        ],
        "additionalText": "Time Driven with Flashing EML Damage Cost to Fix 1-2 minutes Unburnt fuel reaches cat/DPF Minor - may clear with driving 5-10 minutes Cat overheats - substrate begins melting £500 - £1,200 20+ minutes Cat/DPF destroyed, possible engine damage £1,000 - £2,500 + engine repair Extended driving Bore wash - fuel washes oil from cylinder walls £2,500 - £6,500+ Real-world example: A 2014 Ford Focus 1.6 EcoBoost owner saw a flashing engine management light but drove 15 miles home. The constant misfire dumped unburnt fuel into the catalytic converter, melting the internal substrate. Total cost: £120 (ignition coil) + £1,100 (catalytic converter) = £1,220. Stopping immediately would have been a £120 coil replacement. Repair options - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Worn spark plugs",
                "Spark plug replacement (full set)",
                "£50 - £150",
                "Every 60k-80k miles on petrol"
              ],
              [
                "Failed ignition coil",
                "Coil replacement (one cylinder)",
                "£70 - £220",
                "If misfire moves with coil swap"
              ],
              [
                "Failed injector",
                "Injector replacement (one) - reconditioned or new",
                "£120 - £900",
                "If injector confirmed by diagnostic"
              ],
              [
                "Vacuum / air leak",
                "Hose or gasket replacement",
                "£50 - £300",
                "If lean codes present"
              ],
              [
                "EGR valve stuck open",
                "EGR cleaning or replacement",
                "£135 - £650",
                "If misfire only at idle"
              ],
              [
                "Low compression (valves)",
                "Valve job (head removal, valve replacement)",
                "£800 - £2,000",
                "Viable on vehicles worth £2,500+"
              ],
              [
                "Low compression (rings)",
                "Engine rebuild or replacement",
                "£1,500 - £6,500+",
                "Only on vehicles worth £3,000+"
              ],
              [
                "Head gasket failure",
                "Head gasket replacement",
                "£550 - £1,200",
                "Viable on most vehicles worth £2,000+"
              ]
            ]
          }
        ],
        "additionalText": "Cause Repair Option Typical Cost When to Choose Worn spark plugs Spark plug replacement (full set) £50 - £150 Every 60k-80k miles on petrol Failed ignition coil Coil replacement (one cylinder) £70 - £220 If misfire moves with coil swap Failed injector Injector replacement (one) - reconditioned or new £120 - £900 If injector confirmed by diagnostic Vacuum / air leak Hose or gasket replacement £50 - £300 If lean codes present EGR valve stuck open EGR cleaning or replacement £135 - £650 If misfire only at idle Low compression (valves) Valve job (head removal, valve replacement) £800 - £2,000 Viable on vehicles worth £2,500+ Low compression (rings) Engine rebuild or replacement £1,500 - £6,500+ Only on vehicles worth £3,000+ Head gasket failure Head gasket replacement £550 - £1,200 Viable on most vehicles worth £2,000+ Specialist rule of thumb (petrol): \"On a petrol engine with a misfire, 70% of the time it's a coil or spark plug. Swap the coil first - it's free to test. If the misfire moves, buy one coil for £70-£150. Don't buy a full set unless they're all old.\" Specialist rule of thumb (diesel): \"On a diesel with a misfire, 80% of the time it's an injector. But before you replace injectors, do a compression test. A dead cylinder from low compression will act like a bad injector, and a new injector won't fix it.\" Preventative maintenance"
      },
      {
        "title": "Avoiding misfires",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Spark plug replacement (petrol)",
                "£50 - £150",
                "Very high",
                "Every 60k-80k miles"
              ],
              [
                "Ignition coil inspection",
                "£0 - £50",
                "Medium",
                "Every service on high-mileage petrol"
              ],
              [
                "Fuel system cleaner (diesel)",
                "£10 - £20",
                "Medium",
                "Every 10k-15k miles"
              ],
              [
                "Use quality fuel",
                "+5-10p per litre",
                "Medium",
                "Every 3-4 fill-ups"
              ],
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "High",
                "Every 6,000-10,000 miles"
              ],
              [
                "Address EML immediately",
                "£0 - £50 diagnostic",
                "Very high",
                "When light appears"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Spark plug replacement (petrol) £50 - £150 Very high Every 60k-80k miles Ignition coil inspection £0 - £50 Medium Every service on high-mileage petrol Fuel system cleaner (diesel) £10 - £20 Medium Every 10k-15k miles Use quality fuel +5-10p per litre Medium Every 3-4 fill-ups Regular oil changes (correct spec) £50 - £150 High Every 6,000-10,000 miles Address EML immediately £0 - £50 diagnostic Very high When light appears Specialist rule of thumb: \"The most common cause of a flashing EML on a modern petrol car is a failed ignition coil. The most common cause on a diesel is a failed injector. In both cases, ignoring it will cost you a catalytic converter or DPF on top of the original repair.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does engine misfire repair cost in the UK",
        "answer": "Spark plugs (full set): £50-£150. Ignition coil (one): £70-£220. Fuel injector (one): £120-£900. Vacuum leak repair: £50-£300. EGR valve: £135-£650. Low compression (valves): £800-£2,000. Low compression (rings): £1,500-£3,500. Head gasket: £550-£1,200. Engine replacement: £2,500-£6,500+. Diagnostic: £50-£150. → Engine repair cost guide"
      },
      {
        "question": "What causes an engine to misfire",
        "answer": "Most common: worn spark plugs (petrol), failed ignition coil (petrol), clogged or failed fuel injector (petrol and diesel), vacuum/air leak, EGR valve stuck open (diesel), low compression (valves, rings, head gasket)."
      },
      {
        "question": "Can I drive with a misfire",
        "answer": "If the engine management light is steady and the car runs reasonably, you can drive gently to a garage. If the light is flashing, stop driving immediately - unburnt fuel is destroying your catalytic converter (petrol) or DPF (diesel). A flashing EML is an emergency."
      },
      {
        "question": "How do I know if it's a coil or spark plug",
        "answer": "Swap the ignition coil from the misfiring cylinder with another cylinder. If the misfire moves to the new cylinder, the coil is bad (£70-£220). If the misfire stays on the same cylinder, it could be a spark plug, injector, or compression issue. Diagnose from cheapest to most expensive."
      },
      {
        "question": "Is it worth fixing a misfire on an old car",
        "answer": "If your car is worth £2,000-£4,000 and the repair is a coil (£70-£220) or injector (£120-£900), yes - a replacement car would cost far more. If the misfire is caused by low compression (valves: £800-£2,000) and the car is worth under £2,000, evaluate scrap first. → Repair vs replacement guide"
      },
      {
        "question": "Which engines have the most misfire problems",
        "answer": "Based on 2025 data and KNOWN FAILURE PATTERNS: Mercedes OM651 (1,250 - injector seal failure), VW/Audi EA189 (1,050 - injector coking), BMW N47 (1,450 - injector issues from chain debris), Ford DV6 (780 - injector failure). On petrol engines, VW/Audi EA888 (130 - ignition coil failure) and Ford EcoBoost (175 - coil or injector issues). [EM-VERIFIED]"
      }
    ]
  },
  "oil-pump-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. The red oil pressure light is your only warning - act immediately.",
          "Pump wear, pickup blockage, or pressure relief valve issue. Oil pressure is intermittently low.",
          "Stop driving immediately. Book a diagnostic inspection. If caught immediately, pump replacement only may be possible.",
          "£492-£1,009 for oil pump replacement. Labour: 4-8 hours at £65-£95/hr.",
          "Bearings are starving of oil. Crank journals may be scored. Knocking indicates bearing damage.",
          "Stop driving. Full engine inspection required - bearings may need replacement with the pump.",
          "£1,300-£2,500 for pump + bearing replacement. If crank is damaged: £3,000-£6,000+ for engine replacement.",
          "Bearings welded to crankshaft. Connecting rod may have snapped or exited the block. Engine seized.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£3,000-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. The red oil pressure light is your only warning - act immediately. £492 Oil pressure light flickers at idle Pump wear or pickup blockage £492 - £1,009 £1,300 Constant low pressure, loud knocking Bearings starving of oil £1,300 - £2,500 £10,000+ Engine seizes, loud bang, oil on road Bearings welded to crank, rod failure £3,000 - £10,000+ Likely cause Pump wear, pickup blockage, or pressure relief valve issue. Oil pressure is intermittently low. What to do Stop driving immediately. Book a diagnostic inspection. If caught immediately, pump replacement only may be possible. Repair cost £492-£1,009 for oil pump replacement. Labour: 4-8 hours at £65-£95/hr. Likely cause Bearings are starving of oil. Crank journals may be scored. Knocking indicates bearing damage. What to do Stop driving. Full engine inspection required - bearings may need replacement with the pump. Repair cost £1,300-£2,500 for pump + bearing replacement. If crank is damaged: £3,000-£6,000+ for engine replacement. Likely cause Bearings welded to crankshaft. Connecting rod may have snapped or exited the block. Engine seized. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £3,000-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of oil pump failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Oil pressure warning light flickers at idle (but goes off when revving)",
          "• Ticking or tapping noise from top of engine (valve train starvation)",
          "• Oil pressure gauge reads lower than normal",
          "• Constant low oil pressure warning light - even when revving",
          "• Loud knocking noise (rod knock) - bearings are failing",
          "• Oil light stays on solid - zero oil pressure",
          "• Engine seizes, won't turn over - catastrophic failure"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Act immediately) • Oil pressure warning light flickers at idle (but goes off when revving) • Ticking or tapping noise from top of engine (valve train starvation) • Oil pressure gauge reads lower than normal 🔴 PROGRESSED DAMAGE (Stop driving - engine at risk) • Constant low oil pressure warning light - even when revving • Loud knocking noise (rod knock) - bearings are failing • Oil light stays on solid - zero oil pressure • Engine seizes, won't turn over - catastrophic failure 🚨 Critical warning: If the red oil pressure warning light appears while driving, pull over immediately and turn off the engine. Do not restart. Driving for even 30 seconds with zero oil pressure can destroy the bearings. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Pump wear - oil pressure low, bearings intact £492 - £1,009 Stage 2 Bearing damage - bearings scored, crank may be damaged £1,300 - £2,500 Stage 3 Crank damage - journals scored beyond repair £3,000 - £6,000 Stage 4 Catastrophic - rod snapped, block damaged, seized £3,000 - £10,000+ Why oil pump failure causes secondary bearing damage"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Pump wear - oil pressure low, bearings intact £492 - £1,009 Stage 2 Bearing damage - bearings scored, crank may be damaged £1,300 - £2,500 Stage 3 Crank damage - journals scored beyond repair £3,000 - £6,000 Stage 4 Catastrophic - rod snapped, block damaged, seized £3,000 - £10,000+ Why oil pump failure causes secondary bearing damage"
      },
      {
        "title": "The mechanical explanation",
        "paragraphs": [],
        "bullets": [
          "1. The oil film collapses",
          "2. The crankshaft journal contacts the bearing surface directly",
          "3. Friction generates heat instantly",
          "4. Bearing material begins to melt",
          "5. The bearing \"spins\" or welds to the crank journal",
          "6. The connecting rod can snap or exit the block"
        ],
        "tables": [],
        "additionalText": "How oil pressure protects your engine The oil pump creates a pressurised film of oil between the crankshaft journals and bearings. This film prevents metal-to-metal contact. When oil pressure drops 1. The oil film collapses 2. The crankshaft journal contacts the bearing surface directly 3. Friction generates heat instantly 4. Bearing material begins to melt 5. The bearing \"spins\" or welds to the crank journal 6. The connecting rod can snap or exit the block This process takes minutes . That's why the red oil pressure warning light is a stop-driving emergency . Red flag engines - known oil pump failures"
      },
      {
        "title": "Engines with known pump issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - weak point at tensioner mount. Often kills engine. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Oil pump drive failure on high-mileage units. Software \"fix\" increased oil dilution risk. BMW N57D30 80k-150k 830 [EM-VERIFIED] Oil pump failure in higher-mileage units. Oil starvation accelerates bearing wear. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain debris can block pump pickup - secondary oil starvation. Ford EcoBoost 1.0 (early) 60k-100k 185 [EM-VERIFIED] Wet belt debris clogs oil pickup. Preventative belt replacement recommended. Affected models - oil pump failure risk"
      },
      {
        "title": "Which models are most at risk-",
        "paragraphs": [
          "Risk levels based on KNOWN FAILURE PATTERNS and workshop consensus [Tier 2]."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Model (Chassis)",
              "Primary Engine",
              "EM Requests",
              "Risk Level",
              "Recommended Action"
            ],
            "rows": [
              [
                "Audi A4 B8 (2008-2015)",
                "EA189 2.0 TDI",
                "248",
                "🟡 Medium-High",
                "Investigate flickering oil light immediately"
              ],
              [
                "Audi A3 8P (2003-2013)",
                "EA189 2.0 TDI",
                "232",
                "🟡 Medium-High",
                "⚠️ Watch: sub-£4k examples borderline"
              ],
              [
                "Land Rover Discovery 3",
                "276DT TDV6",
                "120",
                "🔴 High",
                "Oil pump inspection via sump"
              ],
              [
                "BMW X5 E70/F15",
                "N57D30",
                "218+288",
                "🟡 Medium",
                "Premium oil spec; monitor oil pressure"
              ],
              [
                "Ford Focus Mk3",
                "EcoBoost 1.0",
                "326",
                "🟡 Medium",
                "Preventative wet belt replacement at 60k"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "What should you do-",
        "paragraphs": [],
        "bullets": [
          "Oil pressure light just started flickering (especially at idle)",
          "No knocking noises - bearings still intact",
          "Labour: 4-8 hours",
          "Light knocking noise has started but engine not seized",
          "Crank journals still undamaged",
          "Total cost £1,300-£2,500 - only economical on vehicles worth £5,000+",
          "Crankshaft damaged or bearings welded",
          "Engine seized",
          "Vehicle value under £4,000-£6,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "✓ Choose pump replacement only if: Oil pressure light just started flickering (especially at idle) No knocking noises - bearings still intact Labour: 4-8 hours 🔧 Choose pump + bearing replacement if: Light knocking noise has started but engine not seized Crank journals still undamaged Total cost £1,300-£2,500 - only economical on vehicles worth £5,000+ ⚠ Choose engine replacement if: Crankshaft damaged or bearings welded Engine seized Vehicle value under £4,000-£6,000 - replacement rarely economical \" If you see the oil pressure light and you've driven more than a few minutes, assume bearings are damaged. - Specialist rule of thumb (UK) Compare pump replacement vs engine replacement quotes → Get quotes Vehicle value threshold"
      },
      {
        "title": "Is repair economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Recommended Action Reasoning Under £2,000 Scrap the vehicle Pump replacement (£500-£1,000) may exceed value £2,000 - £3,500 Used engine replacement Pump replacement borderline £3,500 - £6,000 Pump replacement (if caught early) Bearing damage pushes cost toward replacement £6,000 - £12,000 Pump replacement or reconditioned engine Pump-only repair viable if caught immediately £12,000+ Pump replacement or reconditioned engine Repair cost small relative to value If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], oil pump failure is one of the most common causes of catastrophic engine failure."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], oil pump failure is one of the most common causes of catastrophic engine failure. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] VW/Audi EA189 2.0 TDI Oil pump drive failure - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] BMW N47D20C Chain debris blocks pickup - 1,450 requests [EM-VERIFIED] 1,450 requests [EM-VERIFIED] BMW N57D30 Oil pump failure - 830 requests [EM-VERIFIED] 830 requests [EM-VERIFIED] Land Rover 276DT (2.7 TDV6) Oil pump housing failure - 700 requests [EM-VERIFIED] 700 requests [EM-VERIFIED] Known failure insight \"The Land Rover 2.7 TDV6 (276DT) generated 700 quote requests in 2025 [EM-VERIFIED n=700]. Specialists report oil pump housing failure as a single-point failure that kills the engine.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Oil pump failure is often ignored until it's too late - the red oil pressure light is your only warning. Preventative maintenance"
      },
      {
        "title": "Avoiding oil pump failure",
        "paragraphs": [
          "01 Regular oil changes with correct grade Old oil turns to sludge and blocks the pickup tube. Every 6k-12k miles. Use manufacturer-spec oil. 02 Never ignore the oil pressure warning light Even a momentary flicker is a red flag - stop and investigate immediately. 03 Check oil level weekly Low oil causes pump cavitation (pump sucks air). Top up if low. 04 Consider oil pressure testing on high-risk engines Land Rover 276DT, VAG 2.0 TDI. Detects pump wear before failure. 05 Ford EcoBoost 1.0 - replace wet belt preventatively At 60k or 6 years. Belt debris clogs the oil pickup and kills the pump. Preventative maintenance (per year) £150-£300 Oil changes, basic servicing VS Catastrophic failure - engine replacement £3,000-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "01 Regular oil changes with correct grade Old oil turns to sludge and blocks the pickup tube. Every 6k-12k miles. Use manufacturer-spec oil. 02 Never ignore the oil pressure warning light Even a momentary flicker is a red flag - stop and investigate immediately. 03 Check oil level weekly Low oil causes pump cavitation (pump sucks air). Top up if low. 04 Consider oil pressure testing on high-risk engines Land Rover 276DT, VAG 2.0 TDI. Detects pump wear before failure. 05 Ford EcoBoost 1.0 - replace wet belt preventatively At 60k or 6 years. Belt debris clogs the oil pickup and kills the pump. Preventative maintenance (per year) £150-£300 Oil changes, basic servicing VS Catastrophic failure - engine replacement £3,000-£10,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does oil pump replacement cost in the UK",
        "answer": "Oil pump replacement: £492-£1,009 (parts and labour). Labour: 4-8 hours at £65-£95/hr. If bearings are also damaged, add £800-£1,500. → Oil pump replacement cost guide"
      },
      {
        "question": "What are the signs of oil pump failure",
        "answer": "Low oil pressure warning light (especially at idle), engine ticking/tapping noise, oil pressure light flickering, knocking noise (advanced failure), engine seizure."
      },
      {
        "question": "Can I drive with low oil pressure",
        "answer": "No. If the red oil pressure warning light comes on, stop driving immediately. Driving will destroy the engine bearings within minutes."
      },
      {
        "question": "What causes oil pump failure",
        "answer": "Worn pump gears (high mileage), broken pump drive chain/gear, clogged pickup tube (sludge), pressure relief valve failure, or known design weaknesses (Land Rover 276DT, VAG 2.0 TDI)."
      },
      {
        "question": "Which engines have the most oil pump problems",
        "answer": "Based on 2025 data: Land Rover 276DT (700 requests), VW/Audi EA189 2.0 TDI (1,050), BMW N57D30 (830), Ford EcoBoost 1.0 (185). [EM-VERIFIED]"
      },
      {
        "question": "Is oil pump failure covered under warranty",
        "answer": "On reconditioned engines, the oil pump is typically covered (12-24 months). Failure caused by oil starvation or neglect is often excluded. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "My oil pressure light flickered but went off - is it safe to drive",
        "answer": "No. A flickering oil pressure light indicates intermittent pressure loss. Continuing to drive risks complete pump failure and engine destruction."
      }
    ]
  },
  "overheating-engine": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Acting early is the difference between a £50 fix and a £2,500+ replacement.",
          "Low coolant level, minor leak, or thermostat sticking. Early warning - act now.",
          "Pull over and check coolant level when cool. Top up if low. If light persists, book a diagnostic.",
          "£50-£200 for coolant, hose, or thermostat replacement. Labour: 1-3 hours.",
          "Water pump failure (impeller broken), cooling fan failure, or radiator blockage. Immediate danger.",
          "Stop driving. Arrange recovery. Do not attempt to drive further - head gasket damage is imminent.",
          "£200-£600 for water pump, radiator, or cooling fan replacement. Labour: 2-5 hours.",
          "Head gasket failure - combustion gases leaking into cooling system. Damage has occurred.",
          "Stop driving. Arrange recovery. Professional diagnostic required - head may need skimming.",
          "£600-£1,200 for head gasket replacement + head skim if needed. Labour: 8-15 hours.",
          "Cylinder head warped or cracked from repeated overheating. Head may be scrap.",
          "Full engine inspection. Cylinder head replacement or reconditioning required. Evaluate vehicle value.",
          "£1,200-£3,500 for cylinder head replacement. If block damaged: £2,500-£6,500+ for engine replacement.",
          "Engine seizure - pistons seized in cylinders, bearings failed from oil dilution or extreme heat.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Acting early is the difference between a £50 fix and a £2,500+ replacement. £50 Temperature gauge rising, coolant warning light Low coolant, minor leak, or thermostat sticking £50 - £200 £200 Gauge in red zone, steam from bonnet Water pump, fan, or radiator failure £200 - £600 £600 Loss of power, rough idle, white smoke Head gasket failure £600 - £1,200 £1,200 Engine won't start, mayonnaise on oil cap Cylinder head warped or cracked £1,200 - £3,500 £6,500+ Engine seized - won't turn over Pistons seized, bearing failure £2,500 - £6,500+ Likely cause Low coolant level, minor leak, or thermostat sticking. Early warning - act now. What to do Pull over and check coolant level when cool. Top up if low. If light persists, book a diagnostic. Repair cost £50-£200 for coolant, hose, or thermostat replacement. Labour: 1-3 hours. Likely cause Water pump failure (impeller broken), cooling fan failure, or radiator blockage. Immediate danger. What to do Stop driving. Arrange recovery. Do not attempt to drive further - head gasket damage is imminent. Repair cost £200-£600 for water pump, radiator, or cooling fan replacement. Labour: 2-5 hours. Likely cause Head gasket failure - combustion gases leaking into cooling system. Damage has occurred. What to do Stop driving. Arrange recovery. Professional diagnostic required - head may need skimming. Repair cost £600-£1,200 for head gasket replacement + head skim if needed. Labour: 8-15 hours. Likely cause Cylinder head warped or cracked from repeated overheating. Head may be scrap. What to do Full engine inspection. Cylinder head replacement or reconditioning required. Evaluate vehicle value. Repair cost £1,200-£3,500 for cylinder head replacement. If block damaged: £2,500-£6,500+ for engine replacement. Likely cause Engine seizure - pistons seized in cylinders, bearings failed from oil dilution or extreme heat. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Common causes of engine overheating - UK focus"
      },
      {
        "title": "What causes overheating-",
        "paragraphs": [
          "Market context: Based on 24,650 quote requests in 2025, the most common overheating-related repairs are on high-mileage diesel engines (VW EA189, BMW N47, Ford DV6, Mercedes OM651). [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Typical Cost",
              "Most Common On"
            ],
            "rows": [
              [
                "Low coolant level",
                "Slow leak from hose, radiator, water pump seal",
                "£50 - £200",
                "All vehicles 8+ years old"
              ],
              [
                "Thermostat stuck closed",
                "Thermostat fails to open, coolant never reaches radiator",
                "£95 - £215",
                "VW EA189, Ford DV6, BMW N47, Mercedes OM651"
              ],
              [
                "Water pump failure",
                "Pump impeller broken or leaking - no circulation",
                "£115 - £700",
                "BMW N47 (plastic impeller), VW EA189"
              ],
              [
                "Cooling fan failure",
                "Electric fan or relay fails - no airflow at idle",
                "£150 - £450",
                "Renault K9K, Ford Focus, Vauxhall Astra"
              ],
              [
                "Radiator blockage/leak",
                "Corrosion, debris, or physical damage",
                "£200 - £600",
                "High-mileage vehicles 10+ years"
              ],
              [
                "Blown head gasket",
                "Overheating causes gasket failure - combustion gas in coolant",
                "£550 - £1,200",
                "Consequence of earlier overheating"
              ],
              [
                "Low oil level",
                "Oil cools engine internally - low oil increases temperature",
                "£0 - £50",
                "Neglected maintenance"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Finding the root cause",
        "paragraphs": [
          "If your engine has overheated but not yet suffered major damage, follow this diagnostic hierarchy. A good specialist will not simply \"replace the head gasket\" without finding out why it failed."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "If your engine has overheated but not yet suffered major damage, follow this diagnostic hierarchy. A good specialist will not simply \"replace the head gasket\" without finding out why it failed. Step Component Typical Cost 1 Coolant level - low expansion tank £10 - £30 2 External leaks - wet spots, white residue £50 - £200 3 Thermostat - engine slow to warm or overheats quickly £95 - £215 4 Cooling fan - doesn't spin when hot or AC on £150 - £450 5 Water pump - weep hole leak, bearing noise £115 - £700 6 Head gasket test - sniffer test for combustion gases £50 - £150 7 Compression test - low compression indicates head gasket or cracked head £100 - £200 Specialist rule of thumb (UK): \"90% of overheating complaints on vehicles over 60,000 miles are either a stuck thermostat or a leaking water pump. Replace both if you're doing the timing belt - the labour is already there.\" Red flag engines - known cooling weaknesses"
      },
      {
        "title": "Engines with known overheating issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 60k-100k 1,450 [EM-VERIFIED] Water pump failure (plastic impeller) + EGR cooler fire risk. Replace pump with timing chain. Land Rover 204DTD (Ingenium D) 60k-120k 1,150 [EM-VERIFIED] EGR cooler leaks, oil dilution from DPF regen affects cooling. Land Rover 306DT (SDV6) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure linked to overheating/oil degradation. Mercedes OM642 80k-150k 880 [EM-VERIFIED] Oil cooler seal leak (in V of engine) - coolant contamination. Jaguar AJ126 3.0 V6 SC 60k-100k 560 [EM-VERIFIED] Water pump failure, coolant leaks from crossover pipes. Ford 1.5/1.6 EcoBoost 60k-100k 175 [EM-VERIFIED] Coolant leaks (head gasket/block porosity) leading to head gasket failure. BMW N47 EGR Cooler Recall: The N47 engine had a manufacturer recall for EGR cooler failure - coolant leaking into the exhaust, creating a potential fire risk. If you own an N47 vehicle and haven't had the recall completed, check with a BMW dealer immediately. The recall work is completely free. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour: thermostat 1-3 hours, water pump 2-5 hours, head gasket 8-15 hours at £65-£95/hr indie."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Damage Severity",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Low coolant / minor leak",
                "Hose replacement, top-up",
                "£50 - £200",
                "Always - simple fix"
              ],
              [
                "Stuck thermostat",
                "Thermostat replacement",
                "£95 - £215",
                "Always - standard maintenance"
              ],
              [
                "Failed water pump",
                "Water pump replacement",
                "£115 - £700",
                "Immediate - critical"
              ],
              [
                "Failed cooling fan",
                "Fan motor or relay",
                "£150 - £450",
                "If fan not running when hot"
              ],
              [
                "Head gasket (head not warped)",
                "Head gasket + skim if needed",
                "£550 - £1,200",
                "Viable on £3,000+ vehicles"
              ],
              [
                "Warped cylinder head",
                "Head replacement or recon",
                "£1,200 - £3,500",
                "Evaluate vehicle value"
              ],
              [
                "Engine seizure",
                "Complete engine replacement",
                "£2,500 - £6,500+",
                "Only on £6,000+ vehicles"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Is repair economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Recommended Action Reasoning Under £2,000 Simple repairs only. If head gasket blown, consider scrap Major repair cost (£600+) may exceed vehicle value £2,000 - £4,000 Head gasket replacement viable if car otherwise good Repair may approach 30-50% of value £4,000 - £8,000 Head gasket or cylinder head replacement justified Vehicle value supports repair £8,000+ Any repair - even engine replacement Warranty and reliability justify cost If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored warning signs - temperature rising £50 - £200 Stage 2 One overheating event - head gasket begins to fail £550 - £1,200 Stage 3 Repeated overheating - cylinder head warps £1,200 - £3,500 Stage 4 Coolant in oil - bearings damaged £2,000 - £5,000 Stage 5 Engine seizure - pistons seize, block scrap £2,500 - £6,500+ The maths of ignoring overheating: Fix immediately: £95-£215 (thermostat replacement). Ignore for one week: £550-£1,200 (head gasket). Ignore for one month: £2,500-£6,500 (engine replacement). Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored warning signs - temperature rising £50 - £200 Stage 2 One overheating event - head gasket begins to fail £550 - £1,200 Stage 3 Repeated overheating - cylinder head warps £1,200 - £3,500 Stage 4 Coolant in oil - bearings damaged £2,000 - £5,000 Stage 5 Engine seizure - pistons seize, block scrap £2,500 - £6,500+ The maths of ignoring overheating: Fix immediately: £95-£215 (thermostat replacement). Ignore for one week: £550-£1,200 (head gasket). Ignore for one month: £2,500-£6,500 (engine replacement). Preventative maintenance"
      },
      {
        "title": "Avoiding overheating",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Coolant level check",
                "£0",
                "High - catches leaks early",
                "Monthly or before long journeys"
              ],
              [
                "Coolant change",
                "£50 - £150",
                "High - prevents corrosion",
                "Every 3-5 years"
              ],
              [
                "Thermostat replacement (preventative)",
                "£95 - £215",
                "Medium",
                "When doing timing belt or water pump"
              ],
              [
                "Water pump replacement (preventative)",
                "£115 - £700",
                "High - plastic impeller pumps fail predictably",
                "Every 60k-80k miles on BMW/VW"
              ],
              [
                "Cooling system pressure test",
                "£30 - £80",
                "High - finds small leaks",
                "Every 2 years on vehicles over 8 years old"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Coolant level check £0 High - catches leaks early Monthly or before long journeys Coolant change £50 - £150 High - prevents corrosion Every 3-5 years Thermostat replacement (preventative) £95 - £215 Medium When doing timing belt or water pump Water pump replacement (preventative) £115 - £700 High - plastic impeller pumps fail predictably Every 60k-80k miles on BMW/VW Cooling system pressure test £30 - £80 High - finds small leaks Every 2 years on vehicles over 8 years old Specialist rule of thumb (UK): \"On a BMW N47 or any VW group diesel over 60,000 miles, if you're doing the timing belt or chain, do the water pump and thermostat at the same time. The parts are cheap compared to the labour to go back in.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does engine overheating repair cost in the UK",
        "answer": "Simple repairs (coolant top-up, hose replacement): £50-£200. Moderate repairs (thermostat, water pump, radiator): £95-£700. Major damage (head gasket, warped head): £600-£2,000+. Complete engine replacement: £2,500-£6,500+. Labour: indie £65-£95/hr, dealer £120-£220/hr. → Engine repair cost guide"
      },
      {
        "question": "What should I do if my engine overheats",
        "answer": "Stop driving immediately. Pull over safely, turn off the engine, and wait at least 30 minutes. Do not open the coolant cap while hot - pressurised coolant can cause severe burns. Call for recovery. Do not drive again until the cause is diagnosed."
      },
      {
        "question": "What causes an engine to overheat",
        "answer": "Most common causes: low coolant level (leak), thermostat stuck closed, water pump failure, cooling fan failure, radiator blockage, blown head gasket (consequence, not cause), or low oil level."
      },
      {
        "question": "Can I drive with an overheating engine",
        "answer": "No. Driving for even 30 seconds with the temperature gauge in the red zone can warp the cylinder head, costing £600-£1,200 to repair. Driving until the engine stops will likely cause engine seizure, costing £2,500-£6,500+ for replacement."
      },
      {
        "question": "How do I know if my head gasket is blown after overheating",
        "answer": "Common signs: white smoke from exhaust (coolant burning), mayonnaise-like sludge on oil filler cap or dipstick, coolant bubbling in expansion tank, loss of coolant with no external leak, engine misfire. A block test (sniffer test) confirms combustion gases in coolant (£50-£150 diagnostic)."
      },
      {
        "question": "Is a head gasket repair worth it on an old car",
        "answer": "If your car is worth £2,000-£4,000 and otherwise reliable, a £600-£1,200 head gasket repair is often worth it - a replacement car would cost more. If your car is worth under £2,000 and the head is warped (£1,200-£3,500), evaluate scrap value first. → Compare repair vs replacement"
      },
      {
        "question": "Which engines have the most overheating problems",
        "answer": "Based on 2025 data: BMW N47D20C (1,450 requests - water pump, EGR cooler), VW/Audi EA189 (1,050 requests - thermostat), Ford 1.5/1.6 EcoBoost (175 requests - head gasket), Jaguar AJ126 (560 requests - water pump). [EM-VERIFIED]"
      }
    ]
  },
  "piston-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Catching piston failure early saves thousands.",
          "Worn piston rings - oil passing into combustion chamber. Common on high-mileage engines (100k+).",
          "Book a compression test. If confirmed, ring replacement on one cylinder may be possible if engine is otherwise healthy.",
          "£600-£1,200 for ring replacement on one cylinder. Labour: 10-16 hours.",
          "Cracked ringland - the metal between piston rings has fractured. Common on turbo engines (Ford EcoBoost, Subaru EJ).",
          "Stop driving. Full diagnostic required. Single piston replacement may be viable on lower-mileage engines.",
          "£600-£800 for single piston. £1,500-£3,000 for full set. Labour: 12-18 hours.",
          "Melted or cracked piston - catastrophic failure. Often caused by overheating, detonation, or oil starvation.",
          "Stop driving. Call recovery. Full rebuild or replacement required - engine is compromised.",
          "£2,000-£5,000+ for full rebuild. Labour: 16-25 hours. Compare to replacement engine cost.",
          "Complete piston disintegration - rod may have exited the block. Block is scrap.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Catching piston failure early saves thousands. £600 Blue smoke on acceleration, oil consumption, power loss Worn piston rings - oil passing into combustion chamber £600 - £1,200 £600 Misfire, low compression on one cylinder, engine light Cracked ringland - common on turbo engines £600 - £800 (single piston) or £1,500 - £3,000 (full set) £2,000 Engine knock, metal in oil, severe misfire Melted or cracked piston - catastrophic failure £2,000 - £5,000+ £6,500+ Engine seized, rod through block Complete piston disintegration - block often damaged £2,500 - £6,500+ Likely cause Worn piston rings - oil passing into combustion chamber. Common on high-mileage engines (100k+). What to do Book a compression test. If confirmed, ring replacement on one cylinder may be possible if engine is otherwise healthy. Repair cost £600-£1,200 for ring replacement on one cylinder. Labour: 10-16 hours. Likely cause Cracked ringland - the metal between piston rings has fractured. Common on turbo engines (Ford EcoBoost, Subaru EJ). What to do Stop driving. Full diagnostic required. Single piston replacement may be viable on lower-mileage engines. Repair cost £600-£800 for single piston. £1,500-£3,000 for full set. Labour: 12-18 hours. Likely cause Melted or cracked piston - catastrophic failure. Often caused by overheating, detonation, or oil starvation. What to do Stop driving. Call recovery. Full rebuild or replacement required - engine is compromised. Repair cost £2,000-£5,000+ for full rebuild. Labour: 16-25 hours. Compare to replacement engine cost. Likely cause Complete piston disintegration - rod may have exited the block. Block is scrap. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of piston failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Blue smoke on acceleration - oil burning past rings",
          "• Excessive oil consumption - top-up every 500-1,000 miles",
          "• Loss of power - engine feels flat under load",
          "• Misfire on one cylinder - fault code P030X",
          "• Low compression on one cylinder - confirmed by test",
          "• Engine knock - deep, rhythmic knocking that changes with speed",
          "• Metal shavings in oil - visible glitter - engine self-destructing",
          "• Oil pressure warning light - debris blocking oil pickup",
          "• Engine seizure - stops and won't turn over"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book diagnostic immediately) • Blue smoke on acceleration - oil burning past rings • Excessive oil consumption - top-up every 500-1,000 miles • Loss of power - engine feels flat under load • Misfire on one cylinder - fault code P030X • Low compression on one cylinder - confirmed by test 🔴 PROGRESSED DAMAGE (Stop driving - call recovery) • Engine knock - deep, rhythmic knocking that changes with speed • Metal shavings in oil - visible glitter - engine self-destructing • Oil pressure warning light - debris blocking oil pickup • Engine seizure - stops and won't turn over Common causes of piston failure"
      },
      {
        "title": "Why pistons fail",
        "paragraphs": [
          "Market context: Based on 24,650 quote requests in 2025, piston failures are most common on high-mileage diesels (BMW N47, VW EA189) and tuned petrols (Ford EcoBoost). [EM-VERIFIED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Most Common On",
              "Typical Cost"
            ],
            "rows": [
              [
                "Worn piston rings (high mileage)",
                "Normal wear over 100k+ miles - rings lose tension",
                "All high-mileage engines",
                "£600 - £1,200 (one cylinder)"
              ],
              [
                "Ringland failure",
                "Excessive boost, detonation - cracks between rings",
                "Ford EcoBoost, Subaru EJ, BMW N54/N55",
                "£600 - £800 per piston"
              ],
              [
                "Melted piston (overheating)",
                "Coolant loss, lean mixture - piston crown melts",
                "Any turbo engine",
                "£2,000 - £5,000+"
              ],
              [
                "Detonation / pre-ignition",
                "Poor fuel, aggressive tuning - explosion before spark",
                "Tuned engines",
                "£2,000 - £5,000+"
              ],
              [
                "Oil starvation",
                "Low oil, pump failure - piston seizes in bore",
                "BMW N-series",
                "£2,000 - £5,000+"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Understanding the difference",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Component",
              "Failure Mode",
              "Typical Cost",
              "Labour Hours"
            ],
            "rows": [
              [
                "Piston rings (worn)",
                "Oil consumption, blue smoke, low compression",
                "£600 - £1,200 (one cylinder)",
                "10-16 hrs"
              ],
              [
                "Piston rings (full set)",
                "Engine tired - all cylinders worn",
                "£1,500 - £3,000",
                "16-20 hrs"
              ],
              [
                "Single piston (cracked ringland)",
                "Misfire, knock on one cylinder",
                "£600 - £800",
                "12-18 hrs"
              ],
              [
                "Full piston set",
                "All pistons damaged or performance rebuild",
                "£1,500 - £3,000",
                "16-25 hrs"
              ],
              [
                "Full engine rebuild",
                "All wear items replaced",
                "£2,000 - £5,000+",
                "20-30 hrs"
              ]
            ]
          }
        ],
        "additionalText": "Component Failure Mode Typical Cost Labour Hours Piston rings (worn) Oil consumption, blue smoke, low compression £600 - £1,200 (one cylinder) 10-16 hrs Piston rings (full set) Engine tired - all cylinders worn £1,500 - £3,000 16-20 hrs Single piston (cracked ringland) Misfire, knock on one cylinder £600 - £800 12-18 hrs Full piston set All pistons damaged or performance rebuild £1,500 - £3,000 16-25 hrs Full engine rebuild All wear items replaced £2,000 - £5,000+ 20-30 hrs Specialist rule: \"If one piston fails on a high-mileage engine (100k+ miles), replacing just that piston is a gamble. The other pistons have the same wear. A full set costs more upfront but prevents repeat failure.\" Red flag engines - known piston failure patterns"
      },
      {
        "title": "Engines with known piston issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. Ford EcoBoost 1.6/2.0 60k-100k 175 [EM-VERIFIED] Ringland failure - common on tuned engines. Single piston: £600-£800; Full rebuild: £2,000-£4,000. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain failure - piston hits valves. Valve job: £1,200-£2,500. Toyota 2AD-FTV 60k-120k 260 [EM-VERIFIED] Piston ring design flaw (2006-2009). Rings: £1,500-£3,000 - check warranty first. Subaru EJ20/EJ25 60k-100k - Ringland failure - famous weakness. Full rebuild: £2,500-£5,000. BMW N54/N55 60k-100k - Ringland failure on tuned engines. Full rebuild: £2,500-£5,000. Market Intelligence (EcoBoost): Ford 1.5/1.6 EcoBoost (175 requests [EM-VERIFIED]) - ringland failure is common on tuned or poorly maintained examples. Overheating from coolant loss contributes. Forged pistons recommended for reliability. [KNOWN FAILURE PATTERNS] Repair vs replace - decision framework"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Engine rebuild vs replacement: On common engines (Ford EcoBoost, BMW N47, VW EA189), a reconditioned engine is often cheaper than a full rebuild. Compare both."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Damage Severity",
              "Repair Option",
              "Typical Cost",
              "When to Choose"
            ],
            "rows": [
              [
                "Worn rings (low-mileage engine)",
                "Ring replacement on one cylinder",
                "£600 - £1,200",
                "Only if engine under 60k miles"
              ],
              [
                "Worn rings (high-mileage)",
                "Full ring set + bearings",
                "£1,500 - £3,000",
                "Compare to used engine cost"
              ],
              [
                "Cracked ringland (low-mileage)",
                "Single piston replacement",
                "£600 - £800",
                "Viable on engines under 80k"
              ],
              [
                "Cracked ringland (high-mileage)",
                "Full piston set or full rebuild",
                "£1,500 - £5,000+",
                "Replacement engine often cheaper"
              ],
              [
                "Melted piston",
                "Full rebuild",
                "£2,000 - £5,000+",
                "Only on vehicles worth £6,000+"
              ],
              [
                "Piston with bore damage",
                "Engine replacement",
                "£2,500 - £6,500+",
                "Rebuild rarely economical"
              ],
              [
                "Seized engine",
                "Engine replacement",
                "£2,500 - £6,500+",
                "Only on high-value vehicles"
              ]
            ]
          }
        ],
        "additionalText": "Damage Severity Repair Option Typical Cost When to Choose Worn rings (low-mileage engine) Ring replacement on one cylinder £600 - £1,200 Only if engine under 60k miles Worn rings (high-mileage) Full ring set + bearings £1,500 - £3,000 Compare to used engine cost Cracked ringland (low-mileage) Single piston replacement £600 - £800 Viable on engines under 80k Cracked ringland (high-mileage) Full piston set or full rebuild £1,500 - £5,000+ Replacement engine often cheaper Melted piston Full rebuild £2,000 - £5,000+ Only on vehicles worth £6,000+ Piston with bore damage Engine replacement £2,500 - £6,500+ Rebuild rarely economical Seized engine Engine replacement £2,500 - £6,500+ Only on high-value vehicles Engine rebuild vs replacement: On common engines (Ford EcoBoost, BMW N47, VW EA189), a reconditioned engine is often cheaper than a full rebuild. Compare both. Specialist rule: \"If a piston fails on an engine over 100k miles, don't just replace the broken piston - replace the engine with a lower-mileage unit or fully rebuild it. The other pistons have the same wear and will fail soon after.\" Vehicle Value Threshold: Under £2,000 - If piston failed, consider scrap. £2,000-£4,000 - Replacement engine (£2,500-£4,500) may be viable. £4,000-£8,000 - Full rebuild or replacement engine justified. £8,000+ - Any repair - even full forged rebuild. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored oil consumption (rings) - oil consumption worsens £600 - £1,200 Stage 2 Ignored misfire (cracked ringland) - debris in oil £2,000 - £5,000+ Stage 3 Driven with engine knock - piston disintegrates, metal throughout oil system £2,500 - £6,500+ (engine + turbo) Stage 4 Engine seizure - piston welded to bore, rod exits block £2,500 - £6,500+ The maths: Diagnose now: £100-£200. Fix now (single piston): £600-£800. Wait until knock develops (full rebuild): £2,000-£5,000. Wait until seizure (replacement): £2,500-£6,500+. Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored oil consumption (rings) - oil consumption worsens £600 - £1,200 Stage 2 Ignored misfire (cracked ringland) - debris in oil £2,000 - £5,000+ Stage 3 Driven with engine knock - piston disintegrates, metal throughout oil system £2,500 - £6,500+ (engine + turbo) Stage 4 Engine seizure - piston welded to bore, rod exits block £2,500 - £6,500+ The maths: Diagnose now: £100-£200. Fix now (single piston): £600-£800. Wait until knock develops (full rebuild): £2,000-£5,000. Wait until seizure (replacement): £2,500-£6,500+. Preventative maintenance"
      },
      {
        "title": "Avoiding piston failure",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Frequency"
            ],
            "rows": [
              [
                "Regular oil changes (correct spec)",
                "£50 - £150",
                "Every 6,000-10,000 miles"
              ],
              [
                "Premium fuel (petrol, especially tuned)",
                "+10-15p per litre",
                "Every fill-up on tuned engines"
              ],
              [
                "Avoid overheating",
                "£0",
                "Immediate stop if gauge rises"
              ],
              [
                "Cooling system maintenance",
                "£50 - £150",
                "Every 3-5 years"
              ],
              [
                "Regular compression tests",
                "£80 - £150",
                "Every 60k-80k miles"
              ],
              [
                "Proper tuning (no aggressive maps)",
                "£300 - £600",
                "Once - choose reputable tuner"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Frequency Regular oil changes (correct spec) £50 - £150 Every 6,000-10,000 miles Premium fuel (petrol, especially tuned) +10-15p per litre Every fill-up on tuned engines Avoid overheating £0 Immediate stop if gauge rises Cooling system maintenance £50 - £150 Every 3-5 years Regular compression tests £80 - £150 Every 60k-80k miles Proper tuning (no aggressive maps) £300 - £600 Once - choose reputable tuner Specialist rule (tuned engines): \"On a tuned Ford EcoBoost, Subaru EJ, or BMW N54/N55, ringland failure is not a matter of if, but when - without precautions. Forged pistons, proper tuning, and premium fuel are the difference between reliability and a £5,000 rebuild.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does piston failure repair cost in the UK",
        "answer": "Piston rings (one cylinder): £600-£1,200. Single piston: £600-£800. Full piston set: £1,500-£3,000. Full rebuild: £2,000-£5,000+. Engine replacement: £2,500-£6,500+. Diagnostic: £100-£250. → Engine repair cost guide"
      },
      {
        "question": "What causes piston failure",
        "answer": "Worn rings (high mileage), ringland failure (cracked piston groove - common on tuned turbo engines), melted piston (overheating), detonation (poor fuel, aggressive tuning), oil starvation, hydrolock."
      },
      {
        "question": "What is ringland failure",
        "answer": "The ringland is the metal between piston rings. Under high cylinder pressure (boost, detonation), it cracks. This causes compression loss, misfire, oil consumption. If ignored, it disintegrates, sending metal debris through the engine. Common on Ford EcoBoost, Subaru EJ, BMW N54/N55."
      },
      {
        "question": "How do I know if rings or piston is damaged",
        "answer": "Compression test + leak-down test. If compression improves with oil added → rings worn (£600-£1,200). If no improvement → valve or piston damage. Borescope inspection shows cracked ringland or melted piston. Don't guess - get proper diagnostic."
      },
      {
        "question": "Is it worth rebuilding an engine with piston failure",
        "answer": "If vehicle worth £4,000-£8,000 and otherwise reliable, a £2,000-£4,000 rebuild may be worth it. If under £2,000, evaluate scrap. On common engines, a reconditioned engine is often cheaper than a rebuild. → Repair vs replacement"
      },
      {
        "question": "Which engines have the most piston problems",
        "answer": "Ford EcoBoost 1.6/2.0 (175 - ringland failure), Toyota 2AD-FTV (260 - piston ring design flaw), Subaru EJ (ringland failure), BMW N54/N55 (ringland failure on tuned cars). [EM-VERIFIED] for Ford and Toyota."
      }
    ]
  },
  "rod-bearing-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Catching rod bearing failure early is critical. Click any stage to see full detail.",
          "Bearings worn but crank journal still undamaged. Oil film has broken down, metal touching metal.",
          "Stop driving immediately. Book a diagnostic inspection. If caught early, bearing replacement may be possible.",
          "£800-£1,500 for bearing replacement. Labour: 12-20 hours at £65-£95/hr.",
          "Crank journal scored, bearings destroyed. Bearing material has shed into the oil system.",
          "Stop driving. Specialist inspection required - crank may need regrinding or replacement.",
          "£1,200-£2,000 for crank regrind + oversized bearings. If beyond limits: engine replacement £3,000-£6,000+.",
          "Connecting rod exited the block. Bearing failed catastrophically, rod snapped.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£3,000-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching rod bearing failure early is critical. Click any stage to see full detail. £800 Light knocking, cold start, oil pressure normal Bearings worn but crank journal undamaged £800 - £1,500 £1,200 Loud rhythmic knock, low oil pressure at idle Crank journal scored, bearings destroyed £1,200 - £2,000 (regrind) or £3,000-£6,000 (engine) £10,000+ Loud bang, engine stops, oil on road Connecting rod exited block (\"windowed block\") £3,000 - £10,000+ Likely cause Bearings worn but crank journal still undamaged. Oil film has broken down, metal touching metal. What to do Stop driving immediately. Book a diagnostic inspection. If caught early, bearing replacement may be possible. Repair cost £800-£1,500 for bearing replacement. Labour: 12-20 hours at £65-£95/hr. Likely cause Crank journal scored, bearings destroyed. Bearing material has shed into the oil system. What to do Stop driving. Specialist inspection required - crank may need regrinding or replacement. Repair cost £1,200-£2,000 for crank regrind + oversized bearings. If beyond limits: engine replacement £3,000-£6,000+. Likely cause Connecting rod exited the block. Bearing failed catastrophically, rod snapped. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £3,000-£10,000+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. What is rod bearing failure-"
      },
      {
        "title": "Understanding the failure mechanism",
        "paragraphs": [
          "What are rod bearings- Rod bearings are thin, precision-made layers of soft metal (usually copper-lead or aluminium-tin) that sit between the connecting rod and the crankshaft. They allow the rod to rotate smoothly around the crank journal under extreme pressure. When rod bearings fail The oil film breaks down. Metal touches metal. The bearing material wears away rapidly, creating increasing clearance between the rod and crank. The \"knock\" you hear is the rod literally slapping against the crankshaft with every revolution. If ignored: The bearing can spin (rotate inside the rod), weld itself to the crankshaft, or disintegrate entirely. The connecting rod can then snap or punch a hole through the engine block. Why do rod bearings fail-"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "What are rod bearings- Rod bearings are thin, precision-made layers of soft metal (usually copper-lead or aluminium-tin) that sit between the connecting rod and the crankshaft. They allow the rod to rotate smoothly around the crank journal under extreme pressure. When rod bearings fail The oil film breaks down. Metal touches metal. The bearing material wears away rapidly, creating increasing clearance between the rod and crank. The \"knock\" you hear is the rod literally slapping against the crankshaft with every revolution. If ignored: The bearing can spin (rotate inside the rod), weld itself to the crankshaft, or disintegrate entirely. The connecting rod can then snap or punch a hole through the engine block. Why do rod bearings fail-"
      },
      {
        "title": "The root causes",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], oil starvation and extended oil change intervals are the two most common causes of rod bearing failure."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "Explanation",
              "Most Affected Engines"
            ],
            "rows": [
              [
                "Oil starvation",
                "Low oil level, oil pump failure, or oil contamination",
                "All engines, especially high-performance"
              ],
              [
                "Extended oil change intervals",
                "Old oil loses viscosity, becomes acidic, cannot protect bearings",
                "BMW, Land Rover, VW/Audi - missed services common"
              ],
              [
                "High mileage wear",
                "Bearings naturally fatigue after 100k-150k miles",
                "All high-mileage engines"
              ],
              [
                "High-performance use",
                "Track days, towing, aggressive driving increases bearing load",
                "BMW M-series, Subaru Impreza, Porsche"
              ],
              [
                "Manufacturing defects",
                "Some engines have known bearing clearance issues from factory",
                "BMW S54, S65, N47 (oil dilution from timing chain debris)"
              ],
              [
                "Incorrect oil grade",
                "Using wrong viscosity reduces oil film strength",
                "All engines"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Engines with known bearing issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS table and EM_Proprietary_Data_2025. Land Rover 306DT (SDV6/TDV6 3.0) 80k-140k 980 [EM-VERIFIED] Crankshaft bearing failure - cold-start knock is early warning. BMW N47D20 / N47D20C 60k-120k 1,450 [EM-VERIFIED] Timing chain debris contaminates oil - leads to bearing wear. BMW N57D30 80k-150k 830 [EM-VERIFIED] Oil pump failure can accelerate bearing wear. Land Rover 276DT (2.7 TDV6) 80k-140k 700 [EM-VERIFIED] Oil pump housing failure - kills oil pressure. Subaru EJ20 / EJ25 (boxer) 60k-100k - Flat-four design; common on Impreza WRX/STI. [ESTIMATED] BMW S54 / S65 (M engines) 60k-100k - Rod bearing clearance too tight from factory. Preventative replacement at 60k-80k. [ESTIMATED] Affected models - rod bearing risk"
      },
      {
        "title": "Which models are most at risk-",
        "paragraphs": [
          "Based on per-model request volumes [EM-VERIFIED] and failure pattern data.",
          "Vehicle values from EM Model Ownership Decision Tables [ESTIMATED]."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Model (Chassis)",
              "Primary Engine",
              "EM Requests",
              "Risk Level",
              "Recommended Action"
            ],
            "rows": [
              [
                "Range Rover Sport L494 (2013-2022)",
                "306DT SDV6 3.0",
                "308",
                "🔴 High",
                "Bearing inspection; 5k oil intervals"
              ],
              [
                "Range Rover L405 (2012-2021)",
                "306DT / 508PS",
                "284",
                "🔴 High",
                "Oil analysis recommended from 80k miles"
              ],
              [
                "BMW X5 F15 (2013-2018)",
                "N57D30",
                "288",
                "🟡 Medium",
                "Chain inspection; premium oil spec"
              ],
              [
                "BMW 5 Series F10 (2010-2017)",
                "N57D30",
                "300",
                "🟡 Medium",
                "⚠️ Watch: sub-£8k hosts borderline"
              ],
              [
                "Land Rover Discovery 4 L319 (2009-2016)",
                "306DT / 276DT",
                "120",
                "🔴 High",
                "⚠️ Watch: sub-£10k examples borderline"
              ],
              [
                "Subaru Impreza WRX/STI (2004-2014)",
                "EJ20 / EJ25",
                "-",
                "🔴 High",
                "Preventative bearing replacement at 60k miles [ESTIMATED]"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Light knocking noise on cold start that may disappear as engine warms",
          "• Knocking noise that increases with engine RPM - most distinctive symptom",
          "• Knock is loudest under load - acceleration makes it worse",
          "• Low oil pressure warning light - especially at idle",
          "• Loud, rhythmic knock even at idle - bearings are severely worn",
          "• Metal flakes in oil filter - copper/bronze coloured particles",
          "• Engine vibration - imbalance from damaged bearings",
          "• Loss of power - increased internal friction",
          "• Engine seizure - final stage"
        ],
        "tables": [],
        "additionalText": "🔵 EARLY WARNING (Stop driving) • Light knocking noise on cold start that may disappear as engine warms • Knocking noise that increases with engine RPM - most distinctive symptom • Knock is loudest under load - acceleration makes it worse • Low oil pressure warning light - especially at idle 🔴 PROGRESSED DAMAGE (Catastrophic risk) • Loud, rhythmic knock even at idle - bearings are severely worn • Metal flakes in oil filter - copper/bronze coloured particles • Engine vibration - imbalance from damaged bearings • Loss of power - increased internal friction • Engine seizure - final stage 🚨 STOP DRIVING if: You hear a deep, rhythmic knock that gets louder with RPM. Continuing to drive will turn a £1,000 bearing replacement into a £5,000+ engine replacement - or write off the car entirely. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Bearing wear - bearing material worn, crank undamaged £800 - £1,500 Stage 2 Journal damage - crank surface scored £1,200 - £2,000 Stage 3 Spun bearing - bearing welded to crank £3,000 - £10,000+ Stage 4 Windowed block - con rod exits block Car may be scrap Real-world example from specialist forums (anonymised): 2011 BMW 530d N57, 118,000 miles. Owner noticed a light knock on cold start but ignored it for 2 months. The knock became constant. By the time they got to a garage, the crank journal was scored beyond repair. Total cost: £5,800 for a reconditioned engine. The same owner could have paid £1,200 for bearing replacement 8 weeks earlier. Repair vs replace - rod bearing failure"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Bearing wear - bearing material worn, crank undamaged £800 - £1,500 Stage 2 Journal damage - crank surface scored £1,200 - £2,000 Stage 3 Spun bearing - bearing welded to crank £3,000 - £10,000+ Stage 4 Windowed block - con rod exits block Car may be scrap Real-world example from specialist forums (anonymised): 2011 BMW 530d N57, 118,000 miles. Owner noticed a light knock on cold start but ignored it for 2 months. The knock became constant. By the time they got to a garage, the crank journal was scored beyond repair. Total cost: £5,800 for a reconditioned engine. The same owner could have paid £1,200 for bearing replacement 8 weeks earlier. Repair vs replace - rod bearing failure"
      },
      {
        "title": "What should you do-",
        "paragraphs": [
          "Not every engine failure requires a full replacement. Where damage is isolated (early-stage rod knock), bearing replacement may be economical. However, advanced rod knock almost always requires engine replacement."
        ],
        "bullets": [
          "Rod knock just started (mild noise, not constant)",
          "Oil pressure still normal",
          "Crank journals undamaged (inspect with bearings removed)",
          "Vehicle value high enough to justify £800-£1,500 spend",
          "Labour: 12-20 hours",
          "Crank journals scored but not cracked",
          "Oversized bearings available",
          "Total cost £2,000-£3,500 - only economical on higher-value vehicles",
          "Crankshaft damaged beyond regrind limits",
          "Connecting rod damaged or snapped",
          "Engine block damaged (\"windowed block\")",
          "Labour to strip, inspect, replace bearings exceeds cost of reconditioned engine",
          "Vehicle value under £4,000-£6,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "✓ Choose bearing replacement if: Rod knock just started (mild noise, not constant) Oil pressure still normal Crank journals undamaged (inspect with bearings removed) Vehicle value high enough to justify £800-£1,500 spend Labour: 12-20 hours 🔧 Choose crank regrind if: Crank journals scored but not cracked Oversized bearings available Total cost £2,000-£3,500 - only economical on higher-value vehicles ⚠ Choose engine replacement if: Crankshaft damaged beyond regrind limits Connecting rod damaged or snapped Engine block damaged (\"windowed block\") Labour to strip, inspect, replace bearings exceeds cost of reconditioned engine Vehicle value under £4,000-£6,000 - replacement rarely economical \" If you hear a rod knock, stop driving immediately. Bearing replacement is possible only if caught before the crank is damaged. On high-performance engines (BMW M, Subaru STI), consider preventative bearing replacement at 60k-80k miles - it's cheaper than a new engine. - Specialist rule of thumb (UK) Not every engine failure requires a full replacement. Where damage is isolated (early-stage rod knock), bearing replacement may be economical. However, advanced rod knock almost always requires engine replacement. Compare repair vs replacement quotes for your engine → Get quotes Vehicle value threshold"
      },
      {
        "title": "Is repair economical-",
        "paragraphs": [
          "If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Vehicle Value Recommended Action Reasoning Under £3,000 Scrap the vehicle Replacement cost (£1,500-£4,000) likely exceeds value £3,000 - £5,000 Used engine replacement (if car is otherwise excellent) Bearing repair borderline; used engine may be cheaper £5,000 - £8,000 Evaluate both - bearing replacement or used engine Bearing replacement (£800-£1,500) viable if caught early £8,000 - £15,000 Bearing replacement (if caught early) or reconditioned engine Warranty justifies cost £15,000+ Bearing replacement or reconditioned engine Replacement cost small relative to vehicle value If the lowest viable repair cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on 24,650 quote requests in 2025 [EM-VERIFIED], rod bearing failure is one of the most common catastrophic engine issues, particularly on high-mileage diesel engines."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on 24,650 quote requests in 2025 [EM-VERIFIED], rod bearing failure is one of the most common catastrophic engine issues, particularly on high-mileage diesel engines. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Land Rover 306DT (SDV6/TDV6) Crankshaft bearing failure - 980 requests [EM-VERIFIED] 980 requests [EM-VERIFIED] BMW N57D30 Crankshaft bearing issues - 830 requests [EM-VERIFIED] 830 requests [EM-VERIFIED] BMW N47D20 / N47D20C Chain debris contaminates oil - 1,450 requests [EM-VERIFIED] 1,450 requests [EM-VERIFIED] Land Rover 276DT (2.7 TDV6) Oil pump housing failure - 700 requests [EM-VERIFIED] 700 requests [EM-VERIFIED] Known failure insight \"The Land Rover SDV6/TDV6 (306DT) generated 980 quote requests in 2025 [EM-VERIFIED n=980], reflecting the high failure rate of crankshaft bearings. Specialists report bearing failure typically occurs between 80,000 and 140,000 miles, with cold-start knock as the primary early warning.\" - KNOWN FAILURE PATTERNS table Based on 24,650 real UK quotes in 2025. Rod bearing failure is often ignored until it's too late - early diagnosis is your only chance of avoiding a full engine replacement. Preventative maintenance"
      },
      {
        "title": "Avoiding rod bearing failure",
        "paragraphs": [
          "Rod bearing failure is largely preventable with proper maintenance."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Rod bearing failure is largely preventable with proper maintenance. 01 Regular oil changes with correct grade Every 6k-8k miles on performance engines, 8k-12k on standard. Use manufacturer-spec oil (BMW LL04, VW 507.00, etc.). 02 Never ignore low oil pressure warnings Even a momentary flicker is a red flag - stop and investigate immediately. 03 Check oil level weekly Low oil is the #1 cause of bearing failure. Top up if low. 04 Consider oil analysis on high-risk engines Detects bearing material before failure becomes catastrophic. Especially BMW N-series, Subaru EJ. 05 Preventative bearing replacement (performance engines) BMW S54/S65, Subaru EJ20/EJ25: replace bearings at 60k-80k miles as insurance. Cost: £800-£1,500. Preventative maintenance (per year) £150-£300 Oil changes, basic servicing VS Catastrophic failure - engine replacement £3,000-£10,000+ Reconditioned engine or full rebuild The maths is simple. Get a preventative bearing replacement quote → Get quotes Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does rod bearing replacement cost in the UK",
        "answer": "Bearing replacement (caught early): £800-£1,500. Crankshaft regrind: £1,200-£2,000. Engine replacement (catastrophic failure): £3,000-£10,000+. Labour: 12-20 hours at £65-£95/hr (independent). → Engine replacement cost guide"
      },
      {
        "question": "Can you fix rod knock without replacing the engine",
        "answer": "If caught very early (before the crankshaft journal is damaged), bearing replacement is possible for £800-£1,500. However, most rod knock is discovered too late, and the crank is already scored - requiring engine replacement (£3,000-£10,000+)."
      },
      {
        "question": "What does rod knock sound like",
        "answer": "A deep, rhythmic \"thud thud thud\" that increases with engine RPM. It's a heavy, metallic sound - not a light tick. If you hear this, stop driving immediately."
      },
      {
        "question": "What causes rod bearing failure",
        "answer": "Most common causes: oil starvation (low oil, oil pump failure), extended oil change intervals, high mileage wear, high-performance use, or manufacturing defects (some BMW and Subaru engines)."
      },
      {
        "question": "Which engines have the most rod bearing problems",
        "answer": "Based on 2025 quote data and KNOWN FAILURE PATTERNS: Land Rover 306DT SDV6/TDV6 (980 requests), BMW N57D30 (830 requests), Land Rover 276DT (700 requests). Also BMW S54/S65 (M engines) and Subaru EJ-series. [EM-VERIFIED]"
      },
      {
        "question": "Is rod bearing failure covered under warranty",
        "answer": "On reconditioned engines, warranty typically covers internal component failure but excludes failure caused by oil starvation or neglect. On used cars, rod bearing failure is rarely covered under standard warranties. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      }
    ]
  },
  "timing-belt-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Every stage to the right costs significantly more - act at stage 1 or 2.",
          "Normal wear and age degradation. Rubber perishing, small cracks between teeth.",
          "Book belt replacement immediately. Do not wait for further symptoms - rubber deteriorates even without miles driven.",
          "£300-£800 for belt + tensioner replacement. Add £100-£300 for water pump (recommended at same time).",
          "Belt teeth stripping or tensioner bearing failure. Belt may have already slipped slightly on the pulleys.",
          "Stop driving immediately if ticking is pronounced. Have the engine inspected and timing checked before replacing belt.",
          "£300-£800 if caught before belt slips. If teeth are already stripped, add diagnosis and retime cost: up to £1,200.",
          "Belt jumped several teeth - cam and crank timing no longer aligned. Valves may not be damaged yet.",
          "Stop driving. Arrange tow. Do not attempt to restart - further engine rotation risks bending valves on interference engines.",
          "£500-£1,500 to retime and inspect valves. If valves are bent: £2,500-£7,000+ for engine replacement or rebuild.",
          "Snapped belt on interference engine. Pistons hit valves. Valves bend, pistons may crack, cylinder head can be damaged.",
          "Do not restart the engine. Call recovery immediately. Arrange diagnostic at a specialist - assume internal damage until proven otherwise.",
          "£2,500-£7,000+ for reconditioned engine replacement or major rebuild. Head rebuild alone often exceeds replacement engine cost."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Every stage to the right costs significantly more - act at stage 1 or 2. £300 Visible cracking, fraying, glazing Normal wear, age degradation £300 - £800 £800 Ticking noise, hard starting Belt teeth stripping, tensioner failure £300 - £800 if caught early £1,500 Misfires, loss of power Belt jumped several teeth - timing off £500 - £1,500 £7,000+ Engine suddenly stops - won't restart Snapped belt on interference engine £2,500 - £7,000+ Likely cause Normal wear and age degradation. Rubber perishing, small cracks between teeth. What to do Book belt replacement immediately. Do not wait for further symptoms - rubber deteriorates even without miles driven. Repair cost £300-£800 for belt + tensioner replacement. Add £100-£300 for water pump (recommended at same time). Likely cause Belt teeth stripping or tensioner bearing failure. Belt may have already slipped slightly on the pulleys. What to do Stop driving immediately if ticking is pronounced. Have the engine inspected and timing checked before replacing belt. Repair cost £300-£800 if caught before belt slips. If teeth are already stripped, add diagnosis and retime cost: up to £1,200. Likely cause Belt jumped several teeth - cam and crank timing no longer aligned. Valves may not be damaged yet. What to do Stop driving. Arrange tow. Do not attempt to restart - further engine rotation risks bending valves on interference engines. Repair cost £500-£1,500 to retime and inspect valves. If valves are bent: £2,500-£7,000+ for engine replacement or rebuild. Likely cause Snapped belt on interference engine. Pistons hit valves. Valves bend, pistons may crack, cylinder head can be damaged. What to do Do not restart the engine. Call recovery immediately. Arrange diagnostic at a specialist - assume internal damage until proven otherwise. Repair cost £2,500-£7,000+ for reconditioned engine replacement or major rebuild. Head rebuild alone often exceeds replacement engine cost. Timing belt vs timing chain"
      },
      {
        "title": "Know which your car has",
        "paragraphs": [
          "The failure consequence and maintenance strategy are completely different. Get this wrong and you're paying for the wrong repair."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "The failure consequence and maintenance strategy are completely different. Get this wrong and you're paying for the wrong repair. Timing belt High risk if neglected Expected lifespan 5-8 years / 60,000-100,000 miles Replacement cost £300 - £800 (belt, tensioner, often water pump) Failure consequence Catastrophic on interference engines Warning before failure Almost none - belt snaps without noise Preventative maintenance Mandatory scheduled replacement Timing chain Expected lifespan 80,000-150,000 miles (some fail earlier) Replacement cost £700 - £2,700 (chain, guides, tensioner) Failure consequence Often catastrophic Warning before failure Rattle, especially on cold start Preventative maintenance Listen for rattle; oil quality critical 💡 Key takeaway: A timing belt gives no warning before failure. The only protection is replacing it on schedule. A chain usually rattles first - a belt simply snaps. Compare timing chain vs belt replacement costs in full → View comparison Repair vs replace - decision framework after belt snaps"
      },
      {
        "title": "What should you do after a snapped belt-",
        "paragraphs": [
          "Not every engine failure requires a full replacement. Where damage is isolated (e.g., belt snapped at idle, minimal valve contact), targeted repair may be more economical. Our price comparison service focuses on replacement options, but we also provide repair cost guidance."
        ],
        "bullets": [
          "Engine is non-interference (rare on modern cars - see table below)",
          "Only minor valve contact, pistons undamaged",
          "Vehicle value high enough to justify £1,500-£3,000 head rebuild",
          "Interference engine - most modern petrol and diesel cars",
          "Valves bent, pistons damaged, cylinder head scored",
          "Labour to remove head, replace valves, inspect pistons often exceeds cost of reconditioned engine",
          "Vehicle value under £4,000 - replacement rarely economical"
        ],
        "tables": [],
        "additionalText": "✓ Choose repair (cylinder head rebuild) if: Engine is non-interference (rare on modern cars - see table below) Only minor valve contact, pistons undamaged Vehicle value high enough to justify £1,500-£3,000 head rebuild ⚠ Choose engine replacement if: Interference engine - most modern petrol and diesel cars Valves bent, pistons damaged, cylinder head scored Labour to remove head, replace valves, inspect pistons often exceeds cost of reconditioned engine Vehicle value under £4,000 - replacement rarely economical \" If a timing belt snaps on an interference engine, fit a reconditioned engine. Head rebuild + labour almost always costs more than a warranted replacement unit. - Specialist rule of thumb (UK) Not every engine failure requires a full replacement. Where damage is isolated (e.g., belt snapped at idle, minimal valve contact), targeted repair may be more economical. Our price comparison service focuses on replacement options, but we also provide repair cost guidance. Interference vs non-interference engines - critical"
      },
      {
        "title": "Which type of engine do you have-",
        "paragraphs": [
          "This determines whether a snapped belt destroys your engine or simply leaves you stranded."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "This determines whether a snapped belt destroys your engine or simply leaves you stranded. ⚠ Interference engine Valves hit pistons → bent valves, damaged pistons, cylinder head damage → engine replacement or major rebuild £2,500 - £7,000+ Examples: Most modern petrol and diesel engines: Ford EcoBoost, VW TSI/TDI, BMW petrols, Mercedes, Honda VTEC, Toyota VVT-i, PSA PureTech ✓ Non-interference engine Engine stops but no internal damage - replace belt and retime £300 - £800 Examples: Older engines - some Ford Kent/Zetec, some pre-2000 Honda, some Toyota 1.8 (check specific variant) 🚨 Warning: The vast majority of cars built after 2000 use interference engines. If your timing belt snaps while driving, assume internal damage until a mechanic proves otherwise. Symptoms of a worn timing belt"
      },
      {
        "title": "Check these before it's too late",
        "paragraphs": [
          "A timing belt rarely gives audible warning, but visual inspection can save your engine."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "A timing belt rarely gives audible warning, but visual inspection can save your engine. 🔍 Visible cracking Rubber perishing, small cracks between teeth visible on belt surface. ✨ Fraying or glazing Belt looks shiny or has loose fibres - rubber degrading from age. 🔔 Ticking from timing cover Belt teeth may be stripping or tensioner bearing is failing. ⚡ Hard starting or misfiring Belt may have jumped one or two teeth - timing slightly off. 🔇 Engine won't start after sitting Belt may have snapped at rest - less common but possible. 🚨 Critical reminder If overdue by mileage OR years, replace immediately. Rubber degrades even without miles. There are usually no symptoms before failure. Red flag years & high-risk models"
      },
      {
        "title": "Engines known for early belt degradation",
        "paragraphs": [
          "Unlike timing chains - which have specific failure-prone engine designs - timing belts fail due to age and mileage. However, these engines show higher-than-average early degradation. Bar width reflects relative UK quote volume (2025)."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Unlike timing chains - which have specific failure-prone engine designs - timing belts fail due to age and mileage. However, these engines show higher-than-average early degradation. Bar width reflects relative UK quote volume (2025). Vauxhall Z19DTH 1.9 CDTi 2004-2010 230 [EM-VERIFIED] Belt + water pump interval critical. Highest quote volume of the group. Ford 1.0 EcoBoost (early) 2012-2016 185 [EM-VERIFIED] Wet belt degrades in oil; belt debris blocks oil pickup. Catastrophic if ignored. VW/Audi EA111 1.4 TSI 2005-2012 140 [EM-VERIFIED] Chain on camshaft, belt on supercharger - multiple failure points. Ford 1.5/1.6 EcoBoost 2012-2018 - Belt-driven oil pump also fails; check both at service interval. PSA 1.2 PureTech 2014-2020 - Wet belt degrades; recall issued on some models - check with dealer. Ford 1.8/2.0 Duratorq TDCi 2005-2015 - Belt tensioner failure common - replace tensioner with every belt change. Timing belt replacement cost by manufacturer"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Cost ranges are [ESTIMATED] based on UK independent specialist research and workshop consensus. Main dealer costs add 40-60%. Labour: £65-£95/hr (independent)."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Manufacturer / Engine",
              "Belt + tensioner",
              "Belt + water pump",
              "Labour hours",
              "Interval (miles / years)"
            ],
            "rows": [
              [
                "Ford 1.0 EcoBoost",
                "£600 - £1,200",
                "£700 - £1,400",
                "4-6 hrs",
                "80k / 8 yrs"
              ],
              [
                "Ford 1.5/1.6 EcoBoost",
                "£400 - £800",
                "£500 - £1,000",
                "3-5 hrs",
                "80k / 8 yrs"
              ],
              [
                "VW/Audi 2.0 TDI (EA189/EA288)",
                "£400 - £700",
                "£500 - £900",
                "3-5 hrs",
                "80k / 5 yrs"
              ],
              [
                "VW/Audi 1.4/1.6 TDI",
                "£350 - £600",
                "£450 - £800",
                "3-4 hrs",
                "80k / 5 yrs"
              ],
              [
                "BMW N47/B47 (chain, not belt)",
                "N/A - chain engine",
                "N/A",
                "Lifetime (but fails early)"
              ],
              [
                "Mercedes OM651 (chain)",
                "N/A - chain engine",
                "N/A",
                "Lifetime (tensioner fails)"
              ],
              [
                "PSA 1.2 PureTech",
                "£500 - £900",
                "£600 - £1,100",
                "4-6 hrs",
                "62k / 6 yrs"
              ],
              [
                "Vauxhall 1.9 CDTi",
                "£350 - £650",
                "£450 - £800",
                "3-5 hrs",
                "80k / 6 yrs"
              ],
              [
                "Toyota 2.0 D4D (1AD/2AD)",
                "£350 - £600",
                "£450 - £800",
                "3-5 hrs",
                "80k / 6 yrs"
              ],
              [
                "Honda 2.2 i-DTEC",
                "£400 - £700",
                "£500 - £900",
                "4-6 hrs",
                "75k / 5 yrs"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "When is your belt due-",
        "paragraphs": [
          "Always check your vehicle's specific handbook. Intervals are [THIRD-PARTY] based on manufacturer service schedules."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Always check your vehicle's specific handbook. Intervals are [THIRD-PARTY] based on manufacturer service schedules. Manufacturer Petrol interval Diesel interval Notes Ford 80k miles / 8 yrs 80k miles / 8 yrs EcoBoost wet belts: 8 years max VW / Audi / Seat / Skoda 60k-80k miles / 5 yrs 80k miles / 5 yrs TSI chain engines (EA888 Gen3) are chain BMW Belt engines: 60k-80k / 5 yrs Most are chain (N47, B47, N57, B57) Check specific engine code Mercedes Belt engines: 60k-80k / 5 yrs Most are chain (OM651, OM654, OM642) Check specific engine code PSA (Peugeot/Citroën) 62k miles / 6 yrs 80k miles / 6 yrs PureTech wet belts: strict interval Vauxhall 60k-80k miles / 5-6 yrs 80k miles / 6 yrs 1.9 CDTi belt critical Toyota 60k-80k miles / 5-6 yrs 80k miles / 6 yrs D4D diesels: inspect tensioner Honda 70k-80k miles / 5-7 yrs 75k miles / 5 yrs i-DTEC: belt + water pump together Renault / Nissan 60k-80k miles / 5 yrs 80k miles / 5 yrs K9K: belt interval critical. 730 requests [EM-VERIFIED] Hyundai / Kia 60k-80k miles / 5 yrs 80k miles / 5 yrs U2 1.7 CRDi: 280 requests [EM-VERIFIED] Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Engines Market aggregates real supplier quotes. These numbers are from verified 2025 requests - not estimates."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Engines Market aggregates real supplier quotes. These numbers are from verified 2025 requests - not estimates. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] Ford DV6 1.6 TDCi One of the most common belt-driven engines requiring replacement after belt failure 780 requests [EM-VERIFIED] Renault K9K 1.5 dCi Belt failure is a common failure pattern on high-mileage examples 730 requests [EM-VERIFIED] Ford 1.0 EcoBoost (combined) Wet belt degradation is a well-documented issue across early and newer variants 365 requests [EM-VERIFIED] Vauxhall Z19DTH 1.9 CDTi Belt tensioner failure is the known weakness - replace tensioner with every belt change 230 requests [EM-VERIFIED] Owner behaviour insight \"The Ford 1.0 EcoBoost wet belt degrades in oil, shedding debris that clogs the oil pickup. Preventative belt replacement costs £600-£1,500. Ignoring it until failure costs £2,000-£5,000 for a replacement engine.\" - KNOWN FAILURE PATTERNS table [Tier 2] Based on 24,650 real UK quotes in 2025. Belt-driven engines are over-represented in the catastrophic failure category precisely because belts give no warning. For vehicles worth under £4,000, a snapped belt often means scrapping the car. Preventative timing belt maintenance"
      },
      {
        "title": "The cheapest insurance you can buy",
        "paragraphs": [
          "Every item below costs a fraction of what an ignored belt will cost you."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Every item below costs a fraction of what an ignored belt will cost you. 01 Replace belt at manufacturer interval - not when it breaks This is non-negotiable on interference engines. The belt has no warning system. 02 Replace water pump at the same time Water pump failure shortly after belt replacement adds double labour cost. Do it once. 03 Use OEM or high-quality aftermarket belts only Cheap belts fail early. A £40 saving on parts can cost £5,000 in engine damage. 04 Replace tensioner and idler pulleys with the belt Old tensioner bearings are a common cause of belt failure - replace them together. 05 Assume the belt is overdue on any used car with unknown history Rubber ages even without miles. If you can't verify the history, replace it now. Preventative replacement £300-£800 Belt + tensioner, scheduled service VS Snapped belt - engine replacement £2,500-£7,000+ Reconditioned engine or full rebuild The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does timing belt replacement cost in the UK",
        "answer": "Typical timing belt replacement costs range from £300 to £800 for a 4-cylinder engine. Belt + water pump package adds £100-£300. Labour: 3-6 hours at £65-£95/hr (independent). Main dealer adds 40-60%. → Timing belt replacement cost guide"
      },
      {
        "question": "What happens if timing belt breaks while driving",
        "answer": "On an interference engine (most cars after 2000), pistons hit valves. Valves bend, pistons may crack, cylinder head can be damaged. The engine stops immediately and will not restart. Repair cost: £2,500-£7,000+ for replacement engine or major rebuild."
      },
      {
        "question": "Can I drive with a worn timing belt",
        "answer": "No. A timing belt gives almost no warning before failure. If you're overdue by mileage OR time (rubber degrades), replace it immediately. Do not wait for symptoms."
      },
      {
        "question": "How often should timing belt be replaced",
        "answer": "Most manufacturers specify every 60,000-100,000 miles or 5-8 years, whichever comes first. Check your vehicle's handbook. Rubber ages even without miles."
      },
      {
        "question": "My car has a timing chain - do I need a belt replacement",
        "answer": "No. Timing chains do not have scheduled replacement intervals, but some (BMW N47, Land Rover Ingenium) fail early. Listen for cold-start rattle. → Timing chain failure guide"
      },
      {
        "question": "Is timing belt covered under warranty",
        "answer": "On a used car, timing belts are typically considered a consumable service item and are not covered. Some approved used warranties may cover belt failure if the belt failed within the recommended interval. On reconditioned engines, the belt is new as part of the rebuild."
      }
    ]
  },
  "timing-chain-failure": {
    "sections": [
      {
        "title": "Understanding the progression of timing chain wear",
        "paragraphs": [
          "Catching the failure early is the only way to avoid a full engine replacement. Click any stage to see full detail.",
          "Hydraulic tensioner losing oil pressure overnight. Oil quality critical.",
          "Book a diagnostic inspection immediately. If the rattle lasts more than 1-2 seconds, the tensioner is failing.",
          "£650-£1,800 for chain + tensioner replacement. Early intervention prevents engine damage.",
          "Chain has stretched beyond specification. Plastic guides may be broken or worn through.",
          "Stop driving. Arrange recovery to a specialist. Continued driving risks chain jumping timing.",
          "£2,500-£6,500 for reconditioned engine replacement. Head rebuild alone often exceeds replacement cost.",
          "Chain snapped completely. Pistons hit valves on interference engines. Cylinder head damage likely.",
          "Do not attempt to restart. Call recovery. Specialist inspection required - prepare for engine replacement.",
          "£4,500-£9,500 for engine + head work. A warranted reconditioned unit is almost always cheaper and more reliable."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching the failure early is the only way to avoid a full engine replacement. Click any stage to see full detail. £650 Cold-start rattle (1-2 seconds) Tensioner wear, early chain stretch £650 - £1,800 £2,500 Continuous rattle, engine management light Chain stretched / guide broken £2,500 - £6,500 £9,500 Engine won't start, no compression Snapped chain → bent valves, piston damage £4,500 - £9,500 Likely cause Hydraulic tensioner losing oil pressure overnight. Oil quality critical. What to do Book a diagnostic inspection immediately. If the rattle lasts more than 1-2 seconds, the tensioner is failing. Repair cost £650-£1,800 for chain + tensioner replacement. Early intervention prevents engine damage. Likely cause Chain has stretched beyond specification. Plastic guides may be broken or worn through. What to do Stop driving. Arrange recovery to a specialist. Continued driving risks chain jumping timing. Repair cost £2,500-£6,500 for reconditioned engine replacement. Head rebuild alone often exceeds replacement cost. Likely cause Chain snapped completely. Pistons hit valves on interference engines. Cylinder head damage likely. What to do Do not attempt to restart. Call recovery. Specialist inspection required - prepare for engine replacement. Repair cost £4,500-£9,500 for engine + head work. A warranted reconditioned unit is almost always cheaper and more reliable. The mechanical reality"
      },
      {
        "title": "What happens when the chain snaps-",
        "paragraphs": [
          "To understand why specialists universally recommend engine replacement over rebuilding a snapped chain, you must understand how modern engines are designed."
        ],
        "bullets": [
          "Pistons and valves occupy the same physical space at different times",
          "The timing chain is the single component keeping them perfectly synchronized",
          "If the chain snaps while running - pistons smash into open valves at thousands of RPM",
          "Bent or completely broken valves",
          "Shattered pistons and scored cylinder walls",
          "A destroyed cylinder head",
          "Potential connecting rod damage from metal debris"
        ],
        "tables": [],
        "additionalText": "To understand why specialists universally recommend engine replacement over rebuilding a snapped chain, you must understand how modern engines are designed. ⚠ Interference engine design Pistons and valves occupy the same physical space at different times The timing chain is the single component keeping them perfectly synchronized If the chain snaps while running - pistons smash into open valves at thousands of RPM ⚡ Resulting internal damage Bent or completely broken valves Shattered pistons and scored cylinder walls A destroyed cylinder head Potential connecting rod damage from metal debris 💡 Specialist rule of thumb: \"If the chain snaps, replace the engine, don't rebuild.\" Installing a warranted reconditioned unit is almost always cheaper and more reliable than a catastrophic failure rebuild. Repair vs replace - decision framework"
      },
      {
        "title": "What should you do after a chain failure-",
        "paragraphs": [
          "The financial viability depends heavily on your vehicle's current market value and the extent of the damage."
        ],
        "bullets": [
          "The chain rattle is caught early (no engine management light)",
          "Diagnostic scans show camshaft/crankshaft correlation errors, but no physical metal debris",
          "No metal shavings found in the oil sump or on the magnetic sump plug",
          "Labour: 5-12h depending on engine layout",
          "The chain has snapped - bent valves or piston damage",
          "Metal debris is visible in the oil sump",
          "Timing has jumped significantly - cylinder head damage",
          "Top-end rebuild cost exceeds cost of warranted reconditioned unit"
        ],
        "tables": [],
        "additionalText": "The financial viability depends heavily on your vehicle's current market value and the extent of the damage. ✓ Choose repair (chain only) if: The chain rattle is caught early (no engine management light) Diagnostic scans show camshaft/crankshaft correlation errors, but no physical metal debris No metal shavings found in the oil sump or on the magnetic sump plug Labour: 5-12h depending on engine layout ⚠ Choose engine replacement if: The chain has snapped - bent valves or piston damage Metal debris is visible in the oil sump Timing has jumped significantly - cylinder head damage Top-end rebuild cost exceeds cost of warranted reconditioned unit The vehicle value threshold rule Vehicle value under £5,000 Reconditioned engine (£2,500-£4,000 fitted) may represent 60-80% of vehicle value. You are at the \"Scrap Threshold\" - evaluate whether repair is economically viable. Vehicle value £8,000-£15,000+ Reconditioned engine (£3,500-£6,000 fitted) is a financially sound investment . Based on 24,650 inquiries [EM-VERIFIED 2025], 70.45% of owners in this bracket choose reconditioned engines. Red flag years & affected models"
      },
      {
        "title": "Engines known for early chain failure",
        "paragraphs": [
          "Certain engines are notorious for premature timing chain failure due to design flaws. If you own one of these vehicles, vigilance is mandatory."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Certain engines are notorious for premature timing chain failure due to design flaws. If you own one of these vehicles, vigilance is mandatory. BMW N47D20 / N47D20C 2007-2015 1,450 [EM-VERIFIED] Rear-mounted timing chain, tensioner failure. Highest quote volume. Land Rover 204DTD (Ingenium D) 2015-2019 1,150 [EM-VERIFIED] Timing chain tensioner weakness, oil dilution. Discovery Sport, Evoque. Mercedes OM651 2008-2016 1,250 [EM-VERIFIED] Timing chain tensioner wear - TSB LI80.20-P-050001. C-Class, E-Class, Sprinter. Ford 1.0 EcoBoost (early) 2012-2016 365 [EM-VERIFIED] Wet belt degrades in oil; chain-driven oil pump belt fails. Catastrophic debris. VW/Audi EA189 2.0 TDI 2008-2015 - Chain stretch on high-mileage examples - inspect at 80k miles. Timing chain replacement cost by manufacturer (UK independent)"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Note on labour hours: While a standard front-mounted timing chain on an inline-4 takes 5-8 hours, high-risk engines like the BMW N47 and Land Rover Ingenium have rear-mounted chains (at the flywheel end). This requires engine removal or major front-end stripping, pushing labour times to 10-14 hours.",
          "Data source: Reconditioned engine supply costs derived from EM_Proprietary_Data_2025 Table A. Labour based on £65/hr indie baseline (North/Midlands). London/SE rates are 40-60% higher. [ESTIMATED]"
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Manufacturer / Engine",
              "Chain replacement cost",
              "Labour hours",
              "Indicative labour cost (@£65-£95/hr)"
            ],
            "rows": [
              [
                "BMW N47 / B47 4-cyl",
                "£1,200 - £2,500",
                "10-14 hrs",
                "£650 - £1,330"
              ],
              [
                "Land Rover 2.0 Ingenium",
                "£1,500 - £2,700",
                "10-14 hrs",
                "£650 - £1,330"
              ],
              [
                "Mercedes OM651 / OM642",
                "£1,000 - £2,000",
                "8-12 hrs",
                "£520 - £1,140"
              ],
              [
                "Ford 1.0 EcoBoost (wet belt)",
                "£800 - £1,800",
                "7-10 hrs",
                "£455 - £950"
              ],
              [
                "Audi / VW 2.0 TDI (EA189/EA288)",
                "£900 - £2,000",
                "8-11 hrs",
                "£520 - £1,045"
              ],
              [
                "V6 / V8 petrol (BMW N63, Merc M276)",
                "£1,800 - £3,500+",
                "12-20 hrs",
                "£780 - £1,900"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Know the difference",
        "paragraphs": [
          "Many vehicle owners confuse the two. While both synchronize the engine, their failure modes and maintenance requirements differ significantly."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Many vehicle owners confuse the two. While both synchronize the engine, their failure modes and maintenance requirements differ significantly. Timing chain High risk if neglected Expected lifespan 80,000-150,000 miles (some fail earlier) Replacement cost £700 - £2,700 (chain, guides, tensioner) Failure consequence Often catastrophic (bent valves, engine replacement) Preventative maintenance Listen for cold-start rattle; strict oil quality critical Timing belt Expected lifespan 5-8 years / 60,000-100,000 miles Replacement cost £300 - £800 (belt + tensioner) Failure consequence Usually catastrophic on interference engines if skipped Preventative maintenance Change exactly at manufacturer recommended interval 💡 Key takeaway: A timing belt has a fixed replacement interval - a chain is designed to last, but design flaws mean some fail early. Listen for rattle on a chain, change a belt on schedule. Compare timing chain vs belt replacement costs in full → View comparison Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on internal marketplace data from 24,650 quote requests, the most requested engine replacements due to timing chain or wet-belt failures are shown below."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on internal marketplace data from 24,650 quote requests, the most requested engine replacements due to timing chain or wet-belt failures are shown below. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] BMW N47D20C Rear-mounted timing chain, tensioner failure - 1,450 requests in 2025 1,450 requests [EM-VERIFIED] Mercedes OM651 Timing chain tensioner wear - TSB LI80.20-P-050001 1,250 requests [EM-VERIFIED] Land Rover 204DTD Ingenium Timing chain tensioner weakness, oil dilution - 1,150 requests in 2025 1,150 requests [EM-VERIFIED] Ford 1.0 EcoBoost (combined) Wet belt degrades in oil - 365 combined requests [EM-VERIFIED] 365 requests [EM-VERIFIED] Owner behaviour insight \"Following a catastrophic timing chain failure, 70.45% of owners choose reconditioned engines, particularly for vehicles worth over £8,000. For vehicles valued under £4,000, used engines are the more common choice to avoid exceeding the vehicle's total market value.\" Based on 24,650 real UK quotes in 2025. Timing chain failures are over-represented in the catastrophic failure category because chains give rattling warning - but owners often ignore it until it's too late. Timing chain failure symptoms"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [
          "If you notice any of the following, do not clear the fault code and ignore it. The physical damage is already occurring."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "If you notice any of the following, do not clear the fault code and ignore it. The physical damage is already occurring. 🔊 Metallic rattling on cold start Lasts 1-3 seconds after starting. Tensioner failing to hold oil pressure - chain slaps against guides. 🔄 Continuous rattle with RPM Chain severely stretched or guide broken - constant physical contact. ⚠️ Engine management light (P0016/P0017) Crankshaft/camshaft correlation out of sync - timing has shifted. ✨ Metal shavings in oil Glitter-like metal on dipstick or sump plug - chain guides disintegrating. 💨 Rough idle, misfires, loss of power Timing has jumped - valves opening at the wrong time. 🚨 STOP DRIVING if: You hear loud metallic clattering OR the engine suddenly cuts out. A snapped chain on interference engines bends valves, damages pistons, and requires a full engine replacement (£2,500-£10,000+). Tow the vehicle immediately. Preventative timing chain maintenance"
      },
      {
        "title": "You cannot stop a design flaw - but you can extend the life",
        "paragraphs": [
          "Follow these specialist recommendations to drastically extend the life of your timing chain."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Follow these specialist recommendations to drastically extend the life of your timing chain. 01 Oil & filter every 6k-8k miles Stretched chains are almost always caused by oil degradation or low oil pressure. Modern \"long-life\" 18,000-mile service intervals are the primary killer of timing chains. Use strictly OEM-spec oil. 02 Listen at every cold start Open the door or window before starting the car. A momentary rattle after 60,000 miles is a definitive red flag. 03 Inspection via diagnostic scan A specialist can read \"camshaft adaptation values\" via the ECU. This can reveal chain stretch before any physical noise appears. 04 Preventative replacement For high-risk engines (N47, Ingenium, OM651), budget for a preventative chain and tensioner replacement at 80k-100k miles. It is vastly cheaper than a full engine replacement. Preventative chain replacement £700-£1,800 Chain + tensioner, scheduled service VS Snapped chain - engine replacement £2,500-£10,000+ Reconditioned engine or full rebuild Catch it early, save thousands. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "Can I drive with a timing chain rattle",
        "answer": "No. Even a mild rattle indicates chain slack or tensioner failure. Driving risks the chain jumping teeth or snapping entirely, which will destroy the engine. Get a diagnostic immediately. → Engine diagnostics"
      },
      {
        "question": "How much to replace a timing chain on a BMW N47",
        "answer": "Between £1,200 and £2,500 at an independent specialist. Main dealer costs will add 40-60%. If the chain has already snapped, a reconditioned engine ranges from £3,200-£5,500 fitted. → Engine replacement cost"
      },
      {
        "question": "Is a timing chain failure covered under warranty",
        "answer": "If you purchase a reconditioned engine, the supplier warranty (typically 12-24 months) covers the internal components. However, if you had pre-existing chain noise before a repair or replacement, it will be classed as wear-and-tear or prior fault and is not covered. → Engine warranty guide"
      },
      {
        "question": "Should I replace the water pump at the same time as the timing chain",
        "answer": "On many modern engines, the water pump is driven by the auxiliary belt, not the timing chain. However, if your specific engine layout shares components, or if the water pump is easily accessible while the engine is partially stripped, replacing it simultaneously will save you significant labour costs in the future."
      },
      {
        "question": "How do I know if my car has a timing belt or chain",
        "answer": "Check your vehicle's handbook or search online for your specific engine code. Alternatively, ask your mechanic to inspect - a chain is a metal component visible behind a metal cover, a belt is rubber behind a plastic cover."
      }
    ]
  },
  "turbo-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Catching turbo failure early is critical to avoid catastrophic engine damage. Click any stage to see full detail.",
          "Boost leak, worn bearings, damaged compressor wheel. High-pitched noise changes with throttle.",
          "Book a diagnostic inspection. Early investigation can save the turbo - repair may be possible.",
          "£195-£600 for turbo repair/rebuild. Labour: 3-8 hours at £65-£95/hr.",
          "Worn turbo seals (oil leaking into exhaust) or stuck wastegate/actuator failure.",
          "Stop driving if smoke is heavy. Arrange recovery to a specialist. Exchange turbo is usually the most cost-effective solution.",
          "£495-£1,800 for exchange remanufactured turbo. New turbo: £1,000-£3,500+.",
          "Catastrophic bearing failure - turbo seized, metal debris sent through intake and into engine.",
          "Do not attempt to restart. Call recovery. Full engine inspection required - engine may be damaged.",
          "£800-£3,500+ for new or remanufactured turbo + oil system flush. If engine damaged: £3,000-£7,000+."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Catching turbo failure early is critical to avoid catastrophic engine damage. Click any stage to see full detail. £195 Whistling noise, loss of power Boost leak, worn bearings, damaged wheel £195 - £600 £495 Blue/black smoke, oil consumption Worn seals, actuator failure £495 - £1,800 £3,500+ Metal debris in oil / turbo seized Catastrophic bearing failure £800 - £3,500+ Likely cause Boost leak, worn bearings, damaged compressor wheel. High-pitched noise changes with throttle. What to do Book a diagnostic inspection. Early investigation can save the turbo - repair may be possible. Repair cost £195-£600 for turbo repair/rebuild. Labour: 3-8 hours at £65-£95/hr. Likely cause Worn turbo seals (oil leaking into exhaust) or stuck wastegate/actuator failure. What to do Stop driving if smoke is heavy. Arrange recovery to a specialist. Exchange turbo is usually the most cost-effective solution. Repair cost £495-£1,800 for exchange remanufactured turbo. New turbo: £1,000-£3,500+. Likely cause Catastrophic bearing failure - turbo seized, metal debris sent through intake and into engine. What to do Do not attempt to restart. Call recovery. Full engine inspection required - engine may be damaged. Repair cost £800-£3,500+ for new or remanufactured turbo + oil system flush. If engine damaged: £3,000-£7,000+. Repair options"
      },
      {
        "title": "Which one is right for you-",
        "paragraphs": [
          "Depending on the damage, you have three options - each with different cost and warranty profiles."
        ],
        "bullets": [
          "Cost: £195 - £600",
          "Warranty: 3-12 months",
          "Best for: Minor damage (seals, bearings, actuator)",
          "When to choose: Turbo housing intact, no shaft play beyond spec, no debris in oil system",
          "Cost: £495 - £1,200 + VAT",
          "Warranty: 12-24 months",
          "Best for: Most owners - best value",
          "When to choose: Worn bearings, damaged wheels, core return available. Most common choice (65-70% of cases) [EM-OBSERVED]",
          "Cost: £1,000 - £3,500+",
          "Best for: High-performance or commercial vehicles",
          "When to choose: Maximum longevity, no core return hassle, insurance jobs",
          "Cost: £1,500 - £5,000+",
          "Best for: BMW, Audi, Mercedes twin-turbo diesels",
          "When to choose: If one fails, the other may be near failure - many specialists recommend replacing both"
        ],
        "tables": [],
        "additionalText": "Depending on the damage, you have three options - each with different cost and warranty profiles. 🔧 Turbo repair / rebuild Cost: £195 - £600 Warranty: 3-12 months Best for: Minor damage (seals, bearings, actuator) When to choose: Turbo housing intact, no shaft play beyond spec, no debris in oil system 🔄 Exchange remanufactured Cost: £495 - £1,200 + VAT Warranty: 12-24 months Best for: Most owners - best value When to choose: Worn bearings, damaged wheels, core return available. Most common choice (65-70% of cases) [EM-OBSERVED] 🆕 Brand new turbo Cost: £1,000 - £3,500+ Warranty: 12-24 months Best for: High-performance or commercial vehicles When to choose: Maximum longevity, no core return hassle, insurance jobs ⚡ Twin-turbo / biturbo (pair) Cost: £1,500 - £5,000+ Warranty: 12-24 months Best for: BMW, Audi, Mercedes twin-turbo diesels When to choose: If one fails, the other may be near failure - many specialists recommend replacing both Single turbo vs twin / biturbo"
      },
      {
        "title": "Cost differences by configuration",
        "paragraphs": [
          "Turbo replacement cost varies significantly based on the configuration of your engine's turbocharger system.",
          "Cost ranges from industry consensus [INDUSTRY ESTIMATE]. Labour based on £65-£95/hr indie (North/Midlands). London/SE rates are 40-60% higher."
        ],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Configuration",
              "Typical Replacement Cost (Exchange)",
              "Labour Hours",
              "Common Applications"
            ],
            "rows": [
              [
                "Single turbo (small, 1.5L-2.0L diesel)",
                "£495 - £900",
                "3-5 hrs",
                "Ford 1.5/1.6 TDCi, VW 1.6 TDI, Renault K9K"
              ],
              [
                "Single turbo (medium, 2.0L-3.0L diesel)",
                "£700 - £1,500",
                "4-7 hrs",
                "BMW N47/B47, Mercedes OM651, Land Rover 2.0 Ingenium"
              ],
              [
                "Single turbo (large, 3.0L+ diesel/petrol)",
                "£900 - £2,500",
                "5-8 hrs",
                "Land Rover 3.0 SDV6, BMW N57, Mercedes OM642"
              ],
              [
                "Twin-turbo / biturbo (pair)",
                "£1,500 - £3,500",
                "6-10 hrs",
                "BMW N57 twin-turbo, Audi 3.0 TDI biturbo, Mercedes OM654"
              ],
              [
                "Variable geometry turbo (VNT/VGT)",
                "£600 - £1,800",
                "4-7 hrs",
                "Most modern diesels (Ford, VW, BMW, Mercedes, Land Rover)"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [
          "A failing turbo rarely fails without warning. Listen to your engine and act early."
        ],
        "bullets": [
          "• Loss of power / sluggish acceleration - turbo isn't providing expected boost",
          "• Whistling or screaming noise - high-pitched sound that changes with throttle",
          "• Engine management light - fault codes P0299 (underboost), P0234 (overboost)",
          "• Increased fuel consumption - engine working harder to compensate",
          "• Blue smoke from exhaust - turbo seals leaking oil into exhaust",
          "• Black smoke (over-fuelling) - not enough air due to turbo fault",
          "• Oil consumption increasing - turbo burning oil through seals",
          "• Metallic grinding / rattling noise - bearings failing or wheel contacting housing",
          "• Oil in intercooler pipes - indicates seal failure"
        ],
        "tables": [],
        "additionalText": "A failing turbo rarely fails without warning. Listen to your engine and act early. 🔵 EARLY WARNING (Act soon) • Loss of power / sluggish acceleration - turbo isn't providing expected boost • Whistling or screaming noise - high-pitched sound that changes with throttle • Engine management light - fault codes P0299 (underboost), P0234 (overboost) • Increased fuel consumption - engine working harder to compensate 🔴 PROGRESSED DAMAGE (Investigate urgently) • Blue smoke from exhaust - turbo seals leaking oil into exhaust • Black smoke (over-fuelling) - not enough air due to turbo fault • Oil consumption increasing - turbo burning oil through seals • Metallic grinding / rattling noise - bearings failing or wheel contacting housing • Oil in intercooler pipes - indicates seal failure 🚨 STOP DRIVING if: You hear a loud metallic grinding noise OR the engine suddenly loses all power with blue/black smoke. A disintegrating turbo can send metal debris through your intake system, destroying the intercooler, intake manifold, and cylinders - turning a £500 repair into a £3,000-£7,000 engine replacement. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Every day you delay increases the cost of repair exponentially."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Every day you delay increases the cost of repair exponentially. Stage Damage Cost to Fix Stage 1 Seal wear - oil consumption, blue smoke on start-up £195 - £500 Stage 2 Bearing wear - whistling noise, shaft play, oil in intercooler £495 - £1,200 Stage 3 Wheel / housing damage - metallic noise, debris in intake £600 - £2,000 Stage 4 Catastrophic failure - turbo sends metal through engine £3,000 - £7,000+ Real-world example from specialist forums (anonymised): 2013 BMW 320d N47, 112,000 miles. Owner ignored whistling noise for 2 months. Turbo bearings failed catastrophically, sending compressor wheel debris through the intercooler and into the intake manifold. Metal fragments entered two cylinders. Total cost: £5,200 for a reconditioned engine + new turbo. The same owner could have paid £800 for an exchange turbo 8 weeks earlier. Turbo failure - affected engines"
      },
      {
        "title": "Based on 2025 quote data",
        "paragraphs": [
          "While turbo failure can affect any forced-induction engine, the following engines have high request volumes on Engines Market, many relating to turbocharger issues."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "While turbo failure can affect any forced-induction engine, the following engines have high request volumes on Engines Market, many relating to turbocharger issues. BMW N47D20C 1,450 [EM-VERIFIED] £700 - £1,500 Turbo wear from chain debris; actuator failure Mercedes OM651 1,250 [EM-VERIFIED] £600 - £1,400 Variable geometry sticking; actuator failure Land Rover 204DTD Ingenium 1,150 [EM-VERIFIED] £800 - £1,800 Turbo failure from oil dilution; bearing wear VW/Audi EA189 2.0 TDI 1,050 [EM-VERIFIED] £500 - £1,200 Turbo wear from EGR soot; actuator issues BMW N57D30 830 [EM-VERIFIED] £1,200 - £2,500 Turbocharger wear (KNOWN FAILURE PATTERNS) Ford DV6 1.6 TDCi 780 [EM-VERIFIED] £450 - £900 Turbo actuator failure; bearing wear Renault K9K 1.5 dCi 730 [EM-VERIFIED] £600 - £1,500 Turbocharger failure (overfuelling) - KNOWN FAILURE PATTERNS Land Rover 306DT SDV6 980 [EM-VERIFIED] £1,200 - £2,800 Turbo contamination from crankshaft bearing debris Vehicle value threshold"
      },
      {
        "title": "Is turbo replacement economical-",
        "paragraphs": [
          "Use this framework to decide whether to repair, replace, or scrap.",
          "If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Use this framework to decide whether to repair, replace, or scrap. Vehicle Value Recommended Action Reasoning Under £2,000 Used turbo (breakers yard) or scrap Exchange turbo (£500+) may exceed vehicle value £2,000 - £5,000 Exchange remanufactured turbo Most cost-effective option; new turbo rarely justified £5,000 - £10,000 Exchange or new turbo Evaluate warranty needs; exchange usually sufficient £10,000+ New or exchange turbo with extended warranty Warranty justifies higher upfront cost If the lowest viable replacement cost exceeds approximately 60% of the vehicle's current market value, evaluate scrap/part-ex value before committing. Check your vehicle's value and compare turbo replacement quotes → Get quotes Market intelligence - UK 2025 data"
      },
      {
        "title": "What the quote data tells us",
        "paragraphs": [
          "Based on internal marketplace data from 24,650 quote requests, exchange remanufactured turbos are the most requested option (approx. 65-70% of cases), reflecting the balance of cost and warranty."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on internal marketplace data from 24,650 quote requests, exchange remanufactured turbos are the most requested option (approx. 65-70% of cases), reflecting the balance of cost and warranty. 0 verified UK quote requests analysed in 2025 [EM-VERIFIED] BMW N47D20C Turbo wear from chain debris - 1,450 requests [EM-VERIFIED] 1,450 requests [EM-VERIFIED] Mercedes OM651 Variable geometry sticking - 1,250 requests [EM-VERIFIED] 1,250 requests [EM-VERIFIED] Land Rover 204DTD Ingenium Turbo failure from oil dilution - 1,150 requests [EM-VERIFIED] 1,150 requests [EM-VERIFIED] VW/Audi EA189 2.0 TDI Turbo wear from EGR soot - 1,050 requests [EM-VERIFIED] 1,050 requests [EM-VERIFIED] Known failure insight \"The N47 engine generated 1,450 quote requests in 2025 [EM-VERIFIED n=1,450]. Many specialists report turbo failure secondary to timing chain debris contamination - replacing the turbo without addressing the chain often leads to repeat failure.\" - KNOWN FAILURE PATTERNS table (paraphrased) Based on 24,650 real UK quotes in 2025. Exchange remanufactured turbos are the most requested option (approx. 65-70% of cases), reflecting the balance of cost and warranty. Preventative maintenance"
      },
      {
        "title": "Avoiding turbo failure",
        "paragraphs": [
          "Turbochargers operate at over 100,000 RPM and temperatures exceeding 800°C. Clean oil is their lifeblood."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Turbochargers operate at over 100,000 RPM and temperatures exceeding 800°C. Clean oil is their lifeblood. 01 Regular oil changes with correct spec oil Turbo bearings are lubricated by engine oil. Missed intervals = carbonised oil = bearing failure. Use manufacturer-spec oil (BMW LL04, VW 507.00, Ford WSS-M2C913-D). 02 Allow cool-down idling after hard driving 30-60 seconds of gentle driving or idle allows turbo to cool and oil to circulate. Shutting off immediately after motorway driving cooks the oil in the turbo bearings. 03 Use quality oil filters Contaminated oil destroys turbo bearings. Always use OEM or high-quality aftermarket filters. 04 Don't ignore boost leaks or whistling Early investigation saves money. A £100 boost leak repair can prevent a £1,000 turbo replacement. 05 Consider turbo cleaning on high-mileage diesels Decarbonising the variable geometry mechanism can restore function and prevent actuator failure. Preventative oil change £80-£150 Correct spec oil + filter VS Catastrophic turbo + engine failure £3,000-£7,000+ Engine replacement + new turbo The maths is simple. Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does turbo replacement cost in the UK",
        "answer": "Turbo repair/rebuild: £195-£600. Exchange remanufactured turbo: from £495+VAT (typically £600-£1,200 fitted). New turbo: £1,000-£3,500+ fitted. Twin-turbo setups: £1,500-£5,000+. Labour: 3-8 hours at £65-£95/hr (independent). → Turbo replacement cost guide"
      },
      {
        "question": "Can a turbo be repaired instead of replaced",
        "answer": "Yes, depending on damage. Minor issues (seal wear, actuator failure, bearing replacement) can be repaired for £195-£600. However, exchange remanufactured turbos (£495+VAT) often offer better value as they include fully refurbished units with new bearings and seals."
      },
      {
        "question": "What are the signs of turbo failure",
        "answer": "Loss of power, high-pitched whistling/screaming noise, blue or black smoke from exhaust, engine management light, increased oil consumption, metallic grinding noise (advanced failure)."
      },
      {
        "question": "What causes turbo failure",
        "answer": "Most common causes: oil starvation (missed oil changes, low oil level), oil contamination (carbonised oil blocking feed pipes), foreign object damage (debris from air filter or engine), worn bearings (high mileage), actuator failure (common on variable geometry turbos)."
      },
      {
        "question": "Can I drive with a failing turbo",
        "answer": "If the turbo is whistling or smoking, drive only to a garage. If you hear metallic grinding or the engine has lost significant power, stop driving - the turbo may disintegrate and send debris into the engine, causing catastrophic damage."
      },
      {
        "question": "Is turbo failure covered under warranty",
        "answer": "On reconditioned engines, the turbo is typically covered as part of the engine warranty (12-24 months). However, failure caused by oil starvation or contaminated oil is often excluded. Standalone turbo warranties vary by supplier. Engines Market does not provide warranties - we are a comparison platform. → Engine warranty guide"
      },
      {
        "question": "My turbo failed and sent metal into the engine - what now",
        "answer": "You need a full engine inspection. Metal debris in cylinders often means engine replacement. Cost: £2,500-£7,000+ for a reconditioned engine. Always investigate turbo issues early to avoid this scenario."
      }
    ]
  },
  "water-pump-failure": {
    "sections": [
      {
        "title": "How fast damage escalates",
        "paragraphs": [
          "Click any stage to see full detail. Acting early is the difference between a £200 repair and a £2,000+ engine repair.",
          "Water pump seal leaking or bearing beginning to wear. Early warning - act now.",
          "Book replacement immediately. A £115-£300 pump replacement now saves a £2,000+ engine repair later.",
          "£115-£300 for auxiliary belt-driven pump. Labour: 2-3 hours at £65-£95/hr.",
          "Pump impeller failing or bearing worn - reduced coolant flow causing intermittent overheating.",
          "Stop driving if overheating. Book replacement immediately. If timing belt driven, consider replacing belt at same time.",
          "£115-£600 for pump replacement. If timing belt pump: £300-£600 including belt kit. Labour: 3-5 hours.",
          "Pump seized - belt may snap, no coolant circulation. Rapid overheating.",
          "Stop driving immediately. Call recovery. Do not attempt to drive further - head gasket damage is imminent.",
          "£300-£700 for pump + belt + possible tow. If overheating damage occurred: £550-£3,500+.",
          "Overheating damage from driving with failed pump. Head gasket failed, cylinder head warped.",
          "Full engine inspection required. Head gasket or cylinder head replacement needed - evaluate vehicle value.",
          "£550-£1,200 for head gasket. £1,200-£3,500 for cylinder head replacement. Labour: 8-16 hours.",
          "Complete engine failure from overheating - pistons seized, bearings failed.",
          "Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap.",
          "£2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Click any stage to see full detail. Acting early is the difference between a £200 repair and a £2,000+ engine repair. £115 Coolant leak (pink/green puddle), slight whining noise Water pump seal leaking or bearing beginning to wear £115 - £300 £200 Overheating in traffic, whining/grinding noise, coolant warning Pump impeller failing or bearing worn - reduced coolant flow £115 - £600 £300 Constant overheating, steam, pump seized, belt snapped Pump seized - no coolant circulation £300 - £700 £550 Head gasket failure (white smoke), warped head Overheating damage from driving with failed pump £550 - £3,500 £6,500+ Engine seized - won't turn over Complete engine failure from overheating £2,500 - £6,500+ Likely cause Water pump seal leaking or bearing beginning to wear. Early warning - act now. What to do Book replacement immediately. A £115-£300 pump replacement now saves a £2,000+ engine repair later. Repair cost £115-£300 for auxiliary belt-driven pump. Labour: 2-3 hours at £65-£95/hr. Likely cause Pump impeller failing or bearing worn - reduced coolant flow causing intermittent overheating. What to do Stop driving if overheating. Book replacement immediately. If timing belt driven, consider replacing belt at same time. Repair cost £115-£600 for pump replacement. If timing belt pump: £300-£600 including belt kit. Labour: 3-5 hours. Likely cause Pump seized - belt may snap, no coolant circulation. Rapid overheating. What to do Stop driving immediately. Call recovery. Do not attempt to drive further - head gasket damage is imminent. Repair cost £300-£700 for pump + belt + possible tow. If overheating damage occurred: £550-£3,500+. Likely cause Overheating damage from driving with failed pump. Head gasket failed, cylinder head warped. What to do Full engine inspection required. Head gasket or cylinder head replacement needed - evaluate vehicle value. Repair cost £550-£1,200 for head gasket. £1,200-£3,500 for cylinder head replacement. Labour: 8-16 hours. Likely cause Complete engine failure from overheating - pistons seized, bearings failed. What to do Do not attempt to restart. Call recovery. Engine replacement is the only option - the block is scrap. Repair cost £2,500-£6,500+ for reconditioned engine replacement. On lower-value vehicles, this often means scrapping the car. Signs of water pump failure"
      },
      {
        "title": "Don't ignore these warning signs",
        "paragraphs": [],
        "bullets": [
          "• Coolant leak from front of engine - pink/green puddle under the car after parking",
          "• Whining or grinding noise from the front of the engine",
          "• Coolant level dropping slowly with no visible leak elsewhere",
          "• Temperature gauge rising higher than normal, especially in traffic",
          "• Overheating that doesn't improve - gauge enters red zone",
          "• Steam coming from under the bonnet",
          "• Grinding or rattling noise from water pump area",
          "• Coolant warning light illuminated",
          "• Auxiliary belt snapped (pump seized)"
        ],
        "tables": [],
        "additionalText": "🔶 EARLY WARNING (Book replacement soon) • Coolant leak from front of engine - pink/green puddle under the car after parking • Whining or grinding noise from the front of the engine • Coolant level dropping slowly with no visible leak elsewhere • Temperature gauge rising higher than normal, especially in traffic 🔴 PROGRESSED DAMAGE (Stop driving - book immediately) • Overheating that doesn't improve - gauge enters red zone • Steam coming from under the bonnet • Grinding or rattling noise from water pump area • Coolant warning light illuminated • Auxiliary belt snapped (pump seized) Water pump replacement cost by type"
      },
      {
        "title": "What you should expect to pay",
        "paragraphs": [
          "Cost ranges [INDUSTRY ESTIMATE]. Labour: water pump 2-5 hours at £65-£95/hr indie. Timing belt pump requires belt removal - additional labour is minimal if done together."
        ],
        "bullets": [
          "• New water pump (OEM quality)",
          "• New gasket or seal",
          "• New coolant (full system refill)",
          "• Coolant system bleed",
          "• New water pump",
          "• New timing belt (if not recently changed)",
          "• New tensioner and idler pulleys",
          "• New coolant + system bleed"
        ],
        "tables": [
          {
            "headers": [
              "Pump Type",
              "Typical Cost (Parts + Labour)",
              "Labour Hours",
              "Common Applications"
            ],
            "rows": [
              [
                "Auxiliary belt driven pump",
                "£150 - £300",
                "2 - 3 hrs",
                "Ford EcoBoost, Vauxhall, most petrol engines"
              ],
              [
                "Timing belt driven pump (pump only)",
                "£200 - £400",
                "3 - 5 hrs",
                "VW EA189, Ford DV6, many diesels"
              ],
              [
                "Timing belt driven pump + belt kit",
                "£300 - £600",
                "3 - 5 hrs",
                "VW, Ford, Mercedes, most modern diesels"
              ],
              [
                "Electric water pump",
                "£400 - £700",
                "2 - 4 hrs",
                "BMW, some hybrids, some VAG"
              ],
              [
                "High-performance / V6 / V8",
                "£400 - £1,000",
                "4 - 8 hrs",
                "Land Rover, Jaguar, Audi V6/V8, Mercedes V6/V8"
              ]
            ]
          }
        ],
        "additionalText": "Pump Type Typical Cost (Parts + Labour) Labour Hours Common Applications Auxiliary belt driven pump £150 - £300 2 - 3 hrs Ford EcoBoost, Vauxhall, most petrol engines Timing belt driven pump (pump only) £200 - £400 3 - 5 hrs VW EA189, Ford DV6, many diesels Timing belt driven pump + belt kit £300 - £600 3 - 5 hrs VW, Ford, Mercedes, most modern diesels Electric water pump £400 - £700 2 - 4 hrs BMW, some hybrids, some VAG High-performance / V6 / V8 £400 - £1,000 4 - 8 hrs Land Rover, Jaguar, Audi V6/V8, Mercedes V6/V8 Cost ranges [INDUSTRY ESTIMATE]. Labour: water pump 2-5 hours at £65-£95/hr indie. Timing belt pump requires belt removal - additional labour is minimal if done together. What's included in a proper water pump job Auxiliary belt pump: • New water pump (OEM quality) • New gasket or seal • New coolant (full system refill) • Coolant system bleed Timing belt pump (recommended): • New water pump • New timing belt (if not recently changed) • New tensioner and idler pulleys • New coolant + system bleed Important: On timing belt-driven pumps, the timing belt must be removed to access the pump. The labour to replace the belt at the same time is minimal (an extra 30-60 minutes). Doing them separately doubles your labour cost. Common causes of water pump failure"
      },
      {
        "title": "Why pumps fail",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Cause",
              "How It Happens",
              "Most Common On",
              "Prevention"
            ],
            "rows": [
              [
                "Bearing wear (high mileage)",
                "Pump bearings wear out over time - normal wear",
                "All engines, typically 60k-100k miles",
                "Replace at timing belt interval"
              ],
              [
                "Seal failure (coolant leak)",
                "Coolant corrodes seal - pink/green leak from weep hole",
                "All engines, especially with old coolant",
                "Regular coolant changes (every 3-5 years)"
              ],
              [
                "Impeller failure",
                "Impeller cracks or spins on shaft - no coolant flow",
                "Some engines (see notes)",
                "Replace with quality pump"
              ],
              [
                "Pump seizure",
                "Bearings fail completely - pump locks up, snaps belt",
                "High-mileage, neglected coolant",
                "Replace at first sign of noise or leak"
              ],
              [
                "Coolant contamination",
                "Oil in coolant or incorrect coolant damages seals",
                "Engines with oil cooler failure or wrong coolant",
                "Use correct coolant, fix contamination"
              ],
              [
                "Corrosion",
                "Old coolant becomes acidic - corrodes pump housing",
                "Vehicles with neglected coolant changes",
                "Coolant change every 3-5 years"
              ]
            ]
          }
        ],
        "additionalText": ""
      },
      {
        "title": "Which is better-",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Scenario",
              "Recommended Action",
              "Typical Cost",
              "Reasoning"
            ],
            "rows": [
              [
                "Water pump failed, timing belt recently changed",
                "Replace water pump only",
                "£200 - £400",
                "Belt is still good - avoid unnecessary cost"
              ],
              [
                "Water pump failed, timing belt due or unknown age",
                "Replace pump + full timing belt kit",
                "£300 - £600",
                "Belt is off anyway - labour is the same"
              ],
              [
                "Timing belt due (60k-80k miles), water pump still working",
                "Replace pump + full timing belt kit (preventative)",
                "£300 - £600",
                "Pump may fail before next belt change - do it now"
              ],
              [
                "Water pump leaking but belt new",
                "Replace pump only",
                "£200 - £400",
                "Specialist can refit belt if in good condition"
              ]
            ]
          }
        ],
        "additionalText": "Scenario Recommended Action Typical Cost Reasoning Water pump failed, timing belt recently changed Replace water pump only £200 - £400 Belt is still good - avoid unnecessary cost Water pump failed, timing belt due or unknown age Replace pump + full timing belt kit £300 - £600 Belt is off anyway - labour is the same Timing belt due (60k-80k miles), water pump still working Replace pump + full timing belt kit (preventative) £300 - £600 Pump may fail before next belt change - do it now Water pump leaking but belt new Replace pump only £200 - £400 Specialist can refit belt if in good condition Specialist rule of thumb: \"If you're paying a garage to remove the timing belt to change a water pump, you're already paying for 90% of the labour for a timing belt change. The belt itself costs £30-£80. There is no financial sense to refit an old belt. Replace the belt, tensioner, and water pump as a set. It's the cheapest engine insurance you can buy.\" Red flag engines - known cooling system issues"
      },
      {
        "title": "Engines with known water pump/cooling issues",
        "paragraphs": [
          "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025."
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Based on KNOWN FAILURE PATTERNS and EM_Proprietary_Data_2025. BMW N47D20C 60k-120k 1,450 [EM-VERIFIED] Primary: Timing chain stretch/tensioner failure. Water pump recommended during chain service. Mercedes OM651 80k-150k 1,250 [EM-VERIFIED] Primary: Injector seal failure (Black Death). Water pump inspect during timing chain service. Land Rover 204DTD (Ingenium) 60k-120k 1,150 [EM-VERIFIED] Primary: Timing chain tensioner, EGR cooler leaks. Water pump inspection recommended. Jaguar AJ126 3.0 V6 SC 60k-100k 560 [EM-VERIFIED] Water pump failure, coolant leaks from crossover pipes - well-documented. BMW B58B30 60k-100k 540 [EM-VERIFIED] Coolant leaks (expansion tank, water pump, plastic fittings) - well-understood. VW/Audi EA189 2.0 TDI 80k-150k 1,050 [EM-VERIFIED] Primary: Injector coking, EGR/DPF. Water pump is timing belt driven - replace at belt interval. Market Intelligence (Timing Chain-Driven Pumps - BMW N47): The N47D20C engine generated 1,450 quote requests in 2025 [EM-VERIFIED n=1,450]. The primary documented failure is timing chain stretch and tensioner failure [KNOWN FAILURE PATTERNS]. When replacing the timing chain (typically £650-£1,800), many specialists recommend replacing the water pump at the same time - the labour to access the pump overlaps significantly. This preventative approach avoids a separate labour charge if the pump fails later. Consequences of delay"
      },
      {
        "title": "How bad can it get-",
        "paragraphs": [
          "Stage Damage Cost to Fix Stage 1 Ignored coolant leak (weep hole) - seal failure £115 - £300 Stage 2 Ignored whining noise - bearings wearing £115 - £300 Stage 3 Ignored intermittent overheating - impeller failing £200 - £600 Stage 4 Driven with failed pump - head gasket, warped head £550 - £3,500 Stage 5 Driven until seizure - engine replacement £2,500 - £6,500+ The maths of ignoring water pump failure: Replace pump proactively (with timing belt): £300-£600. Replace pump when it fails (no belt): £200-£400. Wait until pump seizes (overheating damage): £550-£3,500. Wait until engine seizes: £2,500-£6,500. Preventative maintenance"
        ],
        "bullets": [],
        "tables": [],
        "additionalText": "Stage Damage Cost to Fix Stage 1 Ignored coolant leak (weep hole) - seal failure £115 - £300 Stage 2 Ignored whining noise - bearings wearing £115 - £300 Stage 3 Ignored intermittent overheating - impeller failing £200 - £600 Stage 4 Driven with failed pump - head gasket, warped head £550 - £3,500 Stage 5 Driven until seizure - engine replacement £2,500 - £6,500+ The maths of ignoring water pump failure: Replace pump proactively (with timing belt): £300-£600. Replace pump when it fails (no belt): £200-£400. Wait until pump seizes (overheating damage): £550-£3,500. Wait until engine seizes: £2,500-£6,500. Preventative maintenance"
      },
      {
        "title": "Avoiding water pump failure",
        "paragraphs": [],
        "bullets": [],
        "tables": [
          {
            "headers": [
              "Prevention Method",
              "Cost",
              "Effectiveness",
              "Frequency"
            ],
            "rows": [
              [
                "Replace water pump with timing belt",
                "£30 - £150 extra (parts only)",
                "Very high - labour already paid",
                "Every 60k-80k miles (timing belt interval)"
              ],
              [
                "Coolant change (correct spec)",
                "£50 - £150",
                "High - prevents corrosion and seal failure",
                "Every 3-5 years"
              ],
              [
                "Check coolant level weekly",
                "£0",
                "High - catches slow leaks early",
                "Weekly or before long journeys"
              ],
              [
                "Look for pink/green puddles",
                "£0",
                "Medium - visual inspection",
                "Regular parking spot check"
              ],
              [
                "Listen for whining noise",
                "£0",
                "Medium - bearing wear is audible",
                "When engine is running"
              ]
            ]
          }
        ],
        "additionalText": "Prevention Method Cost Effectiveness Frequency Replace water pump with timing belt £30 - £150 extra (parts only) Very high - labour already paid Every 60k-80k miles (timing belt interval) Coolant change (correct spec) £50 - £150 High - prevents corrosion and seal failure Every 3-5 years Check coolant level weekly £0 High - catches slow leaks early Weekly or before long journeys Look for pink/green puddles £0 Medium - visual inspection Regular parking spot check Listen for whining noise £0 Medium - bearing wear is audible When engine is running Specialist rule of thumb (UK): \"On any car with a timing belt, do the water pump at the same time. The belt is off anyway. The pump costs £50-£150. The labour to go back in later is £300-£500. Doing it together is the definition of cheap insurance.\" Frequently asked questions"
      }
    ],
    "faqs": [
      {
        "question": "How much does water pump replacement cost in the UK",
        "answer": "Auxiliary belt-driven pump: £150-£300 fitted. Timing belt-driven pump (pump only): £200-£400. Pump + timing belt kit: £300-£600. Electric pump: £400-£700. Labour: 2-5 hours at £65-£95/hr (independent). → Water pump replacement cost guide"
      },
      {
        "question": "What are the signs of a failing water pump",
        "answer": "Coolant leak (pink/green puddle under front of car), whining or grinding noise from engine front, overheating (especially in traffic), coolant warning light, steam from bonnet."
      },
      {
        "question": "Can I drive with a leaking water pump",
        "answer": "If the leak is very small (drops, not puddles) and the engine isn't overheating, you can drive to a garage. If the pump is noisy or the engine is overheating, stop driving immediately - the pump may seize or fail completely, causing rapid overheating and engine damage."
      },
      {
        "question": "Should I replace the water pump when doing the timing belt",
        "answer": "Yes. On timing belt-driven pumps, the belt must be removed to access the pump. The additional labour to replace the pump is minimal (30-60 minutes). The pump itself costs £50-£150. Doing it separately later costs £300-£500 in labour alone. It is false economy to skip the pump."
      },
      {
        "question": "What causes water pump failure",
        "answer": "Most common: seal failure (coolant leak from weep hole), bearing wear (whining noise, high mileage), impeller failure (varies by engine), or pump seizure (neglected bearing wear). Regular coolant changes and timely replacement prevent failure."
      },
      {
        "question": "Is it worth replacing a water pump on an old car",
        "answer": "If your car is worth £2,000-£4,000 and the pump has failed, a £150-£400 repair is almost always worth it - a replacement car would cost far more. If the car has already overheated and the head is warped (£1,200-£3,500), evaluate scrap value first. → Repair vs replacement guide"
      },
      {
        "question": "Which engines have the most water pump problems",
        "answer": "Based on Engines Market enquiry volumes, BMW N47D20C (1,450 requests), Mercedes OM651 (1,250), Land Rover 204DTD (1,150), and VW/Audi EA189 (1,050) are among the most frequently requested diesel engines. Water pump issues are one of several cooling-system faults specialists may investigate. [EM-VERIFIED]"
      }
    ]
  }
};
