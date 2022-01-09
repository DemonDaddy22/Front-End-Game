import classes from './styles.module.css';

const Input = (props) => {
    const { index, value, handleInputChange } = props;

    const handleChange = (e) => {
        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        if (e.target.value !== '') {
            sudoku[0][2]['undo'].push({
                index: index,
                prev: value,
                current: e.target.value,
            });
            localStorage.setItem('sudoku', JSON.stringify(sudoku));
            handleInputChange(e.target.value, index);
        } else {
            sudoku[0][2]['undo'].push({
                index: index,
                prev: value,
                current: 0,
            });
            localStorage.setItem('sudoku', JSON.stringify(sudoku));
            handleInputChange(0, index);
        }
    };

    return (
        <input
            className={classes.wrapper}
            id={index}
            type="text"
            maxLength={1}
            value={value === 0 ? '' : value + ''}
            onChange={handleChange}
        />
    );
};

export default Input;
