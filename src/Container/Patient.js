import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Update } from '@mui/icons-material';


function Patient(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Patient Name',
            width: 150,
            editable: true,
        },
        {
            field: 'Age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'Email',
            headerName: 'Email',
            type: 'number',
            width: 150,
            editable: true,
        },
        {

            headerName: 'Action',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params.row)}>
                        <EditIcon/>
                    </IconButton>
                </>

            )

        },
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Data = {
        Name: yup.string().required("Enter Your Name"),
        Age: yup.number().required("Enter Your Age").positive(70).integer(),
        Email: yup.string().email().required("Enter Your Email"),
    }

    let schema = yup.object().shape(Data)

    const formik = useFormik({
        initialValues: {
            Name: '',
            Age: '',
            Email: '',
        },

        
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));

            if (update) {
                handleUpdateData(values)
            }else{
                handleSubmitData(values)
            }
           
        },
    });

    const handleSubmitData = (values) => {
        console.log(values);

        const Data = {
            id: Math.floor(Math.random() * 1000),
            ...values
        }

        let localData = JSON.parse(localStorage.getItem("patient"))

        if (localData === null) {
            localStorage.setItem("patient", JSON.stringify([Data]))
        } else {
            localData.push(Data)

            localStorage.setItem("patient", JSON.stringify(localData))
        }



        loadData();
        setOpen(false);

    }

    const handleDelete = (params) => {
        console.log(params.id)

        let oldData = JSON.parse(localStorage.getItem("patient"))

        console.log(oldData);

        let atferDeleteData = oldData.filter((l) => l.id !== params.id)
        console.log(atferDeleteData);

        localStorage.removeItem("patient")
        localStorage.setItem("patient", JSON.stringify(atferDeleteData))
        alert("Your Data is Susscefully Delete")

        loadData()
    }

    const handleEdit = (Data) => {
        console.log(Data);

        setOpen(true);
        setUpdate(Data);
        formik.setValues(Data);

    }

    const handleUpdateData = (values) => {
        console.log(values.id);

        let updateData = JSON.parse(localStorage.getItem("patient"))

        console.log(updateData);

        let newUpdateData = updateData.map((l,i) => {

            if(l.id === values.id) {
                return values
            }else{
                return l
            }
        })

        console.log(newUpdateData);

        localStorage.setItem("patient", JSON.stringify(newUpdateData))
        alert("Your Data Susscefully Updated")

        setOpen(false)
        setUpdate()
        loadData()

       

    }

    const loadData = () => {

        let loadData = JSON.parse(localStorage.getItem("patient"))

        if (loadData !== null) {
            setData(loadData)
        }

    }

    useEffect(
        () => {

            loadData()
        },
        [])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Patient
            </Button>

            <div style={{ height: 400, width: '100%', marginTop: '50px' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Patient Detail</DialogTitle>
                <Formik value={formik}>
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <DialogContent>
                            <TextField
                                autoFocus
                                name="Name"
                                label="Name"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.Name}
                            />
                            <p className='error-mes'>{formik.errors.Name}</p>
                            <TextField
                                autoFocus
                                name="Age"
                                label="Age"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.Age}
                            />
                            <p className='error-mes'>{formik.errors.Age}</p>
                            <TextField
                                autoFocus
                                name="Email"
                                label="Email"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                                value={formik.values.Email}
                            />
                            <p className='error-mes'>{formik.errors.Email}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>

                            {
                                update ?
                                <Button type='submit' >Update</Button>
                                :
                                <Button type='submit' >Submit</Button>
                            }
                            
                        </DialogActions>
                    </Form>
                </Formik>

            </Dialog>
        </div>
    );
}

export default Patient;