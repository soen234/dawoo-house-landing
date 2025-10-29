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
    throw new Error(`PayPal authentication failed: ${data.error_description || data.error || 'Unknown error'}`);
  }

  if (!data.access_token) {
    throw new Error('PayPal access token not received');
  }

  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderID } = body;

    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await response.json();

    if (!response.ok) {
      throw new Error(captureData.message || 'Failed to capture PayPal order');
    }

    return NextResponse.json({
      orderID: captureData.id,
      status: captureData.status,
      payer: captureData.payer,
      purchase_units: captureData.purchase_units,
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      {
        error: 'Failed to capture PayPal order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
