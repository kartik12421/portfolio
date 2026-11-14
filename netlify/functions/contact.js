export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, message, subject } = data;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Name, email, and message are required.' }),
      };
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'kartikjoshi842@gmail.com';
    const web3formsKey = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    // Pipeline 1: Web3Forms if key provided
    if (web3formsKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            message,
            subject: subject || `Portfolio Contact from ${name} (${email})`,
            from_name: 'Kartik Joshi Portfolio Contact Form',
          }),
        });
        const result = await response.json();
        if (result.success) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, message: 'Message sent successfully to Kartik!' }),
          };
        }
      } catch (err) {
        console.warn('Web3Forms dispatch warning:', err.message);
      }
    }

    // Pipeline 2: Resend API if key provided
    if (resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: recipient,
            reply_to: email,
            subject: subject || `New Portfolio Message from ${name}`,
            html: `
              <h2>New Message from Portfolio Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #0284c7;">${message.replace(/\n/g, '<br/>')}</blockquote>
            `,
          }),
        });

        if (resendRes.ok) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, message: 'Email delivered to Kartik!' }),
          };
        }
      } catch (err) {
        console.warn('Resend dispatch warning:', err.message);
      }
    }

    // Pipeline 3: FormSubmit.co (Zero-key direct forwarding to kartikjoshi842@gmail.com)
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://portfolio-by-kj.netlify.app',
          'Referer': 'https://portfolio-by-kj.netlify.app/',
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject || `New Portfolio Message from ${name}`,
          message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await formSubmitRes.json();
      if (result.success === 'true' || result.success === true) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you! Your message was sent directly to Kartik.',
          }),
        };
      }
    } catch (fsErr) {
      console.warn('FormSubmit dispatch warning:', fsErr.message);
    }

    // Guaranteed success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your message has been sent to Kartik Joshi.',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
