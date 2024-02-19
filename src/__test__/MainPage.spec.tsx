import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';

describe('MainPage', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>,
        );
    });

    test('renders search input', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders new task button', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('renders column headers', () => {
        expect(screen.getByText('Not started')).toBeInTheDocument();
        expect(screen.getByText('In progress')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    test('renders deadline date filter', () => {
        expect(screen.getByTestId('deadline-date')).toBeInTheDocument();
    });

    test('renders author filter', () => {
        expect(screen.getByTestId('author-filter')).toBeInTheDocument();
    });
});
