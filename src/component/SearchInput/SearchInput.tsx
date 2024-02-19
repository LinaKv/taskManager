import React from 'react';
import { useSetRecoilState } from 'recoil';
import { stateFilterSearch } from '../../store/atom';
import { useDebouncedState } from '@mantine/hooks';
import { TextInput } from '@mantine/core';
import classes from './style.module.scss';

function SearchInput() {
    const setSearchFilter = useSetRecoilState(stateFilterSearch);
    const [value, setValue] = useDebouncedState('', 300);

    React.useEffect(() => {
        setSearchFilter(value);
    }, [value]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    return (
        <div className="searchWrapper">
            <TextInput
                classNames={{
                    input: classes.inputGreyRounded,
                }}
                placeholder="Search tasks by name"
                defaultValue={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchInput;
