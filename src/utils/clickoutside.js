import Vue from 'vue'

let callback
Vue.directive('clickoutside', {
  bind: function (el, binding) {
    callback = (event) => {
      if (event.target !== el && !el.contains(event.target)) {
        binding.value(event)
      }
    }
    document.addEventListener('click', callback)
  },
  unbind: function (el) {
    document.removeEventListener('click', callback)
  }
})
