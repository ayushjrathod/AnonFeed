import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const usernameQuerySchema = z.object({ username: usernameValidation });

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
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
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "username avaliable",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("error checking username", err);
    return Response.json(
      {
        succues: true,
        message: "error  checking username",
        err,
      },
      {
        status: 500,
      }
    );
  }
}
