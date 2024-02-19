import { Outlet } from 'react-router-dom';
import Column from '../../component/Column/Column';
import NewTaskButton from '../../component/NewTaskButton/NewTaskButton';
import SearchInput from '../../component/SearchInput/SearchInput';
import { AuthorFilter } from '../../component/AuthorFilter/AuthorFilter';
import { DeadlineDate } from '../../component/DeadlineDate/DeadlineDate';
import classes from './style.module.scss';

function MainPage() {
    return (
        <>
            <div className={classes.mainPageWrapper}>
                <div className={classes.mainPageHeader}>
                    <div className={classes.settingsWrapper}>
                        <SearchInput />
                        <div className={classes.settings}>
                            <DeadlineDate />
                            <AuthorFilter />
                        </div>
                    </div>
                    <div className={classes.newTaskWrapper}>
                        <NewTaskButton />
                    </div>
                </div>
                <div className={classes.mainPageContent}>
                    <Column header="Not started" />
                    <Column header="In progress" />
                    <Column header="Completed" />
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default MainPage;
