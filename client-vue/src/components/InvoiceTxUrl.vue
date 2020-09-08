<template>
  <a class="invoice__txUrl"
    :href="txUrlToShow"
    title="Check my transaction"
    target="_blank"
    rel="noopener"
  >
    <SvgIcon
      class="invoice__icon_link_external"
      href="invoice__icon_link_external"
    />
    Check my transaction
  </a>
</template>

<script>
export default {
  name: 'InvoiceTxUrl',

  props: {
    txUrl: {
      type: [String, Array],
      required: true
    }
  },

  computed: {
    txUrlToShow () {
      return typeof this.txUrl === 'string'
        ? this.txUrl
        : this.txUrl[this.txUrl.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice__txUrl {
    display: inline-flex;
    align-items: center;
    margin-top: 1em;
  }
  /deep/ .invoice__icon_link_external {
    width: 1em;
    height: 1em;
    margin-right: .5em;
    fill: $primary;
  }
</style>
