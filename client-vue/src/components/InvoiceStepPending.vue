<template>
  <div class="invoice__step step_pending">
    <SvgIcon
      class="step_pending__icon_loader mb-4"
      href="invoice__icon_loader"
    />

    <h4 class="invoice__title">Payment received, <br>
      waiting for
      <template v-if="[1, '1'].includes(invoice.expected_confirmations)">{{ invoice.expected_confirmations }} confirmation</template>
      <template v-else>{{ invoice.expected_confirmations - invoice.confirmations }} of
        {{ invoice.expected_confirmations }} confirmations</template>
    </h4>

    <div class="invoice__hint lead">Please wait until network confirms your payment. It usually takes 15-60 minutes</div>

    <invoice-tx-url v-if="invoice.txUrl" :txUrl="invoice.txUrl" />
  </div>
</template>

<script>
import InvoiceTxUrl from '@/components/InvoiceTxUrl.vue'

export default {
  name: 'InvoiceStepPending',

  components: { InvoiceTxUrl },

  props: {
    invoice: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="scss">
  .step_pending {
    &__icon_loader {
      width: 80px;
      height: 80px;
      fill: $primary;
      animation: rotate infinite 1s linear;
      transform-origin: 50% 50%;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    &__row_btn {
      margin-bottom: 142px;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    &__icon_link_external,
    &__icon_bell {
      width: 1.5em;
      height: 1.5em;
      margin-right: .5em;
      fill: $primary;
    }
  }
</style>
