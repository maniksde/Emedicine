
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl, imgUrl } from '../Constant';

const MedicineList = ({ handleAddUpdateButton }) => {
    const [medicineList, setMedicineList] = useState([]);
    const fetchData = async () => {
        const url = baseUrl + "medicineList";
        const res = await axios.get(url);
        if (res.data.statusCode === 200) {
            setMedicineList(res.data.listMedicines);
        } else {
            setMedicineList([]);
        }

    }
    const handleDelete = async (id) => {
        const url = baseUrl + "deleteMedicine";
        console.log(id);
        const med = {
            'id': id,
            'imageUrl': imgUrl + "image" + id.toString() + ".jpg"
        };
        const res = await axios.post(url, med);
        if (res.data.statusCode === 200) {
            console.log("deleted");
            fetchData();
        }
    }
    const handleEdit = async (id) => {

        console.log("edit", id);
        const url = baseUrl + "medicineById";
        const res = await axios.post(url, { "id": id });
        console.log(res.data);
        const m = res.data.medicine;
        const med = {
            id: id,
            name: m.name,
            manufacturer: m.manufacturer,
            unitPrice: m.unitPrice,
            discount: m.discount,
            quantity: m.quantity,
            expDate: m.expDate,
            imageUrl: m.imageUrl
        }
        handleAddUpdateButton('Update', med);
    }

    useEffect(() => {
        fetchData();
    }, [medicineList])
    return (

        <TableContainer component={Paper} fullWidth={'100%'} marginTop={'10px'}>
            <Table fullWidth aria-label="simple table">
                <TableHead >
                    <TableRow className='tableRow' style={{ backgroundColor: '#353635' }}>
                        <TableCell >Name</TableCell>
                        <TableCell align="center">Manufacturer</TableCell>
                        <TableCell align="center">Unit Price</TableCell>
                        <TableCell align="center">Discount</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Exp Date</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicineList.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="center">{row.manufacturer}</TableCell>
                            <TableCell align="center">{row.unitPrice}</TableCell>
                            <TableCell align="center">{row.discount} %</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{dayjs(row.expDate).format('YYYY-MM-DD')}</TableCell>
                            <TableCell align="center"><img src={row.imageUrl} alt={row.name + "image"} width={'50px'} height={'50px'} /></TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit">
                                    <EditIcon color="#353635" onClick={() => { handleEdit(row.id) }} />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => { handleDelete(row.id) }}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>



    )
}
export default MedicineList;