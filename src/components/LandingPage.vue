<template>
  <div class="cctv-landing" :class="{ 'dark-mode': darkMode }" id="home">
    <!-- Preloader -->
    <div v-if="!pageLoaded" class="preloader">
      <div class="brand-loader">
        <div class="letter" v-for="(letter, index) in letters" :key="index"
             :style="{ animationDelay: `${index * 0.1}s` }">
          {{ letter }}
        </div>
      </div>
    </div>

    <NavBar 
      :darkMode="darkMode" 
      :navItems="navItems"
      :activeSection="activeSection"
      :cartItemCount="quoteItems.length"
      @toggle-dark-mode="toggleDarkMode"
      @show-invoice="showInvoice = true"
    />

    <invoice-modal 
      :isOpen="showInvoice" 
      :initialItems="quoteItems"
      @close="showInvoice = false"
      @item-removed="updateCartCount"
      @order-submitted="handleOrderSubmission"
    />

    <MainProducts 
      ref="productsSection"
      @section-visible="setActiveSection('products')"
    />

    <MainStats 
      :stats="stats" 
      :countersLoaded="countersLoaded"
    />

    <MainTestimonials 
      :testimonials="testimonials"
    />

    <CtaSection />

    <MainFooter />
  </div>
</template>

<script>
import NavBar from './LandingPage/NavBar.vue'
import MainProducts from './LandingPage/MainProducts.vue'
import MainStats from './LandingPage/MainStats.vue'
import MainTestimonials from './LandingPage/MainTestimonials.vue'
import CtaSection from './LandingPage/CtaSection.vue'
import MainFooter from './LandingPage/MainFooter.vue'
import InvoiceModal from './InvoiceModal.vue'
import eventEmitter from '@/utils/eventEmitter'

export default {
  name: 'App',
  components: {
    NavBar,
    MainProducts,
    MainStats,
    MainTestimonials,
    CtaSection,
    MainFooter,
    InvoiceModal
  },
  data() {
    return {
      letters: ['A', 'L', 'A', 'N', 'B', 'A', 'R','      ','  ' ,'A','L','A','S','W','A','D'],
      pageLoaded: false,
      darkMode: false,
      countersLoaded: false,
      activeSection: '',
      showInvoice: false,
      quoteItems: [],
      navItems: [
        { text: 'Home', link: '#home', id: 'home' },
        { text: 'Quotation', link: '#home', id: 'features' },
        { text: 'Products', link: '#products', id: 'products' },
        { text: 'Contact Us', link: '#contact', id: 'contact' }
      ],
      stats: [
        { value: 2500, label: 'Protected Properties', plus: true },
        { value: 98, label: 'Customer Satisfaction', plus: false, percent: true },
        { value: 15, label: 'Years Experience', plus: true },
        { value: 24, label: 'Support Availability', plus: false }
      ],
      testimonials: [
        {
          id: 1,
          name: 'Sarah Johnson',
          title: 'Homeowner',
          text: 'ALANBAR ALASWAD installed cameras...',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          id: 2,
          name: 'Michael Chen',
          title: 'Business Owner',
          text: 'ALANBAR ALASWAD installed cameras...',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: 3,
          name: 'David Wilson',
          title: 'Property Manager',
          text: 'ALANBAR ALASWAD installed cameras...',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
      ]
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
    },
    setActiveSection(section) {
      this.activeSection = section
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id
          }
        })
      }, {
        threshold: 0.5,
        rootMargin: '-100px 0px -50% 0px'
      })

      const sections = ['home', 'products', 'features', 'testimonials', 'contact']
      sections.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })
    },
    handleOrderSubmission(orderData) {
      console.log('Order submitted:', orderData)
      this.quoteItems = []
    },
    updateCartCount(count) {
      if (count === 0) {
        this.quoteItems = []
      }
    },
    addToQuote(item) {
    // Create a new array to trigger reactivity
    const newItems = [...this.quoteItems]
    const existingIndex = newItems.findIndex(i => i.id === item.id)
    
    if (existingIndex >= 0) {
      newItems[existingIndex].quantity += item.quantity
    } else {
      newItems.push({...item})
    }
    
    this.quoteItems = newItems // This triggers reactivity
  }
  },
  mounted() {
    this.setupIntersectionObserver()

    if (localStorage.getItem('darkMode') === 'true' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.darkMode = true
    }
    
    setTimeout(() => {
      this.pageLoaded = true
      document.body.style.overflow = ''
    }, 2000)

    eventEmitter.$on('add-to-quote', this.addToQuote)
  },
  beforeUnmount() {
    eventEmitter.$off('add-to-quote', this.addToQuote)
  }
}
</script>
<style>
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --accent: #f59e0b;
  --text: #1f2937;
  --text-light: #6b7280;
  --bg: #ffffff;
  --bg-light: #f9fafb;
  --bg-dark: #111827;
  --border: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --transition: all 0.3s ease;
}

.dark-mode {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #10b981;
  --accent: #f59e0b;
  --text: #f9fafb;
  --text-light: #d1d5db;
  --bg: #111827;
  --bg-light: #1f2937;
  --bg-dark: #030712;
  --border: #374151;
}

body, html {
  margin: 0;
  padding: 0;
  color: var(--text);
  background-color: var(--bg);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Updated Preloader Styles */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.brand-loader {
  display: flex;
  gap: 0.5rem;
}

.letter {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0;
  transform: translateY(20px);
  animation: letterReveal cubic-bezier(0.9, 11, 0.22, 9)  forwards;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@keyframes letterReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode adjustments */
.dark-mode .preloader {
  background-color: var(--bg-dark);
}

.dark-mode .letter {
  color: var(--primary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .letter {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .brand-loader {
    gap: 0.25rem;
  }
  .letter {
    font-size: 1.5rem;
  }
}

/* Rest of your existing styles... */
</style>