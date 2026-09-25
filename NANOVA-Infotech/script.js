/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   FAQ
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


/* =========================
   CONTACT FORM - Google Sheets
========================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => formObject[key] = value);

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {

        const response = await fetch(this.action, {
            method: 'POST',
            body: new URLSearchParams(formObject)
        });

        const result = await response.json();

        if (result.result === 'success') {

            alert('Thank you! Your message has been saved successfully! 🎉');
            this.reset();

        } else {

            alert('Something went wrong. Please try again.');

        }

    } catch (error) {

        alert('Network error. Please check your connection.');

    } finally {

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

    }

});


/* =========================
   POPUP MENU - SERVICES
========================= */

const serviceData = {

    'web-dev': {
        title: 'Web Development',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        description: 'Modern, responsive and high-performance websites built for businesses and organizations.',
        features: [
            'Responsive Design',
            'Fast Loading',
            'SEO Optimized',
            'Modern UI/UX'
        ]
    },

    'app-dev': {
        title: 'App Development',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
        description: 'User-friendly mobile applications designed to deliver smooth digital experiences.',
        features: [
            'iOS & Android',
            'Cross Platform',
            'Native Performance',
            'App Store Ready'
        ]
    },

    'ai-ml': {
        title: 'AI & Machine Learning',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12.75 12h-1.5l-.5-2.07C8.9 9.58 7.5 7.95 7.5 6a4 4 0 0 1 4-4z"/><path d="M12 12v8"/><path d="M8 20h8"/></svg>',
        description: 'Intelligent solutions using artificial intelligence and machine learning technologies.',
        features: [
            'Machine Learning',
            'Deep Learning',
            'Data Analysis',
            'Predictive Models'
        ]
    },

    'cyber-security': {
        title: 'Cyber Security',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        description: 'Technology-driven security solutions for protecting digital systems and information.',
        features: [
            'Threat Detection',
            'Data Encryption',
            'Security Audits',
            '24/7 Monitoring'
        ]
    },

    'cloud': {
        title: 'Cloud Solutions',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
        description: 'Scalable cloud-based solutions that support modern digital operations.',
        features: [
            'Cloud Hosting',
            'Scalable Infrastructure',
            'Cost Efficient',
            'High Availability'
        ]
    },

    'ui-ux': {
        title: 'UI/UX Design',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
        description: 'Clean, intuitive and engaging interfaces focused on better user experiences.',
        features: [
            'User Research',
            'Wireframing',
            'Prototyping',
            'Visual Design'
        ]
    },

    'mani': {
        title: 'Mani',
        photo: 'assets/mani.jpeg',
        icon: '<i class="fa-solid fa-user-tie"></i>',
        description: 'Business Executive focused on business development and client relations.',
        features: ['Business Development', 'Client Relations', 'Project Coordination', 'Team Collaboration']
    },

    'kalai': {
        title: 'Kalai',
        photo: 'assets/Kalai2.jpeg',
        icon: '<i class="fa-solid fa-code"></i>',
        description: 'Software Developer building reliable software solutions and modern applications.',
        features: ['Software Development', 'Modern Applications', 'Reliable Solutions', 'Problem Solving']
    },

    'mahesh': {
        title: 'Mahesh',
        photo: 'assets/mahesh.jpeg',
        icon: '<i class="fa-solid fa-brain"></i>',
        description: 'AI and Data Analyst building intelligent solutions and extracting insights from data.',
        features: ['AI Solutions', 'Data Analysis', 'Machine Learning', 'Insight Generation']
    },

    'krishnaveni': {
        title: 'Krishnaveni',
        photo: 'assets/krishnaveni.jpeg',
        icon: '<i class="fa-solid fa-layer-group"></i>',
        description: 'Full Stack Developer focused on full-stack development and system architecture.',
        features: ['Full Stack Development', 'System Architecture', 'Responsive Design', 'Scalable Applications']
    },

    'ananthi': {
        title: 'Ananthi',
        photo: 'assets/ananthi.jpeg',
        icon: '<i class="fa-solid fa-database"></i>',
        description: 'Database Administrator focused on database management and data optimization.',
        features: ['Database Management', 'Data Optimization', 'Performance Tuning', 'Data Security']
    }

};


function openPopup(serviceId) {

    const data = serviceData[serviceId];
    if (!data) return;

    document.getElementById('popupTitle').textContent = data.title;
    document.getElementById('popupDescription').textContent = data.description;

    const popupIcon = document.getElementById('popupIcon');
    popupIcon.classList.toggle('popup-member-photo', Boolean(data.photo));
    popupIcon.innerHTML = data.photo
        ? `<img src="${data.photo}" alt="${data.title}" onerror="this.src='https://ui-avatars.com/api/?name=${data.title}&background=00e5ff&color=000&size=160'">`
        : data.icon;

    const featuresHtml = data.features.map(f => 
        `<div><i class="fa-solid fa-circle-check"></i>${f}</div>`
    ).join('');
    document.getElementById('popupFeatures').innerHTML = featuresHtml;

    document.getElementById('popupOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';

}

document.querySelectorAll('.team-card[data-team-popup]').forEach(card => {
    card.addEventListener('click', () => openPopup(card.dataset.teamPopup));
});

document.querySelectorAll('.team-social a').forEach(link => {
    link.addEventListener('click', event => event.stopPropagation());
});


function closePopup() {

    document.getElementById('popupOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';

}


/* Close popup on ESC key */

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') closePopup();

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .tech-card, .process-step, .why-item"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.7s ease";

    observer.observe(element);

});


/* =========================
   SMOOTH SCROLL (Extra Feature)
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


/* =========================
   NAVBAR SCROLL EFFECT (Extra Feature)
========================= */

const header = document.querySelector('.header');

window.addEventListener('load', () => {
    window.scrollTo(0, window.scrollY);
});

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        header.style.background = 'rgba(7, 11, 20, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';

    } else {

        header.style.background = 'rgba(7, 11, 20, 0.78)';
        header.style.boxShadow = 'none';

    }

});


/* =========================
   TYPING EFFECT (Hero Title - Optional)
========================= */

// Uncomment pannina typing effect work aagum

/*
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.innerText;
    heroTitle.innerText = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
}
*/