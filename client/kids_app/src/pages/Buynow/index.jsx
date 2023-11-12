import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style.css";

const Buynow = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.12.170.44:8628/get_listings_t2"
        );
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
    return data.map((item, index) => (
      <Card key={item.UUID} style={{ width: 300, margin: 10 }}>
        <CardMedia
          component="img"
          height="140"
          image={item.ImageURL}
          alt={`Image of ${item.Name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {item.Email}
            <br />
            Info: {item.Info}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return <div className="cards-grid">{createCards()}</div>;
};

export default Buynow;
