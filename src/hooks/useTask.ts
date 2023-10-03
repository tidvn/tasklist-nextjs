"use client"
import { useEffect, useState } from "react";
import { Task, TasksState } from "@/types/index";
import { fakeTasks } from "@/data/index";
import Swal from "sweetalert2";
import { DropResult } from "react-beautiful-dnd";
import { dbaddTask, dbgetTask } from "@/database/taskService";
import useSWR from "swr";

const useTask = async () => {
  const [listTask, setListTask] = useState<TasksState>({
    todo:[],
    doing:[],
    done:[],
    overdue:[]
  });
   const result = (await dbgetTask()).data
   console.log(result)
  const tasksWithId : any = result.map((task:any) => {
    const { _id, ...rest } = task;
    return { id: _id.toHexString(), ...rest };
  });
  const tasksState: TasksState = {
    todo: tasksWithId.filter((task:any) => task.status === "todo"),
    doing: tasksWithId.filter((task:any) => task.status === "doing"),
    done: tasksWithId.filter((task:any) => task.status === "done"),
    overdue: tasksWithId.filter((task:any) => task.status === "overdue"),
  };
  console.log(tasksState)
  // const { data, error, isValidating } = useSWR(dbgetTask)
  // useEffect(() => {
  // }, [data]);
  const addTask = async () => {
    const newTask: Task = {
      id: "",
      title: "Untitled",
      description: "",
      deadline: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)),
      priority: "low",
      status: "todo",
      tags: [],
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

  const updateTask = (id: string, oldStatus: keyof TasksState, data: Task) => {
    const taskToUpdateIndex = listTask[oldStatus].findIndex((task) => task.id === id);
    if (taskToUpdateIndex !== -1) {
      if (oldStatus !== data.status) {
        const deleteOldStatus = listTask[oldStatus].filter((task) => task.id !== id);
        const updatedNewStatus = [...listTask[data.status], data];
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


  const deleteTask = (deleteId: string, key: keyof typeof listTask) => {

    const filteredTask = listTask[key].filter((task) => task.id !== deleteId);
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

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const copiedState = { ...listTask };
    const sourceList = copiedState[result.source.droppableId as keyof typeof listTask];
        const { removedItem, newSourceList } = removeFromList(sourceList, result.source.index);
    copiedState[result.source.droppableId as keyof typeof listTask] = newSourceList;
    const destinationList = copiedState[result.destination.droppableId as keyof typeof listTask];
    copiedState[result.destination.droppableId as keyof typeof listTask] = addToList(destinationList, result.destination.index, removedItem);

    setListTask(copiedState);
  }

  return {
    tasks: listTask,
    addTask,
    updateTask,
    deleteTask,
    handleOnDragEnd
  }
}

export default useTask;