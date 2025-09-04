import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
 // Log the request body for debugging
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
      from: "anandanathurelangovan94@gmail.com",
      to: [
        "systems@paulagnewdesigns.com",
        "info@livingfire.com.au",
        "nma@livingfire.com.au",
      ],
      subject: `LivingFire - ${serviceName} from ${body.userName || "Unknown"}`,
      text: `
Service Name: ${body.serviceName || "N/A"}
Product: ${body.product || "N/A"}
Name: ${body.userName || "N/A"}
Phone: ${body.phone || "N/A"}
Email: ${body.email || "N/A"}
Message: ${body.message || "No message content"}
  `.trim(),
    };

    // Email to the user (acknowledgement email)
    const userMailOptions = {
      from: "anandanathurelangovan94@gmail.com", // From address
      to: body.email, // Send to the email from the body
      subject: "LivingFire - Acknowledgement of Your Enquiry",
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
