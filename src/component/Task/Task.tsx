import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskInterface } from '../../store/data';
import dayjs from 'dayjs';
import classes from './style.module.scss';

type TaskProps = {
    taskInfo: TaskInterface;
};

function Task({ taskInfo }: TaskProps) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`task/${taskInfo.taskId}`);
    };
    return (
        <div className={classes.taskWrapper} onClick={onClick}>
            <div className={classes.taskHeader}>
                <div className={classes.taskNumber}>{taskInfo.number}</div>
                <div className={classes.taskName}>{taskInfo.taskHeader}</div>
            </div>
            <div className={classes.taskAuthor}>
                <p>Author:</p>
                <div className={classes.authorName}>{taskInfo.author}</div>
            </div>
            <div className={classes.taskSettings}>
                <div className={classes.deadlineWrapper}>
                    <p>Deadline:</p>
                    <div className={classes.taskDeadline}>
                        {taskInfo.deadline ? dayjs(taskInfo.deadline).format('DD/MM/YYYY') : 'none'}
                    </div>
                </div>
                <div className={classes.statusWrapper}>
                    <p>Status:</p>
                    <div className={classes.taskStatus}>{taskInfo.status}</div>
                </div>
            </div>
        </div>
    );
}

export default Task;
