import React, {useRef, useState} from 'react';
import '../navbar.css'
import {Avatar, Menu, MenuItem} from "@mui/material";
import img from '../../../../devassets/the_rock.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
const UserProfile = ({isToggled}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpened = Boolean(anchorEl)
    const handleClick = (e) => {
        setAnchorEl(anchorEl === null ? e.currentTarget : null)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const user = {id: 1, avatar: img, name: 'Username'}
    return (
        <div className='navbar__user-profile-container' onClick={handleClick}>
            <p style={{fontSize: 20}}>{user?.name ?? ''}</p>
            <Avatar sx={{width: '45px'}}  src={user?.avatar} alt={user.name}/>
            <Menu open={menuOpened} onClose={handleClose} anchorEl={anchorEl} MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: { width: anchorEl && anchorEl.offsetWidth , borderRadius: '30px' }
            }}>
            <MenuItem  onClick={handleClose}> <LogoutIcon/> &nbsp; Log out </MenuItem>
            </Menu>
        </div>
    );
};

export default UserProfile;