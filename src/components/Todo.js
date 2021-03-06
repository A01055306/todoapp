import React, { useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
          <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}
          />      
        </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
            <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">

      {/* Midterm radial buttons */}
      <div>
            <input 
              id={props.id}
              onChange={() => props.toggleTaskCompleted(props.id, 0)}type="radio" value="NotStarted" name={`radio-${props.id}`} checked={props.status === 0}/> NotStarted     
            <text>   </text>
            <input 
              id={props.id}
              onChange={() => props.toggleTaskCompleted(props.id, 1)}type="radio" value="Started" name={`radio-${props.id}`} checked={props.status === 1}/> Started      
              <text>   </text>
            <input 
              id={props.id}
              onChange={() => props.toggleTaskCompleted(props.id, 2)}type="radio" value="Completed" name={`radio-${props.id}`} checked={props.status === 2} /> Completed       
          </div>
    
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>

        <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
           Edit <span className="visually-hidden">{props.name}</span>
        </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  }