import { useState, useEffect } from "react";

export default function CreateTodo({ newTodo }) {
  const [todo, setTodo] = useState({
    id: 0,
    task: "",
    completed: false,
  });
  const [todoLength, setTodoLength] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      task: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodoLength = todoLength + 1;
    const newtask = {
      ...todo,
      id: newTodoLength,
    };

    setTodoLength(newTodoLength);
    localStorage.setItem("todoLength", JSON.stringify(newTodoLength));
    newTodo(newtask);

    setTodo({ id: 0, task: "", completed: false });
  };

  useEffect(() => {
    const length = localStorage.getItem("todoLength");
    if (length) {
      setTodoLength(JSON.parse(length));
    } else {
      setTodoLength(0);
    }
  }, []);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <label className="relative">
          <input
            type="checkbox"
            disabled
            className="absolute bottom-[-1px] left-0 pointer-events-none ml-8 mr-1 appearance-none cursor-pointer size-5 md:size-6 border-2 border-dblue-300 rounded-full bg-white dark:bg-dblue-600 dark:border-dblue-500"
          />
          <input
            required
            type="text"
            value={todo.task}
            onChange={handleChange}
            placeholder="Create a new todo..."
            className="w-full shadow-md p-4 pl-20 text-black md:text-xl rounded-md my-6 dark:text-white dark:bg-dblue-600 dark:placeholder:text-dblue-300 accent-violet-500"
          />
          <input type="submit" hidden />
        </label>
      </form>
    </>
  );
}
