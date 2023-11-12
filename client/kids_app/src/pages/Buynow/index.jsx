import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


import "./style.css";

const Buynow = () => {
  const [data, setData] = useState([]);
  const { user, signOut } = useAuth();
  const [cantBuy, setCantBuy] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");

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
  }, [user]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await fetch("http://10.13.105.60:8628/get_listings_t1");
        const jsonData = await response.json();
        // Look for the user's email in the list of emails
        if (user === null) {
          setCantBuy(true);
          return;
        }
        const userEmail = user.email;
        const emailList = jsonData.map((item) => item.email);
        const emailIndex = emailList.indexOf(userEmail);

        if (jsonData[emailIndex].buy_count === '0') {
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

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [user]);



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
    // Function to filter items based on the selected size
    const filterItemsBySize = () => {
      if (selectedSize === "") {
        return data; // If no size is selected, return all items
      } else {
        return data.filter((item) => item.Size === selectedSize);
      }
    };

  const createCards = () => {
    const filteredData = filterItemsBySize();
    return filteredData.map((item) => (
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
            Phone Number: {item.Phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Size: {item.Size}
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
      <div className="filter-dropdown">
        {/* Dropdown menu for size filter */}
        <Select
    value={selectedSize}
    onChange={(e) => setSelectedSize(e.target.value)}
    displayEmpty
    sx={{ minWidth: 200, m: 4 }}

  >
    <MenuItem value="">All Sizes</MenuItem>
    <MenuItem value="Newborn">Newborn</MenuItem>
    <MenuItem value="0-3 m">0-3 m</MenuItem>
    <MenuItem value="3-6 m">3-6 m</MenuItem>
    <MenuItem value="6-12 m">6-12 m</MenuItem>
    <MenuItem value="1y">1y</MenuItem>
    <MenuItem value="2y">2y</MenuItem>
    <MenuItem value="3y">3y</MenuItem>
    <MenuItem value="4y">4y</MenuItem>
    <MenuItem value="5y">5y</MenuItem>
  </Select>     </div>
      <div className="cards-grid">{createCards()}</div>
    </div>
  );
};

export default Buynow;
