import React from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
export default function UserMenu() {
  const user = useSelector((state) => state.user.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained" // Puedes personalizar el estilo del botón
        color="primary" // Puedes personalizar el color del botón
      >
        {user.name.split("")[0] + user.lastname.split("")[0]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Favoritos</MenuItem>
        <MenuItem onClick={handleClose}>Desconectar</MenuItem>
      </Menu>
    </div>
  );
}
