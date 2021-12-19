import React from 'react';
import './App.scss';
import Hands from './assets/img/Hands.png';

const App = () => {
    return (
        <section className="main">
            <header className="header">
                <h1 className="title">Front-End-Game</h1>
                <h4 className="subtitle">
                    The End Game of the Front End Interviews!
                </h4>
                <p className="description">
                    Bunch of frequently asked mini-projects in the frontend
                    machine coding rounds. Practice them now so that you don't
                    panic at the all important moment!
                </p>
            </header>
            <img src={Hands} alt="hands" className="hands" />
        </section>
    );
};

export default App;
