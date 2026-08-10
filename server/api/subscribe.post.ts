interface MailchimpErrorResponse {
  title: string
  status: number
  detail: string
}

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email address is required' })
  }

  const config = useRuntimeConfig()
  const { mailchimpApiKey, mailchimpServerPrefix, mailchimpAudienceId } = config

  // Mailchimp uses HTTP Basic Auth: any username + the API key as the password
  const credentials = Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')
  const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`

  try {
    await $fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: { email_address: email, status: 'subscribed' },
    })

    return { success: true, message: 'You're subscribed! Thanks for signing up.' }
  } catch (error: unknown) {
    const body = (error as { data?: MailchimpErrorResponse }).data

    // Mailchimp returns 400 + title "Member Exists" for duplicate emails
    if (body?.title === 'Member Exists') {
      return { success: false, message: 'This email is already subscribed.' }
    }

    throw createError({
      statusCode: 500,
      statusMessage: body?.detail ?? 'Failed to subscribe. Please try again.',
    })
  }
})
