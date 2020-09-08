<template functional>
  <div class="invoice__step step_loading">
    <SvgIcon
      class="step_loading__icon_loader"
      href="invoice__icon_loader"
    />
  </div>
</template>

<script>

export default {
  name: 'LoadingStep',
  functional: true
}
</script>

<style lang="scss" scoped>
  .step_loading {
    /deep/ &__icon_loader {
      width: 80px;
      height: 80px;
      fill: $primary;
      animation: rotate infinite 1s linear;
      transform-origin: 50% 50%;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
