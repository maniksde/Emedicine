import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { baseUrl } from '../Constant';
import Header from './Header';
import { letterSpacing } from '@mui/system';

// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& > *": {
//             margin: theme.spacing(1),
//             width: "25ch"
//         }
//     },
//     gridList: {
//         width: "100%",
//         height: "auto"
//     },
//     card: {
//         maxWidth: 160,
//         height: "100%"
//     }
// }));

const MedicineDisplay = () => {
    //const classes = useStyles();
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
    const addToCart = async(unitPrice,discount,id, quantity)=>{
        const med={
            userId:1,
            medicineId:id,
            unitPrice:unitPrice,
            discount:discount,
            quantity:quantity,
            totalPrice:(unitPrice - unitPrice * (discount/100)) * quantity
        }
        console.log(med);
        const url = baseUrl + "addToCart";
        
        const res = await axios.post(url,med);
        if(res.data.statusCode === 200){
            alert("Added to cart!");
        }
    }

    
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Grid container spacing={{ xs: 1, md: 1}} columns={{ xs: 2, sm: 4, md: 12 }} >
                {medicineList.map((medicine) => {
                    const { id,name,manufacturer,imageUrl,unitPrice,discount } = medicine;
                    return (
                    <Grid item xs={1} sm={1} md={2} key={id}>
                        <Card sx={{ maxWidth: 250 }} key={id}>
                                <CardMedia
                                    sx={{ height: 140, width:140 }}
                                    image={imageUrl}
                                    title="green iguana"
                                    className='CardImage'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {name}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        by {manufacturer}    
                                    </Typography> */}
                                    <Typography variant="body2" color="text.secondary"  className='Price'>
                                        <span className='UnitPrice'>
                                        &#8377;{unitPrice} 
                                        </span>   
                                        &nbsp;
                                        <span className='ActualPrice'>
                                        &#8377;{unitPrice - unitPrice * (discount/100)}
                                        </span>
                                        <span className='Discount' >
                                            {discount}%
                                        </span>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Buy Now</Button>
                                    <Button size="small"
                                        onClick={()=>addToCart(unitPrice,discount,id,1)}
                                    >Add to cart</Button>
                                </CardActions>
                            </Card>
                    </Grid>
                    );
                    })}
            </Grid>

            

        </div>
    )
}

export default MedicineDisplay;