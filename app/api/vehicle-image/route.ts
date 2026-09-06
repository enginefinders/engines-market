import { NextResponse, type NextRequest } from "next/server";
import { findCheckoutVehicleImage } from "@/lib/checkoutVehicleImage";

export async function GET(request: NextRequest) {
  const make = request.nextUrl.searchParams.get("make")?.trim() || "";
  const model = request.nextUrl.searchParams.get("model")?.trim() || "";
  const year = request.nextUrl.searchParams.get("year")?.trim() || "";

  if (!make || !model) {
    return NextResponse.json({ image: null });
  }

  return NextResponse.json({ image: findCheckoutVehicleImage(make, model, year) });
}
