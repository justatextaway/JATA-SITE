// api/feedback.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { name = '', message = '' } = req.body;

  if (!message || message.trim() === '') {
    res.status(400).json({ error: 'Message required.' });
    return;
  }

  // Pull credentials from Vercel Environment Variables
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASS = process.env.ADMIN_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_PASS,
    },
  });

  const mailOptions = {
    from: '"Just a Text Away Forum" <no-reply@justatextaway.com>',
    to: ADMIN_EMAIL,
    subject: "New Forum Feedback",
    text: `${name ? `${name} wrote:` : "Anonymous user wrote:"}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Email failed', detail: err.toString() });
  }
}
