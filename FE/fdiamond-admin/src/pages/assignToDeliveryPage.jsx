import { Helmet } from 'react-helmet-async';

import { AssignToDelivery } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function AssignToDeliveryPage() {
  return (
    <>
      <Helmet>
        <title> Order Detail </title>
      </Helmet>

      <AssignToDelivery />
    </>
  );
}
