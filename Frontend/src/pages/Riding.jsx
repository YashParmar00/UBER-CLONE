import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Custom Payment Success Popup
const PaymentSuccessPopup = ({ message, onClose }) => {
  const [timer, setTimer] = useState(3); // Countdown for 3 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/home'); // Redirect to the home page after timeout
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="popup-container fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-content bg-white p-6 rounded-lg shadow-lg">
        <div className="text-xl font-bold">{message}</div>
        <div className="mt-4 text-sm">The page will auto-close in {timer} seconds...</div>
        <button
          onClick={() => {
            clearInterval();
            navigate('/home'); // Close the popup and redirect to home on OK click
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');

  // Listen for the "ride-ended" event from the server
  socket.on('ride-ended', () => {
    navigate('/home');
  });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      setVerifyMessage('❌ Razorpay SDK failed to load.');
      setPaymentVerified(true);
      return;
    }

    try {
      const orderRes = await fetch('https://uber-clone-vee3.onrender.com/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: ride.fare, rideId: ride._id }),
      });

      const order = await orderRes.json();
      console.log('Order:', order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mPu3WmxDp0lFDJ',
        amount: order.amount,
        currency: order.currency,
        name: 'Uber Clone',
        description: 'Ride Payment',
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch('https://uber-clone-vee3.onrender.com/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rideId: ride._id,
              ...response,
            }),
          });

          const verify = await verifyRes.json();

          if (verify.success) {
            setVerifyMessage('✅ Payment successful!');
            setPaymentVerified(true);
          } else {
            setVerifyMessage('❌ Payment verification failed!');
            setPaymentVerified(true);
          }
        },
        prefill: {
          name: ride?.user?.fullname?.firstname || 'User',
          email: 'test@example.com',
          contact: '',
        },
        theme: { color: '#0f9d58' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation error:', err);
      setVerifyMessage('❌ Something went wrong while initiating payment.');
      setPaymentVerified(true);
    }
  };

  return (
    <div className="h-screen">
      <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className="h-1/2">
        <LiveTracking />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-12" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Make a Payment
        </button>
      </div>

      {/* Show PaymentSuccessPopup if payment is verified */}
      {paymentVerified && (
        <PaymentSuccessPopup message={verifyMessage} />
      )}
    </div>
  );
};

export default Riding;
