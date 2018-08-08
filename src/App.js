import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/weather";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Weather Yahoo</h1>
                </header>
                <div className={"container"}>
                    <Weather/>
                </div>
            </div>
        );
    }
}

export default App;
