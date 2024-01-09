import React, { useState, useEffect } from 'react';

const AddCustomerPopup = ({ onAdd, onClose }) => {
    const [newCustomer, setNewCustomer] = useState({ name: '', contactEmail: '', address: '', phone: '' });

    const handleChange = (e) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd(newCustomer);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Edit Customer</h3>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input type="text" name="name" value={newCustomer.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Contact Email</label>
                    <input type="email" name="contactEmail" value={newCustomer.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Address</label>
                    <input type="text" name="address" value={newCustomer.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Phone</label>
                    <input type="text" name="phone" value={newCustomer.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className='flex flex-row'>
                    <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                    <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const DeleteCustomerPopup = ({ customerId, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p>Are you sure you want to delete this customer?</p>
                <div className='flex flex-row'>
                    <button onClick={() => onDelete(customerId)} className='rounded-md mr-2 bg-red-500 text-white my-2'>Delete</button>
                    <button onClick={onClose} className='rounded-md bg-gray-300 text-black my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const UpdateCustomerPopup = ({ customer, onUpdate, onClose }) => {
    const [updatedCustomer, setUpdatedCustomer] = useState({ ...customer });

    const handleChange = (e) => {
        setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(updatedCustomer);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold">Add Customer</h3>
            <div className="mb-4">
                <label className="block">Name</label>
                <input type="text" name="name" value={updatedCustomer.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Contact Email</label>
                <input type="email" name="contactEmail" value={updatedCustomer.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Address</label>
                <input type="text" name="address" value={updatedCustomer.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Phone</label>
                <input type="text" name="phone" value={updatedCustomer.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className='flex flex-row'>
                <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
            </div>
          </div>
        </div>
      );
};

const CustomersPanel = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);

  const handleDelete = (customerId) => {
      fetch(`http://localhost:8080/customer/delete/${customerId}`, { method: 'DELETE' })
          .then(() => {
              setCustomers(customers.filter(customer => customer.customerID !== customerId));
              setDeletingCustomerId(null);
          })
          .catch(error => setError(error));
  };

  useEffect(() => {
    fetch('http://localhost:8080/customer/all')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => setError(error));
  }, []);

  const handleUpdate = (updatedCustomer) => {
    fetch(`http://localhost:8080/customer/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer)
    })
    .then(response => response.json())
    .then(() => {
        setCustomers(customers.map(customer => customer.customerID === updatedCustomer.customerID ? updatedCustomer : customer));
        setEditingCustomer(null);
    })
    .catch(error => setError(error));
};

  const handleAdd = (newCustomer) => {
    fetch('http://localhost:8080/customer/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
    .then(response => response.json())
    .then(addedCustomer => {
        setCustomers([...customers, addedCustomer]);
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
            <th className="px-4">Name</th>
            <th className="px-4">Contact Email</th>
            <th className="px-4">Address</th>
            <th className="px-4">Phone</th>
            <th className="px-4">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-stone-900'>
          {customers.map(customer => (
            <tr key={customer.customerID} className="text-white">
              <td className="px-4">{customer.firstName} {customer.lastName}</td>
              <td className="px-4">{customer.email}</td>
              <td className="px-4">{customer.address}</td>
              <td className="px-4">{customer.phone}</td>
              <td>
                <button onClick={() => setEditingCustomer(customer)} className=" my-2 mr-2 rounded-md button-light">Update</button>
                <button onClick={() => setDeletingCustomerId(customer.customerID)} className="my-2 rounded-md bg-red-500 text-white text-xxl mr-2">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCustomer != null && <UpdateCustomerPopup customer={editingCustomer} onUpdate={handleUpdate} onClose={() => setEditingCustomer(null)} />}
      {deletingCustomerId != null && <DeleteCustomerPopup customerId={deletingCustomerId} onDelete={handleDelete} onClose={() => setDeletingCustomerId(null)} />}
      {showAddPopup && <AddCustomerPopup onAdd={handleAdd} onClose={() => setShowAddPopup(false)} />}
    </div>
        <button onClick={() => setShowAddPopup(true)}  className='rounded-md px-4 py-2 button-light mt-8'>Add Customer</button>
    </div>
    
  );
};

export default CustomersPanel;
