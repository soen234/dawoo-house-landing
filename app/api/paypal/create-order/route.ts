import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Use production PayPal API
const PAYPAL_API_BASE = 'https://api-m.paypal.com';

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET_KEY;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_SECRET_KEY in your environment variables.');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('PayPal OAuth error:', {
      status: response.status,
      statusText: response.statusText,
      error: data.error,
      error_description: data.error_description,
      apiBase: PAYPAL_API_BASE
    });
    throw new Error(`PayPal authentication failed: ${data.error_description || data.error || 'Unknown error'}. Please verify your PayPal app is active in the sandbox dashboard.`);
  }

  if (!data.access_token) {
    throw new Error('PayPal access token not received');
  }

  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', description } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description || 'Da-woo House Reservation',
        },
      ],
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    if (!response.ok) {
      const errorDetails = order.details
        ? order.details.map((d: any) => d.description || d.issue).join(', ')
        : order.message || 'Unknown error';
      throw new Error(`PayPal order creation failed: ${errorDetails}`);
    }

    return NextResponse.json({
      orderID: order.id,
    });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create PayPal order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
