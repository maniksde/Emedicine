
import * as React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { baseUrl } from '../Constant';


const validationSchema = yup.object({
    name: yup
        .string('Enter the medicine name')
        .required('Medicine name is required'),
    manufacturer: yup
        .string('Enter the manufacturer name')
        .required('Manufacturer name is required'),
    unitPrice: yup
        .string('Enter the unit price')
        .required('Unit price is required'),
    discount: yup
        .string('Enter the discount')
        .required('Discount is required'),
    quantity: yup
        .string('Enter the quantity')
        .required('Quantity is required')
    // expDate:yup
    //     .string('Enter the expiry date')
    //     .required('Expiry date is required')
    // imageUrl:yup
    //     .string('Upload image')
    //     .required('Upload image is required')
});
const Medicine = ({ addUpdateButton, medicines, handleAddUpdateButton }) => {
    console.log(medicines);
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dt = `${year}-${month}-${day}`;
    const [date, setDate] = useState(dayjs(dt));
    const [image, setImage] = useState(null);
    const [initialValues, setInitialValues] = useState(medicines);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onReset: () => {
            console.log("reset");
        },
        onSubmit: async (values) => {

            const medicine = new FormData();
            
            medicine.append('name', values.name,);
            medicine.append('manufacturer', values.manufacturer,);
            medicine.append('unitPrice', values.unitPrice,);
            medicine.append('discount', values.discount,);
            medicine.append('quantity', values.quantity,);
            medicine.append('expDate', date.format('YYYY-MM-DD'),);
            

            medicine.append('status', 1);
            if (addUpdateButton === 'Add') {
                if (image) {
                    medicine.append('image', image,);


                    console.log(medicine);
                    const url = baseUrl + 'addMedicine';
                    const res = await axios.post(url, medicine);
                    if (res.data.statusCode === 100) {
                        alert("Medicine not inserted");
                    }


                } else {
                    alert("please select an Image");
                }

            } else if (addUpdateButton === 'Update') {
                console.log("Update called");
                
                medicine.append('image', image,);
                medicine.append('imageUrl', medicines.imageUrl);
                medicine.append('id',medicines.id);
                const url = baseUrl + 'updateMedicine';
                const res = await axios.post(url, medicine);
                console.log(res.data);
                handleFormReset();
            }


        },
        enableReinitialize: true

    });
    const handleFormReset = () => {

        handleAddUpdateButton('Add', {
            name: '',
            manufacturer: '',
            unitPrice: '',
            discount: '',
            quantity: ''
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    }
    useEffect(() => {
        setInitialValues(medicines);
        setDate(dayjs(medicines.expDate));
        
    }, [medicines,initialValues])
    return (

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="manufacturer"
                        label="Manufacturer"
                        name="manufacturer"
                        autoComplete="manufacturer"
                        value={formik.values.manufacturer}
                        onChange={formik.handleChange}
                        error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                        helperText={formik.touched.manufacturer && formik.errors.manufacturer}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="unitPrice"
                        label="Unit Price"
                        name="unitPrice"
                        autoComplete="Unit Price"
                        type="number"
                        value={formik.values.unitPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.unitPrice && Boolean(formik.errors.unitPrice)}
                        helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        name="discount"
                        label="Discount"
                        type="number"
                        id="discount"
                        autoComplete="Discount"
                        value={formik.values.discount}
                        onChange={formik.handleChange}
                        error={formik.touched.discount && Boolean(formik.errors.discount)}
                        helperText={formik.touched.discount && formik.errors.discount}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        name="quantity"
                        label="Quantity"
                        type="number"
                        id="quantity"
                        autoComplete="Quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                        helperText={formik.touched.quantity && formik.errors.quantity}
                    />
                </Grid>
                <Grid item xs={12} sm={6} className="datepicker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            fullWidth
                            //disableFuture
                            name="expDate"
                            label="Pick a date"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={date}
                            onChange={(newValue) => {
                                // var a = newValue.format('YYYY-MM-DD HH:mm:ss');
                                // console.log(a);
                                setDate(newValue);
                            }}
                            //value={formik.values.expDate}
                            //onChange={formik.handleChange}
                            error={formik.touched.expDate && Boolean(formik.errors.expDate)}
                            helperText={formik.touched.expDate && formik.errors.expDate}
                            renderInput={(params) => <TextField {...params}

                            />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained"
                        component="label"
                    >
                        <PhotoCamera />
                        <input hidden accept="image/*"
                            multiple type="file"
                            name="imageUrl"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}
                    className="button"
                >
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        {addUpdateButton}
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="error"
                        onClick={handleFormReset}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Box>


    )
}

export default Medicine;