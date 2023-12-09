import react, {useState, useEffect} from 'react'
import TaskList from './components/TaskList'
import Task from './components/Task'
import './App.css'

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [task, setTask] = useState({show: false, msg: "", type: ""});

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showTask(true, "danger", "Escribe una tarea")
    } else if (name && isEditing) {
      setList(
        list.map((item)=>{
          if (item.id === editId) {
            return {...item, title: name}
          }
          return item
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showTask(true, "success", "Tarea Editada");
    } else {
      showTask(true, "success", "Tarea agregada a la lista");
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName("");
    }
  };

  const showTask = (show = false, type = "", msg = "") => {
    setTask({show, type, msg});
  };

  const removeItem = (id) => {
    showTask(true, "danger", "Tarea eliminada");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(editItem.title);
  };

  const clearList = () => {
    showTask(true, "danger", "Lista vacia");
    setList([]);
  };

  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        {task.show && <Task {...task} removeTask={showTask} list={list}/>}
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }} >
          Tareas
        </h3>
        <div className='mb-3 form' >
          <input 
          type="text" 
          className='form-control'
          placeholder='Escribe tu tarea aqui ...'
          onChange={(e)=>setName(e.target.value)}
          value={name}
          />
          <button type='submit' className='btn btn-success'>
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div style={{marginTop: "2rem"}} >
          <TaskList items={list} removeItem={removeItem} editItem={editItem}/>
          <div className='text-center' >
            <button className='btn btn-warning' onClick={clearList} >
              Eliminar Tareas
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default App
