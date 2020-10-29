import React, { useContext } from "react";

import { Link } from "react-router-dom"
import '../navbar.css'
import ThemeContext from "../context/ThemeContext"


function Navbar(){

    const { themeState, handleTheme } = useContext(ThemeContext);


    const themeTogglerStyle = {
        cursor: "pointer"
    }
    return(
        <nav>
        <Link to="/">Home  </Link>
        &nbsp;|&nbsp;
        <Link to="/about">  About</Link>
        &nbsp;|&nbsp;
        <Link to="/api">  API Lab</Link>
        &nbsp;|&nbsp;
        
        <button style={themeTogglerStyle} onClick={() => {handleTheme()}}>
                <span title = "switch theme">
                    {themeState === "light" ? "Dark" : "Light"}
                </span>
            </button>
        </nav>
    )
}

export default Navbar
