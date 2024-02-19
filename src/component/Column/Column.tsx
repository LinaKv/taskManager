import { useRecoilValue } from 'recoil';
import { filteredTask } from '../../store/atom';
import Task from '../Task/Task';
import classes from './style.module.scss';

type ColumnProps = {
    header: string;
};

function Column({ header }: ColumnProps) {
    const tasks = useRecoilValue(filteredTask);

    return (
        <div className={classes.columnWrapper}>
            <div className={classes.columnHeader}>{header}</div>
            <div className={classes.columnContainer}>
                {tasks?.map((task) => task.status === header && <Task taskInfo={task} key={task.taskId} />)}
            </div>
        </div>
    );
}

export default Column;
