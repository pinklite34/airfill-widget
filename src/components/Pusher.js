import Loadable from 'react-loadable';

export default Loadable({
  loader: () =>
    import(/* webpackChunkName: "module__react-pusher" */ '@bitrefill/react-pusher'),
  loading: function Loader() {
    return null;
  },
});
