import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useTaskContext } from '@/context/TastContext';
import { Task } from '../types';
import addNewImg from "@/public/images/add-new.png";
import editImg from "@/public/images/edit.png";
import deleteImg from "@/public/images/delete.png";
import { Formik, useFormik } from 'formik';
import { TextField } from '@mui/material';
function TaskItem({ task, isDragging}:{task:Task,isDragging:boolean}) {
  const {tasks, addTask, updateTask, deleteTask} = useTaskContext();
  const [isEditTitle, setIsEditTitle] = useState(false);

  const toggleUpdateMode = () => {
    console.log(isEditTitle)
    setIsEditTitle(!isEditTitle);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validate: (values) => {
      const errors:any = {};
      if (!values.title) {
        errors.title = 'Required';
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
        <Image
          alt="Edit Icon"
          onClick={() => toggleUpdateMode}
          className="w-full cursor-pointer p-1  ml-4"
          src={editImg}
        />
      </div>
      </div>
    </form>
      ) : (
        <div className="grid grid-cols-12">
  <div className="col-span-10">
    <h2 className="text-lg ml-4">{task.title}</h2>
  </div>
  <div className="col-span-1">
    <Image
      alt="Edit Icon"
      onClick={() => toggleUpdateMode}
      className="w-full cursor-pointer p-1  ml-4"
      src={editImg}
    />
  </div>
  <div className="col-span-1">
    <Image
      alt="Delete Icon"
      // onClick={() => deleteTask(task.id, "progress")}
      className="w-full cursor-pointer p-1 ml-4" // Sử dụng lớp w-1/12 để chiếm 1/12 độ rộng và ml-4 để căn lề
      src={deleteImg}
    />
  </div>
</div>

      )}
    </div>
  );
}

export default TaskItem;
