<template>
  <section class="products"  style="margin-top: -3rem;" ref="section">
    <div class="container">
      <div class="product-tabs-wrapper">
        <div class="product-tabs" ref="tabsContainer">
          <button 
          style="font-size: .8rem;"
            v-for="(tab, index) in productTabs" 
            :key="index"
            @click="setActiveTab(index)"
            :class="{ 'active': activeProductTab === index }"
            :ref="'tab-' + index"
          >
            {{ tab }}
          </button>
        </div>
        <button 
          class="scroll-next" 
          @click="scrollToNextTab"
          v-if="showNextButton"
        >
          <i class="fas fa-chevron-right" style="font-weight: 900; font-size: 1.5rem;"></i>
        </button>
      </div>
      
      <div class="search-container">
        <input 
        style="font-size: 1rem;"
          type="text" 
          v-model="searchQuery" 
          placeholder="Search products and services..." 
          class="search-input"
          @input="handleSearch"
        >
        <button class="search-button" @click="handleSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <div class="products-grid" id="products" >
        <div 
          class="product-card" 
          v-for="product in filteredProducts" 
          :key="product.id"
          @click="openProductModal(product)"
        >
          <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-details">
            <h3 style="color: var(--text);">{{ product.name }}</h3>
            <div class="product-meta">
              <div class="rating">
                <i 
                  v-for="star in 5" 
                  :key="star" 
                  :class="star <= product.rating ? 'fas fa-star' : 'far fa-star'"
                ></i>
                <span>({{ product.reviews }})</span>
              </div>
            </div>
            <ul class="product-features">
              <li v-for="(feature, fIndex) in product.features" :key="fIndex">
                <i class="fas fa-check-circle"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <button class="quotation-button" @click="whatsapp">
      <span>Talk to a Technician</span>
      <i class="fas fa-wrench"></i>
    </button>

    <ProductModal 
      v-if="selectedProduct" 
      :product="selectedProduct" 
      @close="selectedProduct = null"
      @add-to-quote="handleAddToQuote"
    />
  </section>
</template>

<script>
import ProductModal from './ProductModal.vue'
import eventEmitter from '@/utils/eventEmitter'

