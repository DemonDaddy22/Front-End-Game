import React from 'react';
import classes from './styles.module.css';
import Header from '../header';
import Generate from '../generate';

const Page = () => {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Generate />
        </div>
    );
};

export default Page;
