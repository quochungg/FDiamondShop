import { Helmet } from 'react-helmet-async';

import { OrderDetailView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  return (
    <>
      <Helmet>
        <title> Order Management </title>
      </Helmet>

      <OrderDetailView />
    </>
  );
}
