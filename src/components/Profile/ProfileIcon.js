import React, { useState } from 'react';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import './ProfileIcon.css';

import { SIGN_OUT } from '../../route';

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className='pa4 tc'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag='span'
          data-toggle='dropdown'
          aria-expanded={dropdownOpen}>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='br-100 ba h3 w3 dib'
            alt='avatar'
          />
        </DropdownToggle>
        <DropdownMenu right className='b--transparent shadow-5 dropDownMenu'>
          <DropdownItem onClick={() => toggleModal()}>
            View Profile
          </DropdownItem>
          <DropdownItem onClick={() => onRouteChange(SIGN_OUT)}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
