import nodemailer from 'nodemailer'

// Initialize Nodemailer transporter
// We recommend using Gmail with an App Password for EMAIL_PASS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendConfirmationEmail = async (to: string, subject: string, text: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured. Mocking Email message:')
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${text}`)
    return { success: true, mocked: true }
  }

  try {
    const info = await transporter.sendMail({
      from: `"Utsavya" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending Email message:', error)
    return { success: false, error: String(error) }
  }
}
