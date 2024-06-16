import React, {useContext, useState} from 'react';
import '../navbar.css'
import {Avatar, Menu, MenuItem} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {UserContext} from "../../../../contexts/UserContext";
const UserProfile = ({isToggled}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpened = Boolean(anchorEl)
    const {logOut, user} = useContext(UserContext)
    const handleClick = (e) => {
        setAnchorEl(anchorEl === null ? e.currentTarget : null)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div className='navbar__user-profile-container' onClick={handleClick}>
            <p style={{fontSize: 20}}>{user?.name ?? 'Guest'}</p>
            <Avatar sx={{width: '45px'}}  src={user?.avatar ?? ''} alt={user?.name}/>
            <Menu open={menuOpened} onClose={handleClose} anchorEl={anchorEl} MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: { width: anchorEl && anchorEl.offsetWidth , borderRadius: '30px' }
            }}>
            <MenuItem  onClick={handleClose}> <LogoutIcon onClick={logOut}/> &nbsp; Log out </MenuItem>
            </Menu>
        </div>
    );
};

export default UserProfile;