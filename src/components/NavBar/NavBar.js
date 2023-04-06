import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
import "./NavBar.scss"

const NavBar = () => {
    return (
        <div className="nav">
            <Link to="/products">Inventory</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/employees">Employees</Link>
        </div>
    );
};

export default NavBar;