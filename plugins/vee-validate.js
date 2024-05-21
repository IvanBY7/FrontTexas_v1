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
extend('password', {
  validate: value => {
    // Validate that password is at least 8 characters, with at least one digit and one uppercase letter
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(value)
  },
  message: 'The password must be at least 8 characters long and contain at least one digit and one uppercase letter.'
})
extend('max', max)
extend('min', min)
// eslint-disable-next-line
extend('min_value', min_value)
extend('confirmed', confirmed)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
