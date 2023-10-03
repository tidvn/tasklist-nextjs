"use client"
import inprogress from "@/public/images/inprogress.png";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import TaskItem from "@/components/Task/TaskItem";
import { useTaskContext } from "@/context/TaskContextProvider";
const DoingPanel = () => {
  const {tasks,addTask,error,isLoading} = useTaskContext();
  if(error){
    return "error ..."
  }
  if(isLoading){
    return "loading ..."
  }
  if(tasks){
    const doingTask = tasks?.doing
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
  }

};

export default DoingPanel;
