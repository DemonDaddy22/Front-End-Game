// TODO - read sudoku puzzles array once and store it in localStorage - DONE
// TODO - get a random puzzle from the array - DONE
// TODO - create a 9x9 board, where cell with value 0 is an editable input field, and remaining are disabled - DONE
// TODO - keep track of all the move sequences of the user - DONE
// TODO - maintain 2 arrays
//        where 1 array stores original moves, and other one stores moves with manipulations like undo/redo
// TODO - if user fills a value in any input field, then disable the field - DONE
// TODO - if user completes the puzzle successfully, animate the puzzle before resetting it
// TODO - for resetting, take some other puzzle and create a new board using it - DONE
// TODO - show number of moves, blocks left, reset button

import React, { useCallback, useEffect, useState } from 'react';
import { createListOfSize } from '../../../utils';
import puzzles from '../sudoku.json';
import Cell from './components/Cell';
import classes from './styles.module.scss';

const Sudoku: React.FC<{}> = () => {
    const [puzzle, setPuzzle] = useState<Sudoku | null>(null);
    const [sudokuPuzzles, setSudokuPuzzles] = useState<Array<Sudoku> | null>(
        null
    );
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
        setOriginalMoves((prevMoves) => []);
        setManipulatedMoves((prevMoves) => []);
    }, [setSudokuPuzzle]);

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
            // TODO - add meaningful indicator
            alert(
                puzzle.quizzes === puzzle.solutions ? 'You won!' : 'You lost!'
            );
        }
    }, [blocksLeft, puzzle]);

    return puzzle ? (
        <div className={classes.puzzleContainer}>
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
        </div>
    ) : null;
};

export default Sudoku;
