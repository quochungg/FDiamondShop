import PropTypes from 'prop-types';
import { React, useMemo, useState, useEffect, createContext } from 'react';

// Tạo context
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({
    displayName: '',
    email: '',
    UserID: '',
    photoURL: '/assets/images/avatars/avtdf.jpg',
  });

  useEffect(() => {
    // Load account from localStorage
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const updateAccount = (newData) => {
    setAccount((prevAccount) => {
      const updatedAccount = { ...prevAccount, ...newData };
      localStorage.setItem('account', JSON.stringify(updatedAccount));
      return updatedAccount;
    });
  };

  const contextValue = useMemo(() => ({ account, updateAccount }), [account]);

  return <AccountContext.Provider value={contextValue}>{children}</AccountContext.Provider>;
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
