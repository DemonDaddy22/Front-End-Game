const generateSudoku = () => {
    let arr = [];
    for (let i = 0; i < 9; i++) {
        arr = [
            ...arr,
            ...Array.from(Array(9).keys(), (element) => element + 1),
        ];
    }
    return arr;
};

export { generateSudoku };
