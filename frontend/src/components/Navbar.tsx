//src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link> |
      {role === 'Admin' && <Link to="/create-software">Add Software</Link>} |
      {role === 'Employee' && <Link to="/request-access">Request Access</Link>} |
      {role === 'Manager' && <Link to="/pending-requests">Pending Requests</Link>} |
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;