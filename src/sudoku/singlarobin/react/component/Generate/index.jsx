import React, { Fragment, useEffect, useState } from 'react';
import Feature from '../Feature';
import PlayArea from '../PlayArea';
import classes from './styles.module.css';
import { generateSudoku } from '../../utils';
import { SUDOKU_API, DIFFICULTY } from '../../constants';
import RadioButton from '../RadioButton';
import Button from '../Button';

const Generate = () => {
    const [numbers, setNumbers] = useState([]);
    const [started, setStarted] = useState(false);
    const [difficulty, setDifficulty] = useState('Easy');

    const handleRadioButtonChange = (value) => setDifficulty(value);
    const updatePlayArea = (game) => setNumbers(game);
    const handleFormSubmit = () => setStarted(!started);

    return (
        <Fragment>
            {started ? (
                <div className={classes.wrapper}>
                    <Feature />
                    <PlayArea game={numbers} updatePlayArea={updatePlayArea} />
                </div>
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
