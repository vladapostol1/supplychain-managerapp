import { useState } from 'react';
import Navbar from './components/Navbar';
import SuppliersPanel from './components/SuppliersPanel';
import ProducsPanel from './components/ProductsPanel';
import CustomersPanel from './components/CustomersPanel';
import OrdersPanel from './components/OrdersPanel';
import NewOrderPage from './components/NewOrderPage';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePanel, setActivePanel] = useState('suppliers');

  if (!isAuthenticated) {
    return <Login setAuth={setIsAuthenticated} />;
  }
  else
    return (
      <div className="App h-screen flex flex-row gap-8">
        <Navbar setActivePanel={setActivePanel} />
        <div className="flex-grow ml-8 mt-8">
          {activePanel === 'suppliers' && <SuppliersPanel />}
          {activePanel === 'products' && <ProducsPanel />}
          {activePanel === 'customers' && <CustomersPanel />}
          {activePanel === 'orders' && <OrdersPanel />}
          {activePanel == 'neworder' && <NewOrderPage />}
        </div>
      </div>
    )
}

export default App
