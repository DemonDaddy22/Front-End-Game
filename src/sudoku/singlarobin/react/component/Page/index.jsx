import classes from './styles.module.css';
import Header from '../Header';
import Generate from '../Generate';

const Page = () => {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Generate />
        </div>
    );
};

export default Page;
