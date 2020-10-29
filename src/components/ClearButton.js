

import React, { useState, useEffect, useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import AppTheme from '../Colors'


function ClearButton(props) {

  const {themeState , handleTheme } = useContext(ThemeContext);
  const currentTheme = AppTheme[themeState]
  const styles = {
  backgroundColor: `${currentTheme.backgroundColor}`,
  color: `${currentTheme.textColor}`
}
  return (
    <button 
    style={styles} 
    className="btn btn__primary btn__lg"
    onClick={props.handleClick}
    >
			<span>{props.title}</span>
  </button>

  );

}
export default ClearButton





