import React, {useState} from 'react';
import '../navbar.css'

const UserProfile = ({items, isToggled}) => {
    const [toggled, setToggled] = useState(false);
    return (
        <div className='navbar__user-profile' onClick={() => setToggled(!toggled)}>
            <ul className={toggled? 'navbar__user-profile__user-menu' : 'navbar__user-profile__user-menu-inactive'}>
                {items.map(item => <li className='navbar__user-profile__user-menu__item'>{item}</li>)}
            </ul>
        </div>
    );
};

export default UserProfile;