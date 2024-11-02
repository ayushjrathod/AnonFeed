import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { success: false, message: "You need to be logged in to get your messages" },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    //aggregation pipline
    const user = await UserModel.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]);
    if (!user || user.length === 0) {
      return NextResponse.json({ success: false, message: "failed to get messages" }, { status: 500 });
    }
    return NextResponse.json({ success: true, messages: user[0].messages }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: "failed to get messages" }, { status: 500 });
  }
}
