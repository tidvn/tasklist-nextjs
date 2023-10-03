"use client"
import overdue from "@/public/images/overdue.png";
import addNewImg from "@/public/images/add-new.png";
import editImg from "@/public/images/edit.png";
import deleteImg from "@/public/images/delete.png";
import { Task } from "../types";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import { useTaskContext } from "@/context/TaskContextProvider";
import TaskItem from "@/components/Task/TaskItem";


const OverduePanel = () => {
  const {tasks,addTask,error,isLoading} = useTaskContext();
  if(error){
    return "error ..."
  }
  if(isLoading){
    return "loading ..."
  }
  if(tasks){
    const overdueTask = tasks.overdue

    return (
      <div className="w-[26rem]">
        <div>
          <div className="flex items-center gap-2">
            <Image alt="Img" className="w-10" src={overdue} />
            <h1 className="text-xl font-bold text-slate-700">Overdue</h1>
            <h4 className="text-xl font-bold bg-slate-200 px-2 rounded-md text-slate-600">
              {overdueTask.length}
            </h4>
          </div>
        </div>
        <div className="border p-5 shadow-md rounded-md mt-4" >
              {overdueTask.map((task, index) => (
                
                    <div  className="my-3">
                      <TaskItem task={task} isDragging={false} />
                    </div>
                 
              ))}
            </div>
      </div>
    );
  }

};

export default OverduePanel;
