import classes from './styles.module.css';

const Input = (props) => {
    const {key, value, handleInputChange} = props;

    const handleChange = e => handleInputChange(e.target.value, key);
    return (
        <input type='text' value={value} maxLength={1} onChange={handleChange} />
    );
};

export default Input;

