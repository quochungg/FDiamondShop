import { Helmet } from 'react-helmet-async';

import { VoucherView } from 'src/sections/voucher/view';

// ----------------------------------------------------------------------

export default function VoucherPage() {
  return (
    <>
      <Helmet>
        <title> Discount Code Management </title>
      </Helmet>

      <VoucherView />
    </>
  );
}
