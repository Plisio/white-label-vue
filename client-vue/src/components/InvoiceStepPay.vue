<template>
  <div class="invoice__step step_pay">
    <img
      class="step_pay__qr"
      :src="invoice.qr_code"
      alt="Invoice QR code"
      width="160"
      height="160"
    >
    <p class="invoice__hint text-center lead" id="invoice__hint_payment">Send the indicated amount to the address below:</p>

    <!-- address -->
    <div class="form-group input-group">
      <span class="input-group-prepend">
        <span class="input-group-text">
          <img
            class="step_pay__psysImg"
            :src="`https://plisio.net/img/psys-icon/${invoice.currency}.svg`"
            :alt="invoice.currency"
            width="16"
            height="16"
          >
        </span>
      </span>
      <input
        type="text"
        id="step_pay__address"
        class="form-control"
        :value="invoice.wallet_hash"
        readonly
        aria-label="Payment address"
        aria-describedby="invoice__hint_payment"
      >
      <label for="step_pay__address" class="input-group-append btn btn-primary">
        <SvgIcon class="step_pay__icon_btn step_pay__icon_btn_copy" href="invoice__icon_copy"/>
      </label>
      <Clipboard
        :val="invoice.wallet_hash"
        @copied="onCopiedHandler('Wallet address copied')"
        val-selector="#step_pay__address"
        :noIcon="true"
        v-show="false"
      />
    </div>

    <!-- amount -->
    <div class="form-group input-group">
      <span class="input-group-prepend">
        <span class="input-group-text">{{ invoice.currency }}</span>
      </span>
      <input
        type="text"
        id="step_pay__amount"
        class="form-control"
        :value="invoice.pending_amount"
        readonly
        aria-label="Pending amount"
        aria-describedby="invoice__hint_payment"
      >
      <label for="step_pay__amount" class="input-group-append btn btn-primary">
        <SvgIcon class="step_pay__icon_btn step_pay__icon_btn_copy" href="invoice__icon_copy"/>
      </label>
      <Clipboard
        :val="invoice.pending_amount"
        @copied="onCopiedHandler('Value copied')"
        val-selector="#step_pay__amount"
        :noIcon="true"
        v-show="false"
      />
    </div>

  </div>
</template>

<script>
import Clipboard from '@/components/ui/Clipboard'

export default {
  name: 'InvoiceStepPay',

  components: { Clipboard },

  props: {
    invoice: {
      type: Object,
      required: true
    }
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
  .step_pay {
    &__qr {
      margin: $spacer auto;
    }

    &__btn_copy {
      cursor: pointer;
    }

    .input-group {
      flex-wrap: nowrap;
      width: 100%;

      &-prepend,
      &-append {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 50px;
        min-height: 100%;
        margin: 0;
      }

      &-text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      &-prepend {
        .input-group-text {
          border-right: none;
        }
      }

      &-append {
        border-radius: 0 $border-radius-sm $border-radius-sm 0;
      }

    }

    &__icon_btn {
      width: 1rem;
      height: 1rem;
      fill: $white;
    }

    .form-control {
      width: 100%;
      text-align: center;
    }

  }

</style>
