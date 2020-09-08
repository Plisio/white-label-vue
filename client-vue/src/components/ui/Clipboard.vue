<template>
  <div :class="getClass">
    <div class="clipboard__value">
      <slot name="clipboardText"></slot>
    </div>
    <div
      class="clipboard__btn"
      v-clipboard="val"
      v-clipboard:success="clipboardSuccessHandler"
    >
      <SvgIcon
        v-if="!noIcon && iconAlign=='left'"
        class="clipboard__icon_copy left"
        href="invoice__icon_copy"
      />
      {{ btnText }}
      <SvgIcon
        v-if="!noIcon && iconAlign=='right'"
        class="clipboard__icon_copy right"
        href="invoice__icon_copy"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)

export default {
  name: 'Clipboard',

  props: {
    valSelector: {
      type: String
    },
    val: {
      type: [Number, String]
    },
    btnText: {
      type: String
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    iconAlign: {
      type: String,
      default: 'left'
    },
    className: {
      type: String
    }
  },

  data () {
    return {
      target: null
    }
  },

  computed: {
    getClass () {
      return 'clipboard' + (this.className ? ` ${this.className}` : '')
    }
  },

  methods: {
    doCopy () {
      this.$clipboard(this.val)
      if (this.valSelector) {
        this.clipboardSuccessHandler()
      }
    },

    clipboardSuccessHandler () {
      if (this.valSelector) {
        let rng, sel
        if (document.createRange) {
          rng = document.createRange()
          rng.selectNode(this.target)
          sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(rng)
        } else {
          rng = document.body.createTextRange()
          rng.moveToElementText(this.target)
          rng.select()
        }
      }
      this.$emit('copied')
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.valSelector) {
        this.target = document.querySelector(this.valSelector)
        this.target.addEventListener('click', this.doCopy)
      }
    })
  },

  updated () {
    this.$nextTick(() => {
      if (this.valSelector) {
        this.target = document.querySelector(this.valSelector)
        this.target.addEventListener('click', this.doCopy)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .clipboard {
    &__btn {
      display: inline-flex;
      align-items: center;
      font-weight: 600;
      color: $primary;
      cursor: pointer;
    }

    &__icon_copy {
      width: 1em;
      height: 1em;
      fill: $primary;
    }

    .left{
      margin-right: .5em;
    }

    .right{
      margin-left: .5em;
    }
  }
</style>
