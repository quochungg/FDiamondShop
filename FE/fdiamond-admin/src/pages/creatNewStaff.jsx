import { Helmet } from 'react-helmet-async';

import { NewStaffView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function StaffsPage() {
  return (
    <>
      <Helmet>
        <title> Add new staff Account </title>
      </Helmet>

      <NewStaffView />
    </>
  );
}
