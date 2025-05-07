const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');

// ✅ Setup Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, rideId } = req.body;

    console.log("Received amount in backend:", amount);
    console.log("Received rideId in backend:", rideId);

    const options = {
      amount: parseInt(amount) * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);

    await rideModel.findByIdAndUpdate(rideId, {
      orderId: order.id
    });

    res.status(200).json(order);
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify payment and notify
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      rideId
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      const ride = await rideModel.findByIdAndUpdate(rideId, {
        paymentID: razorpay_payment_id,
        signature: razorpay_signature,
        isPaid: true
      }, { new: true }).populate('user').populate('captain');

      // Emit success event to both user and captain
      if (ride?.user?.socketId) {
        sendMessageToSocketId(ride.user.socketId, {
          event: 'payment-success',
          data: ride
        });
      }

      if (ride?.captain?.socketId) {
        sendMessageToSocketId(ride.captain.socketId, {
          event: 'payment-success',
          data: ride
        });
      }

      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error('Verification Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
