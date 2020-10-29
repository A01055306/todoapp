import React, { useState, useEffect, useContext } from 'react'
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import ClearButton from "./ClearButton"
import { nanoid } from "nanoid";
import ThemeContext from '../context/ThemeContext'
import AppTheme from '../Colors'

// const FILTER_MAP = {
//   All: () => true,
//   NotStarted: task => !task.completed,
//   Started: status => !task.completed,
//   Completed: task => task.completed
// };

const FILTER_MAP = {
  //return tasks if their status value matches 0,1 or 2
  All: () => true,
  NotStarted: (task) => {
    if (task.status === 0) {
      return task
    }
  },
  Started: (task) => {
    if (task.status === 1) {
      return task
    }
  },
  Completed: (task) => {
    if (task.status === 2) {
      return task
    }
  }
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

const DATA= [
  {id: "todo-0", name: "Eat", status: 0},
  {id: "todo-1", name: "Sleep", status: 0},
  {id: "todo-2", name: "Repeat", status: 0}
  ]

// const DATA= [
//     {id: "todo-0", name: "Eat", completed: true},
//     {id: "todo-1", name: "Sleep", completed: false},
//     {id: "todo-2", name: "Repeat", completed: false}
//     ]
  

function Home(props) {
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const data = localStorage.getItem("listOfTasks");
    if (data) {
        setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("listOfTasks", JSON.stringify(tasks));
  }, [tasks]);

  function clearTasks(){
      localStorage.clear()
      setTasks([]);
  }

//Lab 4//
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, status: 0 };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id, status) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //returning status value
        return {...task, status: status}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(task => FILTER_MAP[filter](task))
    .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      status={task.status}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  
  const {themeState , handleTheme } = useContext(ThemeContext);
  const currentTheme = AppTheme[themeState]
  const styles = {
    backgroundColor: `${currentTheme.backgroundColor}`,
    color: `${currentTheme.textColor}`
  }

  return (
    <div style={styles}>

    <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 data-testid="list-heading" id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        <ClearButton handleClick={clearTasks} title={"Clear"} />

      </ul>
    </div>
  );
}


export default Home;