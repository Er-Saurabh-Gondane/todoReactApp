import React from "react";


function ToDoItem({ text, deleteTodo, id, toggle, isComplete, startEdit }) {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 cursor-pointer items-center "
      >
        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center border border-green-700">
          {isComplete ? (
            <i className="fa-solid fa-check text-green-500 m-3 "></i>
          ) : (
            <div></div>
          )}
        </div>

        <p
          className={`text-slate-700 text-xl decoration-slate-500 ml-4 ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <i
          onClick={() => startEdit(id, text)}
          className="fa-solid fa-pen text-blue-800 cursor-pointer"
        ></i>
        <i
          className="fa-solid fa-trash text-red-600 cursor-pointer"
          onClick={() => deleteTodo(id)}
        ></i>
      </div>
    </div>
  );
}

export default ToDoItem;