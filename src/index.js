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

// ##列表 && key
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );

    return (
        <ul>{listItems}</ul>
    );
}

// ### JSX中嵌入map()
function ListItem(props) {
    // 正确！这里不需要指定 key：
    return <li>{props.value}</li>;
}

function NumberList1(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()} value={number}/>
            )}
        </ul>
    )
}


// ## 表单
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
        this.setState({value: event.target.value.toUpperCase()});
    }

    handleSubmit(event) {
        alert('submit a name:' + this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字：
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="提交"/>
            </form>
        );
    }
}

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '关于 DOM 元素的文章。'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('submit paper : ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章:
                    <textarea value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="提交"/>
            </form>
        )
    }
}

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('你喜欢的是: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交"/>
            </form>
        )
    }

}


class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const tartget = event.target;
        const value = tartget.type === 'checkbox' ? tartget.checked : tartget.value;
        const name = tartget.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    参与:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    来宾人数:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}/>
                </label>
            </form>
        );
    }
}


// ## 状态提升
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.state = {temperature: ''};
    }

    handleChange(e) {
        // this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input value={temperature}
                       onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    /*    constructor(props) {
            super(props);
            this.state = ({
                temperature: ''
            });
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
            this.setState({temperature: e.target.value});
        }*/
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {
            temperature: '',
            scale: 'c'
        };
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }


    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />

                <BoilingVerdict celsius={parseFloat(celsius)}/>

            </div>
        )

        /*        return (
                    <div>
                        <TemperatureInput scale="c"/>
                        <TemperatureInput scale="f"/>
                    </div>
                )*/
        /*        const temperature = this.state.temperature;
                return (
                    <fieldset>
                        <legend>Enter temperature in Celsius:</legend>
                        <input
                            value={temperature}
                            onChange={this.handleChange}
                        />
                        <BoilingVerdict celsius={parseFloat(temperature)}/>

                    </fieldset>*/

    }
}

// ## 组合
// ### 包含关系
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting !
            </p>
        </FancyBorder>
    );
}

// or
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Contacts() {
    return <div className="Contacts"/>;
}

function Chat() {
    return <div className="Chat"/>;
}

function Appp() {
    return (
        <SplitPane
            left={
                <Contacts/>
            }
            right={
                <Chat/>
            }
        />
    )
}

// ### 特例关系
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

function WelcomeDialog1() {
    return (
        <Dialog title="Welcome" message="Thank you for visiting our spacecraft!"/>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp(e) {
        alert(`Welcome aboard, ${this.state.login}!`);
    }


    render() {
        return (
            <Dialog title="Mars Exploration Program"
                    message="How should we refer to you?">
                <input value={this.state.login}
                       onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
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
/*
ReactDOM.render(
    <Page/>,document.getElementById('root')
);
*/

/*
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);
ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('root'));
*/

/*
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root'));
*/

/*ReactDOM.render(
    <NameForm/>, document.getElementById('root')
);*/
/*ReactDOM.render(
    <EssayForm/>, document.getElementById('root')
);*/

/*ReactDOM.render(
    <FlavorForm/>, document.getElementById('root')
);*/

/*ReactDOM.render(
    <Reservation/>, document.getElementById('root')
);*/

// ReactDOM.render(<Calculator/>, document.getElementById('root'));

// ReactDOM.render(<WelcomeDialog/>, document.getElementById('root'));
// ReactDOM.render(<WelcomeDialog1/>, document.getElementById('root'));
ReactDOM.render(<SignUpDialog/>, document.getElementById('root'));

// ReactDOM.render(<Appp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
