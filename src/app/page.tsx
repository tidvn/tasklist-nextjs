"use client"
import { DragDropContext } from 'react-beautiful-dnd';
import TodoPanel from "@/components/todoPanel";
import DoingPanel from "@/components/doingPanel";
import DonePanel from "@/components/donePanel";
import OverduePanel from "@/components/overduePanel";
import { useTaskContext } from "@/context/TaskContextProvider";


const App = () => {
  const {tasks,handleOnDragEnd} = useTaskContext();

  return (
    <section className="">
      <h1 className="text-4xl font-extrabold text-slate-700 flex justify-center py-20">
       Toto App
      </h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="flex justify-center gap-16 px-10">
        <TodoPanel/>
        <DoingPanel/>
        <DonePanel />
        <OverduePanel />
      </main>
      </DragDropContext>
    </section>
  );
};

export default App;
