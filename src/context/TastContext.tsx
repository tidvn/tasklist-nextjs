"use client"
import React, { createContext, useContext } from "react";
import useTask from "@/hooks/useTask";
import { Task, TasksState } from "@/types/index";
import { DropResult } from "react-beautiful-dnd";

// Định nghĩa các kiểu cho context và context provider

interface TaskContextProps {
  tasks: TasksState;
  addTask: (newTask: Task) => void;
  updateTask: (params: { id: string; key: keyof TasksState; data: Task }) => void;
  deleteTask: (deleteId: string, key: keyof TasksState) => void;
  handleOnDragEnd: (result: DropResult) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Tạo một custom hook để sử dụng context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

// Tạo một Provider component để cung cấp dữ liệu cho các component con
export const TaskProvider = ({ children }:{children: React.ReactNode}) => {
    const taskContext = useTask();
  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>;
};
