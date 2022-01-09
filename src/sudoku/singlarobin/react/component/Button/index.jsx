import classes from './styles.module.css';

const Button = (props) => {
    const { children, style, handleClick } = props;
    return (
        <button className={classes.button} style={style} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
