import React, { useState, useEffect } from 'react';

const AddOrderPopup = ({ onAdd, onClose }) => {
    const [newOrder, setNewOrder] = useState({ name: '', contactEmail: '', address: '', phone: '' });

    const handleChange = (e) => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd(newOrder);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Edit Order</h3>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input type="text" name="name" value={newOrder.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Contact Email</label>
                    <input type="email" name="contactEmail" value={newOrder.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Address</label>
                    <input type="text" name="address" value={newOrder.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Phone</label>
                    <input type="text" name="phone" value={newOrder.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className='flex flex-row'>
                    <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                    <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const DeleteOrderPopup = ({ orderId, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p>Are you sure you want to delete this order?</p>
                <div className='flex flex-row'>
                    <button onClick={() => onDelete(orderId)} className='rounded-md mr-2 bg-red-500 text-white my-2'>Delete</button>
                    <button onClick={onClose} className='rounded-md bg-gray-300 text-black my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

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
                <label className="block">Name</label>
                <input type="text" name="name" value={updatedOrder.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Contact Email</label>
                <input type="email" name="contactEmail" value={updatedOrder.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Address</label>
                <input type="text" name="address" value={updatedOrder.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Phone</label>
                <input type="text" name="phone" value={updatedOrder.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
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
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const handleDelete = (orderId) => {
      fetch(`http://localhost:8080/order/delete/${orderId}`, { method: 'DELETE' })
          .then(() => {
              setOrders(orderdetails.filter(order => order.orderID !== orderId));
              setDeletingOrderId(null);
          })
          .catch(error => setError(error));
  };

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

  const handleAdd = (newOrder) => {
    fetch('http://localhost:8080/orderdetail/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
    })
    .then(response => response.json())
    .then(addedOrder => {
        setOrders([...orderdetails, addedOrder]);
        setShowAddPopup(false);
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
            <tr key={orderdetail.orderID} className="text-white">
              <td className="px-4">{orderdetail.order.orderID}</td>
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
                <button onClick={() => setDeletingOrderId(orderdetail.orderID)} className="my-2 rounded-md bg-red-500 text-white text-xxl mr-2">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingOrder != null && <UpdateOrderPopup order={editingOrder} onUpdate={handleUpdate} onClose={() => setEditingOrder(null)} />}
      {deletingOrderId != null && <DeleteOrderPopup orderId={deletingOrderId} onDelete={handleDelete} onClose={() => setDeletingOrderId(null)} />}
      {showAddPopup && <AddOrderPopup onAdd={handleAdd} onClose={() => setShowAddPopup(false)} />}
    </div>
        <button onClick={() => setShowAddPopup(true)}  className='rounded-md px-4 py-2 button-light mt-8'>Add Order</button>
    </div>
    
  );
};

export default OrdersPanel;
