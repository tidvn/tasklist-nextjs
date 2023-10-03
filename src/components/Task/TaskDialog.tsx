import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useTaskContext } from '@/context/TaskContextProvider';
interface FormikRef {
    handleSubmit: () => void;
}
export default function TaskDialog(props: any) {
    const { tasks, addTask, updateTask, deleteTask,showAlert } = useTaskContext();

    const { task } = props
    const [dialog, setDialog] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const taskFormRef = React.useRef<FormikRef | null>(null);

    const toggleDialog = () => {
        setDialog(!dialog);
    };

    const handleFormSubmit = async () => {
        if (taskFormRef.current) {
            taskFormRef.current.handleSubmit();
            setDialog(false)
            setIsEdit(false)

        }
    };
    const handleDeleteTask = async () => {
        await deleteTask(task.id,task.status)
        showAlert("success","Delete Successfully")
        setDialog(false)
        setIsEdit(false)
      };
      const statusColors:any = {
        'low': '#4dff4d', 
        'medium': '#ffdb4d', 
        'high': '#ff6666',
      };
    return (
        <div>
            
            <div onClick={toggleDialog} style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${task.completionPercentage}%`,
                height: '100%',
                background: statusColors[task.priority] || '#ffccff', 
                opacity: 1,
                paddingLeft: 5,
                borderRadius: 5,
                textAlign: 'left' }}>
                    
                <h2 className="text-lg">{task.title}</h2>
                
            </div>
            <Dialog
                open={dialog}
                fullWidth
                maxWidth={"md"}
                onClose={() => setDialog(false)} >
                <DialogTitle>{task.title}
                <Button onClick={handleDeleteTask}>Delete Task</Button>
                </DialogTitle>
                <DialogContent>
                    {isEdit ? (<TaskForm task={task} formikRef={taskFormRef} />
                    ) : (<TaskCard task={task} />)}

                </DialogContent>
                <DialogActions>
                   
                    <Button onClick={() => setDialog(false)}>Close</Button>
                    {isEdit ? (<Button onClick={handleFormSubmit}>Save Task</Button>)
                        : (<Button onClick={() => setIsEdit(true)}>Edit Task</Button>)}

                </DialogActions>
            </Dialog>
        </div>
    );
}



