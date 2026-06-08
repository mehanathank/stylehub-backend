const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const SendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { data, error } = await resend.emails.send({
            from: 'StyleHub Contact <noreply@resend.dev>',
            to: ['mehanathank06@gmail.com'],
            subject: `StyleHub Contact: ${subject}`,
            html: `
                <div style="font-family:Poppins,sans-serif;max-width:560px;margin:auto;border:1px solid #e0c9a6;border-radius:12px;overflow:hidden">
                    <div style="background:#8b4513;padding:24px;text-align:center">
                        <h2 style="color:#fff;margin:0;font-family:Georgia,serif">StyleHub</h2>
                        <p style="color:#e0c9a6;margin:4px 0 0 0;font-size:14px">New Contact Message</p>
                    </div>
                    <div style="padding:32px">
                        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                            <tr>
                                <td style="padding:10px 0;color:#888;font-size:14px;width:80px">From</td>
                                <td style="padding:10px 0;color:#333;font-size:14px;font-weight:600">${name}</td>
                            </tr>
                            <tr style="border-top:1px solid #f0e0d0">
                                <td style="padding:10px 0;color:#888;font-size:14px">Email</td>
                                <td style="padding:10px 0;color:#333;font-size:14px">${email}</td>
                            </tr>
                            <tr style="border-top:1px solid #f0e0d0">
                                <td style="padding:10px 0;color:#888;font-size:14px">Subject</td>
                                <td style="padding:10px 0;color:#333;font-size:14px">${subject}</td>
                            </tr>
                        </table>
                        <div style="background:#fdf6ee;border-left:4px solid #8b4513;padding:16px;border-radius:4px">
                            <p style="color:#555;font-size:14px;margin:0;line-height:1.7">${message}</p>
                        </div>
                        <p style="color:#aaa;font-size:12px;margin-top:24px">
                            Reply directly to this email to respond to ${name} at ${email}
                        </p>
                    </div>
                </div>
            `,
            reply_to: email
        });

        if (error) {
            console.error('Contact email error:', error);
            return res.status(500).json({ message: 'Failed to send message. Please try again.' });
        }

        console.log('Contact message sent:', data.id);
        res.status(200).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error('SendContactMessage error:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again.' });
    }
};

module.exports = { SendContactMessage };