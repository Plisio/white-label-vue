<template>
  <div id="awesome-app">
    <Invoice
      :invoice="invoice"
      :preLoading="preLoading"
      @cancelFetch="cancelFetch"
    >
      <h3 slot="invoice-loading" style="text-align: center;">This is an example custom loading-step...</h3>
    </Invoice>
  </div>
</template>

<script>
import Invoice from '@plisio/vue-invoice'
import api, { getQueryVariable } from './api'

export default {
  name: 'App',

  components: {
    Invoice
  },

  data () {
    return {
      id: undefined,
      intervalFetch: null,
      preLoading: true,
      invoice: {}
    }
  },

  methods: {
    async fetchData () {
      try {
        const { data } = await api.get('/check-invoice.php',
          {
            params: {
              page: 'invoice',
              invoice_id: this.id
            }
          }
        )
        this.invoice = data || {}
      } catch (error) {
        console.log('Failed to fetch data.', error)
      }
    },
    cancelFetch () {
      clearInterval(this.intervalFetch)
    },
    async init () {
      this.id = getQueryVariable('invoice_id')
      this.preLoading = true

      if (!this.id) {
        this.preLoading = false
        console.error('No invoice_id param found.')
      } else {
        await this.fetchData()
        this.preLoading = false
        this.intervalFetch = setInterval(async () => {
          await this.fetchData()
        }, 15 * 1000)
      }
    }
  },

  created () {
    this.init()
  },

  beforeDestroy () {
    this.cancelFetch()
  }

}
</script>

<style lang="scss">
  @import "~@plisio/vue-invoice/dist/vue-invoice.css";  // optional
</style>
