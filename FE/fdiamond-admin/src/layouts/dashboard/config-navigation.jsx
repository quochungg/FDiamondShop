import { useContext } from 'react';

import { AccountContext } from 'src/_mock/AccountContext';

import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const NavConfig = () => {
  const { account } = useContext(AccountContext);

  let config = [];

  switch (account.role) {
    case 'admin':
      config = [
        {
          title: 'dashboard',
          path: '/',
          icon: icon('ic_analytics'),
        },
        {
          title: 'staff',
          path: '/staff',
          icon: icon('ic_user'),
        },
        {
          title: 'product',
          path: '/products',
          icon: icon('ic_product'),
        },
        {
          title: 'order',
          path: '/order',
          icon: icon('ic_order'),
        },
        {
          title: 'Discount',
          path: '/discountCode',
          icon: icon('ic_voucher'),
        },
      ];
      break;
    case 'deliverystaff':
      config = [
        {
          title: 'order',
          path: '/order-delivery',
          icon: icon('ic_order'),
        },
      ];
      break;
    default:
      config = [];
  }
  return config;
};

export default NavConfig;
