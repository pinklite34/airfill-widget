import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Config } from '../../types';
import Spinner from '../UI/Spinner';

export default Loadable<Config, {}>({
  loader: () => import(/* webpackChunkName: "component_Payment" */ './Payment'),
  loading: function Loader() {
    return <Spinner />;
  },
});
