import { DateInputProps } from '@mantine/dates';
import dayjs from 'dayjs';

export const dateParser: DateInputProps['dateParser'] = (input) => {
    if (input === 'WW2') {
        return new Date(1939, 8, 1);
    }

    return dayjs(input, 'DD/MM/YYYY').toDate();
};

export const getUniqueArray = (array: any[] = []) => {
    return Array.from(new Set<string>(array));
};
