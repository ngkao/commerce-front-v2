import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
import "./NavBar.scss"

const NavBar = () => {
    return (
        <div className="nav">
            <Link className="nav__item" to="/products">Inventory</Link>
            <Link className="nav__item" to="/sales">Sales</Link>
            <Link className="nav__item" to="/employees">Employees</Link>
        </div>
    );
};

export default NavBar;