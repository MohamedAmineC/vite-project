import Todo from "./model";
import {FiEdit} from "react-icons/fi";
import {AiOutlineCheckCircle,AiOutlineDelete} from "react-icons/ai"
import './styles.css'
import { useEffect, useRef, useState } from "react";

interface props {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<props> = ({todo,todos,setTodos}) => {
    const [edit,setEdit] = useState<boolean>(false);
    const [editTodo,setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)
    const handleDone = (id:number) => {
        setTodos(todos.map(todo => todo.id===id?{...todo,isDone: !todo.isDone} : todo))
    }
    const handleDelete = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const handleEdit = (e:React.FormEvent,id:number) => {
        e.preventDefault();
        setTodos(todos.map(todo => (
            todo.id===id?{...todo,todo: editTodo}:todo
        )))
        setEdit(false)
    }
    useEffect(() => {
        inputRef.current?.focus();
    },[edit])
    return(
        <form className="todos-single" onSubmit={(e) => handleEdit(e,todo.id)}>
            {
                edit ? (
                    <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} 
                    className="todo-single-edit" />
                ) : todo.isDone ? (
                    <s className="todos-single-text">{todo.todo}</s>
                ) : (
                    <span className="todos-single-text">{todo.todo}</span>
                )
            }
            
            <div className="icon-container">
                <span className="icon" onClick={() => {
                    if(!edit && !todo.isDone){
                        setEdit(!edit)
                    }
                }}>
                    <FiEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiOutlineDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <AiOutlineCheckCircle />
                </span>
            </div>
        </form>
    )
}

export default SingleTodo;