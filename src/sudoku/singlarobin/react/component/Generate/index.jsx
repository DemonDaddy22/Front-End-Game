import React, { Fragment, useEffect, useState } from 'react';
import Feature from '../Feature';
import PlayArea from '../PlayArea';
import classes from './styles.module.css';
import { generateSudoku } from '../../utils';
import { SUDOKU_API, DIFFICULTY } from '../../constants';
import RadioButton from '../RadioButton';
import Button from '../Button';
import Loader from '../Loader';

const Generate = () => {
    const [game, setGame] = useState([]);
    const [solution, setSolution] = useState([]);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState('Easy');

    const handleRadioButtonChange = (value) => setDifficulty(value);
    const updatePlayArea = (game) => setGame(game);
    const handleFormSubmit = () => setStarted(!started);

    const generateSudokuApiCall = () => {
        setLoading(true);
        fetch(
            SUDOKU_API + `diff=${DIFFICULTY[difficulty]}&stype=list&solu=true`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'sudoku-board.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_SUDOKU_API_KEY,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGame(data.response['unsolved-sudoku'].flat());
                setSolution(data.response['solution'].flat());
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (started) generateSudokuApiCall();
    }, [started]);

    return (
        <Fragment>
            {started ? (
                loading ? (
                    <Loader />
                ) : (
                    <div className={classes.wrapper}>
                        <Feature />
                        <PlayArea game={game} updatePlayArea={updatePlayArea} />
                    </div>
                )
            ) : (
                <div className={classes.formWrapper}>
                    <div className={classes.formHeader}>Choose Difficulty</div>
                    <RadioButton
                        label="Easy"
                        checked={difficulty}
                        handleRadioButtonChange={handleRadioButtonChange}
                    />
                    <RadioButton
                        label="Medium"
                        checked={difficulty}
                        handleRadioButtonChange={handleRadioButtonChange}
                    />
                    <RadioButton
                        label="Hard"
                        checked={difficulty}
                        handleRadioButtonChange={handleRadioButtonChange}
                    />
                    <Button
                        style={{
                            backgroundColor: '#23a6d5',
                            margin: '0.5rem 2rem 1rem',
                            padding: '0.5rem 0.75rem',
                        }}
                        handleClick={handleFormSubmit}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </Fragment>
    );
};

export default Generate;
