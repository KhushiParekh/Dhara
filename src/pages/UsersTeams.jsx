import React, { useState } from 'react';
import { FaUserCircle, FaUserFriends, FaUserTag } from 'react-icons/fa';
import { Search, Settings, Edit2, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react'; // Add this icon import at the top

const UserTeams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [editingUser, setEditingUser] = useState(null);

  // Dummy data with expanded properties
  const users = [
    { id: 1, name: 'Kiran ', role: 'Owner', email: 'kiran@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
    { id: 2, name: 'John ', role: 'Shift Incharge', email: 'john@gmail.com', phone: '7854162158', status: true, lastLogin: '2024-03-15' },
    { id: 3, name: 'Jane Smith', role: 'Mine Manager', email: 'jane.smith@company.com', phone: '987-654-3210', status: true, lastLogin: '2024-03-14' },
    { id: 4, name: 'Bob Johnson', role: 'Shift Incharge', email: 'bob.johnson@company.com', phone: '456-789-0123', status: false, lastLogin: '2024-03-13' },
    { id: 5, name: 'Alice Williams', role: 'Mine Manager', email: 'alice.williams@company.com', phone: '321-987-6543', status: true, lastLogin: '2024-03-12' },
    { id: 5, name: 'Alice Williams', role: 'Admin', email: 'alice.williams@company.com', phone: '321-987-6543', status: true, lastLogin: '2024-03-12' },
  ];

  const teams = [
    { id: 1, name: ' Mine Manager 1', members: 10, shiftIncharges: 2 },
    { id: 2, name: 'Mine Manager 2', members: 12, shiftIncharges: 3 },
    { id: 3, name: 'Security Team', members: 6, shiftIncharges: 1 },
    { id: 4, name: 'HR Team', members: 4, shiftIncharges: 1 },
  ];

  const roles = [
    { id: 1, name: 'Owner', users: 1, lastUpdated: '2024-03-15', authorityLevel: 100 },
    { id: 2, name: 'Admin', users: 1, lastUpdated: '2024-03-15', authorityLevel: 75 },
    { id: 3, name: 'Mine Manager', users: 11, lastUpdated: '2024-03-20', authorityLevel: 60 },
    { id: 4, name: 'Shift Incharge', users: 21, lastUpdated: '2024-03-20', authorityLevel: 50 },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleStyles = (role) => {
    const styles = {
      'Admin': 'bg-sky-900/80 text-sky-200',
      'Owner': 'bg-blue-900/80 text-blue-200',
      'Shift Incharge': 'bg-emerald-900/80 text-emerald-200',
      'Mine Manager': 'bg-purple-900/80 text-purple-200',
    };
    return styles[role] || 'bg-gray-900/80 text-gray-200';
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'users': return 'Add User';
      case 'teams': return 'Create Team';
      case 'roles': return 'Add Role';
      default: return 'Add';
    }
  };

  const filteredData = () => {
    const searchLower = searchTerm.toLowerCase();
    switch (activeTab) {
      case 'users':
        return users.filter(user => 
          (selectedRole === 'All' || user.role === selectedRole) &&
          (user.name.toLowerCase().includes(searchLower) || 
           user.email.toLowerCase().includes(searchLower))
        );
      case 'teams':
        return teams.filter(team => 
          team.name.toLowerCase().includes(searchLower)
        );
      case 'roles':
        return roles.filter(role => 
          role.name.toLowerCase().includes(searchLower)
        );
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900/80 p-6 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-xl font-semibold">Users & Teams</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={20} />
          {getAddButtonText()}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900/95 p-6">
        {/* Tabs and Search */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('users')}
            >
              <FaUserCircle className="mr-2" />
              Users
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'teams' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('teams')}
            >
              <FaUserFriends className="mr-2" />
              Teams
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'roles' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
              onClick={() => setActiveTab('roles')}
            >
              <FaUserTag className="mr-2" />
              Roles
            </button>
          </div>

          <div className="flex items-center gap-4">
            <select
              className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-green-600"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="All">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}5
            </select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-green-600 text-white w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="bg-gray-800/50 rounded-lg shadow-xl">
          {activeTab === 'users' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Last Login</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleStyles(user.role)}`}>
                          {getInitials(user.name)}
                        </div>
                        <span className="ml-3">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getRoleStyles(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-gray-300">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className={`px-3 py-1 rounded-full text-sm inline-flex ${user.status ? 'bg-green-900/60 text-green-200' : 'bg-gray-900/60 text-gray-300'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'teams' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="px-6 py-4 text-left">Team Name</th>
                  <th className="px-6 py-4 text-left">Members</th>
                  <th className="px-6 py-4 text-left">Shift Incharges</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData().map((team) => (
                  <tr key={team.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="px-6 py-4">{team.name}</td>
                    <td className="px-6 py-4">{team.members}</td>
                    <td className="px-6 py-4">{team.shiftIncharges}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-green-400">
                          <Edit2 size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}


{activeTab === 'roles' && (
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-700 text-gray-400">
        <th className="px-6 py-4 text-left">Role Name</th>
        <th className="px-6 py-4 text-left">Users</th>
        <th className="px-6 py-4 text-left">Authority Level</th>
        <th className="px-6 py-4 text-left">Last Updated</th>
        <th className="px-6 py-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredData().map((role) => (
        <tr key={role.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
          <td className="px-6 py-4">{role.name}</td>
          <td className="px-6 py-4">{role.users}</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${role.authorityLevel}%` }}
                />
              </div>
              <span className="ml-2 text-sm text-gray-400">{role.authorityLevel}%</span>
            </div>
          </td>
          <td className="px-6 py-4">{role.lastUpdated}</td>
          <td className="px-6 py-4">
            <button
              className="text-gray-400 hover:text-green-400"
              onClick={() => navigate(`/permissions/${role.name}`)}
              // onClick={() => {
              //   // Navigate to permissions page with the role ID
              //   // window.location.href = `/permissions/${role.id}`;
              // }}
            >
              <Info size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </div>
      </div>
    </div>
  );
};

export default UserTeams;


// import React, { useState } from 'react';
// import { 
//   Users, 
//   UserPlus, 
//   Users as TeamIcon, 
//   Settings, 
//   Search, 
//   MoreVertical, 
//   Edit, 
//   Trash 
// } from 'lucide-react';

// const UserTeams = () => {
//   const [activeTab, setActiveTab] = useState('users');
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSearchQuery('');
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const users = [
//     { name: 'John Doe', role: 'Miner', email: 'john@example.com', phone: '123-456-7890', status: 'Active' },
//     { name: 'Jane Smith', role: 'Supervisor', email: 'jane@example.com', phone: '987-654-3210', status: 'Active' },
//     { name: 'Bob Johnson', role: 'Engineer', email: 'bob@example.com', phone: '555-555-5555', status: 'Inactive' },
//     { name: 'Sarah Lee', role: 'Safety Officer', email: 'sarah@example.com', phone: '111-222-3333', status: 'Active' }
//   ];

//   const teams = [
//     { name: 'Shift A', members: ['John Doe', 'Jane Smith'] },
//     { name: 'Shift B', members: ['Bob Johnson', 'Sarah Lee'] }
//   ];

//   const roles = [
//     { name: 'Miner', users: 2, lastUpdated: '2 days ago' },
//     { name: 'Supervisor', users: 1, lastUpdated: '1 week ago' },
//     { name: 'Engineer', users: 1, lastUpdated: '3 months ago' },
//     { name: 'Safety Officer', users: 1, lastUpdated: '6 months ago' }
//   ];

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.role.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white">Users & Teams</h2>
//         <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
//           <UserPlus size={16} />
//           Create Team
//         </button>
//       </div>

//       <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-4 space-y-4">
//         <div className="flex items-center gap-4">
//           <button
//             className={`flex items-center gap-2 ${activeTab === 'users' ? 'text-green-500' : 'text-gray-400 hover:text-gray-300'}`}
//             onClick={() => handleTabChange('users')}
//           >
//             <Users size={16} />
//             Users
//           </button>
//           <button
//             className={`flex items-center gap-2 ${activeTab === 'teams' ? 'text-green-500' : 'text-gray-400 hover:text-gray-300'}`}
//             onClick={() => handleTabChange('teams')}
//           >
//             <TeamIcon size={16} />
//             Teams
//           </button>
//           <button
//             className={`flex items-center gap-2 ${activeTab === 'roles' ? 'text-green-500' : 'text-gray-400 hover:text-gray-300'}`}
//             onClick={() => handleTabChange('roles')}
//           >
//             <Settings size={16} />
//             Roles
//           </button>
//         </div>

//         <div className="relative">
//           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="w-full bg-gray-900/30 text-gray-300 pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//           />
//         </div>

//         {activeTab === 'users' && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-gray-400">
//                   <th className="py-2 px-4">Name</th>
//                   <th className="py-2 px-4">Role</th>
//                   <th className="py-2 px-4">Email</th>
//                   <th className="py-2 px-4">Phone</th>
//                   <th className="py-2 px-4">Status</th>
//                   <th className="py-2 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user, index) => (
//                   <tr key={index} className={`border-t border-gray-900 ${index % 2 === 0 ? 'bg-gray-900/30' : ''}`}>
//                     <td className="py-3 px-4">{user.name}</td>
//                     <td className="py-3 px-4">{user.role}</td>
//                     <td className="py-3 px-4">{user.email}</td>
//                     <td className="py-3 px-4">{user.phone}</td>
//                     <td className="py-3 px-4">
//                       <span className={`px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 flex items-center gap-2">
//                       <button className="text-gray-400 hover:text-gray-300">
//                         <Edit size={16} />
//                       </button>
//                       <button className="text-gray-400 hover:text-gray-300">
//                         <Trash size={16} />
//                       </button>
//                       <button className="text-gray-400 hover:text-gray-300">
//                         <MoreVertical size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {activeTab === 'teams' && (
//           <div className="space-y-4">
//             {teams.map((team, index) => (
//               <div key={index} className="bg-gray-900/30 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-lg font-medium text-white">{team.name}</h3>
//                   <button className="text-gray-400 hover:text-gray-300">
//                     <MoreVertical size={16} />
//                   </button>
//                 </div>
//                 <div className="text-gray-400">
//                   {team.members.join(', ')}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'roles' && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-gray-400">
//                   <th className="py-2 px-4">Role</th>
//                   <th className="py-2 px-4">Users</th>
//                   <th className="py-2 px-4">Last Updated</th>
//                   <th className="py-2 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {roles.map((role, index) => (
//                   <tr key={index} className={`border-t border-gray-900 ${index % 2 === 0 ? 'bg-gray-900/30' : ''}`}>
//                     <td className="py-3 px-4">{role.name}</td>
//                     <td className="py-3 px-4">{role.users}</td>
//                     <td className="py-3 px-4">{role.lastUpdated}</td>
//                     <td className="py-3 px-4 flex items-center gap-2">
//                       <button className="text-gray-400 hover:text-gray-300">
//                         <Edit size={16} />
//                       </button>
//                       <button className="text-gray-400 hover:text-gray-300">
//                         <MoreVertical size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserTeams;

// // import React from 'react';

// // function UsersTeams() {
// //   const users = [
// //     { id: 1, name: 'John Doe', email: 'john.doe@mine.com', phone: '+1 (555) 1234', role: 'Manager', location: 'Select' },
// //     { id: 2, name: 'Jane Smith', email: 'jane.smith@mine.com', phone: '+1 (555) 5678', role: 'Shift Lead', location: 'Select' },
// //     { id: 3, name: 'Bob Johnson', email: 'bob.johnson@mine.com', phone: '+1 (555) 9012', role: 'Safety Officer', location: 'Select' },
// //     { id: 4, name: 'Alice Williams', email: 'alice.williams@mine.com', phone: '+1 (555) 3456', role: 'Technician', location: 'Select' }
// //   ];

// //   const teams = [
// //     { id: 1, name: 'Team Alpha', members: ['John Doe', 'Jane Smith'] },
// //     { id: 2, name: 'Team Bravo', members: ['Bob Johnson', 'Alice Williams'] },
// //     { id: 3, name: 'Team Charlie', members: ['John Doe', 'Alice Williams'] }
// //   ];

// //   const roles = [
// //     { id: 1, name: 'Manager', permissions: ['View', 'Edit', 'Delete'] },
// //     { id: 2, name: 'Shift Lead', permissions: ['View', 'Edit'] },
// //     { id: 3, name: 'Safety Officer', permissions: ['View', 'Edit'] },
// //     { id: 4, name: 'Technician', permissions: ['View'] }
// //   ];

// //   return (
// //     <div className="p-8 text-[#c3c3c3]">
// //       <h1 className="text-2xl font-bold mb-6">Users & Teams</h1>
// //       <div className="bg-[#1b1b1b] shadow-md rounded-md p-6">
// //         <h2 className="text-xl font-bold mb-4">Users</h2>
// //         <table className="w-full">
// //           <thead>
// //             <tr>
// //               <th className="text-left p-2">Name</th>
// //               <th className="text-left p-2">Email</th>
// //               <th className="text-left p-2">Phone</th>
// //               <th className="text-left p-2">Role</th>
// //               <th className="text-left p-2">Location</th>
// //               <th className="text-left p-2">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.map((user) => (
// //               <tr key={user.id}>
// //                 <td className="p-2">{user.name}</td>
// //                 <td className="p-2">{user.email}</td>
// //                 <td className="p-2">{user.phone}</td>
// //                 <td className="p-2">{user.role}</td>
// //                 <td className="p-2">{user.location}</td>
// //                 <td className="p-2">
// //                   <button className="bg-[#3c763d] hover:bg-[#4d8c4e] text-white px-2 py-1 rounded-md mr-2">
// //                     Edit
// //                   </button>
// //                   <button className="bg-[#c72222] hover:bg-[#d63333] text-white px-2 py-1 rounded-md">
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="bg-[#1b1b1b] shadow-md rounded-md p-6 mt-6">
// //         <h2 className="text-xl font-bold mb-4">Teams</h2>
// //         <table className="w-full">
// //           <thead>
// //             <tr>
// //               <th className="text-left p-2">Team Name</th>
// //               <th className="text-left p-2">Members</th>
// //               <th className="text-left p-2">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {teams.map((team) => (
// //               <tr key={team.id}>
// //                 <td className="p-2">{team.name}</td>
// //                 <td className="p-2">{team.members.join(', ')}</td>
// //                 <td className="p-2">
// //                   <button className="bg-[#3c763d] hover:bg-[#4d8c4e] text-white px-2 py-1 rounded-md mr-2">
// //                     Edit
// //                   </button>
// //                   <button className="bg-[#c72222] hover:bg-[#d63333] text-white px-2 py-1 rounded-md">
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       <div className="bg-[#1b1b1b] shadow-md rounded-md p-6 mt-6">
// //         <h2 className="text-xl font-bold mb-4">Roles</h2>
// //         <table className="w-full">
// //           <thead>
// //             <tr>
// //               <th className="text-left p-2">Role Name</th>
// //               <th className="text-left p-2">Permissions</th>
// //               <th className="text-left p-2">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {roles.map((role) => (
// //               <tr key={role.id}>
// //                 <td className="p-2">{role.name}</td>
// //                 <td className="p-2">{role.permissions.join(', ')}</td>
// //                 <td className="p-2">
// //                   <button className="bg-[#3c763d] hover:bg-[#4d8c4e] text-white px-2 py-1 rounded-md mr-2">
// //                     Edit
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default UsersTeams;