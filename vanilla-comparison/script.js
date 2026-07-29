// Articles Database (Direct translation of postsData.js)
const postsData = [
  {
    id: "1",
    title: "تفكيك العزلة في العصر الرقمي: هل نقترب أم نبتعد؟",
    slug: "deconstructing-digital-isolation",
    excerpt: "في عالم يتصل فيه الجميع بكبسة زر، لماذا نشعر بالوحدة أكثر من أي وقت مضى؟ محاولة لسبر أغوار الروابط الافتراضية وتأثيرها على سلامتنا النفسية وتماسكنا الاجتماعي.",
    publishedAt: "2026-05-15",
    category: "تحولات مجتمعية",
    readingTime: "5 دقائق",
  },
  {
    id: "2",
    title: "البحث عن المعنى وسط صخب الاستهلاك",
    slug: "the-search-for-meaning-in-consumerism",
    excerpt: "كيف تحول الاستهلاك من سلوك اقتصادي لقضاء الحاجات إلى هوية وجودية تحدد قيمتنا؟ نظرة فلسفية حول استعادة المعنى والجوهر في زمن الوفرة المادية والخواء الفكري.",
    publishedAt: "2026-05-10",
    category: "رؤى فكرية",
    readingTime: "4 دقائق",
  },
  {
    id: "4",
    title: "سيكولوجيا الشائعات في الفضاء الرقمي",
    slug: "psychology-of-digital-rumors",
    excerpt: "كيف تنتشر الأخبار المضللة والمعلومات المزيفة كالنار في الهشيم عبر منصات التواصل؟ قراءة في الدوافع النفسية وآليات التحصين الفكري والوعي الرقمي.",
    publishedAt: "2026-04-20",
    category: "تحولات مجتمعية",
    readingTime: "5 دقائق",
  }
];

// State Management
let selectedCategory = "الكل";
let searchQuery = "";

// DOM Elements
const postsGrid = document.getElementById("posts-grid");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");

// Initialize Website
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render
  renderPosts();

  // 2. Event Listeners for Filters
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      // Toggle Active Class
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Update State & Re-render
      selectedCategory = button.getAttribute("data-category");
      renderPosts();
    });
  });

  // 3. Search Box Input Event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderPosts();
    });
  }

  // 4. Dark Theme Init & Toggle
  const savedTheme = localStorage.getItem("theme") || 
                     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // 5. Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerText;
      
      submitBtn.disabled = true;
      submitBtn.innerText = "جاري الإرسال الهادئ...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        contactForm.reset();
        
        // Show Success Alert
        alert("تم إرسال رسالتك الفكرية بنجاح! سيتواصل معك الكاتب في أقرب وقت.");
      }, 1500);
    });
  }

  // 6. Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newsletterInput = document.getElementById("newsletter-email");
      
      alert(`✓ تم الاشتراك بنجاح للبريد: ${newsletterInput.value}\nيسعدنا انضمامك لقائمة القراءة والمقترحات!`);
      newsletterForm.reset();
    });
  }
});

// Render Posts Function
function renderPosts() {
  if (!postsGrid) return;
  postsGrid.innerHTML = "";

  const filtered = postsData.filter(post => {
    const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory;
    const matchesSearch = post.title.includes(searchQuery) || 
                          post.excerpt.includes(searchQuery) || 
                          post.category.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    postsGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--text-secondary);">
        <h3>عذراً، لم نجد أي مقالات تطابق معايير بحثك.</h3>
        <p style="margin-top: 0.5rem;">حاول استخدام كلمات مفتاحية أخرى أو تصفح التصنيفات العامة.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(post => {
    const card = document.createElement("article");
    card.className = "post-card";
    
    // Generate styling gradient dynamically
    const charSum = post.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = charSum % 360;
    const hue2 = (hue1 + 50) % 360;
    const gradient = `linear-gradient(135deg, hsl(${hue1}, 45%, 45%) 0%, hsl(${hue2}, 50%, 25%) 100%)`;

    card.innerHTML = `
      <div class="post-card-banner" style="background: ${gradient}; display: flex; align-items: center; justify-content: center; font-size: 3rem;">📚</div>
      <div class="post-card-content">
        <div class="post-card-meta">
          <span class="post-category">${post.category}</span>
          <span>•</span>
          <span>وقت القراءة: ${post.readingTime}</span>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
        <a href="#" class="post-card-link">اقرأ المقال الكامل ←</a>
      </div>
    `;
    postsGrid.appendChild(card);
  });
}

// Helper: Theme Icon Update
function updateThemeIcon(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === "dark" 
    ? `<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
}
