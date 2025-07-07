import { ref } from 'vue'

const events = ref({})

export default {
  $on(event, callback) {
    if (!events.value[event]) {
      events.value[event] = []
    }
    events.value[event].push(callback)
  },
  $off(event, callback) {
    if (!events.value[event]) return
    if (callback) {
      events.value[event] = events.value[event].filter(cb => cb !== callback)
    } else {
      delete events.value[event]
    }
  },
  $emit(event, ...args) {
    if (!events.value[event]) return
    events.value[event].forEach(callback => callback(...args))
  }
}