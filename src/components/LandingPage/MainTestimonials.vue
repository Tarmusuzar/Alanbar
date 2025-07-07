<template>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Trusted by Businesses & Homeowners</h2>
        <p class="section-subtitle">What our clients say about our security solutions</p>
      </div>
      
      <div class="testimonial-container">
        <div class="testimonial-track" :style="trackStyle">
          <div 
            class="testimonial-card" 
            v-for="(testimonial) in testimonials" 
            :key="testimonial.id"
          >
            <div class="testimonial-content">
              <svg class="quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 8H8V4H4V8C4 13.4 7.6 17 12 17V13C9.8 13 8 11.2 8 9V8ZM20 8H18V4H14V8C14 13.4 17.6 17 22 17V13C19.8 13 18 11.2 18 9V8Z" fill="var(--primary)" fill-opacity="0.1"/>
              </svg>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar">
                <div class="author-info">
                  <h4 class="author-name">{{ testimonial.name }}</h4>
                  <p class="author-title">{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="testimonial-controls">
          <button class="control-button prev" @click="prevTestimonial" aria-label="Previous testimonial">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          
          <div class="pagination-dots">
            <button 
              v-for="(dot, index) in testimonials" 
              :key="index"
              @click="goToTestimonial(index)"
              :class="{ 'active': currentIndex === index }"
              aria-label="Go to testimonial"
            ></button>
          </div>
          
          <button class="control-button next" @click="nextTestimonial" aria-label="Next testimonial">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainTestimonials',
  props: {
    testimonials: {
      type: Array,
      required: true,
      validator: value => value.every(t => t.text && t.name && t.title && t.avatar)
    }
  },
  data() {
    return {
      currentIndex: 0,
      cardWidth: 360,
      gap: 24
    }
  },
  computed: {
    trackStyle() {
      const offset = -(this.currentIndex * (this.cardWidth + this.gap))
      return {
        transform: `translateX(${offset}px)`,
        width: `${this.testimonials.length * (this.cardWidth + this.gap) - this.gap}px`
      }
    }
  },
  methods: {
    nextTestimonial() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length
    },
    prevTestimonial() {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length
    },
    goToTestimonial(index) {
      this.currentIndex = index
    }
  }
}
</script>


<style scoped>
.testimonials {
  padding: 80px 0;
  background-color: var(--bg-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.testimonial-container {
  position: relative;
  overflow: hidden;
}

.testimonial-track {
  display: flex;
  gap: 24px;
  transition: var(--transition);
}

.testimonial-card {
  flex: 0 0 360px;
  background: var(--bg);
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border: 1px solid var(--border);
}

.testimonial-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.quote-icon {
  margin-bottom: 20px;
}

.quote-icon path {
  fill: var(--primary);
  fill-opacity: 0.1;
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 24px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.author-title {
  font-size: 14px;
  color: var(--text-light);
}

.testimonial-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
}

.control-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-light);
  cursor: pointer;
  transition: var(--transition);
}

.control-button:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.control-button svg {
  stroke: currentColor;
}

.pagination-dots {
  display: flex;
  gap: 8px;
}

.pagination-dots button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: var(--transition);
}

.pagination-dots button.active {
  background: var(--primary);
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .testimonials {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .testimonial-card {
    flex: 0 0 300px;
    padding: 24px;
  }
  
  .testimonial-track {
    gap: 16px;
  }
  
  .testimonial-text {
    font-size: 15px;
  }
  
  .testimonial-controls {
    margin-top: 32px;
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: 32px;
  }
  
  .testimonial-card {
    flex: 0 0 280px;
  }
  
  .author-avatar {
    width: 40px;
    height: 40px;
  }
  
  .author-name {
    font-size: 15px;
  }
  
  .author-title {
    font-size: 13px;
  }
}

/* Dark mode specific styles */
.dark-mode .testimonial-card {
  background: var(--bg-dark);
  border-color: var(--border);
}

.dark-mode .control-button {
  background: var(--bg-dark);
  border-color: var(--border);
}

.dark-mode .testimonial-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>