import Vue from 'vue'

Vue.directive('footer-top', {
  bind: function (el) {
    const hide = document.createElement('div')
    hide.style.height = '60px'
    el.appendChild(hide)
  }
})
