import { createStore } from 'vuex';
import getters from './getters';
import layout from './modules/layout';

export default createStore({
  modules: {
    layout,
  },
  getters,
});
