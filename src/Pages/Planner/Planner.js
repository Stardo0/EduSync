import React, { useState } from 'react';
import './Planner.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import database from '../../fierbase';
import { getDatabase, ref, set } from 'firebase/database';
import { Margin, TaskSharp } from '@mui/icons-material';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

const Planner = ({Email, Uid}) => {
      const [open, setOpen] = React.useState(false);
      const [error, setError] = React.useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      
      const handleDateChange = (date) => {
            setSelectedDate(date);
      };

      function createTask() {
            const db = getDatabase();
            const UidStr = String(Uid);

            const titleElement = document.getElementById('title-create-task');
            const typeElement = document.getElementById('type-task');

            // Format the selected date to a valid string format (e.g., 'YYYY-MM-DD')
            const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;

            // Check if any of the variables is empty
            if (!titleElement || !typeElement || !formattedDate) {
                  setError(true);
                  setTimeout(() => {
                        setError(false);
                  }, 3000);
                  return;
            }

            // Create a task object with the formatted date
            const task = {
                  title: titleElement.value,
                  type: typeElement.value,
                  date: formattedDate,
            };

            // Now use the task object to set in Firebase
            const generatedTaskIds = new Set(); // Create a Set to store generated task IDs
            
            let taskId;
            do {
                  taskId = Math.floor(Math.random() * 1000000); // Generate a random task ID
            } while (generatedTaskIds.has(taskId)); // Check if the generated task ID already exists in the Set
            
            generatedTaskIds.add(taskId); // Add the generated task ID to the Set
            set(ref(db, `users/${UidStr}/tasks/${taskId}`), task)
                  .then(() => {
                        console.log('Task created successfully');
                  })
                  .catch((error) => {
                        console.error('Error creating task:', error);
                  });

            setOpen(true);
            setTimeout(() => {
                  setOpen(false);
            }, 3000);
      }

      const options = [
            { label: 'Homework', id: 1 },
            { label: 'Exam', id: 2 },
      ];

      return (
            <>
                  <div className='Planner-container'>
                        <div className='Title'>Planner</div>
                        
                        <div className='content'>
                              <div className='tasks'>
                                    <div className='task-tile'>
                                          <div className='right-side'>
                                                <Checkbox size="small" />
                                                <div className='task-title'>
                                                      Math S24
                                                </div>
                                                <div className='task-date'>
                                                      05 Jul 2024
                                                </div>
                                          </div>
                                          <div className='left-side'>
                                                <Chip label="Homework" variant="outlined" />
                                                <IconButton aria-label="delete">
                                                      <DeleteIcon />
                                                </IconButton>
                                          </div>
                                    </div>
                                    <div className='task-tile'>
                                          <div className='right-side'>
                                                <Checkbox size="small" />
                                                <div className='task-title'>
                                                      German S24
                                                </div>
                                                <div className='task-date'>
                                                      05 Jul 2024
                                                </div>
                                          </div>
                                          <div className='left-side'>
                                                <Chip label="Homework" variant="outlined" />
                                                <IconButton aria-label="delete">
                                                      <DeleteIcon />
                                                </IconButton>
                                          </div>
                                    </div>
                              </div>
                              <div classsName='create-task-container'>
                                    <Collapse in={open}>
                                          <Alert severity="success" id='Alert' sx={{ marginBottom: '20px' }} >Task Successfully created</Alert>              
                                    </Collapse>
                                    <Collapse in={error}>
                                          <Alert severity="error" id='Alert' sx={{ marginBottom: '20px' }} >Please fill in all the fields</Alert>              
                                    </Collapse>
                                    <div className='create-task'>
                                          
                                          <div className='container'>
                                                <div className='create-task-title'>
                                                      Create Task
                                                </div>
                                                <div className='input-fields'>
                                                      <FormControl fullWidth variant="standard">
                                                            <TextField id="title-create-task" label="Title" variant="outlined" size="small" />
                                                      </FormControl>
                                                      <Autocomplete
                                                            id="type-task"
                                                            options={options}
                                                            renderInput={(params) => <TextField {...params} label="Type" id='type-task' />}
                                                      />
                                                </div>
                                                <div className='date-picker'>
                                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer
                                                                  components={[
                                                                        'DatePicker',
                                                                        'MobileDatePicker',
                                                                        'DesktopDatePicker',
                                                                        'StaticDatePicker',
                                                                  ]}
                                                            >
                                                                  <DemoItem>
                                                                        <DatePicker
                                                                              label="Date"
                                                                              value={selectedDate}
                                                                              onChange={handleDateChange}
                                                                              id="Date-input"
                                                                              renderInput={(params) => <TextField {...params} />}
                                                                              renderDay={(day, _value, DayComponentProps) => (
                                                                                    <DayComponentProps.Day
                                                                                          {...DayComponentProps}
                                                                                          onClick={() => handleDateChange(day)}
                                                                                          className={selectedDate === day ? 'Mui-selected' : ''}
                                                                                    />
                                                                              )}
                                                                        />
                                                                  </DemoItem>
                                                            </DemoContainer>
                                                      </LocalizationProvider>
                                                </div>
                                                <Button sx={{ marginTop: '15px' }} variant="contained" onClick={createTask}>Create Task</Button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Planner;