import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  Navigate, 
  Outlet 
} from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  ChevronRight as ChevronRightIcon ,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';

// Import all necessary components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MineLandingPage from './pages/LandingPage';
import MineOnboarding from './pages/MineOnboarding';
import JoinMine from './pages/JoinMine';

// Dashboard Related Imports
import Home from './pages/Home';
import UsersTeams from './pages/UsersTeams';
import Notifications from './pages/Notifications';
import DailyTasks from './pages/DailyTasks';
import WeatherBot from './pages/WeatherBot';
import PermissionsPage from './pages/PermissionPage';

function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#121212] text-white">
//       {/* Sidebar with Toggle */}
//       <div 
//         className={`
//           fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ease-in-out
//           ${isSidebarCollapsed ? 'w-16' : 'w-44'}
//         `}
//       >
//         <Sidebar isCollapsed={isSidebarCollapsed} />
        
//         {/* Sidebar Toggle Button */}
//         <button 
//           onClick={toggleSidebar} 
//           className="absolute top-4 right-0 transform translate-x-1/2 
//           bg-green-500 text-black p-1 rounded-full z-50"
//         >
//           {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//         </button>
//       </div>
      
//       {/* Main Content Area */}
//       <div 
//         className={`
//           flex-1 flex flex-col transition-all duration-300 ease-in-out
//           ${isSidebarCollapsed ? 'ml-1' : 'ml-56'}
//         `}
//       >
//         <Header />
        
//         <main className="flex-grow p-4 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
const toggleSidebar = () => {
  setIsSidebarCollapsed(!isSidebarCollapsed);
};

return (
  <div className="flex min-h-screen bg-[#121212] text-white">
    <div 
      className={`
        fixed left-0 top-0 bottom-0 z-40 
        transition-all duration-400 ease-in-out
        ${isSidebarCollapsed ? 'w-16' : 'w-48'}
      `}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-0 transform translate-x-1/2 
          bg-green-500 text-black p-2 rounded-full shadow-lg z-50 
          hover:bg-green-600 transition-all duration-300 ease-out"
      >
        {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>

    <div 
      className={`
        flex-1 flex flex-col transition-all duration-400 ease-in-out
        ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}
      `}
    >
      <Header />
      <main className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);
}
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - First Entry Point */}
        <Route path="/" element={<MineLandingPage />} />
        
        {/* Onboarding Routes */}
        <Route path="/onboard-mine" element={<MineOnboarding />} />
        <Route path="/join-mine" element={<JoinMine />} />
        
        {/* Main Application Layout with Nested Routes */}
        <Route path="/app" element={<MainLayout />}>
          {/* Default Home Page */}
          <Route index element={<Home />} />
          
          {/* Dashboard Routes */}
          <Route path="users-teams" element={<UsersTeams />} />
          <Route path="permissions/:roleName" element={<PermissionsPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="daily-tasks" element={<DailyTasks />} />
          <Route path="weather-bot" element={<WeatherBot />} />
        </Route>
        
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
