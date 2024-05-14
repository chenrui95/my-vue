import Vue from 'vue';

Vue.directive('footer-top', {
  bind: function (el, binding) {
    if (binding.value !== undefined && binding.value) {
      const hide = document.createElement('div');
      hide.style.height = '60px';
      el.appendChild(hide);
    }
  }
});
