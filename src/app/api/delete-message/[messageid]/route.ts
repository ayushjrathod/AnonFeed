import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserModel } from "@/model/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { messageid: string } }) {
  const messageId = params.messageid;

  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { success: false, message: "You need to be logged in to get your messages" },
      { status: 401 }
    );
  }

  try {
    const result = await UserModel.updateOne({ _id: user._id }, { $pull: { messages: { _id: messageId } } });
    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "An error occurred deleteing message" }, { status: 500 });
  }
}
