import classes from './styles.module.css';

const Input = (props) => {
    const { index, value, handleInputChange } = props;

    const handleChange = (e) => {
        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        const targetValue = e.target.value || 0;
        sudoku[2]['undo'].push({
            index,
            prev: value,
            current: targetValue,
        });
        localStorage.setItem('sudoku', JSON.stringify(sudoku));
        handleInputChange(targetValue, index);
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
