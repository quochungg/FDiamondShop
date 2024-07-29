import { Helmet } from 'react-helmet-async';

import { OrderStaffView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function OrderStaffPage() {
  return (
    <>
      <Helmet>
        <title> Order Management </title>
      </Helmet>

      <OrderStaffView />
    </>
  );
}
