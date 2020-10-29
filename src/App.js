import { Route, Switch } from 'react-router-dom'
import React, { useState,useContext }  from 'react';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Error from './components/Error';
import AppTheme from './Colors';
import Api from './components/api';

import { ThemeProvider } from "styled-components";

import { createGlobalStyle } from "styled-components";





import ThemeContext from './context/ThemeContext'

function App(props){

  //Need to be refactored into a seperate file after today
  const theme = useContext(ThemeContext)
  const [themeState, setThemeState] = useState(theme)
  const currentTheme = AppTheme[themeState]
  const styles = {
    backgroundColor: `${currentTheme.backgroundColor}`,
    color: `${currentTheme.textColor}`
  }
  function handleTheme(){
    setThemeState(themeState==="light" ? "dark" : "light")
  }
  const themes = { themeState, handleTheme };
  const GlobalStyles = createGlobalStyle`
  html, body {
    background-color: ${currentTheme}
  }`;
  //Need to be refactored into a seperate file after today

  return(

    <ThemeContext.Provider value={themes}>
        <GlobalStyles />
    <div className='todoapp stack-large' style={styles}>
    <Navbar/>
      <Switch>
          <Route path='/' component={Home}exact/>
          <Route path='/about' component={About}/>
          <Route path='/api' component={Api} />
          <Route component={Error} />

      </Switch>
      </div>
      
      </ThemeContext.Provider>

  );
}

export default App;