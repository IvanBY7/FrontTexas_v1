import Vue from 'vue'
const date = datetime => {
  const config = { hour12: true, dateStyle: 'full', timeStyle: 'short' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const shortDate = datetime => {
  const config = { hour12: true, dateStyle: 'short', timeStyle: 'short' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const birthdate = datetime => {
  const config = { hour12: true, dateStyle: 'long' }
  return new Date(datetime).toLocaleString('es-MX', config)
}
const currency = (num) => {
  return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
Vue.filter('date', date)
Vue.filter('shortDate', shortDate)
Vue.filter('birthdate', birthdate)
Vue.filter('currency', currency)
