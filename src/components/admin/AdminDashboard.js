import * as React from 'react';
import { useState,useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AdminHeader from './AdminHeader';
import Medicine from './Medicine';
import MedicineList from './MedicineList';

const theme = createTheme();
const AdminDashboard = () => {
    const [addUpdateButton, setAddUpdateButton] = useState('Add');
    const [medicines, setMedicines] = useState({
        name: '',
        manufacturer: '',
        unitPrice: '',
        discount: '',
        quantity: ''
    });
    const handleAddUpdateButton = (buttonName, medicine)=>{
        setAddUpdateButton(buttonName);
        setMedicines(medicine);
        
    }
    // useEffect(()=>{
    //     console.log("Admin Dashboard useeffect");
    //     console.log(medicines);
        
    // },[medicines]);
    return (
        <>
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
                        <Medicine addUpdateButton={addUpdateButton} medicines={medicines} handleAddUpdateButton={handleAddUpdateButton}/>
                        <MedicineList handleAddUpdateButton={handleAddUpdateButton}/>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default AdminDashboard;