import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "component_Flag" */ './Flag'),
  loading: function Loader({ error }) {
    return null;
  },
});