export default {
  name: 'MainProducts',
  components: {
    ProductModal,
  },
  data() {
    return {
      activeProductTab: 0,
      searchQuery: '',
      selectedProduct: null,
      showNextButton: false,
      productTabs: ['CCTV CAMERAS', 'WI-FI NETWORK', 'SOLAR PANEL INSTALLATION', 'ACCESS CONTROL','OPTICAL FIBER WORK', 'NETWORKING', 'MAGNETIC / SMART LOCK', 'ELECTRIC WORK','SOUND SYSTEMS'],
      products: [
       { id: 1,
    name: 'Ultra HD 4K Security Camera',
    category: 'CCTV CAMERAS',
    price: 199.99,
    originalPrice: 249.99,
    rating: 5,
    reviews: 124,
    image: '@/public/Products/CCTV/Ultra HD 4K Security Camera.png',
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['4K Ultra HD', 'Night Vision', 'Weatherproof', 'Two-Way Audio', 'Smart Motion Detection'],
    description: 'Flagship security camera with advanced motion detection and smart alerts.',
    inStock: true,
    badge: 'Best Seller'
  },{id: 1,
    name: 'Ultra HD 4K Security Camera',
    category: 'CCTV CAMERAS',
    price: 199.99,
    originalPrice: 249.99,
    rating: 5,
    reviews: 124,
    image: '@/public/Products/CCTV/Ultra HD 4K Security Camera.png',
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['4K Ultra HD', 'Night Vision', 'Weatherproof', 'Two-Way Audio', 'Smart Motion Detection'],
    description: 'Flagship security camera with advanced motion detection and smart alerts.',
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Full HD 1080p Dome Camera',
    category: 'CCTV CAMERAS',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4,
    reviews: 86,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['1080p HD', 'IR Night Vision', 'Vandal-Proof', 'Wide-Angle Lens'],
    description: 'Discreet dome camera ideal for indoor/outdoor surveillance.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Wireless IP Bullet Camera',
    category: 'CCTV CAMERAS',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4,
    reviews: 45,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['2MP Resolution', '30m Night Vision', 'IP66 Waterproof', 'PoE Support'],
    description: 'High-visibility bullet camera for deterring intruders.',
    inStock: true,
  },
  {
    id: 4,
    name: 'PTZ Outdoor Security Camera',
    category: 'CCTV CAMERAS',
    price: 349.99,
    originalPrice: 399.99,
    rating: 5,
    reviews: 72,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['360° Pan-Tilt-Zoom', '5x Optical Zoom', 'Auto Tracking', 'IP67 Rated'],
    description: 'Professional PTZ camera for large-area monitoring.',
    inStock: true,
    badge: 'Popular'
  },
  {
    id: 5,
    name: 'Mini Hidden Spy Camera',
    category: 'CCTV CAMERAS',
    price: 59.99,
    originalPrice: 79.99,
    rating: 3,
    reviews: 31,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['1080p Recording', 'Motion Activation', 'Compact Design', 'MicroSD Slot'],
    description: 'Covert camera for discreet surveillance.',
    inStock: true,
  },

  // 6-10: Advanced & Specialty Cameras
  {
    id: 6,
    name: 'Thermal Imaging Security Camera',
    category: 'CCTV CAMERAS',
    price: 899.99,
    originalPrice: 1099.99,
    rating: 5,
    reviews: 28,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Heat-Sensing Technology', 'No-Light Visibility', 'AI Alerts', 'Industrial Use'],
    description: 'Detects intruders even in complete darkness.',
    inStock: true,
    badge: 'Premium'
  },
  {
    id: 7,
    name: 'ANPR License Plate Camera',
    category: 'CCTV CAMERAS',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4,
    reviews: 19,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Automatic Plate Recognition', '50m IR Range', 'HD+ Resolution', 'Traffic Monitoring'],
    description: 'Ideal for parking lots and gated communities.',
    inStock: true,
  },
  {
    id: 21,
    name: 'Dual-Band Wi-Fi 6 Router',
    category: 'WI-FI NETWORK',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 89,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['AX1800 Speed', 'OFDMA Technology', '4x Gigabit Ports', 'MU-MIMO'],
    description: 'Next-gen router for seamless streaming and gaming.',
    inStock: true,
    badge: 'New'
  },
  {
    id: 22,
    name: 'Tri-Band Gaming Router',
    category: 'WI-FI NETWORK',
    price: 299.99,
    originalPrice: 349.99,
    rating: 5,
    reviews: 64,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['AX5400 Speed', 'Dedicated Gaming Band', 'RGB Lighting', 'Low Latency'],
    description: 'Optimized for competitive gaming and 4K streaming.',
    inStock: true,
    badge: 'Hot Deal'
  },
  {
    id: 23,
    name: 'Whole-Home Mesh Wi-Fi System',
    category: 'WI-FI NETWORK',
    price: 399.99,
    originalPrice: 499.99,
    rating: 5,
    reviews: 112,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['3-Pack Nodes', 'Coverage: 6,000 sq. ft.', 'Seamless Roaming', 'Parental Controls'],
    description: 'Eliminates dead zones in large homes.',
    inStock: true,
  },
  {
    id: 24,
    name: 'Enterprise Wi-Fi 6 Access Point',
    category: 'WI-FI NETWORK',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4,
    reviews: 28,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['8x8 MU-MIMO', 'PoE+ Support', 'VLAN Support', 'Cloud Management'],
    description: 'For offices, hotels, and high-density environments.',
    inStock: true,
  },
  {
    id: 25,
    name: 'Budget AC1200 Router',
    category: 'WI-FI NETWORK',
    price: 59.99,
    originalPrice: 79.99,
    rating: 3,
    reviews: 156,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Dual-Band', '4x Antennas', 'WPA3 Security', 'Easy Setup'],
    description: 'Reliable Wi-Fi for small apartments.',
    inStock: true,
  },

  // 6-10: Extenders & Adapters
  {
    id: 26,
    name: 'Wi-Fi Range Extender',
    category: 'WI-FI NETWORK',
    price: 39.99,
    originalPrice: 49.99,
    rating: 3,
    reviews: 203,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['AC750 Speed', 'Wall-Plug Design', 'Ethernet Port', 'Signal Indicator'],
    description: 'Boosts coverage to hard-to-reach areas.',
    inStock: true,
  },
  {
    id: 27,
    name: 'Outdoor Wi-Fi Extender',
    category: 'WI-FI NETWORK',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4,
    reviews: 47,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['IP65 Weatherproof', '2.4GHz/5GHz', '500m Range', 'PoE Powered'],
    description: 'Extends Wi-Fi to gardens, pools, and garages.',
    inStock: true,
  },
  {
    id: 36,
    name: '500W Monocrystalline Solar Panel',
    category: 'SOLAR PANEL INSTALLATION',
    price: 299.99,
    originalPrice: 349.99,
    rating: 5,
    reviews: 42,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['22% Efficiency', 'Weather-Resistant', '25-Year Warranty', 'Off-Grid Ready'],
    description: 'High-efficiency panel for residential/commercial use.',
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 37,
    name: '300W Polycrystalline Solar Panel',
    category: 'SOLAR PANEL INSTALLATION',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 76,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['18% Efficiency', 'Cost-Effective', 'Durable Frame', 'Easy Installation'],
    description: 'Budget-friendly option for small-scale projects.',
    inStock: true
  },
  {
    id: 38,
    name: 'Bifacial 550W Solar Panel',
    category: 'SOLAR PANEL INSTALLATION',
    price: 399.99,
    originalPrice: 459.99,
    rating: 5,
    reviews: 28,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Double-Sided Absorption', '30% More Output', 'Anti-PID', 'Snow Load 5400Pa'],
    description: 'Captures sunlight from both sides for maximum yield.',
    inStock: true,
    badge: 'Premium'
  },
  {
    id: 39,
    name: 'Flexible Thin-Film Solar Panel',
    category: 'SOLAR PANEL INSTALLATION',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4,
    reviews: 53,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Lightweight', 'Bendable (30°)', 'RV/Boat Compatible', 'Low-Light Performance'],
    description: 'Ideal for curved surfaces and mobile applications.',
    inStock: true
  },
  {
    id: 40,
    name: 'Solar Carport Kit (6kW)',
    category: 'SOLAR PANEL INSTALLATION',
    price: 5999.99,
    originalPrice: 6999.99,
    rating: 5,
    reviews: 14,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['20x 300W Panels', 'Steel Structure', 'EV Charging Ready', 'Shade + Power'],
    description: 'Dual-purpose solution for parking areas.',
    inStock: true,
    badge: 'Bundle'
  },

  // 6-10: Inverters & Batteries
  {
    id: 41,
    name: '5kW Hybrid Solar Inverter',
    category: 'SOLAR PANEL INSTALLATION',
    price: 899.99,
    originalPrice: 1099.99,
    rating: 5,
    reviews: 37,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Grid-Tie + Off-Grid', 'MPPT Charger', 'Wi-Fi Monitoring', '48V Battery Support'],
    description: 'Seamless switching between grid and battery power.',
    inStock: true
  },
   {
    id: 51,
    name: 'RFID Card Access System',
    category: 'ACCESS CONTROL',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4,
    reviews: 78,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['125kHz RFID Technology', '500 User Capacity', 'Door Strike Included', 'Emergency Override'],
    description: 'Basic entry system for offices and small businesses.',
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 52,
    name: 'Biometric Fingerprint Scanner',
    category: 'ACCESS CONTROL',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4,
    reviews: 112,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['1000 Fingerprint Capacity', '1 Second Verification', 'Anti-Spoofing', 'Weatherproof'],
    description: 'Secure touchless entry using unique fingerprints.',
    inStock: true
  },
  {
    id: 53,
    name: 'Keypad Door Entry System',
    category: 'ACCESS CONTROL',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 64,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['4-8 Digit Codes', '100 User Codes', 'LED Backlit', 'Durable Metal Housing'],
    description: 'Simple code-based access for restricted areas.',
    inStock: true
  },
  {
    id: 54,
    name: 'Proximity Card Reader',
    category: 'ACCESS CONTROL',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 43,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['13.56MHz Frequency', 'IP65 Rated', 'Wiegand Output', 'Wall Mountable'],
    description: 'Tap-to-enter system for corporate environments.',
    inStock: true
  },
  {
    id: 55,
    name: 'Face Recognition Terminal',
    category: 'ACCESS CONTROL',
    price: 899.99,
    originalPrice: 999.99,
    rating: 5,
    reviews: 28,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['3D Facial Recognition', 'Anti-Mask Detection', '5000 Face Database', 'Touchless Entry'],
    description: 'Advanced AI-powered identification for high-security zones.',
    inStock: true,
    badge: 'Premium'
  },

  // 6-10: Advanced & Integrated Systems
  {
    id: 66,
    name: 'Single-Mode Fiber Cable (100m)',
    category: 'OPTICAL FIBER WORK',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4,
    reviews: 56,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['9/125µm', 'OS2 Standard', 'Low Attenuation', 'Outdoor Rated'],
    description: 'Long-distance backbone cabling for telecom networks.',
    inStock: true,
    badge: 'Professional'
  },
  {
    id: 67,
    name: 'Multimode OM4 Patch Cord (5m)',
    category: 'OPTICAL FIBER WORK',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4,
    reviews: 112,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['50/125µm', 'LC to LC', 'Aqua Jacket', '10Gbps Support'],
    description: 'High-speed connectivity for data centers.',
    inStock: true
  },
  {
    id: 68,
    name: 'Armored Fiber Cable (50m)',
    category: 'OPTICAL FIBER WORK',
    price: 299.99,
    originalPrice: 349.99,
    rating: 5,
    reviews: 28,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Steel Tape Armor', 'UV Resistant', 'Direct Burial', 'Rodent Proof'],
    description: 'For harsh environments like industrial sites.',
    inStock: true,
    badge: 'Durable'
  },
  {
    id: 69,
    name: 'Fiber Optic Pigtail (SC/UPC)',
    category: 'OPTICAL FIBER WORK',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4,
    reviews: 87,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['0.9mm Diameter', '1m Length', 'Singlemode', 'Fusion Ready'],
    description: 'For splicing to patch panels or terminals.',
    inStock: true
  },
  {
    id: 70,
    name: 'MPO-12 Trunk Cable (10m)',
    category: 'OPTICAL FIBER WORK',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 41,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['12 Fibers', '40/100Gbps Ready', 'Plenum Rated', 'Low Bend Loss'],
    description: 'High-density connectivity for enterprise networks.',
    inStock: true
  },

  // 6-10: Installation & Testing Tools
  {
    id: 71,
    name: 'Fiber Optic Splicing Machine',
    category: 'OPTICAL FIBER WORK',
    price: 2499.99,
    originalPrice: 2999.99,
    rating: 5,
    reviews: 19,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['0.02dB Loss', '6s Splice Time', 'LCD Display', 'Battery Powered'],
    description: 'Professional fusion splicer for precise connections.',
    inStock: true,
    badge: 'For Experts'
  },
  {
    id: 72,
    name: 'OTDR Testing Equipment',
    category: 'OPTICAL FIBER WORK',
    price: 3999.99,
    originalPrice: 4599.99,
    rating: 5,
    reviews: 12,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['35dB Dynamic Range', '10km Range', 'Touchscreen', 'Event Analysis'],
    description: 'Locates faults and measures fiber loss.',
    inStock: true
  },
  {
    id: 73,
    name: 'Fiber Cleaver',
    category: 'OPTICAL FIBER WORK',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 63,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Precision Blade', '8° Angle', 'Automatic Clamping', 'Dust Cover'],
    description: 'Ensures clean cuts for low-loss splicing.',
    inStock: true
  },
  {
    id: 74,
    name: 'Fiber Optic Termination Kit',
    category: 'OPTICAL FIBER WORK',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4,
    reviews: 37,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Stripper', 'Cleaver', 'Microscope', 'Epoxy/Polish Tools'],
    description: 'Complete kit for connector installation.',
    inStock: true
  },
  {
    id: 82,
    name: '10Gbps Managed Switch',
    category: 'NETWORKING',
    price: 899.99,
    originalPrice: 999.99,
    rating: 5,
    reviews: 47,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['8x SFP+ Ports', 'Layer 2+ Features', 'QoS', 'Static Routing'],
    description: 'High-speed backbone for enterprise networks.',
    inStock: true
  },
  {
    id: 83,
    name: 'Industrial Ethernet Switch',
    category: 'NETWORKING',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4,
    reviews: 29,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['-40°C to 75°C', 'DIN Rail Mount', 'Redundant Power', 'IP40 Rated'],
    description: 'For harsh environments like factories.',
    inStock: true,
    badge: 'Rugged'
  },
  {
    id: 84,
    name: 'Wireless Access Point',
    category: 'NETWORKING',
    price: 179.99,
    originalPrice: 199.99,
    rating: 4,
    reviews: 88,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Wi-Fi 6', 'PoE Powered', 'Cloud Managed', 'MU-MIMO'],
    description: 'Seamless coverage for large areas.',
    inStock: true
  },
  {
    id: 85,
    name: 'Core Router (Enterprise)',
    category: 'NETWORKING',
    price: 4999.99,
    originalPrice: 5999.99,
    rating: 5,
    reviews: 12,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['1.2Tbps Capacity', 'Modular Slots', 'BGP/OSPF', 'Dual PSU'],
    description: 'Carrier-grade routing for ISPs.',
    inStock: true,
    badge: 'Heavy Duty'
  },

  // 6-10: Cables & Adapters
  {
    id: 86,
    name: 'Cat6 Ethernet Cable (50m)',
    category: 'NETWORKING',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4,
    reviews: 217,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Shielded', '10Gbps Support', 'Pure Copper', 'UV Resistant'],
    description: 'Outdoor-rated for long-distance runs.',
    inStock: true
  },
  {
    id: 87,
    name: 'SFP+ Transceiver (10G)',
    category: 'NETWORKING',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4,
    reviews: 63,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['10GBase-SR', '850nm', '300m Range', 'Cisco Compatible'],
    description: 'For switches/routers with SFP+ slots.',
    inStock: true
  },
  {
    id: 88,
    name: 'Patch Panel (48-Port)',
    category: 'NETWORKING',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4,
    reviews: 52,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Cat6 Rated', '1U Rack Mount', 'Labeled Ports', 'Cable Management'],
    description: 'Organizes server room cabling.',
    inStock: true
  },
  {
    id: 97,
    name: 'Biometric Fingerprint Lock',
    category: 'MAGNETIC / SMART LOCK',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 89,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['100 Fingerprint Capacity', 'Anti-Spoofing', 'Emergency Key', 'Battery Powered'],
    description: 'Secure touchless entry for homes/offices.',
    inStock: true
  },
  {
    id: 98,
    name: 'RFID Hotel Door Lock',
    category: 'MAGNETIC / SMART LOCK',
    price: 159.99,
    originalPrice: 189.99,
    rating: 4,
    reviews: 56,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Master Card Support', 'Audit Trail', 'Low Battery Alert', 'Durable Metal Housing'],
    description: 'Ideal for hospitality and rental properties.',
    inStock: true
  },
  {
    id: 99,
    name: 'Bluetooth Padlock',
    category: 'MAGNETIC / SMART LOCK',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4,
    reviews: 124,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Weatherproof', 'Shared Access', 'Tamper Alarm', '2-Year Battery'],
    description: 'For lockers, storage units, and gates.',
    inStock: true
  },
  {
    id: 100,
    name: 'Keypad Deadbolt Lock',
    category: 'MAGNETIC / SMART LOCK',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4,
    reviews: 78,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['6-Digit PIN', 'One-Touch Locking', 'Auto-Lock Timer', 'Brass Construction'],
    description: 'No-key entry with customizable codes.',
    inStock: true
  },

  // 6-10: Magnetic Locks
  {
    id: 101,
    name: 'Electromagnetic Lock (600lbs)',
    category: 'MAGNETIC / SMART LOCK',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 42,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Fail-Safe', '12V/24V', 'Stainless Steel', 'Fire Alarm Interface'],
    description: 'For glass doors and secure entry points.',
    inStock: true,
    badge: 'Heavy Duty'
  },
  
  {
    id: 111,
    name: 'Copper Wire (100m Roll)',
    category: 'ELECTRIC WORK',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4,
    reviews: 167,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['2.5mm²', 'PVC Insulated', 'Fire Resistant', 'Pure Copper'],
    description: 'For residential/industrial wiring.',
    inStock: true
  },
  {
    id: 112,
    name: 'Circuit Breaker (32A)',
    category: 'ELECTRIC WORK',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4,
    reviews: 94,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Type C', '1-Pole', 'Din Rail Mount', 'Overload Protection'],
    description: 'Protects electrical circuits from damage.',
    inStock: true
  },
  {
    id: 113,
    name: 'Distribution Board (12-Way)',
    category: 'ELECTRIC WORK',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 58,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['IP65 Rated', 'Metal Enclosure', 'Neutral/Earth Bars', 'Lockable'],
    description: 'Central hub for electrical circuits.',
    inStock: true
  },
  {
    id: 114,
    name: 'Electric Meter (Smart)',
    category: 'ELECTRIC WORK',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 36,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Prepaid/Postpaid', 'Remote Monitoring', 'Tamper Proof', 'LCD Display'],
    description: 'Tracks energy usage in real-time.',
    inStock: true,
    badge: 'Digital'
  },
  {
    id: 127,
    name: 'Ceiling Speaker (Pair)',
    category: 'SOUND SYSTEMS',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4,
    reviews: 64,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['6.5" Woofer', '70V Transformer', 'Paintable Grille', 'Flush Mount'],
    description: 'Discreet audio for homes/offices.',
    inStock: true
  },
  {
    id: 128,
    name: 'Portable Bluetooth Speaker',
    category: 'SOUND SYSTEMS',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4,
    reviews: 213,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['20hr Battery', 'IP67 Waterproof', 'Party Lights', 'TWS Pairing'],
    description: 'Outdoor-ready with punchy bass.',
    inStock: true
  },
  {
    id: 129,
    name: 'Line Array System (8+2)',
    category: 'SOUND SYSTEMS',
    price: 4999.99,
    originalPrice: 5999.99,
    rating: 5,
    reviews: 12,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['2000W RMS', 'DSP Processing', 'Flyable', 'Tour-Grade'],
    description: 'For concerts and large venues.',
    inStock: true,
    badge: 'Pro Audio'
  },
  {
    id: 130,
    name: 'Wall-Mounted Soundbar',
    category: 'SOUND SYSTEMS',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 98,
    image: require('@/assets/8.jpg'),
    images: [require('@/assets/9.jpg'), require('@/assets/9.jpg')],
    features: ['Dolby Atmos', 'HDMI ARC', 'Wireless Subwoofer', 'Voice Control'],
    description: 'Cinematic audio for TVs.',
    inStock: true
  },

  // 6-10: Amplifiers & Mixers
      ]
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.products
      
      if (this.activeProductTab !== 0) {
        const categoryMap = ['CCTV CAMERAS', 'WI-FI NETWORK', 'SOLAR PANEL INSTALLATION', 'ACCESS CONTROL','OPTICAL FIBER WORK', 'NETWORKING', 'MAGNETIC / SMART LOCK', 'ELECTRIC WORK','SOUND SYSTEMS']
        filtered = filtered.filter(product => product.category === categoryMap[this.activeProductTab])
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          (product.features && product.features.some(f => f.toLowerCase().includes(query)))
        )
      }
      
      return filtered
    }
  },
  methods: {
    setActiveTab(index) {
      this.activeProductTab = index
      this.scrollToTab(index)
    },
    scrollToTab(index) {
      const tab = this.$refs[`tab-${index}`]?.[0]
      if (tab) {
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    },
    scrollToNextTab() {
      const nextIndex = (this.activeProductTab + 1) % this.productTabs.length
      this.setActiveTab(nextIndex)
    },
    checkScrollButtons() {
      const tabsContainer = this.$refs.tabsContainer
      if (tabsContainer) {
        this.showNextButton = tabsContainer.scrollWidth > tabsContainer.clientWidth
      }
    },
    openProductModal(product) {
      this.selectedProduct = { ...product }
    },
    handleSearch() {
      // Search is handled in computed property
    },
    openQuotationModal() {
      this.$router.push('/quote')
    },
      whatsapp() {
      const phoneNumber = '971562155962'
      const message = 'Hello, I would like to know more about your services.'
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    },
     handleAddToQuote(item) {
      eventEmitter.$emit('add-to-quote', item)
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.$emit('section-visible')
          }
        })
      }, {
        threshold: 0.5
      })

      if (this.$refs.section) {
        observer.observe(this.$refs.section)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkScrollButtons()
      window.addEventListener('resize', this.checkScrollButtons)
      this.setupIntersectionObserver()
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScrollButtons)
  }
}
</script>

