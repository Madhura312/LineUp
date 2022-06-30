import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import './Navbar.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  
    return (
        <nav className="main">
            <div className="left">
                <div className="logo">LineUp</div>
            </div>
            <div className="right">
                <ul className="navitems">
                    <NavLink to='/'><li className="items">Page 1</li></NavLink>
                    <NavLink to='/'><li className="items">Page 2</li></NavLink>
                    <NavLink to='/'><li className="items">Page 3</li></NavLink>
                </ul>
            </div>
            <BiMenuAltRight/>
            
        </nav>
    );
};

export default Header;