export function SET_LEDGER_CYCLES(state, payload) {
  state.ledgerCycles = payload;
}

export function SET_AV_LEDGER_TIME(state, payload) {
  state.avLedgerTime = payload;
}

export function SET_TOTAL_TXS(state, payload) {
  state.totalTxs = payload;
}

export function SET_WALLET_ADDRS(state, payload) {
  state.walletAddrs = payload;
}

export function SET_LAST_LEDGER_DELTA(state, payload) {
  state.lastLedgerDelta = payload;
}

export function SET_LAST_LEDGER_TIME(state, payload) {
  state.lastLedgerTime = payload;
}

export function SET_LAST_LEDGER_TX_COUNT(state, payload) {
  state.lastLedgerTxCount = payload;
}
