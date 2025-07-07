<template>
  <section class="final-cta">
    <div class="container">
      <h2>Ready to Secure Your Property?</h2>
      <p>Get a free quote and security assessment from our experts today</p>
      <button class="cta-btn primary large" @click="scrollToSection('contact')">
        <i class="fas fa-shield-alt"></i> Get Protected Now
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight
        const offset = element.offsetTop - headerHeight
        
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
.final-cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  text-align: center;
}

.final-cta h2 {
  color: white;
  margin-bottom: 1rem;
}

.final-cta p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: var(--transition);
  gap: 0.5rem;
}

.cta-btn.primary {
  background-color: var(--primary);
  color: white;
}

.cta-btn.primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.cta-btn.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
</style>