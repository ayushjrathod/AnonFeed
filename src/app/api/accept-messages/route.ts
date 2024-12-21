import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { success: false, message: "You need to be logged in to send a message" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "failed to update user status to accept messages" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "updated user status to accept messages", updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "failed to update user status to accept messages" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { success: false, message: "You need to be logged in to get your message status" },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "failed to get find user and status to accept messages" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "got user status to accept messages", user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "failed to get user status to accept messages" },
      { status: 500 }
    );
  }
}
