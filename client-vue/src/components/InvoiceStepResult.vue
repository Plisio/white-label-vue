<template>
  <div class="invoice__step" :class="customClass">
    <SvgIcon
      :class="`invoice__${icon}`"
      :href="`invoice__${icon}`"
    />
    <h4 class="invoice__title mt-4">{{ title }}</h4>
    <div v-if="hint" class="invoice__hint lead">{{ hint }}</div>
    <invoice-tx-url v-if="txUrl" :txUrl="txUrl" />
    <slot />
  </div>
</template>

<script>
import InvoiceTxUrl from '@/components/InvoiceTxUrl.vue'

export default {
  name: 'InvoiceStepResult',

  components: { InvoiceTxUrl },

  props: {
    customClass: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    hint: {
      type: String
    },

    txUrl: {
      type: [String, Array]
    }

  }

}
</script>

<style lang="scss">
</style>
