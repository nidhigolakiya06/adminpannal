import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Medicine(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'Quantity',
            headerName: 'Quantity',
            width: 150,
            editable: false,
        },
        {
            field: 'Price',
            headerName: 'Price',
            width: 110,
            editable: false,
        },
        {
            field: 'Expiry',
            headerName: 'Expiry',
            sortable: false,
            width: 160,
        },
        {
            headerName: 'Action',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="delete" onClick={() => handleDelet(params)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </div>
            )
        }
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitData = (values) => {
        console.log(values);

        let Data = {
            id: Math.floor(Math.random() * 1000),
            ...values
        }

        let localData = JSON.parse(localStorage.getItem("medicines"))

        if (localData === null) {
            localStorage.setItem("medicines", JSON.stringify([Data]))
        } else {
            localData.push(Data)
            localStorage.setItem("medicines", JSON.stringify(localData))
        }

        setOpen(false);
        loadData()

    }

    const handleDelet = (params) => {
        console.log(params)
        let deleteData = JSON.parse(localStorage.getItem("medicines"))

        console.log(deleteData)

        let afterDeleteData = deleteData.filter((l) => params.id !== l.id)
        console.log(afterDeleteData);

        localStorage.removeItem("medicines")
        localStorage.setItem("medicines", JSON.stringify(afterDeleteData))
        alert("delete data")

        loadData()
    }

    const handleEdit = (data) => {


        setOpen(true);
        setUpdate(data);
        formik.setValues(data);


    }

    const handleUpdateData = (values) => {
        console.log(values);

        let loadData = JSON.parse(localStorage.getItem("medicines"))

       let newData= loadData.map((l,i) => {

            if (l.id === values.id) {
                return values
            }else{
                return l
            }
    });

    console.log(newData );

    localStorage.setItem("medicines" ,JSON.stringify(newData))
    

    setOpen(false);
    setUpdate();
    loadData();


        console.log(loadData);
    }

    const loadData = () => {

        let loadData = JSON.parse(localStorage.getItem("medicines"))

        if (loadData !== null) {
            setData(loadData)
        }

    }

    useEffect(
        () => {

            loadData()
        },
        [])

    const Data = {
        Name: yup.string().required("Please Enter Medicine Name"),
        Quantity: yup.string().required("Please Enter Medicine Quantity"),
        Price: yup.string().required("Please Enter Medicine Price"),
        Expiry: yup.string().required("Please Enter Medicine Expiry"),
    }

    let schema = yup.object().shape(Data)

    const formik = useFormik({
        initialValues: {
            
            Name:  '',
            Quantity: '',
            Price: '',
            Expiry: '',
        },
        
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (update) {
                handleUpdateData(values)
            }else{
                handleSubmitData(values)
            }
            
                
        },
    });

    

    return (
        <div>
            <h1>Medicines</h1>

            <div className='col-12'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicines
                </Button>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New Medicine Dialog Box"}
                </DialogTitle>
                <Formik value={formik} >
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <DialogContent>
                            <div>
                                <div className='col-6 instyle'>
                                    <TextField
                                        label="Medicine-Name"
                                        name="Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.Name}
                                    />
                                    <p>{formik.errors.Name}</p>
                                </div>
                                <div className='col-6 instyle'>
                                    <TextField
                                        label="Quantity"
                                        name="Quantity"
                                        onChange={formik.handleChange}
                                        value={formik.values.Quantity}
                                    />
                                    <p>{formik.errors.Quantity}</p>
                                </div>
                                <div className='col-6 instyle'>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Price"
                                        name="Price"
                                        onChange={formik.handleChange}
                                        value={formik.values.Price}
                                    />
                                    <p>{formik.errors.Price}</p>
                                </div>
                                <div className='col-6 instyle'>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        name="Expiry"
                                        label="Expiry"
                                        onChange={formik.handleChange}
                                        value={formik.values.Expiry}
                                    />
                                    <p>{formik.errors.Expiry}</p>
                                </div>
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancle</Button>
                                {
                                    update ?
                                        <Button type='submit' autoFocus> Update</Button> 
                                        :
                                        <Button type='submit' autoFocus>Submit</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>

            </Dialog>

        </div>
    );
}

export default Medicine;