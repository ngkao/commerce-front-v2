import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import "./NavBar.scss"

const NavBar = () => {

    const location = useLocation();
    const isProductPath = location.pathname.startsWith("/products")
    
    console.log("path", location.pathname)

    useEffect(() => {
        const items = document.querySelectorAll('.inventory-item');
        // items.forEach(item => item.classList.add('inventory-item__show'));
        console.log("PATH CHANGED")
        if (location.pathname == '/products') {
            setTimeout(() => {
                items.forEach((item, index) => 
                    setTimeout(() => {
                        item.classList.add('show')
                    },index * 100)
                );
                console.log("Class was added")
            },0)

        } else {
        items.forEach(item => item.classList.remove('show'));
        console.log("Class was removed")
        }

      }, [location.pathname]);

    return (
        <div className="nav">
            <Link className="nav__item" to="/products">Inventory</Link>
            <Link className="nav__item" to="/sales">Sales</Link>
            <Link className="nav__item" to="/employees">Employees</Link>
        </div>
    );
};

export default NavBar;