import React, { useState, useEffect } from 'react';

const UpdateOrderPopup = ({ order, onUpdate, onClose }) => {
    const [updatedOrder, setUpdatedOrder] = useState({ ...order });

    const handleChange = (e) => {
        setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(updatedOrder);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold">Add Order</h3>
            <div className="mb-4">
                <label className="block">Contact Email</label>
                <input type="email" name="contactEmail" value={updatedOrder.order.customer.email} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Status</label>
                <select 
                        name="status" 
                        value={updatedOrder.order.status} 
                        onChange={handleChange} 
                        className="w-full px-2 py-1 bg-gray-200 rounded-md"
                    >
                        <option value="status1">Processing</option>
                        <option value="status2">Shipped</option>
                        <option value="status3">Delivered</option>
                    </select>
            </div>
            <div className='flex flex-row'>
                <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
            </div>
          </div>
        </div>
      );
};

const OrdersPanel = () => {
  const [orderdetails, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/orderdetail/all')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => setError(error));
  }, []);

  const handleUpdate = (updatedOrder) => {
    fetch(`http://localhost:8080/orderdetail/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder)
    })
    .then(response => response.json())
    .then(() => {
        setOrders(orderdetails.map(order => order.orderID === updatedOrder.orderID ? updatedOrder : order));
        setEditingOrder(null);
    })
    .catch(error => setError(error));
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full overflow-x-auto">
        <div className="w-full overflow-x-auto shadow-md sm:rounded-lg" style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <table className="w-full text-sm text-left">
        <thead className="text-xl text-black uppercase bg-gray-100">
          <tr>
            <th className="px-4">ID</th>
            <th className="px-4">Customer Name</th>
            <th className="px-4">Phone</th>
            <th className="px-4">Address</th>
            <th className="px-4">Product</th>
            <th className="px-4">Qnt</th>
            <th className="px-4">Price</th>
            <th className="px-4">Date</th>
            <th className="px-4">Status</th>
            <th className="px-4">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-stone-900'>
          {orderdetails.map(orderdetail => (
            <tr key={orderdetail.orderDetailID} className="text-white">
              <td className="px-4">{orderdetail.orderDetailID}</td>
              <td className="px-4">{orderdetail.order.customer.firstName} {orderdetail.order.customer.lastName}</td>
              <td className="px-4">{orderdetail.order.customer.phone}</td>
              <td className="px-4">{orderdetail.order.customer.address}</td>
              <td className="px-4">{orderdetail.product.name}</td>
              <td className="px-4">{orderdetail.quantity}</td>
              <td className="px-4">{orderdetail.price}</td>
              <td className="px-4">{orderdetail.order.orderDate}</td>
              <td className="px-4">{orderdetail.order.status}</td>
              <td>
                <button onClick={() => setEditingOrder(orderdetail)} className=" my-2 mr-2 rounded-md button-light">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingOrder != null && <UpdateOrderPopup order={editingOrder} onUpdate={handleUpdate} onClose={() => setEditingOrder(null)} />}
    </div>
    </div>
    
  );
};

export default OrdersPanel;
