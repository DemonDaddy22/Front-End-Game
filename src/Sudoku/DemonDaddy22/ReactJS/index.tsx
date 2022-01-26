import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { createListOfSize } from '../../../utils';
import puzzles from '../sudoku.json';
import Cell from './components/Cell';
import classes from './styles.module.scss';

const Sudoku: React.FC<{}> = () => {
    const [puzzle, setPuzzle] = useState<Sudoku | null>(null);
    const [numMoves, setNumMoves] = useState<number>(0);
    const [blocksLeft, setBlocksLeft] = useState<number | null>(null);
    const [originalMoves, setOriginalMoves] = useState<Array<Move>>([]);
    const [manipulatedMoves, setManipulatedMoves] = useState<Array<Move>>([]);
    const [isGameInProgress, setIsGameInProgress] = useState<boolean>(
        JSON.parse(localStorage.getItem('isGameInProgress') || 'false') || false
    );

    const size = Math.floor(Math.sqrt(puzzle?.quizzes?.length || 0));
    const puzzleRow = createListOfSize(size);

    const calcBlocksLeft = useCallback((sudokuPuzzle: Sudoku | null) => {
        const numberOfBlocksLeft =
            sudokuPuzzle?.quizzes
                ?.split('')
                ?.reduce((accu, curr) => (curr == '0' ? accu + 1 : accu), 0) ||
            0;
        setBlocksLeft(numberOfBlocksLeft);
    }, []);

    const setSudokuPuzzle = useCallback(() => {
        if (puzzles?.sudokuPuzzles?.length && !isGameInProgress) {
            const randomIndex: number = Math.floor(
                Math.random() * puzzles.sudokuPuzzles.length
            );
            const sudokuPuzzle = puzzles.sudokuPuzzles[randomIndex];
            setPuzzle(sudokuPuzzle);
            calcBlocksLeft(sudokuPuzzle);
        }
    }, [calcBlocksLeft, isGameInProgress]);

    const setGameInStorage = useCallback(
        (
            gamePuzzle: Sudoku | null,
            gameOriginalMoves: Array<Move>,
            gameManipulatedMoves: Array<Move>,
            gameNumMoves: number,
            isInProgress: boolean = true
        ) => {
            const sudokuGameProgress = {
                puzzle: gamePuzzle,
                originalMoves: gameOriginalMoves,
                manipulatedMoves: gameManipulatedMoves,
                numMoves: gameNumMoves,
            };
            localStorage.setItem(
                'sudokuGameProgress',
                JSON.stringify(sudokuGameProgress)
            );
            localStorage.setItem(
                'isGameInProgress',
                JSON.stringify(isInProgress)
            );
        },
        [puzzle, originalMoves, manipulatedMoves]
    );

    const resetGame = useCallback(() => {
        setSudokuPuzzle();
        setNumMoves(0);
        setOriginalMoves(() => []);
        setManipulatedMoves(() => []);
        setIsGameInProgress(false);
        setGameInStorage(null, [], [], 0, false);
    }, [setSudokuPuzzle, setGameInStorage]);

    const handleUndo = useCallback(() => {
        if (manipulatedMoves.length) {
            const manipulatedMovesCopy = [...manipulatedMoves];
            const lastMove = manipulatedMovesCopy.pop();
            const indexToReset = lastMove?.index || 0;
            const puzzleSnap = { ...puzzle };
            const newPuzzleSnap = {
                quizzes:
                    puzzleSnap?.quizzes?.slice(0, indexToReset) +
                    '0' +
                    puzzleSnap?.quizzes?.slice(indexToReset + 1),
                solutions: puzzleSnap?.solutions,
            };
            const updatedNumMoves = numMoves + 1;
            setPuzzle(newPuzzleSnap);
            setManipulatedMoves(manipulatedMovesCopy);
            setBlocksLeft((prevBlocks) => (prevBlocks || 0) + 1);
            setNumMoves(updatedNumMoves);
            setGameInStorage(
                newPuzzleSnap,
                originalMoves,
                manipulatedMovesCopy,
                updatedNumMoves
            );
        }
    }, [numMoves, puzzle, originalMoves, manipulatedMoves, setGameInStorage]);

    const handleRedo = useCallback(() => {
        const manipulatedMove = manipulatedMoves?.[manipulatedMoves.length - 1];
        const originalMove = originalMoves?.[originalMoves.length - 1];
        if (
            manipulatedMove.index !== originalMove.index ||
            manipulatedMove.value !== originalMove.value
        ) {
            const manipulatedMovesCopy = [...manipulatedMoves];
            const redoMove = { ...originalMoves[manipulatedMovesCopy.length] };
            manipulatedMovesCopy.push({ ...redoMove });
            const puzzleSnap = { ...puzzle };
            const newPuzzleSnap = {
                quizzes:
                    puzzleSnap?.quizzes?.slice(0, redoMove.index) +
                    `${redoMove.value}` +
                    puzzleSnap?.quizzes?.slice(redoMove.index + 1),
                solutions: puzzleSnap?.solutions,
            };
            const updatedNumMoves = numMoves + 1;
            setPuzzle(newPuzzleSnap);
            setManipulatedMoves(manipulatedMovesCopy);
            setBlocksLeft((prevBlocks) => (prevBlocks || 0) - 1);
            setNumMoves(updatedNumMoves);
            setGameInStorage(
                newPuzzleSnap,
                originalMoves,
                manipulatedMovesCopy,
                updatedNumMoves
            );
        }
    }, [numMoves, puzzle, manipulatedMoves, originalMoves, setGameInStorage]);

    const handleValueChange = useCallback(
        (index: number, value: number | string) => {
            const puzzleSnap = { ...puzzle };
            let newOriginalMoves;
            let quizzes = puzzleSnap?.quizzes;
            // check for branching
            // when length of original is not same as manipulated
            // set original to track new branch
            if (originalMoves.length !== manipulatedMoves.length) {
                newOriginalMoves = [
                    ...originalMoves.slice(0, manipulatedMoves.length),
                    { index, value },
                ];
                const oldMoves = originalMoves.slice(manipulatedMoves.length);
                oldMoves.forEach((move) => {
                    quizzes =
                        quizzes?.slice(0, move.index) +
                        '0' +
                        quizzes?.slice(move.index + 1);
                });
                quizzes =
                    quizzes?.slice(0, index) +
                    `${value}` +
                    quizzes?.slice(index + 1);
            } else {
                newOriginalMoves = [...originalMoves, { index, value }];
                quizzes =
                    puzzleSnap?.quizzes?.slice(0, index) +
                    `${value}` +
                    puzzleSnap?.quizzes?.slice(index + 1);
            }
            const newPuzzleSnap = {
                quizzes,
                solutions: puzzleSnap?.solutions,
            };
            const newManipulatedMoves = [...manipulatedMoves, { index, value }];
            const updatedNumMoves = numMoves + 1;
            setPuzzle(newPuzzleSnap);
            setOriginalMoves(newOriginalMoves);
            setManipulatedMoves(newManipulatedMoves);
            setNumMoves(updatedNumMoves);
            setBlocksLeft((prevBlocksLeft) => (prevBlocksLeft || 0) - 1);
            setIsGameInProgress(true);
            setGameInStorage(
                newPuzzleSnap,
                newOriginalMoves,
                newManipulatedMoves,
                updatedNumMoves
            );
        },
        [puzzle, originalMoves, manipulatedMoves, setGameInStorage, numMoves]
    );

    useEffect(() => {
        if (isGameInProgress) {
            const {
                puzzle = null,
                originalMoves = [],
                manipulatedMoves = [],
                numMoves = 0,
            } = JSON.parse(
                localStorage.getItem('sudokuGameProgress') || '{}'
            ) || {};
            setPuzzle(() => puzzle);
            setOriginalMoves(() => originalMoves);
            setManipulatedMoves(() => manipulatedMoves);
            setNumMoves(numMoves);
            calcBlocksLeft(puzzle);
        }
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
                    disabled={
                        originalMoves?.length <= 0 ||
                        (manipulatedMoves?.[manipulatedMoves.length - 1]
                            ?.index ===
                            originalMoves?.[originalMoves.length - 1].index &&
                            manipulatedMoves?.[manipulatedMoves.length - 1]
                                ?.value ===
                                originalMoves?.[originalMoves.length - 1].value)
                    }
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
