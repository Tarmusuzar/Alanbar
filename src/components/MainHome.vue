<template>
  <div :class="['eshop', theme]">
    <!-- Navbar -->
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="logo" @click="scrollToTop">
  <img src="@/assets/brand.jpeg" alt="ALANBAR TECH Logo" class="logo-image">
  <span>ALANBAR TECH</span>
</div>
        
        <nav class="nav">
          <ul>
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link" @click.prevent="scrollToSection(item.link.substring(1))">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <button class="theme-toggle" @click="toggleDarkMode">
            <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <button class="cta-btn small" @click="openWhatsapp"
 style="background-color: #25D366;color: white; border: 1px solid white;">
            <i class="fab fa-whatsapp"></i> Whatsapp Now
          </button>
          <button class="hamburger" @click="toggleMenu" :class="{ 'open': menuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    <!-- Hero / Intro -->
    

    <!-- Product Grid -->
    <main class="product-grid" aria-label="Product list">
      <article
        v-for="item in products"
        :key="item.id"
        class="product-card"
        tabindex="0"
        role="button"
        @click="selectProduct(item)"
        @keyup.enter.space="selectProduct(item)"
      >
        <img :src="item.image" :alt="item.name" loading="lazy" />
        <div class="info">
          <h2>{{ item.name }}</h2>
          <p>{{ item.short }}</p>
          <span class="price">AED {{ item.price.toFixed(2) }}</span>
        </div>
      </article>
    </main>

    <!-- Modal -->
    <div
      v-if="selected"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      @click.self="closeModal"
      @keyup.esc="closeModal"
      tabindex="0"
    >
      <section class="modal" ref="modal" tabindex="-1">
        <button class="close-btn" aria-label="Close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selected.image" :alt="selected.name" />
        <h2>{{ selected.name }}</h2>
        <p>{{ selected.description }}</p>
        <span class="price">AED {{ selected.price.toFixed(2) }}</span>
        <button class="add-btn" @click="addToCart(selected)">
          <i class="fas fa-cart-plus"></i> Add to Quote
        </button>
      </section>
    </div>

    <!-- Quote Button -->
    <button class="quote-btn" @click="createQuote">
      <i class="fas fa-file-invoice-dollar"></i> Create Quote
    </button>
  </div>
</template>

<script>
import cameraImage from '@/assets/cctvcam.jpg';
import minibullet from '@/assets/minibullet.jpg'
import wifi from '@/assets/wifismart.webp'
import e from '@/assets/8.jpg'
import ei from '@/assets/88.jpg'
import eig from '@/assets/9.jpg'


export default {
  name: 'CCTVShopPro',
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      selected: null,
      cart: [],
      products: [
        {
          id: 1,
          name: '360° Dome Camera',
          short: 'Night Vision | Waterproof',
          description:
            'High-resolution camera with 360° coverage, ideal for indoor/outdoor security.',
          price: 450,
          image: cameraImage,
        },
        {
          id: 4,
          name: 'Mini Bullet Camera',
          short: 'Compact | HD Clarity',
          description:
            'Small-sized HD camera for narrow field surveillance with motion detection.',
          price: 320,
          image: ei,
        },
        {
          id: 3,
          name: 'WiFi Smart Cam',
          short: 'App Controlled | Cloud Storage',
          description:
            'Smart camera controllable via mobile with auto-alerts and two-way audio.',
          price: 530,
          image: e,
        },
        {
          id: 2,
          name: 'Outdoor Infrared Camera',
          short: 'Infrared Night Vision | Weatherproof',
          description:
            'Infrared technology enables sharp vision even in total darkness outdoors.',
          price: 600,
          image: minibullet,
        },
        {
          id: 5,
          name: 'PTZ Camera',
          short: 'Pan, Tilt, Zoom | Remote Control',
          description:
            'Flexible camera for wide-area coverage with remote directional controls.',
          price: 750,
          image: eig,
        },
        {
          id: 6,
          name: '4K Ultra HD Camera',
          short: 'Crystal Clear | Wide Angle Lens',
          description:
            'Professional 4K resolution camera for high detail surveillance.',
          price: 900,
          image: wifi,
        },
      ],
    };
  },
  computed: {
    themeIcon() {
      return this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    },
  },
  methods: {
    selectProduct(item) {
      this.selected = item;
      this.$nextTick(() => {
        this.$refs.modal?.focus();
      });
    },
    closeModal() {
      this.selected = null;
    },
    addToCart(item) {
      if (!this.cart.includes(item)) {
        this.cart.push(item);
        alert(`${item.name} added to cart!`);
      } else {
        alert(`${item.name} is already in your cart.`);
      }
      this.closeModal();
    },
    alertCart() {
      if (!this.cart.length) {
        alert('Your cart is empty.');
      } else {
        alert(
          `You have ${this.cart.length} item(s) in your cart:\n` +
            this.cart.map((i) => i.name).join(', ')
        );
      }
    },
    createQuote() {
     this.$router.push('/quote')
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
  },
  mounted() {
    // Apply saved theme on mount
    document.documentElement.setAttribute('data-theme', this.theme);
  },
};
</script>

