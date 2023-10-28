import React,{ FC, ReactElement, useCallback, useEffect, useReducer } from "react"

import TdInput from "./Input"
import TdList from "./List"
import { ACTION_TYPE, IState, ITodo } from "./typings"
import { todoReducer } from "./reducer"

// const initialState: IState = {
//     todoList: []
// }

function init (initTodoList: ITodo[]): IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement =>{

    // const [ todoList, setTodoList ] = useState<ITodo[]>([])
    const [state, dispath] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }, [state.todoList])

    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem("todoList") || "[]")

        dispath({
            type: ACTION_TYPE.INIT_TODO,
            payload: todoList
        })
    }, [])

    const addTodo = useCallback((todo: ITodo): void => {
        // setTodoList(todoList => [...todoList, todo])
        dispath({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    const removeTodo = useCallback((id: number): void => {
        dispath({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })

    },[])

    const toggleTodo = useCallback((id: number): void => {
        dispath({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })

    }, [])

    return (
        <div className="todo-list">
            <TdInput
                addTodo={ addTodo }
                todoList={ state.todoList }
            />
            <TdList 
                todoList={ state.todoList }
                removeTodo={ removeTodo }
                toggleTodo={ toggleTodo }
            />
        </div>
    )
}

export default TodoList