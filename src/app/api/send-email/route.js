import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body

    // Configure the SMTP transport using Gmail settings
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "admiatliving.fire@gmail.com", // Replace with your Gmail address
        pass: "pivpqmxxkmnpxyxd", // Use the App Password if 2FA is enabled
      },
    });

    console.log("Received POST request body:", body);

    // Email options for multiple recipients
    const mailOptions = {
      from: "anandanathurelangovan94@gmail.com", // From address
      to: ["systems@paulagnewdesigns.com", "anandanathurelangovan94@gmail.com"], // Add multiple recipient emails here
      subject: `Service Booking from ${body.name || "Unknown"}`,
      text: body?.first_name || "No message content", // Email content
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return response using NextResponse
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
