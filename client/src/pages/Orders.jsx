import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const generatePaymentCode = async (orderId) => {
    try {
      const response = await axios.post(`/api/orders/${orderId}/generate-payment-code`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? response.data.order : order))
      );
      toast.success('Payment code generated! Check your email.');
    } catch (error) {
      toast.error('Failed to generate payment code');
    }
  };

  if (loading) return <div className="orders-page"><p>Loading orders...</p></div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders yet</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <span className={`status status-${order.status}`}>{order.status}</span>
                </div>
                <p><strong>Total:</strong> ${order.total_amount.toFixed(2)}</p>
                <p><strong>Created:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                {order.payment_code && (
                  <p><strong>Payment Code:</strong> <code>{order.payment_code}</code></p>
                )}
                {order.status === 'pending' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => generatePaymentCode(order.id)}
                  >
                    Generate Payment Code
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
