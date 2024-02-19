import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { FormInputs } from './FormInputs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const TaskModal = () => {
    const navigate = useNavigate();
    const { taskId = '' } = useParams();

    const onClose = () => {
        navigate('/home');
    };

    return (
        <Modal
            opened={true}
            onClose={onClose}
            title={taskId ? 'Change Task' : 'New Task'}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormInputs taskId={taskId} />
        </Modal>
    );
};
