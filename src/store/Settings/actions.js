export function setDarkMode(context, payload) {
  context.commit('SET_DARK_MODE', payload);
}

export function setLoading(context, payload) {
  context.commit('SET_LOADING', payload);
}

export function setSelectedNode(context, payload) {
  context.commit('SET_SELECTED_NODE', payload);
}
