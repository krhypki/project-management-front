import type { DirectiveBinding } from 'vue'

interface DireciveElement extends HTMLElement {
  clickOutsideEvent: (event: Event) => void
}

export const vClickOutside = {
  mounted(el: DireciveElement, binding: DirectiveBinding) {
    console.log('mounted')
    el.clickOutsideEvent = (event: Event) => {
      const target = event.target as HTMLElement
      const { additionalSelector, handler } = binding.value
      const additionalElements = additionalSelector
        ? [...document.querySelectorAll(additionalSelector)]
        : []

      const method = handler || binding.value
      if (
        !(
          el === target ||
          el.contains(target) ||
          (event.currentTarget && additionalElements.includes(event.currentTarget))
        )
      ) {
        method()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },

  unmounted: (el: DireciveElement) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
