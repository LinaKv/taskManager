import { atom, selector } from 'recoil';
import { TaskInterface } from './data';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function getDataFromLocalStorage(key: string) {
    try {
        const storedData = localStorage.getItem(key);
        const parsedData = storedData ? JSON.parse(storedData) : [];

        return parsedData;
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return [];
    }
}

const localStorageEffect =
    (key: string) =>
    // @ts-ignore
    ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }
        // @ts-ignore
        onSet((newValue, _, isReset) => {
            isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

// INITIAL VALUE
export const tasksState = atom<TaskInterface[]>({
    key: 'tasksState',
    default: getDataFromLocalStorage('current_tasks'),
    effects: [localStorageEffect('current_tasks')],
});

// FILTER VALUE TASK NAME
export const stateFilterSearch = atom({
    key: 'stateFilter',
    default: '',
});

// FILTER VALUE AUTHOR
export const stateFilterAuthor = atom({
    key: 'authorFilter',
    default: '',
});

export const stateFilterFromDate = atom<Date | null>({
    key: 'dateFilterFrom',
    default: null,
});

export const stateFilterToDate = atom<Date | null>({
    key: 'dateFilterTo',
    default: null,
});

// THIS IS VALUE
export const filteredTask = selector({
    key: 'filteredTask',
    get: ({ get }) => {
        const filterTaskName = get(stateFilterSearch);
        const filterAuthor = get(stateFilterAuthor);
        const filterDateFrom = get(stateFilterFromDate);
        const filterDateTo = get(stateFilterToDate);
        const list = get(tasksState);

        return list?.filter((task: TaskInterface) => {
            const authorFilter = !filterAuthor || task.author.toLocaleLowerCase() === filterAuthor.toLocaleLowerCase();
            const taskNameFilter =
                !filterTaskName || task.taskHeader.toLocaleLowerCase().includes(filterTaskName.toLocaleLowerCase());

            const deadline = dayjs(task.deadline);

            const dateFromFilter = !filterDateFrom || deadline.isSameOrAfter(dayjs(filterDateFrom));
            const isBetweenOrBefore =
                filterDateTo && filterDateFrom
                    ? deadline.isBetween(dayjs(filterDateFrom), dayjs(filterDateTo))
                    : deadline.isSameOrBefore(dayjs(filterDateTo), 'date');
            const dateToFilter = !filterDateTo || isBetweenOrBefore;

            const deadlineFilter = dateFromFilter && dateToFilter;

            return authorFilter && taskNameFilter && deadlineFilter;
        });
    },
});
