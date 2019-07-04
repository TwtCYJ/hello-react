import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const name = 'twist';
const user = {
    firstName: 'chen',
    lastName: 'yingjie'
};

// ## 表达式
const element = <h1>hello,{getGreeting(user)}</h1>;

// ## 特定属性
// const element = <div tabIndex="0"></div>;

//## 指定子元素
// const element = <img src={user.avatarUrl}/>;
// const element = (
//     <div>
//         <h1>hello!</h1>
//         <h2>good to see you here.</h2>
//     </div>
// );

//## jsx 防止注入  直接使用是安全的：
// const title = response.potentiallyMaliciousInput;
// const element = <h1>{title}</h1>;


/*
//表示对象 Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
const element = (
    <h1 className="greeting">
        hello, twist!
    </h1>
);
// or
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'hello,twist!'
);
// or 简化结构
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'hello,twist!'
    }
};*/


function formatName(user) {
    return user.firstName + '    ' + user.lastName;
}

function getGreeting(user) {
    if (user) {
        return <h1>hello,{formatName(user)}</h1>;
    }
    return <h1>hello, stranger.</h1>
}
// ## 元素，创建和更新
function tick() {
    const element = (
        <div>
            <h1>hello,twist!</h1>
            <h2>it`s {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000)

ReactDOM.render(element, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
