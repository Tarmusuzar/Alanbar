<template>
  <div class="document-editor" >
    <!-- Fixed Header with Export Controls -->
    <header class="export-header">
      <div class="export-controls">
        <div class="file-input">
          <input 
            style="font-size: 1rem;"
            v-model="fileName" 
            :placeholder="defaultFileName" 
            class="file-name-input"
            ref="fileNameInput"
          >
        </div>
        
        <div class="format-selection">
          <select v-model="exportFormat" class="format-select">
            <option value="pdf">PDF</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>
        
        <div class="theme-selection">
          <select v-model="selectedTheme" class="theme-select" @change="applyTheme">
            <option value="default">Default Theme</option>
            <option value="professional">Professional Blue</option>
            <option value="modern">Modern Green</option>
            <option value="elegant">Elegant Red</option>
            <option value="minimal">Minimal Gray</option>
          </select>
        </div>
        
        <div class="action-buttons">
          <button @click="saveDocument" class="save-btn">Save</button>
          <button @click="printDocument" class="print-btn">Print</button>
          <button @click="addItem" class="add-btn">Add Item</button>
        </div>
      </div>
    </header>

    <!-- Document Content -->
    <DocumentContent
      ref="documentContent"
      :selected-theme="selectedTheme"
      :company="company"
      :document="document"
      :client-fields="clientFields"
      :current-date="currentDate"
      @update-quantity="calculateItemAmount($event.index, $event.value)"
      @update-unit-price="updateUnitPrice($event.index, $event.value)"
      @remove-item="removeItem"
    />
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DocumentContent from './DocumentContent.vue';

