<template>
  <div class="invoice__info info d-flex justify-content-between align-items-center pt-2 pb-2">
    <div class="info__shop col">
      <h5><small>Order #</small>{{ invoice.order_id }}</h5>
    </div>
    <div class="info__amount col text-right">
      <strong class="info__amount_crypto">{{ invoice.amount }}</strong>
      &nbsp;
      <strong class="info__amount_curr">{{ invoice.currency }}</strong>
      <Clipboard
        :val="invoice.amount"
        @copied="onCopiedHandler('Value copied')"
        val-selector=".info__amount_crypto"
        :noIcon="true"
        v-show="false"
      />
      <Clipboard
        :val="invoice.currency"
        @copied="onCopiedHandler('Value copied')"
        val-selector=".info__amount_curr"
        :noIcon="true"
        v-show="false"
      />
      <br>
      {{ amountUSD | formatFiat }} &nbsp; USD
    </div>
  </div>
</template>

<script>
import { formatFiat } from '@/filters'

export default {
  name: 'InvoiceInfo',

  props: {
    invoice: {
      type: Object,
      required: true,
      default: null
    }
  },

  computed: {
    amountUSD () {
      return this.invoice.amount / this.invoice.source_rate
    }
  },

  filters: {
    formatFiat
  },

  methods: {
    onCopiedHandler (text) {
      this.$notify({
        type: 'success',
        text
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    &__amount {
      white-space: nowrap;
    }
  }
</style>
