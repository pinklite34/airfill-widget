import Loadable from 'react-loadable';

export default (__STANDALONE__
  ? require('@bitrefill/react-pusher').default
  : Loadable({
      loader: () =>
        import(/* webpackChunkName: "react-pusher" */ '@bitrefill/react-pusher'),
      loading: function Loader() {
        return null;
      },
    }));
