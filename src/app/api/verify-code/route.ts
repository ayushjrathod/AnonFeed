import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Parse and validate the request body
    const { username, code } = await request.json();
    const user = await UserModel.findOne({
      username,
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }
    const currentDate = new Date();

    // Check if the code matches and is not expired
    if (user.verifyCode !== code || user.verifyCodeExpiry < currentDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired verification code",
        },
        {
          status: 400,
        }
      );
    }

    // Update the user's verification status
    user.isVerified = true;
    //user.verifyCode = "";
    // user.verifyCodeExpiry = "";
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User verified successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error verifying code: ", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error verifying code",
      },
      {
        status: 500,
      }
    );
  }
}
