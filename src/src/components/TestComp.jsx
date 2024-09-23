import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCRESE':
            return state + action.data;
        case 'DECRESE':
            return state - action.data;
        case 'INIT':
            return 0;
        default:
            return state;
    }
}

const TestComp = () => {
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <div>
                <button onClick={() => dispatch({ type: 'INCRESE', data: 1 })}>+</button>
                <button onClick={() => dispatch({ type: 'DECRESE', data: 1 })}>-</button>
                <button onClick={() => dispatch({ type: 'INIT' })}>초기화</button>
            </div>
        </div>
    );
};
export default TestComp;
