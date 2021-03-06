<template lang="pug">
  button.f-btn(
    :class="classes"
    :style="styles"
    :disabled="disabled"
    :type="type"
    @click="onClick"
  )
    .f-btn__content(v-if="loading")
      include ../svg/dots-loading.svg
    .f-btn__content(v-else)
      | {{ label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class BaseButton extends Vue {
  @Prop({ type: String, default: '#08d9d6' }) backgroundColor!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) depressed!: boolean
  @Prop({ type: Boolean, default: false }) flat!: boolean
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) small!: boolean
  @Prop({ type: String, default: 'button' }) type!: string
  @Prop({ type: String, default: '#fff' }) textColor!: string
  @Prop({ type: String }) to!: string
  @Prop({ type: Boolean, default: false }) round!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean

  get classes(): { [key: string]: boolean } {
    return {
      'f-btn--disabled': this.disabled,
      'f-btn--depressed': this.depressed,
      'f-btn--flat': this.flat,
      'f-btn--small': this.small,
      'f-btn--round': this.round
    }
  }

  get styles(): { [key: string]: string } {
    return {
      '--background-color': this.backgroundColor,
      '--text-color': this.textColor
    }
  }

  private onClick() {
    if (this.to) return this.$router.push(this.to)
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.f-btn {
  --text-color: #fff;
  --background-color: #08d9d6;

  align-items: center;
  background-color: var(--background-color);
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  color: var(--text-color);
  display: inline-flex;
  font-size: 18px;
  font-weight: 700;
  height: 48px;
  justify-content: center;
  outline: 0;
  user-select: none;
  width: 100%;

  &--round {
    border-radius: 999px;
  }

  &--small {
    font-size: 16px;
    height: 40px;
  }

  &--depressed {
    box-shadow: none;
  }

  &--disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }

  &--flat {
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
