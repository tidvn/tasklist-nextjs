import React from 'react';
import { Card, CardContent, Typography, Chip, Grid, Paper } from '@mui/material';
import { format } from 'date-fns';
import { Task } from '@/types/index';

interface TaskProps {
    task: Task;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
    return (
        <Card style={{ boxShadow: 'none', border: '0px solid #e0e0e0' }}>
            <CardContent >
            <div style={{ marginBottom: '20px', }}>
                <Typography className="mt-2" variant="body1" color="black" style={{ fontWeight: 'bold' }}>
                    {task.description}
                </Typography>
                </div>
                <div style={{ marginBottom: '16px'}}>
                <Grid className="mt-2" container spacing={2} alignItems="center">
                    <Grid item>
                        <Chip
                            label={task.priority}
                            color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'primary'}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label={task.status}
                            color={
                                task.status === 'done'
                                    ? 'success'
                                    : task.status === 'doing'
                                            ? 'info'
                                            : 'primary'
                            }
                        />
                    </Grid>
                </Grid>
                </div>
                <div style={{ marginBottom: '16px'}}>
                <Typography className="mt-3" variant="body2" color="black" gutterBottom>
                <span style={{ fontWeight: 'bold' }}> Deadline:</span>  {format(new Date(task.deadline), 'dd/MM/yyyy')}
                </Typography>
                </div>
                <Typography className="mt-3" variant="body2" color="black" gutterBottom>                   
                    <span style={{ fontWeight: 'bold' }}> Estimated Time:</span>  {task.estimatedTime} hours
                </Typography>
                <Typography className="mt-3" variant="body2" color="black" gutterBottom>
                    <span style={{ fontWeight: 'bold' }}>Completion Percentage:</span> {task.completionPercentage}%
                </Typography>

                <Paper className="mt-3" variant="outlined" elevation={0} style={{ boxShadow: 'none', border: '0px solid #e0e0e0' }}>

                    <div style={{ display: 'flex', gap: '4px', }}>
                        {task.tags.map((tag: any, index: any) => (
                            <Chip key={index} label={tag} variant="outlined" />
                        ))}
                    </div>
                </Paper>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
