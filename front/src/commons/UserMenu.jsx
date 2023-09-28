import React from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function UserMenu() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFavorites = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    setAnchorEl(null);
    //Navigate("/signin");
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="primary">
        {user.name.split("")[0] + user.lastname.split("")[0]}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
        <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
    </div>
  );
}
