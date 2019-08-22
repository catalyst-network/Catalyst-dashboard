export function setLedgerCycles(context, payload) {
  context.commit('SET_LEDGER_CYCLES', payload);
}

export function setAvLedgerTime(context, payload) {
  context.commit('SET_AV_LEDGER_TIME', payload);
}

export function setTotalTxs(context, payload) {
  context.commit('SET_TOTAL_TXS', payload);
}

export function setWalletAddrs(context, payload) {
  context.commit('SET_WALLET_ADDRS', payload);
}

export function setLastLedgerDelta(context, payload) {
  context.commit('SET_LAST_LEDGER_DELTA', payload);
}

export function setLastLedgerTime(context, payload) {
  context.commit('SET_LAST_LEDGER_TIME', payload);
}

export function setLastLedgerTxCount(context, payload) {
  context.commit('SET_LAST_LEDGER_TX_COUNT', payload);
}
