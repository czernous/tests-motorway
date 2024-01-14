import React from 'react';

import Logo from '../../assets/icons/logo.svg?react';
import Typeahead from '../typeahead';
import HeaderLinks from './HeaderLinks';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Typeahead />
      <div className={styles.nav}>
        <HeaderLinks />
      </div>
    </header>
  );
};

export default Header;
