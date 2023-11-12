import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import backgroundImage from '../../assets/background1.png'; // Adjust the path as needed

import "./style.css";

const Buynow = () => {
  const [data, setData] = useState([]);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.9.155.81:8628/get_listings_t2");
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
      const response = await axios.post('http://10.9.155.81:8628/buy', formData, config);
  
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
          <Button size="small" onClick={() => handleBuyNow(item.UUID, item.Email)}>Buy Now</Button>
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
