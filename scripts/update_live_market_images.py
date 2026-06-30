#!/usr/bin/env python3
"""Update Live Market Prices section images and alt text in brand JSON files."""

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRANDS_DIR = ROOT / "data" / "brands"
IMAGE_DIR = ROOT / "public" / "brand-wcu"

BRAND_UPDATES = {
    "alfa-romeo": {
        "file": "Alfa-Romeo-engines-replacement-UK.webp",
        "alt": "Alfa Romeo replacement engines UK – reconditioned engines for Giulia, Stelvio, Giulietta and Mito models with 2.2 JTDm diesel engine prices from £2,500-£4,500, 1.4 MultiAir from £1,000-£2,000 and 1.6 JTDm from £1,200-£2,200",
    },
    "aston-martin": {
        "file": "Aston-Martin-engines-replacement-UK.webp",
        "alt": "Aston Martin replacement engines UK – reconditioned engines for DB9, DBX, Vantage and Virage models with 5.9 V12 engine prices from £4,500-£5,400, 4.0 V8 M177 from £8,000-£14,000 and 4.3 V8 from £4,000-£8,000",
    },
    "audi": {
        "file": "Audi-engines-replacement-UK.webp",
        "alt": "Audi replacement engines UK – reconditioned engines for A4 B9, Q5 FY, A3 8V and A6 C7 models with EA189 2.0 TDI engine prices from £2,200-£3,800, EA288 2.0 TDI from £2,800-£4,500 and EA888 Gen3 2.0 TSI from £2,000-£3,800",
    },
    "bentley": {
        "file": "Bentley-engines-replacement-UK.webp",
        "alt": "Bentley replacement engines UK – reconditioned engines for Continental GT, Flying Spur, Bentayga and Mulsanne models with BR6 W12 engine prices from £6,500-£12,000, BR7 V8 from £3,900-£5,300 and AJ136 4.0 V8 from £8,200-£9,800",
    },
    "bmw": {
        "file": "BMW-engines-replacement-UK.webp",
        "alt": "BMW replacement engines UK – reconditioned engines for 3 Series F30, X5 F15, M3 S63B44 and Z4 G29 B58B30 models with N47D20C engine prices from £1,800-£3,200, B47D20A from £1,500-£2,800 and N57D30 from £2,500-£4,500",
    },
    "cadillac": {
        "file": "Cadillac-engines-replacement-UK.webp",
        "alt": "Cadillac replacement engines UK – reconditioned engines for ATS, STS-V, CTS and Escalade models with LTG 2.0 engine prices from £2,265-£3,111, LC3 4.4 from £251-£500 and 3.6 V6 LGX from £1,800-£3,500",
    },
    "chevrolet": {
        "file": "Chevrolet-engines-replacement-UK.webp",
        "alt": "Chevrolet replacement engines UK – reconditioned engines for Cruze, Orlando, Captiva and Malibu models with 2.0 VCDi engine prices from £1,000-£2,000, 1.7 VCDi from £900-£1,800 and 3.2 V6 LLT from £1,500-£3,000",
    },
    "chrysler": {
        "file": "Chrysler-engines-replacement-UK.webp",
        "alt": "Chrysler replacement engines UK – reconditioned engines for 300C, Grand Voyager, PT Cruiser and Crossfire models with 3.0 CRD OM642 engine prices from £2,500-£4,500, 5.7 HEMI from £3,000-£6,000 and 2.8 CRD from £2,000-£3,500",
    },
    "citroen": {
        "file": "Citroen-engines-replacement-UK.webp",
        "alt": "Citroën replacement engines UK – reconditioned engines for C4 II, C4 Picasso II, DS3 and C3 III models with DW10 2.0 HDi engine prices from £1,200-£2,200, EP6 1.6 THP from £1,200-£2,200 and 1.2 PureTech from £800-£1,500",
    },
    "dodge": {
        "file": "Dodge-engines-replacement-UK.webp",
        "alt": "Dodge replacement engines UK – reconditioned engines for Dodge Ram, Journey, Challenger and Charger models with 5.7 HEMI engine prices from £3,000-£6,000, 6.7 Cummins from £5,000-£10,000 and 3.6 V6 Pentastar from £2,000-£4,000",
    },
    "ferrari": {
        "file": "Ferrari-engines-replacement-UK.webp",
        "alt": "Ferrari replacement engines UK – reconditioned engines for 488, F8 Tributo, SF90 and 296 GTB models with 3.9 V8 Twin-Turbo engine prices from £10,000-£18,000, 6.5 V12 F140 from £12,000-£22,000 and V6 Hybrid F163 from £10,000-£16,000",
    },
    "fiat": {
        "file": "Fiat-engines-replacement-UK.webp",
        "alt": "Fiat replacement engines UK – reconditioned engines for 500, Punto, Tipo and Panda models with 1.2 FIRE engine prices from £400-£800, 0.9 TwinAir from £800-£1,500 and 1.6 MultiJet from £1,000-£2,000",
    },
    "ford": {
        "file": "Ford-engines-replacement-UK.webp",
        "alt": "Ford replacement engines UK – reconditioned engines for Focus Mk3, Fiesta Mk7, Kuga Mk2 and Mondeo Mk4 models with DV6 1.6 TDCi engine prices from £1,200-£2,200, Duratorq 2.2 TDCi from £1,500-£2,800 and EcoBoost 1.0 from £1,800-£3,200",
    },
    "honda": {
        "file": "Honda-engines-replacement-UK.webp",
        "alt": "Honda replacement engines UK – reconditioned engines for Civic FK, CR-V RW, CR-V RE and Accord CU models with L15B 1.5 VTEC Turbo engine prices from £1,800-£3,200, N22B 2.2 i-DTEC from £1,500-£2,800 and K20Z4 2.0 i-VTEC from £1,500-£3,000",
    },
    "hyundai": {
        "file": "Hyundai-engines-replacement-UK.webp",
        "alt": "Hyundai replacement engines UK – reconditioned engines for Tucson TL, i40 VF, Santa Fe DM and i30 GD models with U2 1.7 CRDi engine prices from £1,200-£2,200, D4HA 2.0 CRDi from £1,500-£2,800 and G4KD 2.0 MPI from £1,000-£2,000",
    },
    "isuzu": {
        "file": "Isuzu-engines-replacement-UK.webp",
        "alt": "Isuzu replacement engines UK – reconditioned engines for D-MAX, Rodeo, Trooper and MU-X models with 3.0 4JJ1 diesel engine prices from £1,500-£3,000, 1.9 RZ4E from £1,200-£2,500 and 2.5 4JK1 from £1,000-£2,200",
    },
    "iveco": {
        "file": "Iveco-engines-replacement-UK.webp",
        "alt": "Iveco replacement engines UK – reconditioned engines for Daily, Turbo Daily, Eurocargo and Stralis models with 2.3 HPI diesel engine prices from £1,500-£3,000, 3.0 HPI from £2,000-£4,000 and 4.5 Tector from £2,000-£4,500",
    },
    "jaguar": {
        "file": "Jaguar-engines-replacement-UK.webp",
        "alt": "Jaguar replacement engines UK – reconditioned engines for XF X260, XE X760, F-Pace X761 and F-Type X152 models with AJ200D 2.0 Diesel engine prices from £3,500-£5,800, AJ126 3.0 V6 SC from £4,500-£7,500 and AJ200P 2.0 Petrol from £3,000-£5,000",
    },
    "jeep": {
        "file": "Jeep-engines-replacement-UK.webp",
        "alt": "Jeep replacement engines UK – reconditioned engines for Wrangler, Grand Cherokee, Cherokee and Compass models with 2.8 CRD engine prices from £2,000-£3,500, 3.0 CRD from £2,500-£4,500 and 3.6 V6 Pentastar from £2,000-£4,000",
    },
    "kia": {
        "file": "Kia-engines-replacement-UK.webp",
        "alt": "Kia replacement engines UK – reconditioned engines for Sportage QL, Sportage SL, Ceed JD and Sorento UM models with U2 1.7 CRDi engine prices from £1,200-£2,200, D4HA 2.0 CRDi from £1,500-£2,800 and G4KD 2.0 MPI from £1,000-£2,000",
    },
    "land-rover": {
        "file": "Land-Rover-engines-replacement-UK.webp",
        "alt": "Land Rover replacement engines UK – reconditioned engines for Discovery Sport L550, Evoque L538, Range Rover L405 and Range Rover Sport L494 models with 204DTD 2.0 Diesel from £3,500-£5,800, 306DT TDV6 from £6,500-£9,500 and 508PS SDV8 from £8,000-£12,000",
    },
    "lexus": {
        "file": "Lexus-engines-replacement-UK.webp",
        "alt": "Lexus replacement engines UK – reconditioned engines for IS, RX, NX and CT models with 2AD-FTV 2.2 D4-D engine prices from £1,200-£2,200, 2GR-FE 3.5 V6 from £2,000-£3,500 and 8AR-FTS 2.0 Turbo from £2,000-£3,500",
    },
    "mazda": {
        "file": "Mazda-engines-replacement-UK.webp",
        "alt": "Mazda replacement engines UK – reconditioned engines for Mazda 3, 6, CX-5 and MX-5 models with SkyActiv-D 2.2 engine prices from £2,000-£4,000, SkyActiv-G 2.0 from £1,500-£3,000 and MZR-CD 2.2 from £1,800-£3,500",
    },
    "mercedes-benz": {
        "file": "Mercedes-Benz-engines-replacement-UK.webp",
        "alt": "Mercedes-Benz replacement engines UK – reconditioned engines for C-Class W205, E-Class W212, GLC X253 and S-Class W222 models with OM651 2.1 Diesel from £1,500-£2,800, OM642 3.0 Diesel from £1,800-£3,200 and OM654 2.0 Diesel from £1,800-£3,200",
    },
    "mg": {
        "file": "MG-engines-replacement-UK.webp",
        "alt": "MG replacement engines UK – reconditioned engines for MG3, MG5, MG ZS and MG HS models with 1.5 VTi engine prices from £600-£1,200, 1.0T from £800-£1,500 and 1.5T from £1,000-£2,000",
    },
    "mini": {
        "file": "MINI-engines-replacement-UK.webp",
        "alt": "MINI replacement engines UK – reconditioned engines for Cooper R56, Cooper F56, Countryman R60 and Clubman R55 models with N12/N14 1.6 from £1,200-£2,500, N47D20 from £3,200-£5,500 and B48B20 from £2,800-£4,500",
    },
    "mitsubishi": {
        "file": "Mitsubishi-engines-replacement-UK.webp",
        "alt": "Mitsubishi replacement engines UK – reconditioned engines for Outlander, ASX, L200 and Shogun models with 2.2 DI-D 4N14 from £1,500-£3,000, 1.8 DI-D from £1,200-£2,500 and 3.2 DI-D from £2,000-£4,000",
    },
    "nissan": {
        "file": "Nissan-engines-replacement-UK.webp",
        "alt": "Nissan replacement engines UK – reconditioned engines for Qashqai J11, Qashqai J10, X-Trail T31 and Juke F15 models with M9R 2.0 dCi from £1,500-£2,800, HR16DE 1.6 from £900-£1,800 and MR20DE 2.0 from £1,000-£2,000",
    },
    "peugeot": {
        "file": "Peugeot-engines-replacement-UK.webp",
        "alt": "Peugeot replacement engines UK – reconditioned engines for 308 II, 3008 I, 508 I and 208 I models with DW10 2.0 HDi from £1,200-£2,200, EP6 1.6 THP from £1,200-£2,200 and 1.2 PureTech from £800-£1,500",
    },
    "porsche": {
        "file": "Porsche-engines-replacement-UK.webp",
        "alt": "Porsche replacement engines UK – reconditioned engines for Cayenne 958, Cayenne 9PA, Macan and Panamera models with EA189 3.0 TDI from £2,200-£3,800, V8 Petrol 958 from £5,000-£8,000 and V6 Petrol 958 from £3,000-£5,000",
    },
    "range-rover": {
        "file": "Range-Rover-engines-replacement-UK.webp",
        "alt": "Range Rover replacement engines UK – reconditioned engines for Range Rover L405, Range Rover Sport L494, Evoque L551 and Velar L560 models with 306DT TDV6 3.0 Diesel from £6,500-£9,500, 508PS SDV8 from £8,000-£12,000 and 204DTD 2.0 Diesel from £3,500-£5,800",
    },
    "renault": {
        "file": "Renault-engines-replacement-UK.webp",
        "alt": "Renault replacement engines UK – reconditioned engines for Megane III, Clio IV, Kadjar and Scenic III models with K9K 1.5 dCi from £1,500-£2,800, M9R 2.0 dCi from £1,500-£2,800 and 1.6 K4M from £500-£1,200",
    },
    "rolls-royce": {
        "file": "Rolls-Royce-engines-replacement-UK.webp",
        "alt": "Rolls-Royce replacement engines UK – reconditioned engines for Phantom, Ghost, Cullinan and Wraith models with 6.75 V12 engine prices from £10,000-£20,000, 6.6 V12 from £8,000-£15,000 and 6.75 V8 from £5,000-£10,000",
    },
    "seat": {
        "file": "SEAT-engines-replacement-UK.webp",
        "alt": "SEAT replacement engines UK – reconditioned engines for Leon, Ibiza, Ateca and Arona models with EA189 2.0 TDI from £2,200-£3,800, EA288 2.0 TDI from £2,800-£4,500 and EA111 1.4 TSI from £1,500-£2,800",
    },
    "skoda": {
        "file": "Skoda-engines-replacement-UK.webp",
        "alt": "Skoda replacement engines UK – reconditioned engines for Octavia III, Superb II, Kodiaq and Fabia III models with EA189 2.0 TDI from £2,200-£3,800, EA288 2.0 TDI from £2,800-£4,500 and EA111 1.4 TSI from £1,500-£2,800",
    },
    "subaru": {
        "file": "Subaru-engines-replacement-UK.webp",
        "alt": "Subaru replacement engines UK – reconditioned engines for Forester, Outback, Levorg and WRX STI models with 2.0D EE20 from £2,000-£4,000, 2.5 EJ253 from £1,800-£3,500 and 2.5 Turbo EJ257 from £3,000-£6,000",
    },
    "suzuki": {
        "file": "Suzuki-engines-replacement-UK.webp",
        "alt": "Suzuki replacement engines UK – reconditioned engines for Swift, Vitara, S-Cross and Ignis models with 1.3 M13A from £400-£800, 1.5 M15A from £500-£1,000 and 1.4 BoosterJet from £1,000-£2,000",
    },
    "toyota": {
        "file": "Toyota-engines-replacement-UK.webp",
        "alt": "Toyota replacement engines UK – reconditioned engines for Avensis T27, RAV4 XA30, Corolla E170 and Hilux models with 2AD-FTV 2.0 D4D from £1,200-£2,200, 1KD-FTV 3.0 D4D from £1,800-£3,500 and 2ZR-FE 1.8 from £1,200-£2,200",
    },
    "vauxhall": {
        "file": "Vauxhall-engines-replacement-UK.webp",
        "alt": "Vauxhall replacement engines UK – reconditioned engines for Astra J, Insignia A, Corsa D and Zafira B models with Z19DTH 1.9 CDTi from £900-£1,800, A20DTH 2.0 CDTi from £1,000-£2,000 and D16DTH 1.6 CDTi from £900-£1,800",
    },
    "volkswagen": {
        "file": "Volkswagen-engines-replacement-UK.webp",
        "alt": "Volkswagen replacement engines UK – reconditioned engines for Passat B8, Golf Mk7, Tiguan Mk1 and T-Roc models with EA189 2.0 TDI from £2,200-£3,800, EA288 2.0 TDI from £2,800-£4,500 and EA888 Gen3 2.0 TSI from £2,000-£3,800",
    },
    "volvo": {
        "file": "Volvo-engines-replacement-UK.webp",
        "alt": "Volvo replacement engines UK – reconditioned engines for XC60, XC90, V60 and S60 models with D5 2.4 from £2,000-£3,500, D4 2.0 from £2,500-£4,000 and T5 2.0 from £2,000-£3,500",
    },
}


