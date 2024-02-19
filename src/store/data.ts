export type TaskInterface = {
    taskId: string;
    number: number;
    taskHeader: string;
    author: string;
    deadline: string | Date;
    status: string;
    description: string;
};
