// ----------------------------------------------------------------------

export const account = {
  displayName: 'Thien Bao',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avtdf.jpg',
};

export const updateAccount = (newData) => {
  Object.assign(account, newData);
  localStorage.setItem('account', JSON.stringify(account));
};

export const loadAccount = () => {
  const storedAccount = localStorage.getItem('account');
  if (storedAccount) {
    Object.assign(account, JSON.parse(storedAccount));
  }
};
