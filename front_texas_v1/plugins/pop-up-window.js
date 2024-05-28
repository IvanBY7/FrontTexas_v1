import Vue from 'vue'

const popUpWindow = {}
popUpWindow.install = function (Vue, options) {
  Vue.mixin({
    methods: {
      openPopupWindow (url, cb, size = 'width=600,height=600') {
        const newWindow = window.open(url, 'popup', size)
        newWindow.onbeforeunload = () => {
          cb()
        }
      }
    }
  })
}
Vue.use(popUpWindow)
