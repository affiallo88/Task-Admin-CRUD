import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [isCompletedScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [descriptionState, setDescriptionState] = useState("");
  const [titleState, setTitleState] = useState("");
  const [colorTitle, setColorTitle] = useState("");
  const [colorDesc, setColorDesc] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];

    if (newTodoItem.title !== "" && newTodoItem.description !== "") {
      updatedTodoArr.unshift(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

      setTimeout(() => {
        setTitleState("");
        setDescriptionState("");
      }, 4000);

      setColorTitle("green");
      setColorDesc("green");

      setTitleState("Added title");
      setDescriptionState("Added description");
    } else if (newTodoItem.title === "" && newTodoItem.description !== "") {
      //alert("Introduzca el titulo");
      setTimeout(() => {
        setTitleState("");
        setDescriptionState("");
      }, 4000);

      setColorTitle("red");
      setColorDesc("green");

      setTitleState("Title no added");
      setDescriptionState("Added description");
    } else if (newTodoItem.title !== "" && newTodoItem.description === "") {
      //alert("Intruduzca la descripcion");
      setTimeout(() => {
        setTitleState("");
        setDescriptionState("");
      }, 4000);

      setColorTitle("green");
      setColorDesc("red");

      setTitleState("Added title");
      setDescriptionState("Description no added");
    } else {
      //alert("Introduzca la descripcion y el titulo");
      setTimeout(() => {
        setTitleState("");
        setDescriptionState("");
      }, 4000);

      setColorTitle("red");
      setColorDesc("red");

      setTitleState("Title not added");
      setDescriptionState("Description no added");
    }

    setTimeout(() => {
      setNewTitle("");
      setNewDescription("");
    }, 4000);
  };
  /*Para borrar Todos*/
  const handleDeleteTodos = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  /*Para editar toDos */
  const handleEditTodos = (index) => {
    let toEditeTodos = [...allTodos];
    let editedTodos = [];
    editedTodos = toEditeTodos.splice(index, 1);

    setNewTitle(editedTodos[index].title);
    setNewDescription(editedTodos[index].description);

    setTodos(toEditeTodos);
    localStorage.setItem("todolist", JSON.stringify(toEditeTodos));
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.unshift(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodos(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompleteArr));
  };

  /*Metodo para eliminar un completed to dos */
  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My ToDos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title"
            />
            <p>
              Estado: <span className={`${colorTitle}`}>{titleState}</span>
            </p>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description"
            />
            <p>
              Estado: <span className={`${colorDesc}`}>{descriptionState}</span>
            </p>
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            To Do
          </button>

          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <BiEdit
                      className="edit-icon"
                      onClick={() => handleEditTodos(index)}
                      title="Edit?"
                    />
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodos(index)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              );
            })}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
