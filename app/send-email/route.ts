import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const CRM_LEAD_ENDPOINT = "https://crm-api.enginesmarket.co.uk/api/v1/leads";

function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = readString(formData.get("name"));
    const email = readString(formData.get("email"));
    const number = readString(formData.get("number"));
    const postcode = readString(formData.get("postcode"));

    if (!name || !email || !number || !postcode) {
      return NextResponse.json(
        { success: false, message: "Name, email, phone, and postcode are required." },
        { status: 400 },
      );
    }

    const leadData = Object.fromEntries(formData.entries());

    const response = await fetch(CRM_LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-frontend-url": `${SITE_URL}/`,
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CRM lead handoff failed", response.status, errorText);

      return NextResponse.json(
        { success: false, message: "Lead submission failed. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
