"use client"
import inprogress from "@/public/images/inprogress.png";
import { useEffect, useRef, useState } from "react";
import { Task } from "../types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import TaskItem from "./TaskItem";
import { useTaskContext } from "@/context/TastContext";

// interface PropTypes {
//   tasks: Task[];
//   updateTask: ({
//     id,
//     key,
//     data,
//   }: {
//     id: string;
//     key: "doing";
//     data: Task;
//   }) => void;
//   deleteTask: (id: string, key: "doing") => void;
// }

const DoingPanel = () => {
  const {tasks,addTask} = useTaskContext();
  const doingTask = tasks.doing
  // const { tasks, updateTask, deleteTask } = props;
  // const [isUpdate, setIsUpdate] = useState<boolean>(false);
  // const [updateState, setUpdateState] = useState<Task>();
  // const UpdateInputRef = useRef<HTMLInputElement | null>(null);

  // const handleUpdateTask = ({
  //   id,
  //   event,
  // }: {
  //   id: string;
  //   event: React.KeyboardEvent<HTMLElement>;
  // }) => {
  //   if (event.key === "Enter") {
  //     if (updateState?.title === "") return;
  //     if (!updateState) return;
  //     updateTask({ id, key: "doing", data: updateState });
  //     setIsUpdate(false);
  //   }
  // };

  // const handleIsUpdate = (item: Task) => {
  //   setIsUpdate(true);
  //   setUpdateState(item);
  // };

  // useEffect(() => {
  //   if (isUpdate) return UpdateInputRef.current?.focus();
  // }, [isUpdate]);

  return (
    <div className="w-[26rem]">
      <div>
        <div className="flex items-center gap-2">
          <Image alt="Img" className="w-10" src={inprogress} />
          <h1 className="text-xl font-bold text-slate-700">In doing</h1>
          <h4 className="text-xl font-bold bg-slate-200 px-2 rounded-md text-slate-600">
            {doingTask.length}
          </h4>
        </div>
      </div>
      <Droppable droppableId="doing">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="border p-5 shadow-md rounded-md mt-4">
            {doingTask.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className="my-3">
                    <TaskItem
                      task={task}
                      isDragging={snapshot.isDragging}
                    />
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

export default DoingPanel;
