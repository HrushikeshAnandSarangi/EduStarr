import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const options = await request.json();
    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}