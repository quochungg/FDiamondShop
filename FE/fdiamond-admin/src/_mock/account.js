// ----------------------------------------------------------------------

export const account = {
  displayName: 'Thien Bao',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avtdf.jpg',
};

export const updateAccount = (newData) => {
  Object.assign(account, newData);
};
