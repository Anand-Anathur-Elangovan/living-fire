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

    // Email options for sending to the admin and the user
    const serviceName = body?.serviceName;

    // Email to the admin
    const adminMailOptions = {
      from: "anandanathurelangovan94@gmail.com", // From address
      to: ["systems@paulagnewdesigns.com", "anandanathurelangovan94@gmail.com", "nma@livingfire.com.au"], // Add multiple recipient emails here
      subject: `Development Test - ${serviceName} from ${body.name || "Unknown"}`,
      text: body?.first_name || "No message content", // Email content
    };

    // Email to the user (acknowledgement email)
    const userMailOptions = {
      from: "anandanathurelangovan94@gmail.com", // From address
      to: body.email, // Send to the email from the body
      subject: "Development Test - Acknowledgement of Your Enquiry",
      text: `Dear ${
        body.name || "Customer"
      },\n\nThank you for your enquiry. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Team`,
    };

    // Send the admin email
    await transporter.sendMail(adminMailOptions);

    // Send the acknowledgement email to the user
    await transporter.sendMail(userMailOptions);

    // Return response using NextResponse
    return NextResponse.json(
      { message: "Emails sent successfully" },
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
