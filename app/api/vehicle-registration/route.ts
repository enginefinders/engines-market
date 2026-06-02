import { NextResponse, type NextRequest } from "next/server";

const API_KEY =
  process.env.CHECKCARDETAILS_API_KEY ?? process.env.API_KEY ?? "b627ac2f1dfb771559815c03e3161e91";
const BASE_URL =
  process.env.CHECKCARDETAILS_BASE_URL ??
  process.env.BASE_URL ??
  "https://api.checkcardetails.co.uk/vehicledata/vehicleregistration";

type VehicleRegistrationData = {
  registrationNumber: string;
  year: string;
  make: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  color: string;
  wheelplan: string;
};

function cleanRegistration(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringifyField(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function findField(source: unknown, keys: string[]): unknown {
  if (!isRecord(source)) return undefined;

  const normalizedKeys = keys.map((key) => key.toLowerCase());

  for (const [key, value] of Object.entries(source)) {
    if (normalizedKeys.includes(key.toLowerCase())) {
      return value;
    }
  }

  for (const value of Object.values(source)) {
    if (isRecord(value)) {
      const match = findField(value, keys);
      if (match !== undefined) return match;
    }
  }

  return undefined;
}

function normalizeVehicleData(raw: unknown, fallbackRegistration: string): VehicleRegistrationData {
  return {
    registrationNumber:
      stringifyField(findField(raw, ["registrationNumber", "registration", "regNumber", "vrm"])) ||
      fallbackRegistration,
    year: stringifyField(findField(raw, ["yearOfManufacture", "year", "manufactureYear"])),
    make: stringifyField(findField(raw, ["make"])),
    model: stringifyField(findField(raw, ["model"])),
    fuelType: stringifyField(findField(raw, ["fuelType", "fuel"])),
    engineCapacity: stringifyField(findField(raw, ["engineCapacity", "engineSize", "cc"])),
    color: stringifyField(findField(raw, ["colour", "color"])),
    wheelplan: stringifyField(findField(raw, ["wheelplan", "wheelPlan"])),
  };
}

export async function GET(request: NextRequest) {
  const registrationNumber = cleanRegistration(request.nextUrl.searchParams.get("registrationNumber") ?? "");

  if (!registrationNumber) {
    return NextResponse.json({ error: "Registration number is required." }, { status: 400 });
  }

  const lookupUrl = new URL(BASE_URL);
  lookupUrl.searchParams.set("apikey", API_KEY);
  lookupUrl.searchParams.set("registrationNumber", registrationNumber);
  lookupUrl.searchParams.set("vrm", registrationNumber);

  const response = await fetch(lookupUrl, {
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY,
    },
    cache: "no-store",
  });

  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Vehicle lookup failed.",
        details: typeof payload === "string" ? payload : undefined,
      },
      { status: response.status },
    );
  }

  const vehicle = normalizeVehicleData(payload, registrationNumber);

  if (!vehicle.make && !vehicle.model) {
    return NextResponse.json({ error: "No vehicle details found for this registration." }, { status: 404 });
  }

  return NextResponse.json({ vehicle });
}
