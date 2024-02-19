import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stateFilterAuthor, tasksState } from '../../store/atom';
import { Select } from '@mantine/core';
import { getUniqueArray } from '../../utils/functions';
import classes from './style.module.scss';

export function AuthorFilter() {
    const setSearchFilter = useSetRecoilState(stateFilterAuthor);
    const tasks = useRecoilValue(tasksState);

    const onChange = (value: string | null) => {
        setSearchFilter(value ? value : '');
    };

    const authors = useMemo(() => getUniqueArray(tasks?.map((task) => task.author)), [tasks]);

    return (
        <Select
            comboboxProps={{ withinPortal: true }}
            data={authors}
            label="Author"
            placeholder="Pick Author"
            searchable
            clearable
            classNames={{
                input: classes.input,
            }}
            onChange={(value) => onChange(value)}
        />
    );
}
