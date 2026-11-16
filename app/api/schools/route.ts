
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Retrieve all registered schools
export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        lga: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Schools GET error:", error);

    return NextResponse.json(
      { error: "Failed to retrieve schools" },
      { status: 500 }
    );
  }
}

// POST: Register a new school
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      schoolCode,
      lgaId,
      community,
      schoolType,
      latitude,
      longitude,
    } = body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof schoolCode !== "string" ||
      !schoolCode.trim() ||
      typeof lgaId !== "string" ||
      !lgaId.trim()
    ) {
      return NextResponse.json(
        { error: "School name, school code and LGA are required." },
        { status: 400 }
      );
    }

    const school = await prisma.school.create({
      data: {
        name: name.trim(),
        schoolCode: schoolCode.trim(),
        lgaId: lgaId.trim(),
        community: community?.trim() || null,
        schoolType: schoolType?.trim() || null,
        latitude:
          latitude === "" || latitude == null
            ? null
            : Number(latitude),
        longitude:
          longitude === "" || longitude == null
            ? null
            : Number(longitude),
      },
      include: {
        lga: true,
      },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (error: any) {
    console.error("Schools POST error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This school code already exists." },
        { status: 409 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "The selected LGA does not exist." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to register school." },
      { status: 500 }
    );
  }
}
