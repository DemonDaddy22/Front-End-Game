import React from 'react';
import Input from '../Input';
import classes from './styles.module.css';

const PlayArea = (props) => {
    const { game, updatePlayArea } = props;

    const handleInputChange = (value, index) => {
        game[index] = parseInt(value);
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
                        handleInputChange={handleInputChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayArea;
