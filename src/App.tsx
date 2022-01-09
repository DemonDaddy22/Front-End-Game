import { useCallback } from 'react';
import './App.scss';
import GitHub from './assets/icons/GitHub';
import Hands from './assets/img/Hands.png';
import Button from './components/Button';
import { GITHUB_REPO_LINK } from './resources/constants';

const App = () => {
    const handleForkButtonClick = useCallback(() => {
        window.open(GITHUB_REPO_LINK, '__blank', 'noopener,noreferrer');
    }, []);

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
                <Button onClick={handleForkButtonClick} className="button-fork">
                    <GitHub size={16} />
                    Fork
                </Button>
            </header>
            <img src={Hands} alt="hands" className="hands" />
        </section>
    );
};

export default App;
