import classes from './styles.module.css';
import Button from '../Button';

const Feature = (props) => {
    const { handleUndo, handleRedo, handleReset } = props;

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttonWrapper}>
                <Button handleClick={handleReset}>RESET</Button>
            </div>
            <div className={classes.buttonWrapper}>
                <Button handleClick={handleUndo}>UNDO</Button>
            </div>
            <div className={classes.buttonWrapper}>
                <Button handleClick={handleRedo}>REDO</Button>
            </div>
        </div>
    );
};

export default Feature;
