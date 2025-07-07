<template>
  <div class="dashboard" :class="{ 'dark': darkMode }">
    <!-- Header - Visible on all screens -->
    <header class="header">
      <div class="header-left">
        <button @click="toggleMenu" class="menu-btn">
          <i class="fas fa-bars"></i>
        </button>
        <h1>AlNabar</h1>
      </div>
      <div class="header-right">
        <button @click="toggleDarkMode" class="dark-mode-btn">
          <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'open': menuOpen }">
      <nav class="nav">
        <button @click="setView('orders')" :class="{ 'active': currentView === 'orders' }">
          <i class="fas fa-clipboard-list"></i> Orders
        </button>
        <button @click="setView('invoices')" :class="{ 'active': currentView === 'invoices' }">
          <i class="fas fa-file-invoice"></i> Invoices
        </button>
        <button @click="setView('new')" class="highlight">
          <i class="fas fa-plus"></i> New Order
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <!-- Orders View -->
      <section v-if="currentView === 'orders'" class="view">
        <div class="search-container">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search orders...">
          </div>
        </div>
        
        <div class="status-filters">
          <button @click="orderFilter = 'all'" :class="{ 'active': orderFilter === 'all' }">All</button>
          <button @click="orderFilter = 'pending'" :class="{ 'active': orderFilter === 'pending' }">Pending</button>
          <button @click="orderFilter = 'completed'" :class="{ 'active': orderFilter === 'completed' }">Completed</button>
        </div>
        
        <div class="order-list">
          <div class="order" v-for="order in filteredOrders" :key="order.id">
            <div class="order-badge" :class="order.status">
              <i :class="order.icon"></i>
            </div>
            <div class="order-details">
              <h3 class="truncate">{{ order.customer }}</h3>
              <p class="truncate">{{ order.service }}</p>
            </div>
            <div class="order-meta">
              <span class="date truncate">{{ order.date }}</span>
              <span class="amount">AED {{ order.amount }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Other views would follow same pattern -->
    </main>

    <!-- Mobile Bottom Nav -->
    <nav class="mobile-nav">
      <button @click="setView('orders')" :class="{ 'active': currentView === 'orders' }">
        <i class="fas fa-clipboard-list"></i>
        <span>Orders</span>
      </button>
      <button @click="setView('invoices')" :class="{ 'active': currentView === 'invoices' }">
        <i class="fas fa-file-invoice"></i>
        <span>Invoices</span>
      </button>
      <button @click="setView('new')" class="highlight">
        <i class="fas fa-plus"></i>
        <span>New</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
      menuOpen: false,
      currentView: 'orders',
      orderFilter: 'all',
      // ...rest of your data
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    logout() {
      // Logout logic
    },
    setView(view) {
      this.currentView = view;
      this.menuOpen = false;
    }
    // ...rest of your methods
  }
}
</script>

<style scoped>
/* Modern Minimalist Styles */
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3a0ca3;
  --success: #4ade80;
  --warning: #fbbf24;
  --danger: #f87171;
  --text: #1e293b;
  --text-light: #64748b;
  --bg: #f8fafc;
  --bg-card: #ffffff;
  --border: #e2e8f0;
  --radius: 8px;
  --transition: all 0.2s ease;
}

.dark {
  --primary: #60a5fa;
  --primary-light: #3b82f6;
  --text: #f1f5f9;
  --text-light: #94a3b8;
  --bg: #0f172a;
  --bg-card: #1e293b;
  --border: #334155;
}

/* Base Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  color: var(--text);
  background-color: var(--bg);
}

/* Layout Structure */
.dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* Header Styles */
.header {
  padding: 0.75rem 1rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header h1 {
  font-size: 1.25rem;
  color: var(--primary);
  margin: 0;
}

.menu-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.25rem;
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
}

.dark-mode-btn, .logout-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.dark-mode-btn:hover, .logout-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  transform: translateX(-100%);
  transition: var(--transition);
  z-index: 20;
  padding-top: 4rem;
}

.sidebar.open {
  transform: translateX(0);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.nav button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: none;
  background: transparent;
  color: var(--text-light);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.nav button:hover {
  background: rgba(67, 97, 238, 0.05);
  color: var(--primary);
}

.nav button.active {
  background: rgba(67, 97, 238, 0.1);
  color: var(--primary);
  font-weight: 600;
}

.nav button i {
  width: 1.25rem;
  text-align: center;
}

.highlight {
  background: var(--primary) !important;
  color: white !important;
  margin-top: 0.5rem;
}

.highlight:hover {
  background: var(--primary-light) !important;
}

/* Content Styles */
.content {
  padding: 1rem;
  overflow-y: auto;
}

/* Search Bar */
.search-container {
  margin-bottom: 1rem;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-bar i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font-size: 0.9375rem;
}

/* Status Filters */
.status-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.status-filters::-webkit-scrollbar {
  display: none;
}

.status-filters button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-light);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-filters button.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Order List */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.order {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 1rem;
  border: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.order-badge {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.order-badge.pending {
  background: rgba(251, 191, 36, 0.1);
  color: var(--warning);
}

.order-badge.completed {
  background: rgba(74, 222, 128, 0.1);
  color: var(--success);
}

.order-details {
  flex-grow: 1;
  min-width: 0;
}

.order-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.date {
  font-size: 0.75rem;
  color: var(--text-light);
}

.amount {
  font-weight: 600;
}

/* Mobile Nav */
.mobile-nav {
  padding: 0.5rem;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
}

.mobile-nav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  border: none;
  background: transparent;
  color: var(--text-light);
  font-size: 0.75rem;
}

.mobile-nav button i {
  font-size: 1.25rem;
}

.mobile-nav button.active {
  color: var(--primary);
}

.mobile-nav .highlight {
  background: var(--primary);
  color: white;
}

/* Responsive Adjustments */
@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }
  
  .sidebar {
    transform: translateX(0);
    position: sticky;
    top: 0;
    height: 100vh;
    padding-top: 0;
  }
  
  .dashboard {
    grid-template-columns: 280px 1fr;
  }
  
  .header {
    grid-column: 2;
  }
  
  .content {
    grid-column: 2;
  }
  
  .mobile-nav {
    display: none;
  }
  
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  
  .search-bar {
    width: auto;
    flex-grow: 1;
  }
}

@media (max-width: 767px) {
  .sidebar {
    padding-top: 3.5rem;
  }
  
  .order {
    padding: 0.75rem;
  }
  
  .order-details {
    min-width: 0;
  }
  
  .order-meta {
    display: none;
  }
}
</style>