import React, {useContext, useState} from 'react';
import '../navbar.css'
import {Avatar, Menu, MenuItem} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {UserContext} from "../../../../contexts/UserContext";
import {Link, useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

const UserProfile = ({isMobile}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const menuOpened = Boolean(anchorEl)
    const {logOut, user} = useContext(UserContext)
    const navigate = useNavigate()
    const handleClick = (e) => {
        setAnchorEl(anchorEl === null ? e.currentTarget : null)
    }
    const handleLogOut = () => {
        logOut()
        setAnchorEl(null)
    }

    const handleLogIn = () => {
        navigate('/authentication')
        setAnchorEl(null)
    }


    return (
        <div className='navbar__user-profile-container' onClick={handleClick}>
            <p style={{fontSize: 20}}>{user?.name ?? 'Guest'}</p>
            <Avatar sx={{width: '45px'}} src={user?.avatar ?? ''} alt={user?.name}/>
            <Menu open={menuOpened} anchorEl={anchorEl} MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: {width: anchorEl && anchorEl.offsetWidth, borderRadius: '30px'}
            }}>
                {user ? <MenuItem onClick={handleLogOut}> <LogoutIcon/> &nbsp; Log out </MenuItem>
                    : <MenuItem onClick={handleLogIn}> <LoginIcon/> &nbsp; Log In </MenuItem>}
                {isMobile ?
                    <><Link className="mobile_link"  to={'/postpage'}>Play</Link>
                    <Link  className="mobile_link" to={'/createsession'}>Create session</Link>
                    <a className="mobile_link">Community</a></>
                    : null}
            </Menu>
        </div>
    );
};

export default UserProfile;