import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css";

const Buynow = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.13.164.140:8628/get_listings_t2");
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
          <Button size="small">Buy Now</Button>
        </CardActions>
      </Card>
    ));
  };

  return <div className="cards-grid">{createCards()}</div>;
};

export default Buynow;
