import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    application: "AGILE-PMIS",
    environment: process.env.NODE_ENV ?? "unknown",
    timestamp: new Date().toISOString()
  });
}
