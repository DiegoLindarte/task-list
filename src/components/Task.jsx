import React, {useEffect} from 'react'

const Task = ({type, msg, removeTask, list}) => {
  useEffect(()=>{
    const timeout = setTimeout(()=>{
        removeTask();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`task task-${type}`}>{msg}</p>;
}

export default Task
