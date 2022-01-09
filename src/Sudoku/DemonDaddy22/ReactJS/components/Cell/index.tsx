import React, { useCallback } from 'react';
import classes from './styles.module.scss';

const Cell: React.FC<Cell> = ({ index, data, onChange }) => {
    const handleOnChange = useCallback(
        (e: any) => {
            const value = e.currentTarget.value;
            if (data == 0 && value > 0 && value < 10) {
                onChange(index, value);
            }
        },
        [data, index, onChange]
    );

    return (
        <input
            onChange={handleOnChange}
            className={classes.cell}
            type="text"
            value={data != 0 ? data : ''}
            disabled={data != 0}
        />
    );
};

export default Cell;