def main() -> None:
    updated = []
    missing_images = []
    missing_brand_json = []

    available_images = {p.name for p in IMAGE_DIR.iterdir() if p.is_file()}

    for slug, meta in BRAND_UPDATES.items():
        json_path = BRANDS_DIR / f"{slug}.json"
        if not json_path.exists():
            missing_brand_json.append(slug)
            continue

        if meta["file"] not in available_images:
            missing_images.append((slug, meta["file"]))
            continue

        with json_path.open(encoding="utf-8") as handle:
            data = json.load(handle)

        live = data.setdefault("sections", {}).setdefault("liveMarketPrices", {})
        live["imageSrc"] = f"/brand-wcu/{meta['file']}"
        live["imageAlt"] = meta["alt"]

        with json_path.open("w", encoding="utf-8", newline="\n") as handle:
            json.dump(data, handle, ensure_ascii=False, indent=2)
            handle.write("\n")

        updated.append(slug)

    unused_images = sorted(
        available_images - {meta["file"] for meta in BRAND_UPDATES.values()}
    )
    brands_without_mapping = sorted(
        p.stem
        for p in BRANDS_DIR.glob("*.json")
        if p.stem not in BRAND_UPDATES
    )

    print(f"Updated {len(updated)} brand files.")
    if missing_images:
        print("\nMissing image files:")
        for slug, filename in missing_images:
            print(f"  - {slug}: {filename}")
    if missing_brand_json:
        print("\nBrands in mapping but no JSON file:")
        for slug in missing_brand_json:
            print(f"  - {slug}")
    if brands_without_mapping:
        print("\nBrand JSON files without image mapping:")
        for slug in brands_without_mapping:
            print(f"  - {slug}")
    if unused_images:
        print("\nImages in folder without brand JSON mapping:")
        for filename in unused_images:
            print(f"  - {filename}")


if __name__ == "__main__":
    main()
