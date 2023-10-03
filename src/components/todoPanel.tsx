import todoImg from "@/public/images/todo.png";
import addNewImg from "@/public/images/add-new.png";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import { useTaskContext } from "@/context/TaskContextProvider";
import TaskItem from "@/components/Task/TaskItem";
import Button from '@mui/material/Button';



const TodoPanel = () => {
  const {tasks,addTask,error,isLoading} = useTaskContext();
  if(error){
    
    return "error ..."
  }
  if(isLoading){
    return "loading ..."
  }
  if (tasks){
    const todoTask = tasks.todo
    return (
      <div className="w-[26rem]">
        <div>
          <div className="flex items-center gap-2">
            <Image className="w-10" src={todoImg} alt="todo Img" />
            <h1 className="text-xl font-bold text-slate-700">Todo</h1>
            <h4 className="text-xl font-bold bg-slate-200 px-2 rounded-md text-slate-600">
              {todoTask.length}
            </h4>
          </div>
        </div>
        <Droppable droppableId="todo">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border p-5 shadow-md rounded-md mt-4"
            >
              {todoTask.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="my-3">
                     <TaskItem task={task} isDragging={snapshot.isDragging}                   />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button
              onClick={addTask}
              variant="outlined" className="w-full">
                <span className="text-2xl">+</span> New
                </Button>
            </div>
          )}
        </Droppable>
      </div>
    );
  }

};

export default TodoPanel;
