import { Helmet } from 'react-helmet-async';

import { DeliveryOrderView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function DeliveryOrderPage() {
  return (
    <>
      <Helmet>
        <title> Delivery Order </title>
      </Helmet>

      <DeliveryOrderView />
    </>
  );
}
