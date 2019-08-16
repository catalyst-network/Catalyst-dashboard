import base32 from 'base32-encode';

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function base32Crockford(text) {
  return base32(base64ToArrayBuffer(text), 'Crockford');
}

// export default base32Crockford;

export default ({ Vue }) => {
  // we add it to Vue prototype
  // so we can reference it in Vue files
  // without the need to import axios
  Vue.prototype.$base32 = base32Crockford;

  // Example: this.$axios will reference Axios now so you don't need stuff like vue-axios
};
