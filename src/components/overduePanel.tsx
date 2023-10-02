"use client"
import overdue from "@/public/images/overdue.png";
import addNewImg from "@/public/images/add-new.png";
import editImg from "@/public/images/edit.png";
import deleteImg from "@/public/images/delete.png";
import { Task } from "../types";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import { useTaskContext } from "@/context/TastContext";
import TaskItem from "./TaskItem";


const OverduePanel = () => {
  const {tasks,addTask} = useTaskContext();
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
      <Droppable droppableId="overdue">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="border p-5 shadow-md rounded-md mt-4"
          >
            {overdueTask.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="my-3">
                    <TaskItem task={task} isDragging={snapshot.isDragging}                   />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default OverduePanel;
