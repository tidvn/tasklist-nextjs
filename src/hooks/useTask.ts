"use client"
import { useState } from "react";
import { Task, TasksState } from "@/types/index";
import { fakeTasks } from "@/data/index";
import Swal from "sweetalert2";
import { DropResult } from "react-beautiful-dnd";

const useTask = () => {
    const [state, setState] = useState<TasksState>(fakeTasks);

    const addTask = () => {
      const newTask: Task = {
        id:`${Math.floor(Math.random() * (999 - 100 + 1)) + 100}`,
        title: "Untitled",
        description: "",
        deadline: new Date(new Date().getTime()+(7*24*60*60*1000)),
        priority: "low",
        status: "todo",
        tags: [],
        estimatedTime: 0,
        completionPercentage: 0,
      };
      setState({
        ...state,
        todo: [...state.todo, newTask],
      });
    };
  
    const updateTask = (id: string, key: keyof TasksState, data: Task) => {
      let updateIndex = state[key].findIndex((task) => task.id === id);
      state[key][updateIndex] = data
      setState({...state})
    };
  
    const deleteTask = (deleteId: string, key: keyof typeof state) => {
      
          const filteredTask = state[key].filter((task) => task.id !== deleteId);
          setState({
            ...state,
            [key]: [...filteredTask],
          });
  
          
    };
  
    const removeFromList = (taskList: Task[], index: number) => {
      const copiedTaskList = Array.from(taskList);
      const [removedItem] = copiedTaskList.splice(index, 1);
      return {removedItem, newSourceList: copiedTaskList}
    }
  
    const addToList = (taskList: Task[], index: number, newTask: Task) => {
      const copiedTaskList = Array.from(taskList);
      copiedTaskList.splice(index, 0, newTask);
      return copiedTaskList;
    }
  
    const handleOnDragEnd = (result: DropResult) => {
      if(!result.destination) return;
      const copiedState = {...state};
      const sourceList = copiedState[result.source.droppableId as keyof typeof state];
      const {removedItem, newSourceList} = removeFromList(sourceList, result.source.index);
      copiedState[result.source.droppableId as keyof typeof state] = newSourceList;
  
      const destinationList = copiedState[result.destination.droppableId as keyof typeof state];
      copiedState[result.destination.droppableId as keyof typeof state] = addToList(destinationList, result.destination.index, removedItem);
  
      setState(copiedState);
    } 

    return {
        tasks: state,
        addTask,
        updateTask,
        deleteTask,
        handleOnDragEnd
    }
}

export default useTask;