import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Config } from '../../types';
import Spinner from '../UI/Spinner';

export default Loadable<{ config: Config }, {}>({
  loader: () =>
    import(/* webpackChunkName: "component_EmailPicker" */ './EmailPicker'),
  loading: function Loader() {
    return <Spinner />;
  },
});
