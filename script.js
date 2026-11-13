/*=========================================
        Rimjhim Graphics & Advertising
        Premium JavaScript
=========================================*/

// ===============================
// Mobile Menu Toggle
// ===============================
import { auth, db } from "./firebase-config.js";

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.setAttribute("aria-label", "Toggle navigation menu");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav-open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }));
}


// ===============================
// Sticky Header Shadow
// ===============================

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    } else {

        header.style.boxShadow = "none";

    }

});


// ===============================
// Scroll Animation
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".service-card,.why-box,.review-card,.counter-box,.gallery-grid img"
).forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});


// ===============================
// Animated Counter
// ===============================

const counters = document.querySelectorAll(".counter-box h2");

const speed = 80;

counters.forEach(counter => {

    const update = () => {

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        const count = +counter.getAttribute("data-count") || 0;

        const increment = Math.ceil(target / speed);

        if (count < target) {

            counter.setAttribute("data-count", count + increment);

            counter.innerText = (count + increment) + "+";

            setTimeout(update, 20);

        } else {

            counter.innerText = text;

        }

    };

    update();

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

        if (window.innerWidth < 992) {

            nav.style.display = "none";

        }

    });

});


// ===============================
// Scroll To Top Button
// ===============================

const topBtn = document.createElement("div");

topBtn.innerHTML = "↑";

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ===============================
// Contact Form
// ===============================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        form.reset();

    });

}

// Welcome Popup

window.onload = function(){

document.getElementById("welcomePopup").style.display="flex";

}

document.querySelector(".close-popup").onclick=function(){

document.getElementById("welcomePopup").style.display="none";

}

// FOLDER OPEN / CLOSE

window.toggleFolder = function(id) {

    const folder = document.getElementById(id);

    if (!folder) {
        console.log("Folder not found:", id);
        return;
    }

    if (window.getComputedStyle(folder).display === "none") {
        folder.style.display = "grid";
    } else {
        folder.style.display = "none";
    }

};

// ===== STEP 3: Filterable portfolio, image preview & WhatsApp ordering =====
(() => {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  const categories = {
    Birthday: 26,
    Wedding: 13,
    Social: 30,
    Flex: 6,
    Business: 5,
    Logo: 5
  };
  const labels = {Birthday:'Birthday Design',Wedding:'Wedding Album',Social:'Social Media Post',Flex:'Flex & Banner',Business:'Business Design',Logo:'Logo Design'};
  const phone = '919555603907';
  const items = [];
  Object.entries(categories).forEach(([category,count]) => {
    for (let n=1;n<=count;n++) items.push({category,number:n,src:`images/${category}/design${n}.jpg`});
  });
  const makeOrderUrl = item => `https://wa.me/${phone}?text=${encodeURIComponent(`Namaste Rimjhim Graphics, mujhe ${labels[item.category]} (Design ${item.number}) order karna hai. Kripya price aur details batayein.`)}`;
  function render(filter='all') {
    const visible = filter==='all' ? items : items.filter(item=>item.category===filter);
    grid.innerHTML = visible.map(item => `
      <article class="portfolio-card">
        <div class="portfolio-thumb" data-preview="${item.src}" data-order="${makeOrderUrl(item)}" role="button" tabindex="0" aria-label="Preview ${labels[item.category]} ${item.number}">
          <img src="${item.src}" loading="lazy" alt="${labels[item.category]} ${item.number}">
        </div>
        <div class="portfolio-card-info">
          <div><h3>${labels[item.category]}</h3><p>Design #${item.number}</p></div>
          <a class="portfolio-order" href="${makeOrderUrl(item)}" target="_blank" rel="noopener">Order Now</a>
        </div>
      </article>`).join('');
  }
  render();
  document.querySelectorAll('.portfolio-filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.portfolio-filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active'); render(button.dataset.filter);
  }));
  const lightbox=document.getElementById('portfolioLightbox');
  const preview=document.getElementById('lightboxImage');
  const order=document.getElementById('lightboxOrder');
  function openPreview(target){
    const img=target.closest('.portfolio-thumb'); if(!img) return;
    preview.src=img.dataset.preview; order.href=img.dataset.order;
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');
  }
  grid.addEventListener('click',e=>{if(e.target.closest('.portfolio-order'))return;openPreview(e.target)});
  grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('portfolio-thumb')){e.preventDefault();openPreview(e.target)}});
  function closePreview(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');preview.src='';}
  lightbox.querySelector('.lightbox-close').addEventListener('click',closePreview);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePreview()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePreview()});
})();
