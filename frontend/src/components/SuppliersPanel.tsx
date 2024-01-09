import React, { useState, useEffect } from 'react';

const AddSupplierPopup = ({ onAdd, onClose }) => {
    const [newSupplier, setNewSupplier] = useState({ name: '', contactEmail: '', address: '', phone: '' });

    const handleChange = (e) => {
        setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd(newSupplier);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Edit Supplier</h3>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input type="text" name="name" value={newSupplier.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Contact Email</label>
                    <input type="email" name="contactEmail" value={newSupplier.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Address</label>
                    <input type="text" name="address" value={newSupplier.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Phone</label>
                    <input type="text" name="phone" value={newSupplier.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className='flex flex-row'>
                    <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                    <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const DeleteSupplierPopup = ({ supplierId, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p>Are you sure you want to delete this supplier?</p>
                <div className='flex flex-row'>
                    <button onClick={() => onDelete(supplierId)} className='rounded-md mr-2 bg-red-500 text-white my-2'>Delete</button>
                    <button onClick={onClose} className='rounded-md bg-gray-300 text-black my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const UpdateSupplierPopup = ({ supplier, onUpdate, onClose }) => {
    const [updatedSupplier, setUpdatedSupplier] = useState({ ...supplier });

    const handleChange = (e) => {
        setUpdatedSupplier({ ...updatedSupplier, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(updatedSupplier);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold">Add Supplier</h3>
            <div className="mb-4">
                <label className="block">Name</label>
                <input type="text" name="name" value={updatedSupplier.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Contact Email</label>
                <input type="email" name="contactEmail" value={updatedSupplier.contactEmail} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Address</label>
                <input type="text" name="address" value={updatedSupplier.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Phone</label>
                <input type="text" name="phone" value={updatedSupplier.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className='flex flex-row'>
                <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
            </div>
          </div>
        </div>
      );
};

const SuppliersPanel = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [deletingSupplierId, setDeletingSupplierId] = useState(null);

  const handleDelete = (supplierId) => {
      fetch(`http://localhost:8080/supplier/delete/${supplierId}`, { method: 'DELETE' })
          .then(() => {
              setSuppliers(suppliers.filter(supplier => supplier.supplierID !== supplierId));
              setDeletingSupplierId(null);
          })
          .catch(error => setError(error));
  };

  useEffect(() => {
    fetch('http://localhost:8080/supplier/all')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => setError(error));
  }, []);

  const handleUpdate = (updatedSupplier) => {
    fetch(`http://localhost:8080/supplier/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSupplier)
    })
    .then(response => response.json())
    .then(() => {
        setSuppliers(suppliers.map(supplier => supplier.supplierID === updatedSupplier.supplierID ? updatedSupplier : supplier));
        setEditingSupplier(null);
    })
    .catch(error => setError(error));
};

  const handleAdd = (newSupplier) => {
    fetch('http://localhost:8080/supplier/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
    })
    .then(response => response.json())
    .then(addedSupplier => {
        setSuppliers([...suppliers, addedSupplier]);
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
          {suppliers.map(supplier => (
            <tr key={supplier.supplierID} className="text-white">
              <td className="px-4">{supplier.name}</td>
              <td className="px-4">{supplier.contactEmail}</td>
              <td className="px-4">{supplier.address}</td>
              <td className="px-4">{supplier.phone}</td>
              <td>
                <button onClick={() => setEditingSupplier(supplier)} className=" my-2 mr-2 rounded-md button-light">Update</button>
                <button onClick={() => setDeletingSupplierId(supplier.supplierID)} className="my-2 rounded-md bg-red-500 text-white text-xxl mr-2">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingSupplier != null && <UpdateSupplierPopup supplier={editingSupplier} onUpdate={handleUpdate} onClose={() => setEditingSupplier(null)} />}
      {deletingSupplierId != null && <DeleteSupplierPopup supplierId={deletingSupplierId} onDelete={handleDelete} onClose={() => setDeletingSupplierId(null)} />}
      {showAddPopup && <AddSupplierPopup onAdd={handleAdd} onClose={() => setShowAddPopup(false)} />}
    </div>
        <button onClick={() => setShowAddPopup(true)}  className='rounded-md px-4 py-2 button-light mt-8'>Add Supplier</button>
    </div>
    
  );
};

export default SuppliersPanel;
