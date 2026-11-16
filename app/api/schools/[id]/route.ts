
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name,
      schoolCode,
      lgaId,
      community,
      schoolType,
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
        { error: "School name, code and LGA are required." },
        { status: 400 }
      );
    }

    const existingSchool = await prisma.school.findUnique({
      where: { id },
    });

    if (!existingSchool) {
      return NextResponse.json(
        { error: "School not found." },
        { status: 404 }
      );
    }

    const updatedSchool = await prisma.school.update({
      where: { id },
      data: {
        name: name.trim(),
        schoolCode: schoolCode.trim(),
        lgaId: lgaId.trim(),
        community: community?.trim() || null,
        schoolType: schoolType?.trim() || null,
      },
      include: {
        lga: true,
      },
    });

    return NextResponse.json(updatedSchool);
  } catch (error: any) {
    console.error("School update error:", error);

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
      { error: "Failed to update school." },
      { status: 500 }
    );
  }
}
// DELETE: Remove a registered school
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingSchool = await prisma.school.findUnique({
      where: { id },
    });

    if (!existingSchool) {
      return NextResponse.json(
        { error: "School not found." },
        { status: 404 }
      );
    }

    await prisma.school.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "School deleted successfully.",
    });
  } catch (error) {
    console.error("School DELETE error:", error);

    return NextResponse.json(
      { error: "Failed to delete school." },
      { status: 500 }
    );
  }
}
