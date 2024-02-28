import React from 'react';
import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Header from './Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { baseUrl } from '../Constant';

import axios from 'axios';

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { fontWeight } from '@mui/system';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));
const dropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const Cart = () => {

    const theme = createTheme();
    const [cartItem, setCartItem] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);


    const fetchData = async () => {
        const url = baseUrl + "getCartItems";
        const res = await axios.post(url, { id: 1 });

        console.log(res.data);
        if (res.data.statusCode = 200) {
            setCartItem(res.data.listCart);
            
        }
        getSubTotal(1);
    }
    const handleEditCart = async (event, id) => {
        const c = {
            id: id,
            quantity: event.target.value
        }
        const url = baseUrl + "editCart";
        const res = await axios.post(url, c);

        if (res.data.statusCode === 200) {
            fetchData();
        } else {
            alert("Not edited");
        }
    };
    const handleDelete = async (id) => {
        console.log("handle delete");
        const url = baseUrl + "deleteCart";
        const res = await axios.post(url, { id: id });
        if (res.data.statusCode === 200) {
            fetchData();
        } else {
            alert("Not deleted");
        }
    };
    const getSubTotal = async (id) => {
        const url = baseUrl + "getSubTotal";

        const res = await axios.post(url, { userId: id });
        if (res.data.statusCode === 200) {
            console.log(res.data.subTotal);
            setSubTotalPrice(res.data.subTotal);
        }else{
            setSubTotalPrice(0);
        }
    }
    useEffect(() => {
        fetchData();

    }, [cartItem])
    return (
        <div>
            <Header />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        style={{ backgroundColor: "" }}
                    >
                        {/* <Card>
                            
                        </Card> */}
                        {
                            subTotalPrice === 0 ?

                                <Paper elevation={3} style={{ width: '50%',height:'300px',lineHeight:'250px' }}>
                                    <h2 style={{color:'blue'}}>Your cart is empty</h2>

                                </Paper>
                                :

                                <>
                                    <Paper elevation={3} style={{ width: '100%' }}>
                                        <div
                                            style={{
                                                lineHeight: '76px',
                                                float: 'left',
                                                paddingLeft: '20px',
                                                fontSize: '20px'
                                            }}
                                        >
                                            Subtotal : &#8377;{subTotalPrice}
                                        </div>
                                        <div
                                            style={{
                                                lineHeight: '76px',
                                                float: 'right',
                                                marginRight: '20px',

                                            }}
                                        >
                                            <Button
                                                style={{
                                                    backgroundColor: '#ffd814',
                                                    color: '#000000',
                                                    width: '150px',
                                                }}>
                                                Buy Now
                                            </Button>
                                        </div>

                                    </Paper>
                                    <TableContainer component={Paper} fullWidth={'100%'} marginTop={'10px'}>
                                        <Table fullWidth aria-label="simple table">
                                            <TableHead >
                                                <TableRow  >
                                                    <TableCell colSpan={5}><h2>Shopping Cart</h2></TableCell>
                                                    <TableCell align="right"><h4>Price</h4></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cartItem && cartItem.map((row) => {

                                                    return (
                                                        <TableRow
                                                            key={row.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >

                                                            <TableCell align="left">
                                                                <img src={row.imageUrl} alt={row.name + "image"} width={'150px'} height={'150px'} />

                                                            </TableCell>

                                                            <TableCell align="left">
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    {row.medicineName}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <IconButton aria-label="delete" onClick={() => { handleDelete(row.id) }}>
                                                                    <DeleteIcon color="error" />
                                                                </IconButton>
                                                            </TableCell>

                                                            <TableCell align='left'>
                                                                <Typography variant="body2" color="text.secondary" className='Price'>
                                                                    <span className='UnitPrice'>
                                                                        &#8377;{row.unitPrice}
                                                                    </span>
                                                                    &nbsp;
                                                                    <span className='ActualPrice'>
                                                                        &#8377;{row.unitPrice - row.unitPrice * (row.discount / 100)}
                                                                    </span>
                                                                    <span className='Discount' >
                                                                        {row.discount}%
                                                                    </span>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <FormControl sx={{ m: 1 }} variant="standard">
                                                                    {/* <InputLabel id="demo-customized-select-label">Quantity</InputLabel>
                                                     */}
                                                                    <Select
                                                                        labelId="demo-customized-select-label"
                                                                        id="demo-customized-select"
                                                                        value={row.quantity}
                                                                        onChange={(e) => handleEditCart(e, row.id)}
                                                                        input={<BootstrapInput />}
                                                                    >
                                                                        {
                                                                            dropdown.map((i) => {
                                                                                return (
                                                                                    <MenuItem value={i}>
                                                                                        {i}
                                                                                    </MenuItem>
                                                                                )
                                                                            })
                                                                        }

                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <b>&#8377;{row.totalPrice}</b>
                                                                {/* {(row.unitPrice - row.unitPrice * (row.discount / 100)) * row.quantity} */}
                                                            </TableCell>
                                                            {/* <TableCell align="right">
                                <IconButton aria-label="edit">
                                    <EditIcon color="#353635" onClick={() => { handleEdit(row.id) }}/>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => { handleDelete(row.id) }}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                        }
                    </Box>
                </Container>
            </ThemeProvider>






        </div>
    )
}

export default Cart;