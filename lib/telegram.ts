/**
 * Telegram Bot API utilities
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface TelegramMessageOptions {
  text: string;
  parse_mode?: 'Markdown' | 'HTML';
}

/**
 * Send a message to Telegram
 */
export async function sendTelegramMessage(text: string, parseMode: 'Markdown' | 'HTML' = 'HTML'): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured. Skipping notification.');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    console.log('Telegram message sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

/**
 * Format reservation data for Telegram notification
 */
export function formatReservationMessage(reservation: {
  guest_name: string;
  guest_email?: string | null;
  guest_phone?: string | null;
  check_in: string;
  check_out: string;
  number_of_guests: number;
  total_price: number;
  payment_method?: string | null;
  channel_reservation_id: string;
}): string {
  const lines = [
    '🏨 <b>새로운 예약이 접수되었습니다!</b>',
    '',
    `📋 <b>예약번호:</b> ${reservation.channel_reservation_id}`,
    `👤 <b>고객명:</b> ${reservation.guest_name}`,
  ];

  if (reservation.guest_email) {
    lines.push(`📧 <b>이메일:</b> ${reservation.guest_email}`);
  }

  if (reservation.guest_phone) {
    lines.push(`📱 <b>연락처:</b> ${reservation.guest_phone}`);
  }

  lines.push(
    '',
    `📅 <b>체크인:</b> ${reservation.check_in}`,
    `📅 <b>체크아웃:</b> ${reservation.check_out}`,
    `👥 <b>인원:</b> ${reservation.number_of_guests}명`,
    '',
    `💰 <b>결제금액:</b> $${reservation.total_price.toLocaleString()}`
  );

  if (reservation.payment_method) {
    const paymentMethodKR = {
      'onsite': '현장결제',
      'transfer': '계좌이체',
      'paypal': 'PayPal',
    }[reservation.payment_method] || reservation.payment_method;

    lines.push(`💳 <b>결제방법:</b> ${paymentMethodKR}`);
  }

  return lines.join('\n');
}
