import classes from './styles.module.css';
import Button from '../../../../../components/Button';

const Feature = (props) => {
    const { handleUndo, handleRedo, handleReset } = props;

    return (
        <div className={classes.wrapper}>
            <Button className={classes.button} onClick={handleReset}>
                RESET
            </Button>
            <Button className={classes.button} onClick={handleUndo}>
                UNDO
            </Button>
            <Button className={classes.button} onClick={handleRedo}>
                REDO
            </Button>
        </div>
    );
};

export default Feature;
