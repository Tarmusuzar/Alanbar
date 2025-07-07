<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="product-title">{{ product.name }}</h2>
          <button class="modal-close" @click="$emit('close')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="product-gallery">
            <div class="main-image" @click="zoomImage">
              <img :src="currentImage" :alt="product.name" />
            </div>
            <div class="thumbnails" v-if="product.images?.length > 1">
              <div 
                v-for="(img, index) in product.images" 
                :key="index"
                class="thumbnail"
                @click="currentImage = img"
                :class="{ 'active': currentImage === img }"
              >
                <img :src="img" :alt="'Thumbnail ' + (index + 1)" />
              </div>
            </div>
          </div>

          <div class="product-details">
            <div class="price-section">
              <div class="price-current">AED {{ product.price.toFixed(2) }}</div>
              <div v-if="product.originalPrice" class="price-original">
                <span class="original">AED {{ product.originalPrice.toFixed(2) }}</span>
                <span class="discount">{{ calculateDiscount(product.price, product.originalPrice) }}% OFF</span>
              </div>
            </div>

            <div class="rating-section">
              <div class="stars">
                <span v-for="star in 5" :key="star">
                  <svg width="16" height="16" viewBox="0 0 24 24" :fill="star <= product.rating ? 'currentColor' : 'none'" stroke="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                </span>
              </div>
              <span class="reviews">{{ product.reviews }} reviews</span>
              <span class="stock-badge" v-if="product.inStock">In Stock</span>
            </div>

            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>

            <div class="features-section" v-if="product.features?.length">
              <h3>Key Features</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="index">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="action-buttons">
              <div class="quantity-selector">
                <button @click="quantity > 1 ? quantity-- : null">-</button>
                <span>{{ quantity }}</span>
                <button @click="quantity++">+</button>
              </div>
              <button class="add-to-cart" @click="addToQuote">Add to Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: 1,
      currentImage: this.product.image,
      backButtonListener: null
    }
  },
  methods: {
    calculateDiscount(price, originalPrice) {
      return Math.round(((originalPrice - price) / originalPrice) * 100)
    },
    
    zoomImage() {
      // Implement image zoom functionality if needed
    },
    addToQuote() {
      const quoteItem = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image
      }
      this.$emit('add-to-quote', quoteItem)
      this.closeModal()
    },
    setupBackButtonHandler() {
      // Add history entry when modal opens
      window.history.pushState({ modalOpen: true }, '')

      // Listen for back button
      this.backButtonListener = () => {
        
          this.closeModal()
        
      }
      window.addEventListener('popstate', this.backButtonListener)
    },
    removeBackButtonHandler() {
      if (this.backButtonListener) {
        window.removeEventListener('popstate', this.backButtonListener)
        this.backButtonListener = null
      }
      
      // Remove our history entry if it exists
      if (window.history.state?.modalOpen) {
        window.history.back()
      }
    },
    closeModal() {
      this.$emit('close')
    }
  },
  mounted() {
    this.setupBackButtonHandler()
  },
  beforeUnmount() {
    this.removeBackButtonHandler()
  }
}
</script>

<style scoped>
/* Base Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal Backdrop */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

/* Modal Container */
.modal-container {
  position: relative;
  background-color: var(--bg);
  border-radius: 1rem;
  width: 100%;
  max-width: 900px;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  color: var(--text);
  overflow: hidden;
}

.dark-mode .modal-container {
  background-color: var(--bg-dark);
  border: 1px solid var(--border);
}

/* Modal Header */
.modal-header {
  padding: 1.5rem;
  position: sticky;
  top: 0;
  background-color: var(--bg);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.product-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  padding-right: 1rem;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  transition: var(--transition);
}

.modal-close:hover {
  color: var(--primary);
}

/* Modal Content */
.modal-content {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 1.5rem 1.5rem;
}

@media (min-width: 768px) {
  .modal-content {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Product Gallery */
.product-gallery {
  flex: 1;
  min-width: 0;
}

.main-image {
  cursor: zoom-in;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--bg-light);
}

.main-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 400px;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition);
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: var(--primary);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details */
.product-details {
  flex: 1;
  min-width: 0;
  padding-top: 1rem;
}

@media (min-width: 768px) {
  .product-details {
    padding-top: 0;
    max-width: 350px;
  }
}

/* Price Section */
.price-section {
  margin-bottom: 1.5rem;
}

.price-current {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
}

.price-original {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.original {
  text-decoration: line-through;
  color: var(--text-light);
  font-size: 1rem;
}

.discount {
  background-color: var(--accent);
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Rating Section */
.rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stars svg {
  color: var(--accent);
}

.reviews {
  color: var(--text-light);
  font-size: 0.875rem;
}

.stock-badge {
  background-color: var(--secondary);
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: auto;
}

/* Description */
.product-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--text);
}

/* Features */
.features-section {
  margin-bottom: 1.5rem;
}

.features-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.features-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-section li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.features-section li svg {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* Action Buttons */
.action-buttons {
  position: sticky;
  bottom: 0;
  background-color: var(--bg);
  padding: 1rem 0;
  margin-top: auto;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.quantity-selector button {
  background-color: var(--bg-light);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text);
  transition: var(--transition);
}

.quantity-selector button:hover {
  background-color: var(--border);
}

.quantity-selector span {
  width: 2.5rem;
  text-align: center;
  font-weight: 500;
}

.add-to-cart {
  flex: 1;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.add-to-cart:hover {
  background-color: var(--primary-dark);
}

/* Mobile Optimizations */
@media (max-width: 767px) {
  .modal-overlay {
    padding: 0;
    backdrop-filter: none;
  }

  .modal-container {
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }

  .modal-content {
    padding-bottom: 100px;
  }

  .action-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    z-index: 10;
  }
}

@media (max-width: 480px) {
  .main-image img {
    max-height: 300px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .add-to-cart,
  .quantity-selector {
    width: 100%;
  }

  .quantity-selector {
    justify-content: space-between;
  }
}
@media (max-width: 767px) {
  .modal-overlay {
    padding: 0;
    overflow: hidden;
    touch-action: none;
  }

  .modal-container {
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: var(--bg);
    flex-shrink: 0;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
    padding: 0 1rem;
    padding-bottom: 120px; /* Space for fixed buttons */
    scrollbar-width: none;
    margin-top: 0;
  }

  .modal-content::-webkit-scrollbar {
    display: none;
  }

  .action-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    z-index: 20;
    background-color: var(--bg);
    border-top: 1px solid var(--border);
    display: flex;
    gap: 1rem;
  }

  .product-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    -webkit-line-clamp: unset;
    padding-right: 2rem; /* Space for close button */
  }

  /* Ensure content doesn't hide behind fixed elements */
  .product-gallery {
    padding-top: 1rem;
  }

  .product-details {
    padding-bottom: 2rem;
  }

  /* Quantity selector adjustments */
  .quantity-selector {
    flex: 1;
  }

  .add-to-cart {
    flex: 2;
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .quantity-selector,
  .add-to-cart {
    width: 100%;
  }

  .modal-content {
    padding-bottom: 140px; /* Extra space for stacked buttons */
  }
}
</style>

