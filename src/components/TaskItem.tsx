import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useTaskContext } from '@/context/TastContext';
import { Task } from '../types';
import addNewImg from "@/public/images/add-new.png";
import editImg from "@/public/images/edit.png";
import deleteImg from "@/public/images/delete.png";
function TaskItem({ task, isDragging}:{task:Task,isDragging:boolean}) {
  const {tasks, addTask, updateTask, deleteTask} = useTaskContext();

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateState, setUpdateState] = useState({ id: task.id, title: task.title });
  const UpdateInputRef = useRef(null);

  const toggleUpdateMode = () => {
    setIsUpdate(!isUpdate);
  };
//  const handleUpdateTask = ({id,event}: {id: string;event: React.KeyboardEvent<HTMLElement>}) => {
//     if (event.key === "Enter") {
//       if (updateState?.title === "") return;
//       if (!updateState) return;
//       updateTask({ id, task.status , data: updateState });
//       setIsUpdate(false);
//     }
//   };
  return (
    <div className={`${isUpdate ? 'flex' : ''} ${isDragging ? 'border-2 border-teal-500 shadow-md shadow-green-100' : ''} justify-between px-4 bg-slate-50 py-3 capitalize rounded-lg`}>
      {isUpdate ? (
        <div className="flex w-full items-center my-3 border">
          <Image alt="Img" className="w-6 ml-3 mr-3" src={addNewImg} />
          <input
            className="outline-none bg-slate-50 pl-3 py-2 w-full"
            type="text"
            ref={UpdateInputRef}
            onChange={(e) =>
              setUpdateState({
                ...updateState,
                title: e.target.value,
              })
            }
            value={updateState.title}
            // onKeyDown={(e) => handleUpdateTask({ id: task.id, event: e })}
            placeholder="Type a Name..."
          />
          <button
            onClick={toggleUpdateMode}
            className="px-3 py-2 bg-red-100 font-bold text-red-500 text-center"
          >
            X
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-lg">{task.title}</h2>
          <div className="flex gap-6 items-center">
            <Image
              alt="Edit Icon"
              // onClick={() => handleIsUpdate(task)}
              className="w-5 cursor-pointer"
              src={editImg}
            />
            <Image
              alt="Delete Icon"
              // onClick={() => deleteTask(task.id, "progress")}
              className="w-5 cursor-pointer"
              src={deleteImg}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
