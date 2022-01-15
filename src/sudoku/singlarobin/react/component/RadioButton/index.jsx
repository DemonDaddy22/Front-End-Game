import classes from './styles.module.css';

const RadioButton = (props) => {
    const { label, checked, handleRadioButtonChange } = props;

    const handleChange = (e) => handleRadioButtonChange(e.target.value);

    return (
        <div className={classes.wrapper}>
            <input
                type="radio"
                value={label}
                checked={checked === label}
                onChange={handleChange}
            />
            <label className={classes.label}>{label}</label>
        </div>
    );
};

export default RadioButton;
