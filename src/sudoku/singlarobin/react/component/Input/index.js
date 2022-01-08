import classes from './styles.module.css';

const Input = (props) => {
    const { index, value, handleInputChange } = props;

    const handleChange = e => handleInputChange(e.target.value, index);
    return (
        <input className={classes.wrapper} type='text' value={value} maxLength={1} onChange={handleChange} />
    );
};

export default Input;

