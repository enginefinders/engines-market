import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
  from: process.env.SMTP_FROM_EMAIL,
  to: process.env.SMTP_TO_EMAIL,
  subject: 'New Quote Request - enginesmarket.co.uk',

  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
      
      <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 20px; color: #0A0A0A;">
        New Quote Request
      </h1>

      <p><b>Name:</b> ${data.fullName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Postcode:</b> ${data.postcode}</p>
      <p><b>Additional Note:</b> ${data.remarks}</p>
      <p><b>Make:</b> ${data.make}</p>
      <p><b>Model:</b> ${data.model}</p>
      <p><b>VRM:</b> ${data.registrationNumber}</p>
      <p><b>Fuel Type:</b> ${data.fuelType}</p>
      <p><b>Engine Title:</b> ${data.engineCode}</p>
      <p><b>Engine Size:</b> ${data.engineCapacity}L</p>
      <p><b>Year:</b> ${data.year}</p>

    </div>
  `,
};
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: 'Email failed' }, { status: 500 });
  }
}