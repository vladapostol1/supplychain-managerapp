import React, { useState, useEffect } from 'react';

const AddProductsPopup = ({ onAdd, onClose, suppliers }) => {
        const [newProduct, setNewProduct] = useState({
        name: '', description: '', price: '', stockQuantity: '', supplierId: ''
    });

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd(newProduct);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Edit Products</h3>
                <div className="mb-4">
                <label className="block">Name</label>
                <input type="text" name="name" value={newProduct.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Description</label>
                    <input type="email" name="description" value={newProduct.description} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Price</label>
                    <input type="text" name="price" value={newProduct.price} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block">Stock</label>
                    <input type="text" name="stockQuantity" value={newProduct.stockQuantity} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
                </div>
                <label className="block">Supplier</label>
                <select
                    name="supplierId"
                    value={newProduct.supplierId}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-gray-200 rounded-md mb-4"
                >
                    <option value="">Select a Supplier</option>
                    {suppliers.map(supplier => (
                        <option key={supplier.supplierID} value={supplier.supplierID}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
                <div className='flex flex-row'>
                    <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                    <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const DeleteProductsPopup = ({ productsId, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p>Are you sure you want to delete this products?</p>
                <div className='flex flex-row'>
                    <button onClick={() => onDelete(productsId)} className='rounded-md mr-2 bg-red-500 text-white my-2'>Delete</button>
                    <button onClick={onClose} className='rounded-md bg-gray-300 text-black my-2'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const UpdateProductsPopup = ({ products, onUpdate, onClose }) => {
    const [updatedProducts, setUpdatedProducts] = useState({ ...products });

    const handleChange = (e) => {
        setUpdatedProducts({ ...updatedProducts, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(updatedProducts);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full text-black">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold">Add Products</h3>
            <div className="mb-4">
                <label className="block">Name</label>
                <input type="text" name="name" value={updatedProducts.name} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Description</label>
                <input type="email" name="description" value={updatedProducts.description} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Price</label>
                <input type="text" name="price" value={updatedProducts.price} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className="mb-4">
                <label className="block">Stock</label>
                <input type="text" name="stockQuantity" value={updatedProducts.stockQuantity} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md" />
            </div>
            <div className='flex flex-row'>
                <button onClick={handleSubmit} className='rounded-md mr-2 text-white my-2'>OK</button>
                <button onClick={onClose} className='rounded-md mr-2 text-white my-2'>Cancel</button>
            </div>
          </div>
        </div>
      );
};

const ProductsPanel = () => {
  const [products, setProductss] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProducts, setEditingProducts] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [deletingProductsId, setDeletingProductsId] = useState(null);

  const handleDelete = (productsId) => {
      fetch(`http://localhost:8080/products/delete/${productsId}`, { method: 'DELETE' })
          .then(() => {
              setProductss(products.filter(products => products.productsID !== productsId));
              setDeletingProductsId(null);
          })
          .catch(error => setError(error));
  };

  useEffect(() => {
    fetch('http://localhost:8080/product/all')
      .then(response => response.json())
      .then(data => setProductss(data))
      .catch(error => setError(error));

      fetch('http://localhost:8080/supplier/all')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => setError(error));
  }, []);

  const handleUpdate = (updatedProducts) => {
    fetch(`http://localhost:8080/product/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProducts)
    })
    .then(response => response.json())
    .then(() => {
        setProductss(products.map(products => products.productsID === updatedProducts.productsID ? updatedProducts : products));
        setEditingProducts(null);
    })
    .catch(error => setError(error));
};

  const handleAdd = (newProducts) => {
    fetch('http://localhost:8080/product/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProducts)
    })
    .then(response => response.json())
    .then(addedProducts => {
        setProductss([...products, addedProducts]);
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
            <th className="px-4">Description</th>
            <th className="px-4">Price</th>
            <th className="px-4">Stock</th>
            <th className="px-4">Supplier</th>
            <th className="px-4">Action</th>
          </tr>
        </thead>
        <tbody className='bg-stone-900'>
          {products.map(products => (
            <tr key={products.productID} className="text-white">
              <td className="px-4">{products.name}</td>
              <td className="px-4">{products.description}</td>
              <td className="px-4">{products.price}</td>
              <td className="px-4">{products.stockQuantity}</td>
              <td className="px-4">{products.supplier.name ? products.supplier.name : 'Missing value'}</td>
              <td>
                <button onClick={() => setEditingProducts(products)} className=" my-2 mr-2 rounded-md button-light">Update</button>
                <button onClick={() => setDeletingProductsId(products.productsID)} className="my-2 rounded-md bg-red-500 text-white text-xxl mr-2">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProducts != null && <UpdateProductsPopup products={editingProducts} onUpdate={handleUpdate} onClose={() => setEditingProducts(null)} />}
      {deletingProductsId != null && <DeleteProductsPopup productsId={deletingProductsId} onDelete={handleDelete} onClose={() => setDeletingProductsId(null)} />}
      {showAddPopup && <AddProductsPopup onAdd={handleAdd} onClose={() => setShowAddPopup(false)} suppliers={suppliers}/>}
    </div>
        <button onClick={() => setShowAddPopup(true)}  className='rounded-md px-4 py-2 button-light mt-8'>Add Products</button>
    </div>
    
  );
};

export default ProductsPanel;
