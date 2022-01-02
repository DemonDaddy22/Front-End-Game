// TODO - read sudoku puzzles array once and store it in localStorage - DONE
// TODO - get a random puzzle from the array - DONE
// TODO - create a 9x9 board, where (i,j)th cell with value 0 is an editable input field, and remaining are disabled
// TODO - keep track of all the move sequences of the user
// TODO - maintain 2 arrays
//        where 1 array stores original moves, and other one stores moves with manipulations like undo/redo
// TODO - if user fills a value in any input field, then disable the field once it is not empty and out of focus
// TODO - if user completes the puzzle successfully, animate the puzzle before resetting it
// TODO - for resetting, take some other puzzle and create a new board using it

import React, { useCallback, useEffect, useState } from 'react';
import puzzles from '../sudoku.json';

const Sudoku: React.FC<{}> = () => {
    const [puzzle, setPuzzle] = useState<Sudoku | null>(null);
    const [sudokuPuzzles, setSudokuPuzzles] = useState<Array<Sudoku> | null>(
        null
    );

    const setSudokuPuzzle = useCallback(() => {
        if (sudokuPuzzles?.length) {
            const randomIndex: number = Math.floor(
                Math.random() * sudokuPuzzles.length
            );
            setPuzzle(() => sudokuPuzzles[randomIndex]);
        }
    }, [sudokuPuzzles]);

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

    return <></>;
};

export default Sudoku;
