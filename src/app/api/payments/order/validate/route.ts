import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface ValidatePaymentBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ValidatePaymentBody = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { msg: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest('hex');

    if (digest !== razorpay_signature) {
      return NextResponse.json(
        { msg: 'Transaction is not legit!' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      msg: 'success',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error('Payment validation error:', err);
    return NextResponse.json(
      { msg: 'Error validating payment' },
      { status: 500 }
    );
  }
}