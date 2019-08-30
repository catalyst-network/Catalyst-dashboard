import axios from 'axios';

export default ({ Vue }) => {
  // we add it to Vue prototype
  // so we can reference it in Vue files
  // without the need to import axios
  Vue.prototype.$axios = axios;

  // Example: this.$axios will reference Axios now so you don't need stuff like vue-axios
};
