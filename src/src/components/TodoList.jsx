import React, { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = () => {
    const todo = useContext(TodoStateContext);
    const [search, setSearch] = useState('');

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === '' ? todo : todo.filter((it) => it.content.toLowerCase().includes(search));
    };

    // useMemo : 컴포넌트가 리렌더링될 때 불필요하게 호출되는 함수의 호출을 방지
    const analyzeTodo = useMemo(() => {
        console.log('analyzeTodo');
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);

    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 일: {doneCount}</div>
                <div>미완료된 일: {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} className="searchbar" placeholder="검색어를 입력하세요." />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