<style scoped>
.products {
  padding: 6rem 0;
  background-color: var(--bg-light);
  position: relative;
}

.container {
  position: relative;
}

.product-tabs-wrapper {
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.product-tabs {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 1rem;
  margin-right: 40px;
  scroll-behavior: smooth;
  gap: 0.5rem;
}

.product-tabs::-webkit-scrollbar {
  display: none;
}

.product-tabs button {
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-weight: 500;
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid var(--border);
  transition: var(--transition);
  white-space: nowrap;
  flex-shrink: 0;
}

.product-tabs button.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.product-tabs button:hover:not(.active) {
  border-color: var(--primary);
  color: var(--primary);
}

.scroll-next {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--bg-light) 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: var(--primary);
  transition: transform 0.2s;
}

.scroll-next:hover {
  transform: scale(1.1);
}

.scroll-next i {
  font-size: 1.2rem;
}

.search-container {
  position: relative;
  margin: 1rem 0 2rem;
  max-width: 500px;
  display: flex;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem 0 0 0.5rem;
  font-family: inherit;
  transition: var(--transition);
  border-right: none;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: none;
}

.search-button {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.search-button:hover {
  background-color: var(--primary-dark);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: var(--bg);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 2rem;
  z-index: 1;
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-details {
  padding: 1.5rem;
}

.product-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: var(--text-dark);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--accent);
}

.rating span {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-left: 0.5rem;
}

.product-features {
  list-style: none;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--text-light);
}

.product-features i {
  color: var(--secondary);
}

.quotation-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.quotation-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
}

.quotation-button i {
  font-size: 1.2rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .quotation-button {
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
  
  .product-tabs {
    margin-right: 30px;
  }
  
  .scroll-next {
    width: 30px;
  }
}

@media (min-width: 768px) {
  .product-tabs {
    margin-right: 0;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .scroll-next {
    display: none;
  }
}
</style>