import { useRef } from 'react';
import './styles.css';

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.FormEvent) => void;
}

const InputField:React.FC<props> = ({todo,setTodo,handleAdd}) => {
    const inputRef =useRef<HTMLInputElement>(null);
    return(
        <form className="input" onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
            }}>
            <input 
            type="input"
            ref={inputRef} 
            placeholder="Enter a task" 
            className="input-box"
            value={todo}
            onChange={(e) => setTodo(e.target.value)} 
            />
            <button className="input-submit" type="submit">Go</button>
        </form>
    )
}

export default InputField;