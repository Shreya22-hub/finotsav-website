import twilio from 'twilio'

// Initialize Twilio client
// We use process.env to load credentials securely
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886' // default twilio sandbox number

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export const sendWhatsAppMessage = async (to: string, message: string) => {
  if (!client) {
    console.log('Twilio credentials not configured. Mocking WhatsApp message:')
    console.log(`To: ${to}`)
    console.log(`Message: ${message}`)
    return { success: true, mocked: true }
  }

  try {
    // Format the number if it doesn't have the whatsapp: prefix or + country code
    // Assuming Indian numbers primarily if no country code provided
    let formattedNumber = to
    if (!formattedNumber.startsWith('+')) {
      formattedNumber = '+91' + formattedNumber // default to India
    }
    if (!formattedNumber.startsWith('whatsapp:')) {
      formattedNumber = 'whatsapp:' + formattedNumber
    }

    const response = await client.messages.create({
      body: message,
      from: twilioWhatsAppNumber,
      to: formattedNumber
    })

    return { success: true, messageId: response.sid }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return { success: false, error: String(error) }
  }
}
