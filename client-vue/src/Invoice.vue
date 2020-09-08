<template>
  <div
    class="invoice__wrap container d-flex flex-column justify-content-center align-items-center"
    :class="{ _preLoading: preLoading }"
  >
    <invoice-icon-sprite />

    <notifications
      position="top right"
      animation-name="v-fade-right"
      :duration="5000"
    />

    <div class="invoice shadow-sm">

      <invoice-progress-bar
        v-if="invoiceIsProcessing"
        :expire_utc="invoice.expire_utc"
        expireMsg="Expired, waiting for invoice refresh..."
      />

      <invoice-info
        v-if="isPaymentWaiting"
        :invoice="invoice"
      />

      <div class="invoice__content">
        <!-- pay -->
        <invoice-step-pay
          v-if="isPaymentWaiting"
          :invoice="invoice"
        />

        <!-- pending -->
        <invoice-step-pending
          v-else-if="isWaitingForConfirmations"
          :invoice="invoice"
        />

        <!-- result-overpaid -->
        <invoice-step-result
          v-else-if="isOverpaid"
          customClass="step_overpaid"
          icon="icon_overpaid"
          title="The order has been overpaid"
          :hint="`You have payed
            ${ formatCrypto(Math.abs(invoice.pending_amount) + Number(invoice.amount)) } ${invoice.currency},
            it is more than required sum.
            In case of inconvenience, please, contact support.
          `"
          :txUrl="invoice.txUrl"
        />

        <!-- result-finished -->
        <invoice-step-result
          v-else-if="isFinished"
          customClass="step_completed"
          icon="icon_check"
          title="Payment complete"
          :txUrl="invoice.txUrl"
        />

        <!-- result-underpaid -->
        <invoice-step-result
          v-else-if="isUnderpaid"
          customClass="step_underpaid"
          icon="icon_expired"
          title="The order has not been fully paid"
        >
          <p class="invoice__hint">We have received
            {{ (invoice.amount - invoice.pending_amount) | formatCrypto }} {{ invoice.currency }}
            of {{ invoice.amount }} {{ invoice.currency }} required.
            To get your payment back, please, contact support.
          </p>
        </invoice-step-result>

        <!-- result-expired -->
        <invoice-step-result
          v-else-if="isExpired"
          customClass="step_expired"
          icon="icon_expired"
          title="This order has expired"
        >
          <p class="invoice__hint">Please, <a href="/" title="Home page">go back</a> and create a new one.</p>
        </invoice-step-result>

        <!-- result-error -->
        <invoice-step-result
          v-else-if="isError"
          customClass="step_error"
          icon="icon_exclamation"
          title="Ooops..."
          hint="Something went wrong with this operation. Please, contact support, so we could figure this out."
        />

        <!-- loading -->
        <invoice-step-loading v-else />

      </div>
    </div>
  </div>
</template>

<script>
import InvoiceIconSprite from '@/components/icons/InvoiceIconSprite'
import InvoiceInfo from '@/components/InvoiceInfo'
import InvoiceStepLoading from '@/components/InvoiceStepLoading'

import api from '@/services/api'
import { formatCrypto } from '@/filters'

export default {
  components: {
    InvoiceIconSprite,
    InvoiceInfo,
    InvoiceStepLoading,
    InvoiceProgressBar: () => import(/* webpackChunkName: "InvoiceProgressBar" */ '@/components/InvoiceProgressBar'),
    InvoiceStepPay: () => import(/* webpackChunkName: "InvoiceStepPay" */ '@/components/InvoiceStepPay'),
    InvoiceStepPending: () => import(/* webpackChunkName: "InvoiceStepPending" */ '@/components/InvoiceStepPending'),
    InvoiceStepResult: () => import(/* webpackChunkName: "InvoiceStepResult" */ '@/components/InvoiceStepResult')
  },

  data () {
    return {
      id: undefined,
      preLoading: false,
      interval: null,
      invoice: {}
    }
  },

  computed: {
    invoiceIsProcessing () {
      return this.invoice.status && ['new', 'pending'].includes(this.invoice.status)
    },
    isPaymentWaiting () {
      return ['new', 'pending'].includes(this.invoice.status) && this.invoice.pending_amount > 0
    },
    isWaitingForConfirmations () {
      return ['pending'].includes(this.invoice.status) && this.invoice.pending_amount <= 0
    },
    isOverpaid () {
      return ['mismatch'].includes(this.invoice.status)
    },
    isFinished () {
      return ['finish', 'completed'].includes(this.invoice.status)
    },
    isExpired () {
      return ['expired', 'cancelled'].includes(this.invoice.status)
    },
    isUnderpaid () {
      return this.isExpired && this.invoice.pending_amount < this.invoice.amount
    },
    isError () {
      return (!this.preLoading && !this.id) || ['error'].includes(this.invoice.status)
    }
  },

  methods: {
    formatCrypto,
    getQueryVariable (variable) {
      const foundOne = location.search.substring(1)
        .split('&')
        .filter(i => {
          return decodeURIComponent(i.split('=')[0]) === variable
        })
      if (foundOne.length) {
        return decodeURIComponent(foundOne[0].split('=')[1])
      }
    },
    fetchData () {
      return api.get('/check-invoice',
        {
          params: {
            page: 'invoice',
            invoice_id: this.id
          }
        }
      )
        .then(({ data, status }) => {
          this.invoice = data
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  },

  created () {
    this.preLoading = true
    this.id = this.getQueryVariable('invoice_id')
    if (!this.id) {
      this.preLoading = false
      // eslint-disable-next-line
      console.error('No invoice_id param found.')
    } else {
      this.fetchData()
        .then(() => {
          this.preLoading = false
          this.interval = setInterval(() => {
            this.fetchData()
              .then(() => {
                if (!this.invoiceIsProcessing) {
                  clearInterval(this.interval)
                }
              })
          }, 15 * 1000)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice {
    width: 100%;
    max-width: 480px;
    margin: 3*$spacer auto;
    padding: 0;

    &__wrap {
      min-width: 320px;
    }

    &__content {
      padding: 1.5*$spacer $spacer 4*$spacer;
    }

    /deep/ &__step {
      min-height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    /deep/ &__hint {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    /deep/ &__icon_expired,
    /deep/ &__icon_check {
      width: 96px;
      height: 96px;
      fill: $primary;
    }

    /deep/ &__icon_overpaid {
      width: 66px;
      height: 96px;
      fill: $primary;
    }

    /deep/ &__icon_exclamation {
      width: 96px;
      height: 96px;
      fill: $danger;
    }

  }
</style>

<style lang="scss">
  .v-fade-right-enter-active,
  .v-fade-right-leave-active,
  .v-fade-right-move {
    transition: all $transition-base;
  }
  .v-fade-right-enter,
  .v-fade-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
