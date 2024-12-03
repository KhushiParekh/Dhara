import React from 'react';

function Notifications() {
  const notifications = [
    { id: 1, message: 'New safety checklist completed', timestamp: '2023-04-15 11:23 AM' },
    { id: 2, message: 'Equipment maintenance request submitted', timestamp: '2023-04-14 4:45 PM' },
    { id: 3, message: 'Shift log updated for April 13th', timestamp: '2023-04-13 10:12 AM' },
    { id: 4, message: 'New mine onboarded: Mine Alpha', timestamp: '2023-04-12 7:30 PM' }
  ];

  return (
    <div className="p-8 text-[#c3c3c3]">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="bg-gradient-to-r from-gray-900/80 to-bg-black-900 shadow-md rounded-md p-6">
        
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <div className="font-medium">{notification.message}</div>
              <div className="text-sm text-gray-400">{notification.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;