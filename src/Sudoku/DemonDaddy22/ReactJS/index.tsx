// TODO - read sudoku puzzles array once and store it in localStorage - DONE
// TODO - get a random puzzle from the array - DONE
// TODO - create a 9x9 board, where cell with value 0 is an editable input field, and remaining are disabled - DONE
// TODO - keep track of all the move sequences of the user - DONE
// TODO - maintain 2 arrays
//        where 1 array stores original moves, and other one stores moves with manipulations like undo/redo - DONE
// TODO - if user fills a value in any input field, then disable the field - DONE
// TODO - for resetting, take some other puzzle and create a new board using it - DONE
// TODO - show number of moves, blocks left, reset button - DONE
// TODO - persist current game in localStorage

import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { createListOfSize } from '../../../utils';
import puzzles from '../sudoku.json';
import Cell from './components/Cell';
import classes from './styles.module.scss';

const Sudoku: React.FC<{}> = () => {
    const [puzzle, setPuzzle] = useState<Sudoku | null>(null);
    const [sudokuPuzzles, setSudokuPuzzles] = useState<Array<Sudoku> | null>(
        null
    );
    const [numMoves, setNumMoves] = useState<number>(0);
    const [blocksLeft, setBlocksLeft] = useState<number | null>(null);
    const [originalMoves, setOriginalMoves] = useState<Array<Move>>([]);
    const [manipulatedMoves, setManipulatedMoves] = useState<Array<Move>>([]);

    const size = Math.floor(Math.sqrt(puzzle?.quizzes?.length || 0));
    const puzzleRow = createListOfSize(size);

    const setSudokuPuzzle = useCallback(() => {
        if (sudokuPuzzles?.length) {
            const randomIndex: number = Math.floor(
                Math.random() * sudokuPuzzles.length
            );
            const sudokuPuzzle = sudokuPuzzles[randomIndex];
            const numberOfBlocksLeft = sudokuPuzzle.quizzes
                ?.split('')
                ?.reduce((accu, curr) => (curr == '0' ? accu + 1 : accu), 0);
            setPuzzle(() => sudokuPuzzle);
            setBlocksLeft(() => numberOfBlocksLeft);
        }
    }, [sudokuPuzzles]);

    const resetGame = useCallback(() => {
        setSudokuPuzzle();
        setNumMoves(0);
        setOriginalMoves((prevMoves) => []);
        setManipulatedMoves((prevMoves) => []);
    }, [setSudokuPuzzle]);

    const handleUndo = useCallback(() => {
        if (manipulatedMoves.length) {
            const manipulatedMovesCopy = [...manipulatedMoves];
            const lastMove = manipulatedMovesCopy.pop();
            const indexToReset = lastMove?.index || 0;
            setPuzzle((prevPuzzleSnap) => {
                let newPuzzleSnap = prevPuzzleSnap;
                if (prevPuzzleSnap) {
                    newPuzzleSnap = {
                        quizzes:
                            prevPuzzleSnap.quizzes?.slice(0, indexToReset) +
                            '0' +
                            prevPuzzleSnap.quizzes?.slice(indexToReset + 1),
                        solutions: prevPuzzleSnap.solutions,
                    };
                }
                return newPuzzleSnap;
            });
            setManipulatedMoves(() => manipulatedMovesCopy);
            setBlocksLeft((prevBlocks) => (prevBlocks || 0) + 1);
            setNumMoves((prevMoves) => prevMoves + 1);
        }
    }, [manipulatedMoves]);

    const handleRedo = useCallback(() => {
        if (manipulatedMoves.length < originalMoves.length) {
            const manipulatedMovesCopy = [...manipulatedMoves];
            const redoMove = { ...originalMoves[manipulatedMovesCopy.length] };
            manipulatedMovesCopy.push({ ...redoMove });
            setPuzzle((prevPuzzleSnap) => {
                let newPuzzleSnap = prevPuzzleSnap;
                if (prevPuzzleSnap) {
                    newPuzzleSnap = {
                        quizzes:
                            prevPuzzleSnap.quizzes?.slice(0, redoMove.index) +
                            redoMove.value +
                            prevPuzzleSnap.quizzes?.slice(redoMove.index + 1),
                        solutions: prevPuzzleSnap.solutions,
                    };
                }
                return newPuzzleSnap;
            });
            setManipulatedMoves(() => manipulatedMovesCopy);
            setBlocksLeft((prevBlocks) => (prevBlocks || 0) - 1);
            setNumMoves((prevMoves) => prevMoves + 1);
        }
    }, [manipulatedMoves, originalMoves]);

    const handleValueChange = useCallback(
        (index: number, value: number | string) => {
            setPuzzle((prevPuzzleSnap) => {
                let newPuzzleSnap = prevPuzzleSnap;
                if (prevPuzzleSnap) {
                    newPuzzleSnap = {
                        quizzes:
                            prevPuzzleSnap.quizzes?.slice(0, index) +
                            value +
                            prevPuzzleSnap.quizzes?.slice(index + 1),
                        solutions: prevPuzzleSnap.solutions,
                    };
                }
                return newPuzzleSnap;
            });
            setOriginalMoves((prevMoves) => [...prevMoves, { index, value }]);
            setManipulatedMoves((prevMoves) => [
                ...prevMoves,
                { index, value },
            ]);
            setNumMoves((prevMoves) => prevMoves + 1);
            setBlocksLeft((prevBlocksLeft) => (prevBlocksLeft || 0) - 1);
        },
        []
    );

    useEffect(() => {
        let puzzlesFromStorage: any = localStorage.getItem('sudokuPuzzles');
        if (!puzzlesFromStorage) {
            puzzlesFromStorage = puzzles;
            localStorage.setItem('sudokuPuzzles', JSON.stringify(puzzles));
        }
        if (typeof puzzlesFromStorage === 'string') {
            puzzlesFromStorage = JSON.parse(puzzlesFromStorage);
        }
        setSudokuPuzzles(() => puzzlesFromStorage?.sudokuPuzzles || []);
    }, []);

    useEffect(() => {
        setSudokuPuzzle();
    }, [setSudokuPuzzle]);

    useEffect(() => {
        if (blocksLeft === 0 && puzzle) {
            alert(
                puzzle.quizzes === puzzle.solutions
                    ? 'You correctly solved the puzzle!'
                    : 'You came close to solving the puzzle correctly!'
            );
        }
    }, [blocksLeft, puzzle]);

    return puzzle ? (
        <div className={classes.puzzleContainer}>
            <div className={classes.infoContainer}>
                <div className={classes.info}>Number of Moves: {numMoves}</div>
                <div className={classes.info}>Blocks Left: {blocksLeft}</div>
            </div>
            {puzzleRow.map((_, rowIndex) => {
                return (
                    <div key={`row-${rowIndex}`} className={classes.puzzleRow}>
                        {puzzleRow.map((cell, columnIndex) => {
                            return (
                                <Cell
                                    key={`cell-${rowIndex}-${columnIndex}`}
                                    data={
                                        puzzle?.quizzes?.[
                                            rowIndex * size + columnIndex
                                        ]
                                    }
                                    index={rowIndex * size + columnIndex}
                                    onChange={handleValueChange}
                                />
                            );
                        })}
                    </div>
                );
            })}
            <div className={classes.buttonsContainer}>
                <Button
                    disabled={originalMoves.length <= manipulatedMoves.length}
                    onClick={handleRedo}
                >
                    Redo
                </Button>
                <Button
                    disabled={manipulatedMoves.length <= 0}
                    onClick={handleUndo}
                >
                    Undo
                </Button>
                <Button onClick={resetGame}>Reset</Button>
            </div>
        </div>
    ) : null;
};

export default Sudoku;
