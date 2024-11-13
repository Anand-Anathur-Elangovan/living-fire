import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Configure the SMTP transport using SiteGround's SMTP settings
        let transporter = nodemailer.createTransport({
            host: 'smtp.siteground.net',
            port: 465,
            secure: true,
            auth: {
                user: 'systems@paulagnewdesigns.com',
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: 'systems@paulagnewdesigns.com',
            to: 'systems@paulagnewdesigns.com',
            subject: `Service Booking from ${name}`,
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
