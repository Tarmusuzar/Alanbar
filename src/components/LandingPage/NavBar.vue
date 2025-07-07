<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled, 'dark-mode': darkMode }">
    <div class="container">
      <!-- Logo -->
      <div class="logo" @click="scrollToTop">
        <img src="@/assets/brand.jpeg" alt="ALANBAR TECH Logo" class="logo-image">
        <span class="logo-text">
          <span class="full-name">ALANBAR AL ASWAD Technical Services</span>
          <span class="short-name">ALANBAR TECH</span>
        </span>
      </div>

      <!-- Desktop Navigation - Text Only -->
      <ul class="nav-links">
        <li v-for="(item, index) in navItems" :key="index">
          <a 
            :href="item.link" 
            @click.prevent="scrollToSection(item.id)"
            class="nav-link"
            :class="{ 'active': activeSection === item.id }"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>

      <!-- Desktop Action Buttons -->
      <div class="action-buttons">
        <button 
          class="theme-toggle"
          @click="toggleDarkMode"
          aria-label="Toggle Dark Mode"
        >
          <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <button 
          class="search-button cart-button"
          @click="showInvoice"
          aria-label="Show Quote"
        >
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-counter" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </button>
        <button 
          class="cta-button whatsapp"
          @click="whatsapp"
        >
          <i class="fab fa-whatsapp"></i>
          <span class="button-text">WhatsApp</span>
        </button>
        <button 
          style="background-color: blue;"
          class="cta-button whatsapp "
          @click="$router.push('/admin')"
        >
          <i class="fas fa-user-tie"></i>
          <span class="button-text">Admin</span>
        </button>
      </div>

      <!-- Mobile Top Actions (Search + Theme) -->
      <div class="mobile-top-actions">
        <button 
          class="mobile-theme-toggle"
          @click="toggleDarkMode"
          aria-label="Toggle Dark Mode"
        >
          <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <button 
          class="mobile-search-button cart-button"
          @click="showInvoice"
          aria-label="Show Quote"
        >
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-counter" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </button>
        <button 
          class="hamburger"
          :class="{ 'active': menuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div class="mobile-menu" v-if="menuOpen" @click.self="toggleMenu">
        <div class="mobile-menu-container">
          <!-- Mobile Navigation Links with Icons -->
          <ul class="mobile-nav-links">
            <li @click.prevent="scrollToSection('home');toggleMenu()">
              <a href="#home"  class="mobile-nav-link" :class="{ 'active': activeSection === 'home' }">
                <i class="fas fa-home"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#features" @click.prevent="$router.push('/quote'); toggleMenu()" 
                 class="mobile-nav-link" :class="{ 'active': activeSection === 'features' }">
                <i class="fas fa-star"></i>
                <span>Quotation</span>
              </a>
            </li>
            <li>
              <a href="#products" @click.prevent="scrollToSection('products'); toggleMenu()" 
                 class="mobile-nav-link" :class="{ 'active': activeSection === 'products' }">
                <i class="fas fa-camera"></i>
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="#testimonials" @click.prevent="scrollToSection('testimonials'); toggleMenu()" 
                 class="mobile-nav-link" :class="{ 'active': activeSection === 'testimonials' }">
                <i class="fas fa-quote-left"></i>
                <span>Testimonials</span>
              </a>
            </li>
            <li>
              <a href="#contact" @click.prevent="scrollToSection('contact'); toggleMenu()" 
                 class="mobile-nav-link" :class="{ 'active': activeSection === 'contact' }">
                <i class="fas fa-envelope"></i>
                <span>Contact Us</span>
              </a>
            </li>
          </ul>

          <!-- Mobile WhatsApp Button -->
          <button 
            class="mobile-cta-button whatsapp"
            @click="whatsapp"
          >
            <i class="fab fa-whatsapp"></i>
            WhatsApp Now
          </button>
          <button 
          style="background-color: blue; margin: .5rem 0  9rem 0;"
            class="mobile-cta-button whatsapp"
            @click="$router.push('/admin')"
          >
            <i class="fas fa-user-tie"></i>
            Admin
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    darkMode: Boolean,
    navItems: {
      type: Array,
      default: () => []
    },
    activeSection: String,
    cartItemCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      menuOpen: false,
      isScrolled: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      document.body.style.overflow = this.menuOpen ? 'hidden' : ''
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode')
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if(sectionId =='features'){
          this.$router.push('/quote')
        }else{
      if (element) {
        
        const headerHeight = document.querySelector('.navbar').offsetHeight
        const offset = element.offsetTop - headerHeight
        window.scrollTo({ top: offset, behavior: 'smooth' })}
      }
    },
    showInvoice() {
      this.$emit('show-invoice')
    },
    whatsapp() {
      const phoneNumber = '971562155962'
      const message = 'Hello, I would like to know more about your services.'
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
/* Add these styles to your existing navbar styles */
.cart-button {
  position: relative;
}

.cart-counter {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}



/* ===== Base Styles ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  background-color: var(--bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  padding: 0.75rem 0;
  background-color: rgba(var(--bg), 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ===== Logo Styles ===== */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.logo-text {
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.logo-text .full-name {
  display: none;
}

.logo-text .short-name {
  display: inline;
}

/* ===== Desktop Navigation ===== */
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link:hover::after {
  width: 100%;
}

/* ===== Action Buttons ===== */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle, .search-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-light);
  color: var(--text);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover, .search-button:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.05);
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button.whatsapp {
  background: #25D366;
  color: white;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-text {
  display: inline;
}

/* ===== Mobile Top Actions ===== */
.mobile-top-actions {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

.mobile-theme-toggle, .mobile-search-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-light);
  color: var(--text);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-theme-toggle:hover, .mobile-search-button:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.05);
}

/* ===== Mobile Menu Button ===== */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  margin: 3px 0;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ===== Mobile Menu ===== */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-container {
  width: 85%;
  max-width: 300px;
  height: 100%;
  background: var(--bg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background: var(--bg-light);
  color: var(--primary);
}

.mobile-nav-link i {
  width: 20px;
  text-align: center;
}

.mobile-cta-button {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  margin-top: auto;
}

.mobile-cta-button.whatsapp {
  background: #25D366;
  color: white;
}

.mobile-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* ===== Animations ===== */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* ===== Responsive Styles ===== */
@media (min-width: 992px) {
  .logo-text .full-name {
    display: inline;
  }
  
  .logo-text .short-name {
    display: none;
  }
  
  .mobile-top-actions {
    display: none;
  }
}

@media (max-width: 992px) {
  .nav-links {
    display: none;
  }
  
  .action-buttons {
    display: none;
  }
  
  .mobile-top-actions {
    display: flex;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 1rem;
  }
  
  .logo-image {
    width: 36px;
    height: 36px;
  }
  
  .mobile-top-actions {
    gap: 0.25rem;
  }
}

</style>