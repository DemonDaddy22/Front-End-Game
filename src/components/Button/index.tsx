import classes from './styles.module.scss';

const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    children,
    style = {},
    className,
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={style}
        className={`${classes.button} ${className}`}
    >
        {children}
    </button>
);

export default Button;
