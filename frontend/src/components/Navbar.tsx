const Navbar = ({ setActivePanel }) => {
  return (
    <div className="flex flex-col w-64 h-full navbar text-white">
      <h2 className="text-center font-bold text-lg mt-2">SupplyChain</h2>
      <h2 className="text-center font-bold text-lg mb-4">Manager App</h2>
      <button onClick={() => setActivePanel('suppliers')} className="p-4 hover:bg-gray-700">Suppliers</button>
      <button onClick={() => setActivePanel('products')} className="p-4 hover:bg-gray-700">Products</button>
      <button onClick={() => setActivePanel('customers')} className="p-4 hover:bg-gray-700">Customers</button>
      <button onClick={() => setActivePanel('orders')} className="p-4 hover:bg-gray-700">Orders</button>
      <button onClick={() => setActivePanel('neworder')} className="mx-8 mb-8 mt-auto p-4 bg-green-400 hover:bg-green-700 nolayerbutton text-white font-xl font-bold">New Order</button>
    </div>
  );
};


export default Navbar;