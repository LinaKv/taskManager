import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { DeadlineDate } from '../component/DeadlineDate/DeadlineDate';

jest.mock('dayjs', () => {
    const originalDayjs = jest.requireActual('dayjs');
    return {
        default: jest.fn((...args) => originalDayjs(...args)),
        extend: jest.fn(),
        isSameOrAfter: jest.fn(),
        isBetween: jest.fn(),
        isSameOrBefore: jest.fn(),
    };
});
describe('DeadlineDate', () => {
    beforeEach(() => {
        render(
            <RecoilRoot>
                <DeadlineDate />
            </RecoilRoot>,
        );
    });

    test('renders "Deadline From" date input', () => {
        expect(screen.getByLabelText('Deadline From')).toBeInTheDocument();
    });

    test('renders "Deadline To" date input', () => {
        expect(screen.getByLabelText('Deadline To')).toBeInTheDocument();
    });

    test('clears "Deadline From" date input', () => {
        userEvent.type(screen.getByLabelText('Deadline From'), '01/01/2023');
        userEvent.click(screen.getByTitle('Clear'));
        expect(screen.getByLabelText('Deadline From')).toHaveValue('');
    });

    test('clears "Deadline To" date input', () => {
        userEvent.type(screen.getByLabelText('Deadline To'), '31/12/2023');
        userEvent.click(screen.getByTitle('Clear'));
        expect(screen.getByLabelText('Deadline To')).toHaveValue('');
    });
});
