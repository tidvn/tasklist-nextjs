

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';
import Slider from '@mui/material/Slider';

const TaskForm = (props: any) => {
  const { task, formikRef } = props;

  const validationSchema = Yup.object({
    title: Yup.string().required('Vui lòng nhập tiêu đề'),
    description: Yup.string().required('Vui lòng nhập mô tả công việc'),
    deadline: Yup.date().required('Vui lòng nhập thời hạn hoàn thành'),
    priority: Yup.string().required('Vui lòng chọn ưu tiên'),
    status: Yup.string().required('Vui lòng chọn trạng thái'),
    tags: Yup.array().of(Yup.string()),
    estimatedTime: Yup.number().required('Vui lòng nhập thời gian dự kiến'),
    completionPercentage: Yup.number().required('Vui lòng nhập phần trăm hoàn thành'),
  });
  const formik = useFormik({
    initialValues: {
      title: task.title || '',
      description: task.description || '',
      deadline: format(task.deadline, 'yyyy-MM-dd') || new Date(),
      priority: task.priority || 'low',
      status: task.status || 'todo',
      tags: task.tags || [],
      estimatedTime: task.estimatedTime || 0,
      completionPercentage: task.completionPercentage || 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)

    },
  });
  React.useImperativeHandle(formikRef, () => ({
    handleSubmit: () => {
      formik.handleSubmit();
    },
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ marginBottom: '16px', marginTop: '16px' }}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Tiêu đề"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}

        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="deadline"
          name="deadline"
          label="Deadline"
          type="date"
          value={formik.values.deadline}
          onChange={formik.handleChange}
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}

        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="priority"
          name="priority"
          label="Priority"
          select
          value={formik.values.priority}
          onChange={formik.handleChange}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="status"
          name="status"
          label="Status"
          select
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
        >
          <MenuItem value="todo">To-Do</MenuItem>
          <MenuItem value="doing">Doing</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="tags"
          name="tags"
          label="Tags"
          value={formik.values.tags.join(', ')}
          onChange={formik.handleChange}
          error={formik.touched.tags && Boolean(formik.errors.tags)}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          fullWidth
          id="estimatedTime"
          name="estimatedTime"
          label="EstimatedTime"
          type="number"
          value={formik.values.estimatedTime}
          onChange={formik.handleChange}
          error={formik.touched.estimatedTime && Boolean(formik.errors.estimatedTime)}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <p>% Completion</p>
        <Slider
          defaultValue={0}
          getAriaValueText={(number) => `${number}%`}
          step={5}
          marks
          min={0}
          max={100}
          onChange={(event, newValue) => {
            formik.setFieldValue('completionPercentage', newValue);
          }}
          valueLabelDisplay="auto"
        />
      </div>
      {/* <div style={{ marginBottom: '16px' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            </div> */}
    </form>

  );
};

export default TaskForm;