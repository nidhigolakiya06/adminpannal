import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';


function Doctor(props) {
    const [open, setOpen] = useState(false);
    const [department, setDepartment] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setDepartment(event.target.value);
      };

    const handleSubmitData = (values) => {
        
    }

    const Data = {
        name: yup.string().required("please Enter Doctor Name"),
        age: yup.number().required("please Enter Age").positive().integer(),
        experience: yup.string().required("please Enter Experience"),
        department: yup.string().required("please Select Department"),
    }

    let schema = yup.object().shape(Data)


    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            experience: '',
            department: '',
        },
        validationSchema : schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            handleSubmitData(values)
        },
    });

    console.log(formik.errors);
    
    return (
        <div>
            <h1>Doctors</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Doctor
            </Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Doctor Detail</DialogTitle>
                <Formik value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                label="Name"
                                name="name"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                defaultValue={formik.values.name}
                            />
                            <p className='error-mes'>{formik.errors.name}</p>
                            <TextField
                                autoFocus
                                label="Age"
                                name="age"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.age}
                            />
                            <p className='error-mes'>{formik.errors.age}</p>
                            <TextField
                                autoFocus
                                label="Experience"
                                name="experience"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.experience}
                            />
                            <p className='error-mes'>{formik.errors.experience}</p>
                            <Box sx={{ m: 2, minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                    <Select
                                        error={formik.errors.department}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={department}
                                        label="Department"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Anesthesiologist</MenuItem>
                                        <MenuItem value={20}>Cardiology</MenuItem>
                                        <MenuItem value={30}>Neurosurgeon</MenuItem>
                                    </Select>

                                        <p className='error-mes'>{formik.errors.department}</p>
                                    
                                </FormControl>
                            </Box>
                            <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>Submit</Button>
                        </DialogActions>
                        </DialogContent>
                        
                    </Form>
                </Formik>


            </Dialog>

        </div>
    );
}

export default Doctor;