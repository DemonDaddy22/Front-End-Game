import classes from './styles.module.css';

const Input = (props) => {
    const { index, value, handleInputChange } = props;
    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value !== '') {
            handleInputChange(e.target.value, index);
        } else {
            handleInputChange(0, index);
        }
    };
    return (
        <input
            className={classes.wrapper}
            type="text"
            maxLength={1}
            value={value === 0 ? '' : value + ''}
            onChange={handleChange}
        />
    );
};

export default Input;
