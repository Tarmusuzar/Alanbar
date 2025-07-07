<template>
  <footer class="footer" id="contact">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" @click="scrollToTop">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10L19 6M19 6L15 2M19 6H9C6.79086 6 5 7.79086 5 10V14M5 14L1 18M5 14L1 10M5 14H15C17.2091 14 19 15.7909 19 18V22" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>ALANBAR ALASWAD</span>
          </div>
          <p class="tagline">Advanced surveillance solutions for a safer tomorrow.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M17.5 7.5V7.501" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-newsletter">
          <h3 class="newsletter-title">Stay Updated</h3>
          <p class="newsletter-text">Get the latest security insights and product updates</p>
          <div class="newsletter-form">
            <input 
              type="email" 
              v-model="newsletterEmail" 
              placeholder="Your email address" 
              aria-label="Email address for newsletter"
            />
            <button @click="subscribeNewsletter" aria-label="Subscribe to newsletter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} ALANBAR ALASWAD. All rights reserved.</p>
        <nav class="legal-links">
          <a href="#" class="legal-link">Privacy Policy</a>
          <a href="#" class="legal-link">Terms of Service</a>
          <a href="#" class="legal-link">Sitemap</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      newsletterEmail: ''
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    subscribeNewsletter() {
      if (this.newsletterEmail && this.newsletterEmail.includes('@')) {
        alert(`Thank you for subscribing with ${this.newsletterEmail}!`)
        this.newsletterEmail = ''
      } else {
        alert('Please enter a valid email address.')
      }  
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--bg-dark);
  color: var(--text-light);
  padding: 3rem 0 0;
  border-top: 1px solid var(--border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.logo:hover {
  color: var(--primary);
}

.logo svg {
  width: 24px;
  height: 24px;
}

.tagline {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--text-light);
  border: 1px solid var(--border);
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--bg);
  background-color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.social-links svg {
  width: 16px;
  height: 16px;
}

.newsletter-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.newsletter-text {
  color: var(--text-light);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: var(--transition);
}

.newsletter-form:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: var(--bg);
  color: var(--text);
  border: none;
  font-family: inherit;
}

.newsletter-form input:focus {
  outline: none;
}

.newsletter-form button {
  width: 48px;
  background-color: var(--primary);
  color: var(--bg);
  border: none;
  transition: var(--transition);
}

.newsletter-form button:hover {
  background-color: var(--primary-dark);
}

.newsletter-form svg {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  padding: 2rem 0 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.copyright {
  color: var(--text-light);
  font-size: 0.875rem;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-link {
  color: var(--text-light);
  font-size: 0.875rem;
  transition: var(--transition);
}

.legal-link:hover {
  color: var(--primary);
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

/* Dark mode specific styles */
.dark-mode .footer {
  background-color: var(--bg-dark);
  border-top-color: var(--border);
}

.dark-mode .newsletter-form input {
  background-color: var(--bg);
  color: var(--text);
}
</style>