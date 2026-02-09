import React, { useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todoList, setToDoList }) => {

  // useRef is used to directly access the input field without re-rendering
  const inputRef = useRef();

  // editId stores the ID of the todo which is currently being edited
  const [editId, setEditId] = useState(null);

  // Function to add new task OR update existing task
  const addTask = () => {
    // input value trimming extra space
    const task = inputRef.current.value.trim();
    // if  empty  input  return
    if (task === "") return;

    // if edit id exist then update it
    if (editId !== null) {
      setToDoList((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: task } : todo  // update the text of matched todo
        )
      );
      // reset edit module
      setEditId(null);
    } else {
      // create new todo object with id text 
      const newTodo = {
        id: Date.now(),
        text: task,
        isComplete: false,
      };
      // add new todo to list
      setToDoList((prev) => [...prev, newTodo]);
    }

    // Clear input field after adding/updating
    inputRef.current.value = "";
  };

  // Function to start editing a task
  const startEdit = (id, text) => {
    // Put selected task text into input field
    inputRef.current.value = text;
    // Store id of task being edited
    setEditId(id);
  };

  // function for delete any task 
  const deleteTodo = (id) => {
    
    setToDoList((prev) =>
      // delete whose it matches
      prev.filter((todo) => todo.id !== id)
    );
  };

  // function toggle to completion status
  const toggle = (id) => {
    setToDoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isComplete: !todo.isComplete } // toggle status
          : todo
      )
    );
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md mt-20 flex flex-col p-7 rounded-xl">

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To Do List</h1>
      </div>

      {/* Input Section */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6"
          placeholder="Add your task"
        />

        <button
          onClick={addTask}
          className="rounded-full bg-violet-600 text-white w-32 h-14"
        >
          {editId ? "UPDATE" : "ADD +"}
        </button>
      </div>

      {/* To Do List */}
      <div>
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            {...item}
            deleteTodo={deleteTodo}
            toggle={toggle}
            startEdit={startEdit}
          />
        ))}
      </div>

    </div>
  );
};

export default ToDoList;
