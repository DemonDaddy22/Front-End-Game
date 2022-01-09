import classes from './styles.module.css';
import Button from '../../../../../components/Button';

const Feature = (props) => {
    const { handleUndo, handleRedo, handleReset } = props;

    return (
        <div className={classes.wrapper}>
            <Button
                style={{ backgroundColor: 'transparent' }}
                onClick={handleReset}
            >
                RESET
            </Button>
            <Button
                style={{ backgroundColor: 'transparent' }}
                onClick={handleUndo}
            >
                UNDO
            </Button>
            <Button
                style={{ backgroundColor: 'transparent' }}
                onClick={handleRedo}
            >
                REDO
            </Button>
        </div>
    );
};

export default Feature;
