import React, { useState, useEffect } from 'react';

const NewOrderPage = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isReturningCustomer, setIsReturningCustomer] = useState(true);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '', email: '', address: '', phone: '' });
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/product/all')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => setError(error));

        fetch('http://localhost:8080/customer/all')
        .then(response => response.json())
        .then(data => setCustomers(data))
        .catch(error => setError(error));

        fetch('http://localhost:8080/order/all')
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => setError(error));
    }, []);

    const handleCustomerTypeChange = (event) => {
        setIsReturningCustomer(event.target.value === 'returning');
    };

    const handleCustomerChange = (event) => {
        setSelectedCustomerId(event.target.value);
    };

    const handleChange = (e) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleProductChange = (event) => {
        const product = products.find(p => p.productID == event.target.value);
        setSelectedProductId(event.target.value);
        if (product) {
            setTotalPrice(product.price * quantity);
        }
    };

    const handleQuantityChange = (event) => {
        const product = products.find(p => p.productID == selectedProductId);
        const qty = Math.min(event.target.value, product.stockQuantity ? product.stockQuantity : 1);
        setQuantity(qty);
        setTotalPrice(product.price * qty);
    };

    const handleSubmit = async () => {
        try {
            if(isReturningCustomer == false)
            {
                const customerResponse = await fetch('http://localhost:8080/customer/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCustomer)
                });
                const addedCustomer = await customerResponse.json();
                setSelectedCustomerId(addedCustomer.customerID)
            }
    
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const orderData = {
                customerID: selectedCustomerId,
                orderDate: formattedDate,
                status: 'Processing'
            };

            console.log(orderData)
    
            const orderResponse = await fetch('http://localhost:8080/order/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const addedOrder = await orderResponse.json();
    
            const orderDetailData = {
                order: {...addedOrder, orderID: orders[orders.length-1].orderID + 1},
                product: products.find(p => p.productID == selectedProductId),
                quantity: quantity,
                price: totalPrice
            };

            console.log(orderDetailData);
    
            await fetch('http://localhost:8080/orderdetail/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetailData)
            });
    
        } catch (error) {
            setError(error);
        }
    };    

    return (
        <div>
            <select onChange={handleCustomerTypeChange}>
                <option value="returning">Returning Customer</option>
                <option value="new">New Customer</option>
            </select>

            {isReturningCustomer ? (
                <select onChange={handleCustomerChange}>
                    <option value="">Select a product</option>
                    {customers.map(customer => (
                        <option key={customer.customerID} value={customer.customerID}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </select>
            ) : (
                <div>
                    <div className="mb-4">
                        <label className="block">First Name</label>
                        <input type="text" name="firstName" value={newCustomer.firstName} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md text-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block">Last Name</label>
                        <input type="text" name="lastName" value={newCustomer.lastName} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md text-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block">Contact Email</label>
                        <input type="email" name="email" value={newCustomer.email} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md text-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block">Address</label>
                        <input type="text" name="address" value={newCustomer.address} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md text-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block">Phone</label>
                        <input type="text" name="phone" value={newCustomer.phone} onChange={handleChange} className="w-full px-2 py-1 bg-gray-200 rounded-md text-black" />
                    </div>
                </div>
            )}

            <select onChange={handleProductChange}>
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.productID} value={product.productID}>
                            {product.name}
                        </option>
                    ))}
            </select>

            <input type="number" value={quantity} onChange={handleQuantityChange} min="0" />

            <div>Total Price: {totalPrice}</div>

            <button onClick={handleSubmit}>Create Order</button>
        </div>
    );
};

export default NewOrderPage;
