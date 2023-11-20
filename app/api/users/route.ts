import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const userData = body.formData;

    if (!userData?.email || !userData?.password) {
      return NextResponse.json(
        {message: "All fields are required."},
        {status: 400}
      );
    }

    //! check if user
    const duplicate = false;
    if (duplicate) {
      return NextResponse.json(
        {message: "This email already registered."},
        {status: 400}
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    //! save user

    return NextResponse.json({message: "User created."}, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: "Something went wrong.", error},
      {status: 500}
    );
  }
}
