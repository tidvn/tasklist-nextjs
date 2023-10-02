import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useTaskContext } from '@/context/TastContext';
import { Task } from '@/types/index';
import completeImg from "@/public/images/complete.png";
import editImg from "@/public/images/edit.png";
import deleteImg from "@/public/images/delete.png";
import { Formik, useFormik } from 'formik';
import { Alert, AlertTitle, Button, IconButton, TextField } from '@mui/material';
import TaskDialog from './TaskDialog';
function TaskItem({ task, isDragging }: { task: Task, isDragging: boolean }) {
  const { tasks, addTask, updateTask, deleteTask,showAlert } = useTaskContext();
  const [isEditTitle, setIsEditTitle] = useState(false);


  const formik = useFormik({
    initialValues: {
      title: task.title,
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = 'Required';
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setIsEditTitle(false)
    },
  }); 
  const handleDeleteClick = () => {
    showAlert("success","deleted")
  };

  return (
    <div className={`${isEditTitle ? 'flex' : ''} ${isDragging ? 'border-2 border-teal-500 shadow-md shadow-green-100' : ''} justify-between px-4 bg-slate-50 py-3 capitalize rounded-lg`}>
      {isEditTitle ? (
        <form onSubmit={formik.handleSubmit}>

          <div className="grid grid-cols-12">
            <div className="col-span-11">
              <TextField
                fullWidth
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
            <div className="col-span-1">
              <button type="submit"
                className="flex h-full items-center justify-center border-none bg-transparent cursor-pointer">

                <Image alt="Edit Icon" src={completeImg} className="max-w-full max-h-full" />
              </button>
            </div>

          </div>


        </form>
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <TaskDialog task={task}/>
            {/* <h2 className="text-lg">{task.title}</h2> */}
          </div>
          <div className="col-span-1">
            <button onClick={() => setIsEditTitle(!isEditTitle)}

              className="flex h-full items-center justify-center border-none bg-transparent cursor-pointer">

              <Image alt="Edit Icon" src={editImg} className="max-w-full max-h-full" />
            </button>
          </div>
          <div className="col-span-1">
            <button
             onClick={handleDeleteClick}
             className="flex h-full items-center justify-center">
              <Image alt="Delete Icon" src={deleteImg} className="max-w-full max-h-full" />
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
