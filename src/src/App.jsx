import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
// import TestComp from './components/TestComp';
// import { useReducer, useRef, useState } from 'react';
import React, { useMemo, useCallback, useReducer, useRef } from 'react';

const mockTodo = [
    {
        id: 0,
        content: '리엑트 공부하기',
        createdDate: new Date(),
        isDone: false,
    },
    {
        id: 1,
        content: '스프링 공부하기',
        createdDate: new Date().getTime(),
        isDone: false,
    },
    {
        id: 2,
        content: '집 청소하기',
        createdDate: new Date().getTime(),
        isDone: false,
    },
];

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [action.newItem, ...state];
        case 'UPDATE':
            return state.map((item) => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
        case 'DELETE':
            return state.filter((item) => item.id !== action.targetId);
        default:
            return state;
    }
}

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
    // const [todo, setTodo] = useState(mockTodo);
    const [todo, dispatch] = useReducer(reducer, mockTodo);
    const idRef = useRef(3);

    const onUpdate = useCallback((targetId) => {
        dispatch({ type: 'UPDATE', targetId });
        // setTodo(
        //   todo.map((item) =>
        //     item.id === targetId ? { ...item, isDone: !item.isDone } : item
        //   )
        // );
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({ type: 'DELETE', targetId });
        // setTodo(todo.filter((item) => item.id !== targetId));
    }, []);

    const onCreate = (content) => {
        dispatch({
            type: 'CREATE',
            newItem: {
                id: idRef.current,
                content,
                createdDate: new Date().getTime(),
                isDone: false,
            },
        });
        // const newItem = {
        //   id: idRef.current,
        //   content,
        //   createdDate: new Date().getTime(),
        //   isDone: false,
        // };
        // setTodo([newItem, ...todo]);
        idRef.current += 1;
    };

    const memoizedDispatch = useMemo(() => {
        return { onCreate, onUpdate, onDelete };
    }, [onUpdate, onDelete]);

    return (
        <div className="App">
            <TodoStateContext.Provider value={todo}>
                <TodoDispatchContext.Provider value={memoizedDispatch}>
                    {/* <TestComp /> */}
                    <Header />
                    <TodoEditor />
                    <TodoList />
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App;
