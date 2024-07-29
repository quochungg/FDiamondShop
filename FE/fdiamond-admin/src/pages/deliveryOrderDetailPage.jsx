import { Helmet } from 'react-helmet-async';

import { DeliveryOrderDetail } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function DeliveryOrderDetailPage() {
  return (
    <>
      <Helmet>
        <title> Order Detail </title>
      </Helmet>

      <DeliveryOrderDetail />
    </>
  );
}
