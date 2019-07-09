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
// const element = <h1>hello,{getGreeting(user)}</h1>;

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
/*function tick() {
    const element = (
        <div>
            <h1>hello,twist!</h1>
            <h2>it`s {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000)*/


// ##组件
// ###1.函数组件
function Welcome(props) {
    return <h1>hello, {props.name}</h1>;
}

// ###2.class组件
class Welcome1 extends React.Component {
    render() {
        return <h1>hello, {this.props.name}</h1>;
    }
}

const element = <Welcome name="twist_class"/>;

// ### 组合组件
function App1() {
    return (
        <div>
            <Welcome name="sara"/>
            <Welcome name="sara1"/>
            <Welcome name="sara2"/>
        </div>
    )
}

// ### 提取组件
/*function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                     src={props.author.avatarUrl}
                     alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-data">
                {formatDate(props.date)}
            </div>
        </div>
    )
}*/

// 优化后
/*function Comment1(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author}/>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-data">
                {formatDate(props.date)}
            </div>
        </div>
    )
}

function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user}/>
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}*/

// ## state 生命周期
/*function Clock(props) {
    return (
        <div>
            <h1>hello, world!</h1>
            <h2>is`s {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick1() {
    ReactDOM.render(
        <Clock/>,
        document.getElementById('root')
    );
}

setInterval(tick1, 1000)
*/

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
}

// ### state 只属于特定组件
function App2() {
    return (
        <div>
            <Clock/>
            <Clock/>
            <Clock/>
        </div>
    );
}

// ## 事件
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };
        //绑定this
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}


// ## 条件渲染
function UserGreeting(props) {
    return <h1>welcome back!</h1>
}

function GuestGreeting(props) {
    return <h1>please sign up.</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting/>;
    }
    return <GuestGreeting/>;
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false
        };
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        /*
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick}/>;
        } else {
            button = <LoginButton onClick={this.handleLoginClick}/>;
        }
        */


        return (
            /*          <div>
                            <Greeting isLoggedIn={isLoggedIn}/>
                            {button}
                        </div>}
            */
            <div>
                {isLoggedIn ? (<LogoutButton onClick={this.handleLogoutClick}/>)
                    : (<LoginButton onClick={this.handleLoginClick}/>)}
            </div>
        )
    }
}

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>hello!</h1>
            {unreadMessages.length > 0 && <h2>
                you have {unreadMessages.length} unread messages.
            </h2>
            }
        </div>
    );
}

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning !
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'hide' : 'show'}
                </button>
            </div>
        )
    }
}

// ReactDOM.render(<App1/>, document.getElementById('root'));
// ReactDOM.render(<Clock/>, document.getElementById('root'));
// ReactDOM.render(<App2/>, document.getElementById('root'));
// ReactDOM.render(<Toggle />, document.getElementById('root'));
/*ReactDOM.render(
    <Greeting isLoggedIn={false}/>,
    document.getElementById('root')
);*/
/*ReactDOM.render(
    <LoginControl/>,document.getElementById('root')
);*/

/*
const messages = ['React', 'Re: React', 'Re:Re: React'];

ReactDOM.render(
    <Mailbox unreadMessages={messages}/>, document.getElementById('root')
);
*/

ReactDOM.render(
    <Page/>,document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
