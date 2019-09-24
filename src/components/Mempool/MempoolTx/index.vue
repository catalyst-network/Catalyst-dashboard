<template>
  <div>
    <div
      class="row peer-item text-negative q-gutter-sm"
    >
      <div
        class="peer-id col overflow"
      >
        <span
          class="peer-id"
        >{{ tx.txHash }}</span>
      </div>
      <div class="col text-left overflow">
        {{ tx.peerId }}
      </div>
      <div class="col text-left overflow">
        {{ new Date(tx.time).toTimeString() }}
      </div>
      <div
        class="col-1 text-left overflow"
      >
        {{ tx.amount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MempoolTx',
  props: {
    tx: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.blacklisted {
  background-color: #ffcdd2;
}

.peer-item {
  padding: 16px;
  opacity: 0.8;
}

.peer-item :hover {
  opacity: 1;
}

.peer-rating {
  padding-right: 5px;
  padding-bottom: 1px;
}

.flag-icon {
  margin-bottom: -3px;
}

.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
