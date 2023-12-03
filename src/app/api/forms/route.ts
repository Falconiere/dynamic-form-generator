
import { createForm } from "@/server/database/forms/createForm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await createForm(payload)
    return NextResponse.json(response, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json("error", {
      status: 500,
    })
  }
}