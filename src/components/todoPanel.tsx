import todoImg from "@/public/images/todo.png";
import addNewImg from "@/public/images/add-new.png";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image';
import { useTaskContext } from "@/context/TastContext";
import TaskItem from "./TaskItem";

// interface PropTypes {
//   tasks: Task[];
//   addTask: (data: Task) => void;
//   updateTask: ({
//     id,
//     key,
//     data,
//   }: {
//     id: string;
//     key: "todo";
//     data: Task;
//   }) => void;
//   deleteTask: (id: string, key: "todo") => void;
// }

const TodoPanel = () => {
  const {tasks,addTask} = useTaskContext();
  const todoTask = tasks.todo
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [title, setTitle] = useState<string>("");
  // const [isUpdate, setIsUpdate] = useState<boolean>(false);
  // const [updateState, setUpdateState] = useState<Task>();
  const AddInputRef = useRef<HTMLInputElement | null>(null);
  // const UpdateInputRef = useRef<HTMLInputElement | null>(null);

  // const handleIsOpen = () => {
  //   setIsOpen(true);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // };

  // const handleAddTask = (event: React.KeyboardEvent<HTMLElement>) => {
  //   if (event.key === "Enter") {
  //     if (title === "") return;
  //     addTask({
  //       id: `${Math.floor(Math.random() * 100) + 1}`,
  //       title: title,
  //       description: "",
  //       deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  //       priority: "low",
  //       status: "todo",
  //       tags: [],
  //       estimatedTime: 0,
  //       completionPercentage: 0
  //     });
  //     setIsOpen(false);
  //     setTitle("");
  //   }
  // };

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
  //     updateTask({ id, key: "todo", data: updateState });
  //     setIsUpdate(false);
  //   }
  // };

  // const handleIsUpdate = (item: Task) => {
  //   setIsUpdate(true);
  //   setUpdateState(item);
  // };

  useEffect(() => {
    if (isOpen) return AddInputRef.current?.focus();
    // if (isUpdate) return UpdateInputRef.current?.focus();
  }, [isOpen]);

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
        <p className="text-lg mt-3 ml-2">This item hasn't been started</p>
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
                    {/* {task.id} */}
                  </div>
                )}
              </Draggable>
            ))}

            {/* {isOpen && (
              <div className="flex w-full items-center mb-2 mt-4 border">
                <Image className="w-6 ml-3 mr-3" src={addNewImg} alt="add new Img" />
                <input
                  className="outline-none bg-slate-50 pl-3 py-2 w-full"
                  type="text"
                  value={title}
                  onChange={handleChange}
                  ref={AddInputRef}
                  onKeyDown={handleAddTask}
                  placeholder="Type a Name..."
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 bg-red-100 font-bold text-red-500 text-center"
                >
                  X
                </button>
              </div>
            )} */}
            {provided.placeholder}
            <button
              // onClick={handleIsOpen}
              className="hover:bg-slate-100 transition w-full pb-3 pt-1 text-lg text-left bg-slate-50 pl-10 text-slate-600 rounded-lg"
            >
              <span className="text-2xl">+</span> New
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoPanel;
