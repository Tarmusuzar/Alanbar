<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
    <div class="invoice-modal" :class="{ 'dark-mode': darkMode }">
      <button class="close-btn" @click="closeModal" aria-label="Close invoice">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="invoice-header">
        <h2>Quote Summary</h2>
        <div class="customer-info">
          
          <div class="customer-field">
            <label for="customer-mobile">Mobile (UAE)</label>
            <div class="phone-input">
              <span class="country-code">+971</span>
              <input
                id="customer-mobile"
                type="tel"
                v-model="customerMobile"
                @input="validateMobile"
                placeholder="5XXXXXXXX"
                class="mobile-input"
                maxlength="9"
              >
            </div>
            <div class="customer-field" v-if="showNameField">
            <label for="customer-name">Name</label>
            <input 
              id="customer-name" 
              type="text" 
              v-model="customerName" 
              placeholder="Customer name"
              class="mobile-input"
            >
          </div>
          </div>

          <p class="customer-number">Quote #{{ customerNumber }}</p>
        </div>
      </div>

      <div class="invoice-content">
        <div class="invoice-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (AED)</th>
                <th>Total (AED)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td class="product-cell">
                  <img :src="item.image" :alt="item.name" class="product-image">
                  <span>{{ item.name }}</span>
                </td>
                <td>
                  <input 
                    type="number" 
                    min="1" 
                    v-model.number="item.quantity" 
                    @change="validateQuantity(item)"
                    class="quantity-input mobile-input"
                  >
                </td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>{{ formatCurrency(item.price * item.quantity) }}</td>
                <td class="delete-cell">
                  <button class="delete-btn" @click="removeItem(index)" aria-label="Remove item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="totals-section">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>{{ formatCurrency(subtotal) }}</span>
          </div>
          <div class="totals-row">
            <span>Tax ({{ taxRate }}%)</span>
            <span>{{ formatCurrency(taxAmount) }}</span>
          </div>
          <div class="totals-row total" style="margin-bottom: 7rem;">
            <span>Total</span>
            <span>{{ formatCurrency(total) }}</span>
          </div>
        </div>
      </div>

      <div class="invoice-actions">
        <button class="btn btn-secondary" @click="closeModal">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        <button class="btn btn-primary" @click="submitOrder" :disabled="!isFormValid">
          Submit Quote
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    initialItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      darkMode: false,
      customerName: '',
      customerMobile: '',
      showNameField: false,
      customerNumber: 'Q-' + Math.floor(1000 + Math.random() * 9000),
      items: JSON.parse(JSON.stringify(this.initialItems)),
      taxRate: 5,
      backButtonListener: null
    }
  },
  computed: {
    subtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    taxAmount() {
      return this.subtotal * (this.taxRate / 100)
    },
    total() {
      return this.subtotal + this.taxAmount
    },
    isFormValid() {
      const validMobile = /^(5\d{8})$/.test(this.customerMobile)
      return validMobile && (this.showNameField ? this.customerName.trim() !== '' : true)
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AED'
      }).format(value).replace('AED', '')
    },
    validateQuantity(item) {
      if (item.quantity < 1 || isNaN(item.quantity)) {
        item.quantity = 1
      }
    },
    validateMobile() {
      // Remove any non-digit characters
      this.customerMobile = this.customerMobile.replace(/\D/g, '')
      
      // Show name field if valid UAE mobile (starts with 5 and 8 more digits)
      this.showNameField = /^(5\d{0,8})$/.test(this.customerMobile) && this.customerMobile.length === 9
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.$emit('item-removed', this.items.length)
    },
    submitOrder() {
      if (!this.isFormValid) return

      const orderData = {
        customerName: this.customerName,
        customerMobile: '+971' + this.customerMobile,
        customerNumber: this.customerNumber,
        items: this.items,
        subtotal: this.subtotal,
        tax: this.taxAmount,
        total: this.total,
        date: new Date().toLocaleDateString()
      }
      
      this.$emit('order-submitted', orderData)
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },
    setupBackButtonHandler() {
      window.history.pushState({ modalOpen: true }, '')
      this.backButtonListener = () => {
        
          this.closeModal()
        
      }
      window.addEventListener('popstate', this.backButtonListener)
    },
    removeBackButtonHandler() {
      if (this.backButtonListener) {
        window.removeEventListener('popstate', this.backButtonListener)
      }
      if (window.history.state?.modalOpen) {
        window.history.back()
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.setupBackButtonHandler()
      } else {
        this.removeBackButtonHandler()
      }
    },
    initialItems: {
      handler(newVal) {
        this.items = Array.isArray(newVal) ? [...newVal] : []
      },
      immediate: true,
      deep: true
    }
  },
  beforeUnmount() {
    this.removeBackButtonHandler()
  }
}
</script>

<style scoped>
.phone-input {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.country-code {
  padding: 0.9rem 0.5rem;
  background: var(--bg);
  border-right: 1px solid #ddd;
}

.mobile-input {
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.25rem;
}

.invoice-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


.modal-backdrop {
    position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.invoice-modal {
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: var(--bg);
  color: var(--text);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 2rem);
}

.dark-mode .invoice-modal {
  background-color: var(--bg-dark);
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-light);
  z-index: 10;
}

.invoice-header {
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid var(--border);
}

.invoice-header h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
  text-align: center;
}

.customer-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.customer-field {
  display: flex;
  flex-direction: column;
}

.customer-field label {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.mobile-input {
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  width: 100%;
  background-color: var(--bg);
  color: var(--text);
}

.customer-number {
  grid-column: span 2;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-light);
  margin-top: 0.5rem;
}

.invoice-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
}

.invoice-table {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
  min-width: 600px;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  background-color: var(--bg-light);
  color: var(--text);
  font-weight: 600;
  position: sticky;
  top: 0;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 150px;
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.quantity-input {
  width: 60px;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  background-color: var(--bg);
  color: var(--text);
}

.delete-cell {
  width: 40px;
  padding: 0 0.5rem;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  color: #ef4444;
}

.totals-section {
  border-top: 1px solid var(--border);
  padding: 1rem 0;
  margin: 0 1rem;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.totals-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.invoice-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--border);
  background-color: var(--bg);
  position: sticky;
  bottom: 0;
}

.btn {
  padding: 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  flex: 1;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-secondary {
  background-color: var(--secondary);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--secondary-dark);
}

/* Mobile-specific styles */
@media (max-width: 640px) {
  .modal-backdrop {
    padding: 0;
    align-items: stretch;
  }

  .invoice-modal {
    max-height: 100vh;
    border-radius: 0;
    min-height: 100vh;
  }

  .customer-info {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .customer-number {
    grid-column: span 1;
  }

  th, td {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .product-cell {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .product-image {
    width: 30px;
    height: 30px;
  }

  .quantity-input {
    width: 50px;
    padding: 0.5rem;
  }

  .invoice-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    border-top: 1px solid var(--border);
  }
}

/* Prevent auto-zoom on mobile inputs */
@media screen and (max-width: 480px) {
  .mobile-input {
    font-size: 16px !important;
  }
}
</style>