export default {
  name: 'MainQuotation',
  components: {
    DocumentContent,
  },
  data() {
    return {
      exportFormat: 'pdf',
      fileName: '',
      selectedTheme: 'default',
      currentDate: new Date().toISOString().split('T')[0],
      company: {
        name: 'Al Anbar Al Aswad',
        address: 'Dubai, United Arab Emirates',
        contact: 'Email: accounts@alanbartech.ae | Tel: +971 56 215 5962'
      },
      clientFields: [
        { label: 'Name', value: '', placeholder: 'Enter client name' },
        { label: 'Company', value: '', placeholder: 'Enter company name' },
        { label: 'Email', value: '', placeholder: 'Enter email address' },
        { label: 'Phone', value: '', placeholder: 'Enter phone number' },
        { label: 'TRN', value: '', placeholder: 'Enter Tax Registration Number' }
      ],
      document: {
        title: 'QUOTATION',
        reference: 'Q-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        items: [
          { description: 'CCTV camera 2mp', quantity: 1, unitPrice: '100.00', amount: '100.00' },
          { description: 'Router - Etisalat', quantity: 2, unitPrice: '50.00', amount: '100.00' },
          { description: 'Fiber Optic cable', quantity: 2, unitPrice: '50.00', amount: '100.00' },
          { description: '32mp CCTV camera', quantity: 2, unitPrice: '50.00', amount: '100.00' },
          { description: 'Installation Fee', quantity: 2, unitPrice: '50.00', amount: '100.00' }
        ],
        subtotal: '200.00',
        taxRate: 5,
        taxAmount: '10.00',
        total: '210.00',
        terms: [
          'Payment due within 30 days',
          '5% late fee applied after due date',
          'All prices are in UAE Dirhams (AED)',
          'Valid for 30 days from date of issue',
          '5% VAT included as per UAE regulations'
        ]
      }
    }
  },
  computed: {
    defaultFileName() {
      return `${this.document.title}_${this.currentDate}`;
    }
  },
  methods: {
    async saveDocument() {
      if (!this.fileName.trim()) {
        this.fileName = this.defaultFileName;
        this.$refs.fileNameInput.focus();
        return alert('Please enter a file name');
      }

      const element = this.$refs.documentContent.$el;
      const fileName = this.fileName.trim();

      try {
        // Create a temporary container to calculate dimensions
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '210mm'; // A4 width
        document.body.appendChild(tempContainer);

        // Clone the content and add to temp container
        const contentClone = element.cloneNode(true);
        tempContainer.appendChild(contentClone);

        // Get the actual dimensions
        await new Promise(resolve => setTimeout(resolve, 100));
        const contentHeight = contentClone.scrollHeight;
        const contentWidth = contentClone.scrollWidth;
        const pageHeight = 1122; // A4 height in pixels (297mm)
        const pageWidth = 794; // A4 width in pixels (210mm)

        // Calculate number of pages needed
        const numPages = Math.ceil(contentHeight / pageHeight);
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [pageWidth, pageHeight]
        });

        // Render each page
        for (let i = 0; i < numPages; i++) {
          if (i > 0) {
            pdf.addPage([pageWidth, pageHeight]);
          }

          const canvas = await html2canvas(contentClone, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            letterRendering: true,
            windowHeight: pageHeight,
            height: pageHeight,
            width: contentWidth,
            y: i * pageHeight,
            scrollY: -i * pageHeight,
            windowWidth: contentWidth,
            x: 0
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        }

        // Clean up
        document.body.removeChild(tempContainer);
        pdf.save(`${fileName}.pdf`);

      } catch (error) {
        console.error('Export error:', error);
        alert('An error occurred during export. Please try again.');
      }
    },

    async printDocument() {
      try {
        const element = this.$refs.documentContent.$el;
        
        // Create a temporary container for printing
        const printContainer = document.createElement('div');
        printContainer.style.position = 'absolute';
        printContainer.style.left = '0';
        printContainer.style.top = '0';
        printContainer.style.width = '210mm';
        printContainer.style.margin = '0 auto';
        document.body.appendChild(printContainer);

        // Clone the content
        const contentClone = element.cloneNode(true);
        printContainer.appendChild(contentClone);

        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create canvas of the entire content
        const canvas = await html2canvas(contentClone, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          backgroundColor: '#FFFFFF'
        });

        // Create a new window with the print content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Document</title>
              <style>
                body { margin: 0; padding: 0; }
                img { 
                  width: 100%; 
                  height: auto;
                  page-break-after: always;
                }
                @page { 
                  size: A4; 
                  margin: 0;
                }
                @media print {
                  img {
                    page-break-after: auto;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${canvas.toDataURL('image/jpeg', 0.95)}" />
            </body>
          </html>
        `);
        printWindow.document.close();

        // Clean up
        document.body.removeChild(printContainer);

        // Wait for content to load then trigger print
        printWindow.onload = function() {
          setTimeout(() => {
            printWindow.print();
            // Don't close immediately to allow print dialog to appear
          }, 500);
        };

      } catch (error) {
        console.error('Print error:', error);
        alert('An error occurred during printing. Please try again.');
      }
    },

    addItem() {
      this.document.items.push({
        description: 'New Item',
        quantity: 1,
        unitPrice: '0.00',
        amount: '0.00'
      });
      
      this.calculateTotals();
    },
    removeItem(index) {
      this.document.items.splice(index, 1);
      this.calculateTotals();
    },
    updateQuantity(index, value) {
      this.document.items[index].quantity = value;
      this.calculateItemAmount(index);
    },
    updateUnitPrice(index, value) {
      this.document.items[index].unitPrice = value;
      this.calculateItemAmount(index);
    },
    calculateItemAmount(index) {
      const item = this.document.items[index];
      const amount = item.quantity * parseFloat(item.unitPrice);
      item.amount = amount.toFixed(2);
      this.calculateTotals();
    },
    calculateTotals() {
      let subtotal = 0;
      this.document.items.forEach(item => {
        subtotal += parseFloat(item.amount);
      });
      
      this.document.subtotal = subtotal.toFixed(2);
      this.document.taxAmount = (subtotal * this.document.taxRate / 100).toFixed(2);
      this.document.total = (subtotal + parseFloat(this.document.taxAmount)).toFixed(2);
    },
    applyTheme() {
      // Theme is applied through CSS classes
    }
  }
}
</script>

<style scoped>
/* ===== BASE STYLES ===== */
.document-editor {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 5px;
}

/* ===== FIXED HEADER CONTROLS ===== */
.export-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
}

.export-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 1000px;
  width: 100%;
  flex-wrap: wrap;
}

.file-input {
  flex: 1;
  min-width: 150px;
}

.file-name-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.format-select, .theme-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 120px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.save-btn, .print-btn, .add-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.save-btn {
  background-color: #3498db;
  color: white;
}

.print-btn {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.add-btn {
  background-color: #2ecc71;
  color: white;
}

.save-btn:hover {
  background-color: #2980b9;
}

.print-btn:hover {
  background-color: #e9ecef;
}

.add-btn:hover {
  background-color: #27ae60;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 5px;
}

.remove-btn:hover {
  color: #c0392b;
}

/* ===== DESKTOP OVERRIDES ===== */
@media (min-width: 769px) {
  .document-editor {
    padding-top: 70px;
  }
  
  .export-header {
    padding: 12px 20px;
  }
  
  .export-controls {
    gap: 15px;
  }
  
  .file-name-input,
  .format-select,
  .theme-select,
  .save-btn,
  .print-btn,
  .add-btn {
    font-size: 1rem;
    padding: 10px 15px;
  }
}

/* ===== PRINT STYLES ===== */
@media print {
  .export-header {
    display: none;
  }
  
  .document-editor {
    padding-top: 0;
  }
}

/* ===== MOBILE OPTIMIZATIONS ===== */
@media (max-width: 480px) {
  .document-container {
    padding-top: 2rem;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .save-btn, .print-btn, .add-btn {
    flex: 1;
    text-align: center;
  }
}
@media print {
  body * {
    visibility: hidden;
  }
  
  .document-editor, .document-editor * {
    visibility: visible;
  }
  
  .document-editor {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0;
    margin: 0;
  }
}

</style>