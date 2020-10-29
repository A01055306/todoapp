import React, { useState, useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import AppTheme from '../Colors'


function Form(props) {
  const [name, setName] = useState('');

  const {themeState , handleTheme } = useContext(ThemeContext);
  const currentTheme = AppTheme[themeState]

  const styles = {
    backgroundColor: `${currentTheme.textColor}`,
    color: `${currentTheme.backgroundColor}`
  }


  function handleChange(e) {
    setName(e.target.value)
  }  

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button style={styles} type='submit' data-testid='addRequest' className='btn btn__primary btn__lg'>
        Add
      </button>

    </form>
  );
}

export default Form;