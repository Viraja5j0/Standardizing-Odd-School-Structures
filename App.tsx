// import React from 'react';
// import { FaSchool, FaUsers, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
// import { BsBuilding, BsBook } from 'react-icons/bs';
// import { AiOutlineSchedule, AiOutlineSetting } from 'react-icons/ai';
// import Dashboard from './components/Dashboard';

// function Sidebar() {
//   const menuItems = [
//     { icon: <FaChartLine className="w-5 h-5" />, text: 'Dashboard', active: true },
//     { icon: <FaSchool className="w-5 h-5" />, text: 'Schools' },
//     { icon: <BsBuilding className="w-5 h-5" />, text: 'Resources' },
//     { icon: <BsBook className="w-5 h-5" />, text: 'Programs' },
//     { icon: <AiOutlineSchedule className="w-5 h-5" />, text: 'Calendar' },
//     { icon: <AiOutlineSetting className="w-5 h-5" />, text: 'Settings' }
//   ];

//   return (
//     <div className="w-64 min-h-screen bg-white border-r">
//       <div className="p-4 flex items-center space-x-2 border-b">
//         <div className="text-blue-600 text-2xl">📊</div>
//         <span className="text-xl font-semibold">EduStandard</span>
//       </div>
//       <nav className="p-4">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
//               item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
//             }`}
//           >
//             {item.icon}
//             <span>{item.text}</span>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <Dashboard />
//     </div>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { FaChartLine, FaSchool } from 'react-icons/fa';
import { BsBuilding, BsBook } from 'react-icons/bs';
import { AiOutlineSchedule, AiOutlineSetting } from 'react-icons/ai';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import Resources from './components/Resources';
import Programs from './components/Programs';
import Calendar from './components/cal';
import Settings from './components/Settings';

function Sidebar({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  const menuItems = [
    { icon: <FaChartLine className="w-5 h-5" />, text: 'Dashboard', id: 'dashboard' },
    { icon: <FaSchool className="w-5 h-5" />, text: 'Schools', id: 'schools' },
    { icon: <BsBuilding className="w-5 h-5" />, text: 'Resources', id: 'resources' },
    { icon: <BsBook className="w-5 h-5" />, text: 'Programs', id: 'programs' },
    { icon: <AiOutlineSchedule className="w-5 h-5" />, text: 'Calendar', id: 'calendar' },
    { icon: <AiOutlineSetting className="w-5 h-5" />, text: 'Settings', id: 'settings' }
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-4 flex items-center space-x-2 border-b">
        <div className="text-blue-600 text-2xl">📊</div>
        <span className="text-xl font-semibold">EduStandard</span>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              activePage === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'schools':
        return <Schools />;
      case 'resources':
        return <Resources />;
      case 'programs':
        return <Programs />;
      case 'calendar':
        return <Calendar />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default App;