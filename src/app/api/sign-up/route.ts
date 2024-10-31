import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const exsistingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (exsistingUserVerifiedByUsername) {
      return Response.json(
        {
          sucess: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const exsistingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (exsistingUserByEmail) {
      if (exsistingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        exsistingUserByEmail.password = hashedPassword;
        exsistingUserByEmail.verifyCode = verifyCode;
        exsistingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await exsistingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    //sending verification mail
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);

    if (!emailResponse) {
      return Response.json({ success: false, message: emailResponse.message }, { status: 500 });
    }

    return Response.json(
      {
        success: true,
        message: "user registered sucessfull. Please Check and Verify your email.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error regestring user: ", err);
    return Response.json(
      {
        suceess: false,
        message: "Error registring user",
      },
      {
        status: 500,
      }
    );
  }
}
