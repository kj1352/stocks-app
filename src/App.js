import React from 'react';
import logo from './assets/arrows.svg';
import './css/home.css';
import ReactDOM from 'react-dom';

function App() {
    function redirectUser(e) {

        ReactDOM.render (
            <div className="container">
                <nav>
                    <a href="/"> Home </a>
                    <a className="active" onClick={redirectUser}> Stocks </a>
                </nav>

            </div>
        , document.getElementById('root'));
    }

    redirectUser();

    return (
        <div className="container">
            <nav>
                <a href="/" className="active"> Home </a>
                <a onClick={redirectUser}> Stocks </a>
            </nav>
            <div className="welcome">
                <header> <h1> Stock Prices </h1> <img src={logo} className="App-logo" alt="logo" />  </header>
                <p>
                    Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to
                    view the latest 100 days of activity.
                </p>
            </div>
        </div>
    );
}

export default App;
