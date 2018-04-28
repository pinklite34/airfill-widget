import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () =>
    import(/* webpackChunkName: "react-pusher" */ '@bitrefill/react-pusher'),
  loading: function Loader() {
    return <h1>{'Pusher Loading'}</h1>;
  },
});
