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
    <div className="flex flex-col h-full bg-gradient-to-r from-gray-900 to-black-800  text-white">
      {/* Header */}
      {/* Tabs*/}
      <div className=" bg-gradient-to-r from-gray-900/80 to-black-800  p-6 flex justify-between items-center border-b border-gray-800">
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

        <button className="bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={20} />
          {getAddButtonText()}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1  bg-gradient-to-r from-gray-900/95 to-black-800  p-6">
        {/* Search */}
        <div className="flex justify-between items-center mb-6 flex-row-reverse">
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
        <div className="bg-gray-800/50 rounded-lg shadow-xl backdrop-blur-xl bg-opacity-10">
          {activeTab === 'users' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 ">
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

