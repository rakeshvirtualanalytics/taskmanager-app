// Using localstorage 

import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContexts";
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskLists';

function App() {
  const [dark, setDark] = useState(false);

  return (
    <TaskProvider>
      <div className={dark ? "app dark" : "app"}>
        <header>
          <h1>Task Manager</h1>
          <button onClick={() => setDark(!dark)} className={dark ? "btn btn-light":"btn btn-dark"}>
            {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}


// Using Axios, Express

// import React, { useState } from "react";
// import { TaskProvider } from "./context/taskContext";
// import TaskForm from "./components/taskForm";
// import TaskList from "./components/taskList";

// function App() {
//   const [dark, setDark] = useState(false);

//   return (
//     <TaskProvider>
//       <div className={dark ? "app dark" : "app"}>
//         <header>
//           <h1>Task Manager</h1>
//           <button onClick={() => setDark(!dark)} className={dark ? "btn btn-light":"btn btn-dark"}>
//             {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
//           </button>
//         </header>
//         <TaskForm />
//         <TaskList />
//       </div>
//     </TaskProvider>
//   );
// }

export default App;


