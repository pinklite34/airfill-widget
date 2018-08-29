import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Config } from '../../types';
import Spinner from '../UI/Spinner';

export default Loadable<{ config: Config }, {}>({
  loader: () =>
    import(/* webpackChunkName: "component_AmountPicker" */ './AmountPicker'),
  loading: function Loader() {
    return <Spinner />;
  },
});
