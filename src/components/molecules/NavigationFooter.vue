<template lang="pug">
  .navigation-footer
    ul.navigation-footer__content.navigation-list
      li.navigation-list__item
        nuxt-link.navigation-btn(to="/home" :class="{ 'navigation-btn--active': isHome }")
          include ../svg/home.svg
      li.navigation-list__item
        nuxt-link.navigation-btn(to="/requests" :class="{ 'navigation-btn--active': isRequest }")
          include ../svg/add.svg
      li.navigation-list__item
        nuxt-link.navigation-btn(to="/items" :class="{ 'navigation-btn--active': isItems }")
          include ../svg/shirt.svg
      li.navigation-list__item
        nuxt-link.navigation-btn(to="/settings" :class="{ 'navigation-btn--active': isSettings }")
          include ../svg/setting.svg
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/atoms/Logo.vue'

@Component({
  components: { Logo }
})
export default class NavigationFooter extends Vue {
  get isHome() {
    if (!this.$route) return false
    return this.$route.path.startsWith('/home')
  }

  get isRequest() {
    if (!this.$route) return false
    return this.$route.path.startsWith('/requests')
  }

  get isItems() {
    if (!this.$route) return false
    return this.$route.path.startsWith('/items')
  }

  get isSettings() {
    if (!this.$route) return false
    return this.$route.path.startsWith('/settings')
  }
}
</script>

<style lang="scss" scoped>
.navigation-footer {
  background-color: #fff;
  height: 45px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: inherit;
  }

  .navigation-list {
    position: relative;
    z-index: 10;
    display: table;
    table-layout: fixed;
    width: 100%;

    &__item {
      display: table-cell;
      height: 45px;
      vertical-align: middle;

      .navigation-btn {
        width: fit-content;
        height: 24px;
        display: block;
        margin: 0 auto;
        color: #333;

        svg {
          height: 100%;
        }

        &--active {
          color: theme('colors.base');
        }
      }
    }
  }
}
</style>
