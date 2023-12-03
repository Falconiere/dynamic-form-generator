import { getFormById } from "@/server/database/forms/getFormById";
import { updateForm } from "@/server/database/forms/updateForm";
import { NextResponse } from "next/server";

export async function GET(_: Request,  { params }: { params: { id: string } }) {
  try {
    const response = await getFormById(params.id)
    return NextResponse.json(response, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    })
  }
}

export async function PATCH(request: Request,  { params }: { params: { id: string } }) {
  try {
    const payload = await request.json();
    const response = await updateForm(params.id, payload)
    return NextResponse.json(response, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    })
  }
}