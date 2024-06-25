import { Helmet } from 'react-helmet-async';

import { EditProductView } from 'src/sections/products/view/EditProductView';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Edit product </title>
      </Helmet>

      <EditProductView />
    </>
  );
}
