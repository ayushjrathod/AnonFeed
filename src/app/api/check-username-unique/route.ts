import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server"; // Correct import
import { z } from "zod";

const usernameQuerySchema = z.object({ username: usernameValidation });

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return NextResponse.json(
        // Use NextResponse
        {
          success: false,
          message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "username already taken",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "username avaliable",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error checking username: ", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 } // Correct status code for error
    );
  }
}
