import { Helmet } from 'react-helmet-async';

import { NewProductView } from 'src/sections/products/view/newProductView';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Add new product </title>
      </Helmet>

      <NewProductView />
    </>
  );
}
