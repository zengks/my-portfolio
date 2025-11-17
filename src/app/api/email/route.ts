import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { name, email, message } = body;

	if (!name || !email || !message) {
		return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
	}

	const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
	const SERVICE_ID = process.env.EMAILJS_OUTLOOK_SERVICE_ID;
	const TEMPLATE_ID = process.env.EMAILJS_OUTLOOK_TEMPLATE_ID;
	const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

	if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID || !PRIVATE_KEY) {
		return NextResponse.json({ message: 'Missing EmailJS Credentials' }, { status: 500 });
	}

	const data = {
		service_id: SERVICE_ID,
		template_id: TEMPLATE_ID,
		user_id: PUBLIC_KEY,
		template_params: {
			name: name,
			email: email,
			message: message,
		},
		accessToken: PRIVATE_KEY,
	};

	try {
		const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
		} else {
			const errorText = await response.text();
			return NextResponse.json(
				{ message: `Failed to send email: ${errorText}` },
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: 'An error occurred while sending the email.' },
			{ status: 500 }
		);
	}
}
