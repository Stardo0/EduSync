import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const Task = ({ title, date, type, onDelete, Uid, taskId }) => {
      const [completed, setCompleted] = useState(false);
      useEffect(() => {
            const db = getDatabase();
            const UidStr = String(Uid);
            const taskRef = ref(db, `users/${UidStr}/tasks/${taskId}/completed`);
            onValue(taskRef, (snapshot) => {
                if (snapshot.exists()) {
                    setCompleted(snapshot.val());
                }
            });
        }, [taskId, Uid]);
    
        const handleCheckboxChange = (event) => {
            const newCompleted = event.target.checked;
            setCompleted(newCompleted);
            updateTaskStatus(taskId, newCompleted);
        };
    
        const updateTaskStatus = (taskId, completed) => {
            const db = getDatabase();
            const UidStr = String(Uid);
            set(ref(db, `users/${UidStr}/tasks/${taskId}/completed`), completed)
                .then(() => {
                    console.log('Task status updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating task status:', error);
                });
        };

      return (
            <div className='task-tile'>
                  <div className='right-side'>
                        <Checkbox size="small" checked={completed} onChange={handleCheckboxChange} />
                        <div className='task-title'>
                              {title}
                        </div>
                        <div className='task-date'>
                              {date}
                        </div>
                  </div>
                  <div className='left-side'>
                        <Chip label={type} variant="outlined" />
                        <IconButton aria-label="delete" onClick={onDelete}>
                              <DeleteIcon />
                        </IconButton>
                  </div>
            </div>
      );
};

export default Task;
