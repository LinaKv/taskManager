import { useSetRecoilState } from 'recoil';
import { stateFilterFromDate, stateFilterToDate } from '../../store/atom';
import { DateInput } from '@mantine/dates';
import { dateParser } from '../../utils/functions';
import classesComponent from './style.module.scss';
import classes from '../../style.module.scss';

export function DeadlineDate() {
    const setDateFromFilter = useSetRecoilState(stateFilterFromDate);
    const setDateToFilter = useSetRecoilState(stateFilterToDate);

    const onChangeFrom = (value: Date | null) => {
        setDateFromFilter(value);
    };

    const onChangeTo = (value: Date | null) => {
        setDateToFilter(value);
    };

    return (
        <div className={classesComponent.datesWrapper}>
            <DateInput
                clearable
                dateParser={dateParser}
                valueFormat="DD/MM/YYYY"
                label="Deadline From"
                placeholder="Deadline"
                onChange={onChangeFrom}
                classNames={{
                    input: classes.input,
                }}
            />
            <DateInput
                clearable
                dateParser={dateParser}
                valueFormat="DD/MM/YYYY"
                label="Deadline To"
                placeholder="Deadline"
                onChange={onChangeTo}
                classNames={{
                    input: classes.input,
                }}
            />
        </div>
    );
}
