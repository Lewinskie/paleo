import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const Product = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <Typography>{id}</Typography>
    </div>
  );
};

export default Product;
