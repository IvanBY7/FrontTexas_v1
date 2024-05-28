import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const TokenKey = 'x-access-token'
const RefreshKey = 'Refresh-Token'

export function getValue (value) {
  return Cookies.get(value)
}

export function getToken () {
  return Cookies.get(TokenKey)
}

export function getRefreshToken () {
  return Cookies.get(RefreshKey)
}

export function setValue (key, value) {
  Cookies.set(key, value)
}

export function setToken (token) {
  Cookies.set(TokenKey, token)
}

export function setRefreshToken (token) {
  Cookies.set(RefreshKey, token)
}

export function removeToken () {
  Cookies.remove(TokenKey)
}

export function removeValue (key) {
  Cookies.remove(key)
}

export function removeRefreshToken () {
  Cookies.remove(RefreshKey)
}

export function decodeToken (token) {
  return jwtDecode(token)
}