<style scoped>
/* Light Theme */
.eshop.light {
  background: #ffffff;
  color: #111111;
}
.eshop.light .navbar {
  background: #000000;
  color: #00c9e0;
}
.eshop.light .product-card {
  background: #ffffff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}
.eshop.light .modal {
  background: #ffffff;
  color: #111111;
}
.eshop.light .add-btn {
  background: #00c9e0;
  color: #000000;
}
.eshop.light .add-btn:hover {
  background: #00b5cc;
}
.eshop.light .quote-btn {
  background: #ff007a;
  box-shadow: 0 4px 12px rgba(255, 0, 122, 0.5);
  color: #ffffff;
}
.eshop.light .quote-btn:hover {
  background: #e6006f;
}

/* Dark Theme */
.eshop.dark {
  background: #0e1015;
  color: #eeeeee;
}
.eshop.dark .navbar {
  background: #152039;
  color: #1d9ce5;
}
.eshop.dark .product-card {
  background: #152039;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
.eshop.dark .modal {
  background: #1f2a48;
  color: #eeeeee;
}
.eshop.dark .add-btn {
  background: #1d9ce5;
  color: #000000;
}
.eshop.dark .add-btn:hover {
  background: #1487cc;
}
.eshop.dark .quote-btn {
  background: #d4745b;
  box-shadow: 0 4px 12px rgba(255, 158, 94, 0.6);
  color: #ffffff;
}
.eshop.dark .quote-btn:hover {
  background: #c25f48;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.nav-brand i {
  font-size: 1.5rem;
  color: inherit;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.theme-btn,
.cart-btn {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.3rem;
  position: relative;
  padding: 0.2rem;
  transition: all 0.3s ease;
}
.theme-btn:hover,
.cart-btn:hover {
  color: #00c9e0;
}
.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #ff007a;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: 700;
  pointer-events: none;
}

/* Hero */
.hero {
  text-align: center;
  padding: 4rem 1rem 3rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.hero h1 {
  font-size: 2.75rem;
  margin-bottom: 0.5rem;
}
.hero p {
  font-size: 1.25rem;
  color: currentColor;
  opacity: 0.75;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 1rem 2rem 3rem;
}
.product-card {
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover,
.product-card:focus-visible {
  outline: none;
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(0, 229, 255, 0.25);
}
.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info h2 {
  font-size: 1.3rem;
  margin: 0 0 0.4rem;
}
.info p {
  flex-grow: 1;
  font-size: 0.95rem;
  color: currentColor;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}
.price {
  font-weight: 700;
  font-size: 1rem;
  color: #00c9e0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 9999;
}
.modal {
  max-width: 420px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #111111;
}
.modal img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.modal h2 {
  margin: 0.75rem 0;
  font-weight: 700;
}
.modal p {
  font-size: 1rem;
  color: #555555;
  margin-bottom: 1rem;
  line-height: 1.4;
}
.modal .price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #00c9e0;
  margin-bottom: 1.5rem;
}
.add-btn {
  background: #00c9e0;
  color: #000000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
.add-btn:hover {
  background: #00b5cc;
}

/* Close button in modal */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.close-btn:hover {
  color: #00c9e0;
}

/* Quote Button */
.quote-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #e6006f;
  color: #ffffff;
  border: none;
  padding: 1rem 1.75rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 6px 15px rgba(255, 0, 122, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
}

/* Responsive */
@media (max-width: 900px) {
  .hero h1 {
    font-size: 2rem;
  }
  .hero p {
    font-size: 1rem;
  }
}
@media (max-width: 600px) {
  .navbar {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 1rem 1rem 3rem;
  }
  .modal {
    max-width: 90vw;
    padding: 1.5rem 1rem;
  }
  .modal img {
    height: 180px;
  }
  .add-btn {
    width: 100%;
    justify-content: center;
  }
  .quote-btn {
    font-size: 1rem;
    padding: 0.85rem 1.2rem;
  }
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: none;
  border-radius: 50%;
  color: #333333;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease, transform 0.2s ease, color 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #e6006f;
  transform: scale(1.05);
}
/* Navbar Wrapper */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8); /* translucent */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Scroll shadow effect */
.header.scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Inner Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #111;
}
.logo-image {
  height: 34px;
  width: 34px;
  border-radius: 6px;
  object-fit: cover;
}

/* Navigation */
.nav {
  flex: 1;
  display: flex;
  justify-content: center;
}
.nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
.nav ul li a {
  color: #222;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav ul li a:hover {
  color: #25D366;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #444;
  cursor: pointer;
}
.theme-toggle:hover {
  color: #25D366;
}
.cta-btn.small {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 22px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
}
.hamburger span {
  height: 3px;
  width: 100%;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translateY(7px);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-7px);
}

/* Responsive Behavior */
@media (max-width: 768px) {
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }

  .nav ul {
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
  }

  .nav.open {
    max-height: 300px;
  }

  /* Hide buttons on small screens */
  .theme-toggle,
  .cta-btn.small {
    display: none;
  }

  /* Show brand name on the right */
 

  .hamburger {
    display: flex;
  }
}
@media (max-width: 768px) {
  /* Collapse nav layout */
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
  }

  .nav ul {
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
  }

  .nav.open {
    max-height: 300px;
  }

  /* Hide toggler and WhatsApp */
  .theme-toggle,
  .cta-btn.small {
    display: none;
  }

  /* Show brand name inside header-actions */
 

  /* Hide the left logo on small screens */
  

  .hamburger {
    display: flex;
  }
}


</style>
