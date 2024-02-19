import React, { useEffect } from 'react';
// hooks
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useRecoilState } from 'recoil';

// state
import { tasksState } from '../../store/atom';
import { TaskInterface } from '../../store/data';

// components
import { Paper, TextInput, Select, Textarea, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { dateParser } from '../../utils/functions';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import classes from '../../style.module.scss';

type FormInputsProps = {
    taskId: string;
};

export const FormInputs = ({ taskId }: FormInputsProps) => {
    const navigate = useNavigate();
    const [tasksList, setTasksList] = useRecoilState(tasksState);

    const taskItem = tasksList.find((task: TaskInterface) => task.taskId === taskId);

    const getInitValues = () => {
        return taskItem
            ? {
                  ...taskItem,
                  deadline: taskItem.deadline ? dayjs(taskItem.deadline).toDate() : '',
              }
            : {
                  taskId: uuidv4(),
                  number: tasksList.length ? tasksList[tasksList.length - 1].number + 1 : 1,
                  taskHeader: '',
                  author: '',
                  deadline: new Date(),
                  status: '',
                  description: '',
              };
    };

    const form = useForm({
        initialValues: getInitValues(),
        validate: {
            taskHeader: (value) => (value.length < 5 ? 'Task name must have at least 5 letters' : null),
            author: (value) => (value.length < 2 ? 'Author name must have at least 2 letters' : null),
            deadline: (value) =>
                value ? (dayjs(value).isSameOrAfter(dayjs(), 'date') ? null : "Deadline can't be in the past") : null,
        },
    });

    useEffect(() => {
        form.reset();
        if (taskId && !taskItem) {
            navigate('/home');
        }
    }, []);

    const deleteTask = () => {
        setTasksList((prev: TaskInterface[]) => {
            return prev.filter((task) => {
                return task.taskId !== taskId;
            });
        });
        navigate('/home');
    };

    const handleSubmit = () => {
        const value = form.values;

        if (taskId) {
            setTasksList((prev: TaskInterface[]) =>
                prev.map((task: TaskInterface) => {
                    if (task.taskId === taskId) {
                        return value;
                    } else {
                        return task;
                    }
                }),
            );
        } else {
            setTasksList((prev: TaskInterface[]) => [...prev, value]);
        }

        form.reset();
        navigate('/home');
    };
    return (
        <Paper>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    mt="md"
                    required
                    placeholder="Print task label"
                    label="Task Name"
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps('taskHeader')}
                />
                <TextInput
                    mt="md"
                    required
                    placeholder="Print task label"
                    label="Author Name"
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps('author')}
                />

                <DateInput
                    clearable
                    minDate={new Date()}
                    dateParser={dateParser}
                    valueFormat="DD/MM/YYYY"
                    label="Deadline Date"
                    placeholder="Deadline"
                    mt="md"
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps('deadline')}
                />
                <Select
                    required
                    mt="md"
                    label="Task Status"
                    placeholder="Pick status"
                    data={['Not started', 'In progress', 'Completed']}
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps('status')}
                />

                <Textarea
                    mt="md"
                    placeholder="Describe the task"
                    label="Description"
                    autosize
                    minRows={4}
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps('description')}
                />

                <Button mt="md" color="blue" type="submit">
                    Save
                </Button>

                {taskId && (
                    <Button ml="md" mt="md" color="red" type="button" onClick={deleteTask}>
                        Delete
                    </Button>
                )}
            </form>
        </Paper>
    );
};
