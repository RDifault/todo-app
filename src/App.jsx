import { useEffect, useState } from "react";
import BgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import BgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import BgMobileDark from "./assets/images/bg-mobile-dark.jpg";
import BgMobileLight from "./assets/images/bg-mobile-light.jpg";
import Moon from "./assets/icons/icon-moon.svg";
import Sun from "./assets/icons/icon-sun.svg";
import CreateTodo from "./createTodo";
import { createSwapy } from "swapy";
// import './App.css'

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("todo") || "[]")
  );
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCompact, setIsCompact] = useState(window.innerWidth < 400);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompact(window.innerWidth < 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    document.body.classList.toggle("dark", newDark);
    localStorage.setItem("darkMode", newDark);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.documentElement.style.backgroundColor = darkMode
      ? "hsl(235, 21%, 11%)"
      : "hsl(0, 0%, 98%)";
  }, [darkMode]);

  let length = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === false) {
      length++;
    }
  }

  const insertTodo = (todo) => {
    tasks.unshift(todo);
    setTasks([...tasks]);
    localStorage.setItem("todo", JSON.stringify(tasks));

    // localStorage.clear();
  };

  const deleteTodo = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };

  const completeTodo = (id) => {
    tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
    setTasks([...tasks]);
    localStorage.setItem("todo", JSON.stringify(tasks));
  };

  const showCompleted = () => {
    setFilter("completed");
  };

  const showAll = () => {
    setFilter("all");
  };

  const showActive = () => {
    setFilter("active");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return false;
  });

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => task.completed === false);
    setTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem("todo") || "[]");
  }, [tasks]);

  // useEffect(() => {
  //   const container = document.querySelector(".swapy-container");

  //   if (container && tasks.length > 0) {
  //     const swapy = createSwapy(container);

  //     swapy.onSwap(({swappedTasks}) => {
  //       const newOrder = swappedTasks.map(item => {
  //         const taskId = parseInt(item.dataset.swapySlot);
  //         return tasks.find(task => task.id === taskId);
  //       });

  //       setTasks(newOrder);
  //       localStorage.setItem("todo", JSON.stringify(newOrder));
  //     });
  //   }
  // }, [tasks]);

  return (
    <>
      <img
        src={
          darkMode
            ? isMobile
              ? BgMobileDark
              : BgDesktopDark
            : isMobile
            ? BgMobileLight
            : BgDesktopLight
        }
        alt=""
        className="w-full absolute z-0 object-cover h-[300px]"
      />

      <div className="relative content w-[700px] mt-16 mx-8 md:mx-0">
        <header className="flex justify-between items-center py-8">
          <p className="text-4xl md:text-5xl tracking-[.5em] font-bold">TODO</p>
          <img
            src={darkMode ? Sun : Moon}
            onClick={toggleDark}
            alt=""
            className="w-[30px] cursor-pointer"
          />
        </header>

        <CreateTodo newTodo={insertTodo} />

        {/* Todo Lists */}
        <div
          className={`w-full bg-white rounded-md ${
            isMobile && "rounded-b-none"
          } px-2 shadow-lg swapy-container dark:bg-dblue-600`}
        >
          {filteredTasks.map((task) => (
            <div key={task.id} data-swapy-slot={task.id}>
              <div
                className="group cursor-pointer flex items-center justify-between py-4 bg-white text-gblue-400 border-b-[1px] border-gblue-100 dark:border-dblue-550 dark:bg-dblue-600"
                data-swapy-item={task.id}
              >
                <div className="flex items-center">
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      disabled={task.completed}
                      className="peer mx-6 appearance-none cursor-pointer size-5 md:size-6 border-2 border-dblue-300 rounded-full bg-white checked:bg-gradient-to-r from-gradient-1 to-gradient-2 checked:border-0 hover:border-violet-500 dark:bg-dblue-600 dark:border-dblue-500"
                      onChange={() => completeTodo(task.id)}
                    />

                    <svg
                      className="absolute w-4 h-4 hidden peer-checked:block left-[2.1rem] mt-[-25px] md:left-9 md:mt-[-27px] text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>

                  <p
                    className={`md:text-xl ${isCompact && "text-sm"} ${
                      task.completed
                        ? "text-gblue-200 dark:text-dblue-500 strikethrough"
                        : "text-gblue-400 dark:text-gblue-200"
                    }`}
                  >
                    {task.task}
                  </p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => deleteTodo(task.id)}
                    className="transition ease-in-out opacity-100 md:opacity-0 mx-4 size-5 md:size-6 group-hover:opacity-100 hover:scale-125 rounded-full text-gblue-400 dark:text-dblue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
          {!isMobile && (
            <div className="flex items-center justify-between py-4 bg-white text-gblue-300 dark:bg-dblue-600 dark:text-dblue-400">
              <p className="ml-4">{length} tasks left</p>
              <div className="flex items-center font-bold">
                <p
                  onClick={() => showAll()}
                  className={`mr-4 cursor-pointer hover:text-gblue-400 dark:hover:text-dblue-100 ${
                    filter === "all" ? "text-cblue-100" : ""
                  } `}
                >
                  All
                </p>
                <p
                  className={`mr-4 cursor-pointer hover:text-gblue-400 dark:hover:text-dblue-100 ${
                    filter === "active" ? "text-cblue-100" : ""
                  } `}
                  onClick={() => showActive()}
                >
                  Active
                </p>
                <p
                  className={`cursor-pointer hover:text-gblue-400 dark:hover:text-dblue-100 ${
                    filter === "completed" ? "text-cblue-100" : ""
                  } `}
                  onClick={() => showCompleted()}
                >
                  Completed
                </p>
              </div>
              <p
                className="mr-4 cursor-pointer hover:text-gblue-400 dark:hover:text-dblue-100"
                onClick={() => clearCompleted()}
              >
                Clear Completed
              </p>
            </div>
          )}
        </div>
        {isMobile && (
          <>
            <div className="flex items-center rounded-b-md shadow-md justify-between py-4 bg-white text-gblue-300 dark:bg-dblue-600 dark:text-dblue-400">
              <p className={`ml-4 ${isCompact && "text-sm"}`}>
                {length} tasks left
              </p>
              <p
                className={`mr-4 cursor-pointer hover:text-gblue-400 dark:hover:text-dblue-100 ${
                  isCompact && "text-sm"
                }`}
                onClick={() => clearCompleted()}
              >
                Clear Completed
              </p>
            </div>

            <div className="flex items-center justify-center font-bold my-8 p-4 rounded-md shadow-md text-gblue-300 bg-white dark:bg-dblue-600">
              <p
                onClick={() => showAll()}
                className={`mr-4 cursor-pointer ${
                  filter === "all" ? "text-cblue-100" : ""
                } `}
              >
                All
              </p>
              <p
                className={`mr-4 cursor-pointer ${
                  filter === "active" ? "text-cblue-100" : ""
                } `}
                onClick={() => showActive()}
              >
                Active
              </p>
              <p
                className={`cursor-pointer ${
                  filter === "completed" ? "text-cblue-100" : ""
                } `}
                onClick={() => showCompleted()}
              >
                Completed
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
