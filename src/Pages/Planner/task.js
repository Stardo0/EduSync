import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Task = ({ title, date, type, onDelete }) => {
      // Your component logic here

      return (
            <div className='task-tile'>
                  <div className='right-side'>
                        <Checkbox size="small" />
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
