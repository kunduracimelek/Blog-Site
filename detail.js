    // Temayı uygulayan ve seçimi kaydeden fonksiyon
    const htmlTag = document.documentElement;
    const themeSelect = document.getElementById("themeSelect");

    function applyTheme(theme) {
      if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        htmlTag.setAttribute("data-theme", prefersDark ? "dark" : "light");
      } else {
        htmlTag.setAttribute("data-theme", theme);
      }
    }

    // Daha önce kayıtlı tema varsa onu uygulamalı, yoksa auto yap
    const savedTheme = localStorage.getItem("theme") || "auto";
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    // Sistem teması değişirse otomatik güncelleme (auto seçiliydiyse uygulasın istiyorum)
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (themeSelect.value === "auto") {
        applyTheme("auto");
      }
    });

    // Tema seçimi değişince kaydet ve uygula
    themeSelect.addEventListener("change", () => {
      const selected = themeSelect.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });

    // Yukarı çık butonu
    const scrollTopBtn = document.getElementById("scrollTop");
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // URL'den ID alma fonksiyonu
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    const posts = [
      { id: "1", title: "Yapay Zeka Nereye Gidiyor?", date: "1 Haziran 2025", content: `2025 yılında yapay zekada büyük gelişmeler yaşanıyor...` },
      { id: "2", title: "Frontend mi Backend mi?", date: "28 Mayıs 2025", content: `Yazılıma başlayanlar için en zor kararlardan biri...` },
      { id: "3", title: "Siber Güvenlikte Yeni Trendler", date: "20 Mayıs 2025", content: `Siber güvenlik alanında ortaya çıkan yeni tehditler...` },
      { id: "4", title: "Motivasyonun Gücü", date: "15 Mayıs 2025", content: `Başarıya ulaşmak için motivasyon çok önemli bir faktördür...` },
      { id: "5", title: "JavaScript ES2025 Yenilikleri", date: "10 Mayıs 2025", content: `JavaScript dilinde ES2025 ile gelen yeni özellikler...` },
      { id: "6", title: "API Tasarımında En İyi Uygulamalar", date: "5 Mayıs 2025", content: `Başarılı bir API tasarımı için RESTful prensiplere...` },
      { id: "7", title: "Veri Biliminde Temel Kavramlar", date: "30 Nisan 2025", content: `Veri bilimi alanında kullanılan temel kavramlar...` },
      { id: "8", title: "Kariyer Planlamasında Dikkat Edilmesi Gerekenler", date: "25 Nisan 2025", content: `Kariyer yolunda doğru adımları atmak için...` },
    ];

    const postId = getQueryParam("id");
    const post = posts.find(p => p.id === postId);

    const titleEl = document.getElementById("postTitle");
    const dateEl = document.getElementById("postDate");
    const contentEl = document.getElementById("postContent");
    const readTimeEl = document.getElementById("readTime");

    if (post) {
      titleEl.textContent = post.title;
      dateEl.textContent = post.date;
      contentEl.textContent = post.content;

      // Okuma süresi hesaplama
      const wordCount = post.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200); // 200 kelime/dk
      readTimeEl.textContent = `⏱ Tahmini Okuma Süresi: ${readingTime} dakika`;
    } else {
      titleEl.textContent = "Yazı bulunamadı.";
      dateEl.textContent = "";
      contentEl.textContent = "Geçersiz ya da mevcut olmayan bir yazı ID'si girdiniz.";
      readTimeEl.textContent = "";
    }

    // Paylaş butonu
    const shareBtn = document.getElementById("shareBtn");
    shareBtn.addEventListener("click", () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          shareBtn.textContent = "✅ Kopyalandı!";
          setTimeout(() => (shareBtn.textContent = "🔗 Paylaş"), 2000);
        });
      } else {
        alert("Tarayıcınız paylaşma özelliğini desteklemiyor.");
      }
    });