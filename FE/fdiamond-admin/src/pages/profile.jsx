import { Helmet } from 'react-helmet-async';

import { AccountProfile } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function AccountProfilePage() {
  return (
    <>
      <Helmet>
        <title> Account Profile </title>
      </Helmet>

      <AccountProfile />
    </>
  );
}
