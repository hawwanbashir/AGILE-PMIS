import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lgas = await prisma.lga.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    return NextResponse.json(lgas);
  } catch (error) {
    console.error("Error loading LGAs:", error);

    return NextResponse.json(
      { error: "Unable to load LGAs" },
      { status: 500 }
    );
  }
}