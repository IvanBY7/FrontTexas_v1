import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import {
  required,
  email,
  numeric,
  length,
  max,
  min,
  // eslint-disable-next-line
  min_value,
  confirmed
} from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'

localize('es', es)
extend('email', email)
extend('length', length)
extend('required', required)
extend('numeric', numeric)
extend('max', max)
extend('min', min)
// eslint-disable-next-line
extend('min_value', min_value)
extend('confirmed', confirmed)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
