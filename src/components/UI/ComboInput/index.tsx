import * as React from 'react';
import * as Loadable from 'react-loadable';

import Spinner from '../Spinner';

export default Loadable<any, {}>({
  loader: () =>
    import(/* webpackChunkName: "component_ComboInput" */ './ComboInput'),
  loading: function Loader() {
    return <Spinner small white />;
  },
});
