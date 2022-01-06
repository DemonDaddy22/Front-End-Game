interface Sudoku {
    quizzes?: string;
    solutions?: string;
}

interface Cell {
    index: number;
    data?: number | string;
    onChange: (...args: any[]) => any;
}

interface Move {
    index: number;
    value: number | string;
}