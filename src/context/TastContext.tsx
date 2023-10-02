"use client"
import React, { createContext, useContext, useState } from "react";
import useTask from "@/hooks/useTask";
import { Task, TasksState } from "@/types/index";
import { DropResult } from "react-beautiful-dnd";
import Alert from "@mui/material/Alert";
import { AlertColor, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Định nghĩa các kiểu cho context và context provider

interface TaskContextProps {
  tasks: TasksState;
  showAlert: (severity: AlertColor, content: string) => void;
  addTask: () => void;
  updateTask: ( id: string, key: keyof TasksState, data: Task ) => void;
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
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {

  const [alertContent, setAlertContent] = useState<{ severity: AlertColor; content: string } | null>(null);

  const taskContext = useTask();

  const showAlert = (severity: AlertColor, content: string) => {
    setAlertContent({ severity, content });
    setTimeout(() => {
      setAlertContent(null);
    }, 1500); 
  };

  return (
    <TaskContext.Provider value={{ ...taskContext, showAlert }}>
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
