/*=========================================
        Rimjhim Graphics & Advertising
        Premium JavaScript
=========================================*/

// ===============================
// Mobile Menu Toggle
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    if (nav.style.display === "block") {

        nav.style.display = "none";

    } else {

        nav.style.display = "block";

    }

});


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

document.querySelectorAll('nav a').forEach(anchor => {

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

// new script

function toggleFolder(id){

    let folder=document.getElementById(id);

    if(folder.style.display==="block"){

        folder.style.display="none";

    }else{

        folder.style.display="block";

    }

}