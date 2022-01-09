import { Fragment, useEffect, useState } from 'react';
import Feature from '../Feature';
import PlayArea from '../PlayArea';
import classes from './styles.module.css';
import { SUDOKU_API, DIFFICULTY } from '../../constants';
import RadioButton from '../RadioButton';
import Button from '../Button';
import Loader from '../Loader';

const Generate = () => {
    const [game, setGame] = useState([]);
    const [solution, setSolution] = useState([]);
    const [undo, setUndo] = useState([]);
    const [redo, setRedo] = useState([]);
    const [count, setCount] = useState(0);
    const [updatedIndex, setUpdatedIndex] = useState(-1);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState('Easy');

    const handleRadioButtonChange = (value) => setDifficulty(value);
    const updatePlayArea = (game, index) => {
        setGame(game);
        setCount(count + 1);
        setUpdatedIndex(index);

        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        setUndo(sudoku[0][2]['undo']);
    };

    useEffect(() => {
        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        if (sudoku !== null && sudoku.length !== 0) {
            setSolution(sudoku[0][0]['solution']);
            setGame(sudoku[0][1]['game']);
            setUndo(sudoku[0][2]['undo']);
            setRedo(sudoku[0][3]['redo']);
            setStarted(true);
        } else {
            if (started) generateSudokuApiCall();
        }
    }, [started]);

    const handleFormSubmit = () => setStarted(!started);

    const handleUndo = () => {
        if (undo.length === 0) {
            alert('Not Possible');
            return;
        }
        let operation = undo[undo.length - 1];

        let index = operation['index'];
        let currentGame = game;
        currentGame[index] = operation['prev'];

        let updatedUndoList = undo.slice(0, -1);
        let updatedRedoList = [...redo, operation];

        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        sudoku[0][1]['game'] = currentGame;
        sudoku[0][2]['undo'] = updatedUndoList;
        sudoku[0][3]['redo'] = updatedRedoList;
        localStorage.setItem('sudoku', JSON.stringify(sudoku));

        setUpdatedIndex(index);
        setUndo(updatedUndoList);
        setRedo(updatedRedoList);
        setGame(currentGame);
    };

    const handleRedo = () => {
        if (redo.length === 0) {
            alert('Not Possible');
            return;
        }
        let operation = redo[redo.length - 1];
        let index = operation['index'];
        let currentGame = game;
        currentGame[index] = operation['current'];

        let updatedRedoList = redo.slice(0, -1);
        let updatedUndoList = [...undo, operation];
        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        sudoku[0][1]['game'] = currentGame;
        sudoku[0][2]['undo'] = updatedUndoList;
        sudoku[0][3]['redo'] = updatedRedoList;
        localStorage.setItem('sudoku', JSON.stringify(sudoku));

        setUpdatedIndex(index);
        setUndo(updatedUndoList);
        setRedo(updatedRedoList);
        setGame(currentGame);
    };
    const handleReset = () => {
        localStorage.setItem('sudoku', JSON.stringify([]));
        setStarted(false);
    };

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

                let sudoko = [];
                sudoko.push([
                    { solution: data.response['solution'].flat() },
                    { game: data.response['unsolved-sudoku'].flat() },
                    { undo: [] },
                    { redo: [] },
                ]);
                localStorage.setItem('sudoku', JSON.stringify(sudoko));

                setGame(data.response['unsolved-sudoku'].flat());
                setSolution(data.response['solution'].flat());
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <Fragment>
            {started ? (
                loading ? (
                    <Loader />
                ) : (
                    <div className={classes.wrapper}>
                        <Feature
                            handleUndo={handleUndo}
                            handleRedo={handleRedo}
                            handleReset={handleReset}
                        />
                        <PlayArea
                            updatedIndex={updatedIndex}
                            game={game}
                            solution={solution}
                            count={count}
                            updatePlayArea={updatePlayArea}
                        />
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