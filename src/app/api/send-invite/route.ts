// app/api/send-invite/route.ts
import { NextResponse } from "next/server";
import { sendInviteEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, documentTitle, permission, senderName } = body;

    await sendInviteEmail({ to, documentTitle, permission, senderName });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
