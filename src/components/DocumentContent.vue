<template>
  <div class="invoice-container">
    <div ref="invoiceContent" class="invoice-template">
      <!-- Modern Page Border -->
      <div class="page-border-top"></div>
      <div class="page-border-right"></div>
      <div class="page-border-bottom"></div>
      <div class="page-border-left"></div>

      <!-- Header Section -->
      <header class="invoice-header">
        <div class="company-info">
          <h1>AL ANBAR AL ASWAD</h1>
          <h2>TECHNICAL SERVICES L.L.C</h2>
          <div class="contact-info">
            <p><i class="fas fa-map-marker-alt"></i> Dubai, UAE</p>
            <p><i class="fas fa-phone"></i> +971 56 215 5962</p>
            <p><i class="fas fa-envelope"></i> brothernet51@gmail.com</p>
          </div>
        </div>
        
        <div class="invoice-meta">
          <h3>QUOTATION</h3>
          <div class="meta-details">
            <p><strong>Date:</strong> {{ currentDate }}</p>
            <p><strong>Ref:</strong> Q-{{ document.reference }}</p>
          </div>
        </div>
      </header>

      <!-- Client Information -->
      <section class="client-section">
        <div class="bill-to">
          <h4 style="font-size: 1rem;">BILL TO</h4>
          <div class="client-line">
            <span class="client-name" contenteditable style="font-size: 1rem;">Madam</span>
            <span class="order-date">Order Date : {{ currentDate }}</span>
          </div>
          <p contenteditable style="font-size: 1rem;"><i class="fas fa-phone"></i> +971-562277372</p>
          <p contenteditable style="font-size: 1rem;"><i class="fas fa-map-marker-alt"></i> Nad al sheba Dubai</p>
        </div>
      </section>

      <!-- Items Table -->
      <section class="items-section">
        <table class="items-table">
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">DESCRIPTION</th>
              <th class="text-right">QTY</th>
              <th class="text-right">RATE (AED)</th>
              <th class="text-right">AMOUNT (AED)</th>
              <th class="no-print text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in document.items" :key="index">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left" contenteditable style="font-size: 1rem;" 
                  @input="updateDescription(index, $event)">{{ item.description }}</td>
              <td class="text-right" contenteditable style="font-size: 1rem;" 
                  @input="handleQuantityChange(index, $event)">{{ item.quantity }}</td>
              <td class="text-right" contenteditable style="font-size: 1rem;" 
                  @input="handleUnitPriceChange(index, $event)">{{ item.unitPrice }}</td>
              <td class="text-right">{{ formatCurrency(item.amount) }}</td>
              <td class="no-print text-right">
                <button class="delete-btn" @click="removeItem(index)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="totals-section">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>{{ formatCurrency(document.subtotal) }} AED</span>
          </div>
          <div class="totals-row">
            <span>Discount</span>
            <span>{{ document.discount || '0.00' }} AED</span>
          </div>
          <div class="totals-row">
            <span>VAT (5%)</span>
            <span>{{ formatCurrency(document.taxAmount) }} AED</span>
          </div>
          <div class="totals-row grand-total">
            <span>TOTAL</span>
            <span>{{ formatCurrency(document.total) }} AED</span>
          </div>
        </div>
      </section>

      <!-- Footer Sections -->
      <footer class="invoice-footer">
        <div class="payment-info">
          <h4>BANK DETAILS</h4>
          <p><strong>Bank:</strong> Emirates National Bank Dubai</p>
          <p><strong>Account Name:</strong> MD ASADUZZAMAN</p>
          <p><strong>Account No:</strong> 10150009279101</p>
          <p><strong>IBAN:</strong> AE9102060001015900297101</p>
          <p><strong>SWIFT:</strong> EBILAEAD</p>
        </div>
        
        <div class="terms-conditions">
          <h4>TERMS & CONDITIONS</h4>
          <ol>
            <li v-for="(term, index) in document.terms" :key="index" contenteditable @input="updateTerm(index, $event)">{{ term }}</li>
          </ol>
        </div>
      </footer>

      <!-- Contact Footer -->
      <div class="contact-footer">
        <div class="thank-you">Thank you for your business!</div>
        <div class="contact-line">
          <span><i class="fab fa-whatsapp"></i> +971562155962</span>
          <span><i class="fab fa-facebook"></i> Al Anbar Technicals</span>
          <span><i class="fas fa-envelope"></i> brothernet51@gmail.com</span>
          <span><i class="fas fa-map-marker-alt"></i> Dubai, UAE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfessionalInvoice',
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  },
  methods: {
    formatCurrency(value) {
      // Remove commas if present and format to 2 decimal places
      const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    
    updateDescription(index, event) {
      this.$emit('update-item', {
        index,
        field: 'description',
        value: event.target.innerText
      });
    },
    
    handleQuantityChange(index, event) {
      const value = parseFloat(event.target.innerText) || 0;
      this.$emit('update-quantity', { index, value });
    },
    
    handleUnitPriceChange(index, event) {
      const value = parseFloat(event.target.innerText) || 0;
      this.$emit('update-unit-price', { index, value });
    },
    
    removeItem(index) {
      this.$emit('remove-item', index);
    },
    
    updateTerm(index, event) {
      this.$emit('update-term', {
        index,
        value: event.target.innerText
      });
    }
  }
}
</script>

