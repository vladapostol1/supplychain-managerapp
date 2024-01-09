import { useState } from 'react';
import Navbar from './components/Navbar';
import SuppliersPanel from './components/SuppliersPanel';

function App() {
  const [activePanel, setActivePanel] = useState('suppliers');

  return (
    <div className="App h-screen flex flex-row gap-8">
      <Navbar setActivePanel={setActivePanel} />
      <div className="flex-grow ml-8 mt-8">
        {activePanel === 'suppliers' && <SuppliersPanel />}
      </div>
    </div>
  )
}

export default App
