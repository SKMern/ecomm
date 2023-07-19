import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductsData } from "../../Types";

const ImageCard = ({
  image,
  title,
  description,
  price,
  rating,
}: ProductsData) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        cursor: "pointer",
      }}
    >
      <CardMedia
        sx={{ height: 140,  }}
        image={image}
        title={title}
      />
      <CardContent sx={{ height: 80,background: "#ebebeb45",  }}>
        <Typography gutterBottom sx={{textTransform: 'capitalize'}} variant="h6" noWrap component="div">
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom noWrap color="text.secondary">
          {description}
        </Typography>
        <Typography>Rs. {price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
