import { create } from 'zustand';

export interface ITask {
    id: number;
    title: string;
    description: string;
    completed: boolean
}

interface ITaskStore {
    tasks: ITask[];
    addNewTask: (task: ITask) => void;
    deleteTask: (id: number) => void;
    changeStatus: (id: number, newStatus: boolean) => void
}

export const useTaskStore = create<ITaskStore>((set) => ({
    tasks: [],
    addNewTask: (task: ITask) => set((state) => ({...state, tasks: [task, ...state.tasks]})),
    deleteTask: (id: number) => set((state) => ({ ...state, tasks: state.tasks.filter((item: ITask) => item.id !== id)})),
    changeStatus: (id: number, newStatus: boolean) => set((state) => ({...state, tasks: state.tasks.map((item: ITask) => item.id === id ? {...item, completed: newStatus} : item)}))
}));
