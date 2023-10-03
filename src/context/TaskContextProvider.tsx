"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { Task, TasksState } from "@/types/index";
import { DropResult } from "react-beautiful-dnd";
import { dbaddTask, dbgetTask, dbdeleteTask, dbupdateTask } from "@/database/taskService";
import useSWR from "swr";
import Alert from "@mui/material/Alert";
import { AlertColor, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface TaskContextProps {
    tasks: TasksState;
    error: any;
    isLoading: boolean;
    showAlert: (severity: AlertColor, content: string) => void;
    addTask: () => void;
    updateTask: (id: string, key: keyof TasksState, data: Task) => void;
    deleteTask: (deleteId: string, key: keyof TasksState) => void;
    handleOnDragEnd: (result: DropResult) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [alertContent, setAlertContent] = useState<{ severity: AlertColor; content: string } | null>(null);

    const { data, error, isLoading } = useSWR('/task', dbgetTask);

    const [listTask, setListTask] = useState<TasksState>({
        todo: [],
        doing: [],
        done: [],
        overdue: [],
    });

    useEffect(() => {
        if (error) {
            setAlertContent({ severity: "error", content: "Error fetching data" });
        } else if (!isLoading) {
            setAlertContent(null);
            if (data?.success) {
                const tasks = data.data;
                setListTask({
                    todo: tasks.todo || [],
                    doing: tasks.doing || [],
                    done: tasks.done || [],
                    overdue: tasks.overdue || [],
                });
            }
        }
    }, [data, error, isLoading]);

    const showAlert = (severity: AlertColor, content: string) => {
        setAlertContent({ severity, content });
        setTimeout(() => {
            setAlertContent(null);
        }, 1500);
    };

    const addTask = async () => {
        const newTask: Task = {
            id: "",
            title: "Untitled",
            description: "text here",
            deadline: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)),
            priority: "low",
            status: "todo",
            tags: ['none'],
            estimatedTime: 0,
            completionPercentage: 0,
        };
        const res = await dbaddTask(newTask);
        newTask.id = res.data
        setListTask({
            ...listTask,
            todo: [...listTask.todo, newTask],
        });
    };

    const updateTask = async (id: string, oldStatus: keyof TasksState, data: Task) => {
        const taskToUpdateIndex = listTask[oldStatus].findIndex((task) => task.id === id);
        const overdue = new Date(data.deadline) <= new Date()
        if (taskToUpdateIndex !== -1) {
            const result = await dbupdateTask(id,data)
            if (result.data != 1) {
                return
            }
            
            if (oldStatus !== data.status || overdue) {                
                const deleteOldStatus = listTask[oldStatus].filter((task) => task.id !== id);
                const updatedNewStatus = overdue ? "overdue" : [...listTask[data.status], data];
                setListTask((prevState) => ({
                    ...prevState,
                    [oldStatus]: deleteOldStatus,
                    [data.status]: updatedNewStatus,
                }));
            } else {
                listTask[oldStatus][taskToUpdateIndex] = data;
                setListTask({ ...listTask });
            }
        }
    };

    const deleteTask = async (deleteId: string, key: keyof typeof listTask) => {
        const filteredTask = listTask[key].filter((task) => task.id !== deleteId);
        const res = await dbdeleteTask(deleteId)
        if (res.data != 1) {
            return
        }
        setListTask({
            ...listTask,
            [key]: [...filteredTask],
        });
    };
    const removeFromList = (taskList: Task[], index: number) => {
        const copiedTaskList = Array.from(taskList);
        const [removedItem] = copiedTaskList.splice(index, 1);
        return { removedItem, newSourceList: copiedTaskList }
    }
    const addToList = (taskList: Task[], index: number, newTask: Task) => {
        const copiedTaskList = Array.from(taskList);
        copiedTaskList.splice(index, 0, newTask);
        return copiedTaskList;
    }
    const handleOnDragEnd = async (result: DropResult) => {
        if (!result.destination) return;
        const copiedState = { ...listTask };
        if(result.destination.droppableId === "overdue" ) result;
        const sourceList = copiedState[result.source.droppableId as keyof typeof listTask];
        const { removedItem, newSourceList } = removeFromList(sourceList, result.source.index);
        copiedState[result.source.droppableId as keyof typeof listTask] = newSourceList;
        const destinationList = copiedState[result.destination.droppableId as keyof typeof listTask];
        copiedState[result.destination.droppableId as keyof typeof listTask] = addToList(destinationList, result.destination.index, removedItem);
        const update: any = {
            ...removedItem,
            status: result.destination.droppableId,
        };

        const r = await dbupdateTask(result.draggableId, update);
        if (r.data !== 1) return;
        setListTask(copiedState);
    };

    const contextValue: TaskContextProps = {
        tasks: listTask,
        error,
        isLoading: isLoading,
        showAlert,
        addTask,
        updateTask,
        deleteTask,
        handleOnDragEnd,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
            {alertContent && (
                <Alert
                    variant="filled"
                    severity={alertContent.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertContent(null);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{
                        position: 'fixed',
                        top: 100,
                        right: '1%',
                        width: '20%',
                    }}
                >
                    {alertContent.content}
                </Alert>
            )}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
