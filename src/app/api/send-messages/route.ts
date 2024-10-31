import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    if (!user.isAcceptingMessages) {
      return NextResponse.json({ success: false, message: "User is not accepting messages" }, { status: 400 });
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage);
    await user.save();
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: "failed to send message" }, { status: 500 });
  }
}
