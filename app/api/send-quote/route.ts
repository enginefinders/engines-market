import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // ==========================================
    // 1. Send Email via Nodemailer
    // ==========================================
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
          ${data.color ? `<p><b>Color:</b> ${data.color}</p>` : ''}
          ${data.wheelplan ? `<p><b>Wheelplan:</b> ${data.wheelplan}</p>` : ''}
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);

    // ==========================================
    // 2. Send Lead to Supabase Webhook
    // ==========================================
    const webhookUrl = process.env.SUPABASE_WEBHOOK_URL || 'https://gfrnxvolaqbfalerfhsr.supabase.co/functions/v1/receive-lead';
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmcm54dm9sYXFiZmFsZXJmaHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjEwNTQsImV4cCI6MjA5MzczNzA1NH0.s9mXoWlIAykCuGlbu9NDZGDRYadRXgpRc0U9PUVCth8';

    // Combine remarks, color, and wheelplan into the description field so no data is lost
    let fullDescription = data.remarks || '';
    if (data.color) fullDescription += `\nColor: ${data.color}`;
    if (data.wheelplan) fullDescription += `\nWheelplan: ${data.wheelplan}`;

    // Map Next.js form fields to the Supabase Edge Function expected payload
    const payload = {
      name: data.fullName || null,
      email: data.email || null,
      number: data.phone || null,
      vehicle_model: data.model || null,
      vehicle_reg: data.year || null,
      vehicle_brand: data.make || null,
      vehicle_title: data.engineCode || null,
      vehicle_vrm: data.registrationNumber || null,
      vehicle_series: data.model || null, 
      vehicle_part: null,
      engine_capacity: data.engineCapacity || null,
      fuel_type: data.fuelType || null,
      part_supplied: null,
      supply_only: null,
      consider_both: null,
      reconditioned_condition: null,
      used_condition: null,
      new_condition: null,
      consider_all_condition: null,
      postcode: data.postcode || null,
      vehicle_drive: null,
      collection_required: null,
      description: fullDescription.trim() || null,
      engine_code: data.engineCode || null,
      source: 'enginesmarket.co.uk' // Pass the source dynamically
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Failed to send lead to Supabase webhook:', errorText);
    } else {
      console.log('Lead successfully sent to Supabase webhook');
    }

    // ==========================================
    // 3. (Optional) Send Lead to CRM Webhook
    // ==========================================
    // Uncomment this if you also need to send to the CRM exactly like your PHP site did
    /*
    const crmWebhookUrl = 'https://crm-api.enginesmarket.co.uk/api/v1/leads';
    const crmResponse = await fetch(crmWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-frontend-url': 'https://enginesmarket.co.uk/', // Update with your actual domain
      },
      body: JSON.stringify(payload),
    });

    if (!crmResponse.ok) {
      console.error('Failed to send lead to CRM:', await crmResponse.text());
    } else {
      console.log('Lead successfully sent to CRM');
    }
    */

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return Response.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}