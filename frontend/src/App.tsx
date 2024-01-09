import { useState } from 'react';
import Navbar from './components/Navbar';
import SuppliersPanel from './components/SuppliersPanel';
import ProducsPanel from './components/ProductsPanel';
import CustomersPanel from './components/CustomersPanel';
import OrdersPanel from './components/OrdersPanel';

function App() {
  const [activePanel, setActivePanel] = useState('suppliers');

  return (
    <div className="App h-screen flex flex-row gap-8">
      <Navbar setActivePanel={setActivePanel} />
      <div className="flex-grow ml-8 mt-8">
        {activePanel === 'suppliers' && <SuppliersPanel />}
        {activePanel === 'products' && <ProducsPanel />}
        {activePanel === 'customers' && <CustomersPanel />}
        {activePanel === 'orders' && <OrdersPanel />}
      </div>
    </div>
  )
}

export default App