<style scoped>
/* Add to your existing styles */


/* Base Styles */
.invoice-container {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.invoice-template {
  padding: 40px;
  position: relative;
}

/* Modern Page Border */
.page-border-top,
.page-border-right,
.page-border-bottom,
.page-border-left {
  position: absolute;
  background: #27ae60; /* Dark blue */
  z-index: 1;
}

.page-border-top {
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #27ae60 0%, #27ae60 100%);
}

.page-border-right {
  top: 5px;
  right: 0;
  bottom: 5px;
  width: 5px;
  background: linear-gradient(180deg, #27ae60 0%, #27ae60 100%);
}

.page-border-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #27ae60 0%, #27ae60 100%);
}

.page-border-left {
  top:5px;
  left: 0;
  bottom: 5px;
  width: 5px;
  background: linear-gradient(0deg, #2c3e50 0%, #27ae60 100%);
}

/* Header Section */
.invoice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.company-info {
  text-align: left;
}

.company-info h1 {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
}

.company-info h2 {
  font-size: 18px;
  font-weight: 600;
  color: #27ae60;
  margin-bottom: 15px;
}

.contact-info p {
  font-size: 13px;
  color: #666;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-info i {
  width: 16px;
  text-align: center;
}

.invoice-meta {
  text-align: right;
}

.invoice-meta h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.meta-details p {
  font-size: 13px;
  color: #666;
  margin: 3px 0;
}

/* Client Section */
.client-section {
  margin-bottom: 30px;
  text-align: left;
}

.bill-to h4 {
  font-size: 16px;
  color: #27ae60;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.client-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.client-name {
  font-weight: 600;
}

.client-section p {
  font-size: 14px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.client-section i {
  width: 16px;
  text-align: center;
}

/* Items Table */
.items-section {
  margin-bottom: 30px;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ddd;
}

.items-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  padding: 12px 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid #ddd;
}

.items-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.text-left { text-align: left; }
.text-right { text-align: right; }

/* Totals Section */
.totals-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

.totals-row span:first-child {
  font-weight: 600;
}

.totals-row.grand-total {
  font-weight: 700;
  font-size: 16px;
  border-top: 2px solid #27ae60;
  margin-top: 5px;
  background-color: #f8f9fa;
}

/* Footer Sections */
.invoice-footer {
  display: flex;
  gap: 40px;
  margin-top: 30px;
  text-align: left;
}

.payment-info, .terms-conditions {
  flex: 1;
}

.invoice-footer h4 {
  font-size: 16px;
  color: #27ae60;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.invoice-footer p {
  font-size: 13px;
  margin: 8px 0;
}

.terms-conditions ol {
  padding-left: 20px;
  font-size: 13px;
}

.terms-conditions li {
  margin-bottom: 8px;
}

/* Contact Footer */
.contact-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.thank-you {
  font-weight: 500;
  margin-bottom: 15px;
  text-align: center;
}

.contact-line {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.contact-line span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-line i {
  width: 16px;
  text-align: center;
}

/* Print Styles */
@media print {
  @page {
    size: auto;
    margin: 10mm;
  }
  
  .invoice-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .invoice-template {
    padding: 20px;
  }
  
  .page-border-top,
  .page-border-right,
  .page-border-bottom,
  .page-border-left {
    display: none;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .invoice-template {
    padding: 20px;
  }
  
  .invoice-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .invoice-meta {
    text-align: left;
  }
  
  .invoice-footer {
    flex-direction: column;
    gap: 20px;
  }
  
  .contact-line {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .totals-row {
    width: 100%;
  }
}


/* Mobile Responsiveness */
@media (max-width: 768px) {
  /* Prevent zooming on editable fields */
  [contenteditable="true"] {
    font-size: 1rem !important;
  }

  /* Horizontal scrolling for tables */
  .items-section {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 20px; /* Added top margin */
  }

  .items-table {
    min-width: 600px; /* Ensure table has minimum width */
  }

  /* Add top margin to container */
  .invoice-container {
    margin-top: 20px;
  }

  /* Adjust border thickness on mobile */
 
}

/* Delete button styles */
.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #c0392b;
}

.delete-btn i {
  font-size: 14px;
}






</style>