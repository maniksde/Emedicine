import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl, imgUrl } from '../Constant';
import AdminHeader from './AdminHeader';

const theme = createTheme();
const CustomerList = () => {
    const [customerList, setCustomerList] = useState([]);
    
    const fetchData = async () => {
        console.log("fetch");
        const url = baseUrl + "userList";
        const res = await axios.get(url);
        console.log(res.data.listUsers);
        if (res.data.statusCode === 200) {
            setCustomerList(res.data.listUsers);
        } 
    }
    const handleStatus = async (id, type, status) => {
        console.log("HandleStatus", status);
        const url = baseUrl + "userUpdateStatusType";
        const u = {
            "id": id,
            "status": status,
            "type": type
        }
        const res = await axios.post(url, u);
        console.log(res.data);
        if (res.data.statusCode === 200) {
            console.log("fetch");
            fetchData();
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <AdminHeader />
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
                    >
                        <TableContainer component={Paper} fullWidth={'100%'} marginTop={'10px'}>
                            <Table fullWidth aria-label="simple table">
                                <TableHead >
                                    <TableRow className='tableRow' style={{ backgroundColor: '#353635' }}>
                                        <TableCell >Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Fund</TableCell>
                                        <TableCell align="center">Admin</TableCell>
                                        <TableCell align="center">Status</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customerList.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            style={{lineHeight:0.7}}
                                        >

                                            <TableCell align="left">{row.firstName + " " + row.lastName}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">
                                                {row.fund}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox checked={row.type === "admin"}
                                                    onChange={() => handleStatus(row.id, row.type === "admin"? "user":"admin", row.status)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.status === 1 ?
                                                    <ToggleOnIcon
                                                        
                                                        fontSize='large'
                                                        color="success"
                                                        onClick={() => handleStatus(row.id, row.type, 0)}
                                                    />
                                                    :
                                                    <ToggleOffIcon
                                                        fontSize='large'
                                                        color="error"
                                                        onClick={() => handleStatus(row.id, row.type, 1)}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default CustomerList;