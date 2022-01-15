import Input from '../Input';
import classes from './styles.module.css';

const PlayArea = (props) => {
    const { game, solution, updatePlayArea } = props;

    const handleInputChange = (value, index) => {
        game[index] = parseInt(value);
        let sudoku = JSON.parse(localStorage.getItem('sudoku'));
        sudoku[1]['game'][index] = parseInt(value);
        localStorage.setItem('sudoku', JSON.stringify(sudoku));

        const element = document.getElementById(`${index}`);
        if (solution[index] !== parseInt(value)) {
            element.style.color = 'red';
        } else {
            element.style.color = 'black';
        }
        updatePlayArea(game, index);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.gameWrapper}>
                {game.map((item, index) => (
                    <Input
                        key={index}
                        value={item}
                        index={index}
                        solution={solution}
                        handleInputChange={handleInputChange}
                    />
                ))}
                <div
                    style={{
                        height: '0.5px',
                        width: '315px',
                        backgroundColor: 'black',
                    }}
                />
            </div>
        </div>
    );
};

export default PlayArea;
