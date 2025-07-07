<template>
  <div class="stats-bar">
    <div class="container">
      <div class="stat" v-for="(stat, index) in stats" :key="index">
        <div class="stat-number">
          <template v-if="countersLoaded">
            {{ formatNumber(stat.value) }}<span v-if="stat.plus">+</span>
          </template>
          <span v-else>0<span v-if="stat.plus">+</span></span>
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainStats',
  props: {
    countersLoaded: Boolean,
    stats: Array
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString()
    }
  }
}
</script>

<style scoped>
/* Keep existing styles */
.stats-bar {
  background-color: var(--primary);
  color: white;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  margin-top: -2rem;
}

.stats-bar .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat {
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.stats-bar {
  background-color: var(--primary);
  color: white;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  margin-top: -2rem;
}

.stats-bar .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat {
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}
</style>