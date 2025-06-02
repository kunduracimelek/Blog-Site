    const blogTitle = document.getElementById('blogTitle');
    const titleText = "Melek'in Blogu";
    // Yazıyı tek tek span içinde oluşturalım
    blogTitle.innerHTML = '';
    for (let ch of titleText) {
      const span = document.createElement('span');
      span.textContent = ch;
      span.classList.add('letter');
      blogTitle.appendChild(span);
    }

    const blogContainer = document.getElementById('blogContainer');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filters button');
    const noResults = document.getElementById('noResults');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Tema seçici ve localStorage yönetimi
    const themeSelect = document.getElementById('themeSelect');

    // Sayfa yüklendiğinde kaydedilmiş temayı uygula ve select seçeneğini ayarla
    window.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("theme") || "auto";
      themeSelect.value = savedTheme;
      applyTheme(savedTheme);
    });

    function applyTheme(value) {
      if (value === "auto") {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
      } else {
        document.documentElement.setAttribute("data-theme", value);
      }
    }

    themeSelect.addEventListener("change", () => {
      const value = themeSelect.value;
      applyTheme(value);
      localStorage.setItem("theme", value);
    });

    // Sistem tema değişimlerini otomatik takip et
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if(themeSelect.value === "auto"){
        applyTheme("auto");
      }
    });

    // Filtreleme fonksiyonu
    let currentCategory = 'all';
    function filterCategory(category) {
      currentCategory = category;
      filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(category) || category === 'all' && btn.textContent === 'Tümü');
      });
      filterAndSearch();
    }

    // Arama ve kategori filtresini birlikte uygula
    function filterAndSearch() {
      const searchText = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      const cards = blogContainer.querySelectorAll('.blog-card');

      cards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();

        const matchesCategory = (currentCategory === 'all' || currentCategory === category);
        const matchesSearch = title.includes(searchText);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterAndSearch);

    // Scroll to top butonu
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Başlangıçta tüm kategoriyi seç
    filterCategory('all');
