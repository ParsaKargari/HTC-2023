import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useAuth } from "../../AuthContext";

import "./style.css";

const Buynow = () => {
  const [data, setData] = useState([]);
  const { user, signOut } = useAuth();
  const [cantBuy, setCantBuy] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/get_listings_t2");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await fetch("/get_listings_t1");
        const jsonData = await response.json();
        if (jsonData[0].buy_count === '0') {
          setCantBuy(true);
        } else {
          setCantBuy(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData2();
    const intervalId = setInterval(fetchData2, 2000);

    // If not logged in, dsiable buy button
    if (!user) {
      setCantBuy(true);
    }

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);



  const handleBuyNow = async (UUID, email) => {
    try {
      // Construct form data
      const formData = new FormData();
      formData.append('UUID', UUID);
      formData.append('email', user.email);
  
      // Set the request headers for form data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      // Send the POST request with form data
      const response = await axios.post('/buy', formData, config);
  
      // Handle response
      console.log(response.data);
      // You might want to show a success message or handle the UI change
    } catch (error) {
      console.error("Error during purchase:", error);
      // Handle errors, possibly showing an error message to the user
    }
  };
  

  const createCards = () => {
    return data.map((item) => (
      <Card key={item.UUID} sx={{ maxWidth: 345, m: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={item.ImageURL}
          alt={`Image of ${item.Name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Seller Name: {item.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact Email: {item.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Info: {item.Info}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled={cantBuy} size="small" onClick={() => handleBuyNow(item.UUID, item.Email)}>Buy Now</Button>
        </CardActions>
      </Card>
    ));
  }; 
  
  // Then use it in your component
  return (
    <div className="page-background">
      {/* Blurred background is applied via CSS to the ::before pseudo-element */}
      <div className="cards-grid">{createCards()}</div>
    </div>
  );
  
};

export default Buynow;
