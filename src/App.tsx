import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import MainPage from './pages/MainPage/MainPage';
import { TaskModal } from './component/TaskModal/TaskModal';
import './App.css';

function App() {
    return (
        <RecoilRoot>
            <MantineProvider>
                <Router>
                    <Routes>
                        <Route path="/home" element={<MainPage />}>
                            <Route path="/home/task/:taskId" element={<TaskModal />} />
                            <Route path="/home/newTask" element={<TaskModal />} />
                        </Route>
                        <Route path="/*" element={<Navigate to="/home" />} />
                    </Routes>
                </Router>
            </MantineProvider>
        </RecoilRoot>
    );
}

export default App;
