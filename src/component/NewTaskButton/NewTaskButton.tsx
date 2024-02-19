import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import classes from './style.module.scss';

function NewTaskButton() {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/home/newTask');
    };
    return (
        <Button className={classes.newTaskButton} variant="filled" onClick={onClick}>
            Add a new task
        </Button>
    );
}

export default NewTaskButton;
