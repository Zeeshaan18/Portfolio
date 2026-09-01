// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Navbar on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect
const textArray = ["Full Stack Developer", "Building Scalable Web Applications", "AI & ML Student"];
const typingText = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2; // Delete faster
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before start typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// Active Link highlighting on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current) && current !== '') {
            li.classList.add('active');
        }
    });
});

// Fade in elements on scroll using Intersection Observer
const fadeElements = document.querySelectorAll('.section-title, .glass-card, .timeline-item');
fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            
            // If it's the skills section, animate the progress bars
            if (entry.target.classList.contains('skills-category')) {
                const progressLines = entry.target.querySelectorAll('.progress-line span');
                progressLines.forEach(line => {
                    const width = line.parentElement.getAttribute('data-width');
                    line.style.width = width;
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// Form Submission Prevention (just for demo)
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
        btn.style.background = '#10B981'; // Green color
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

// Background Particles Effect
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Blue/Purple theme colors with low opacity
        const colors = ['rgba(59, 130, 246, 0.2)', 'rgba(139, 92, 246, 0.2)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Custom Cursor Animation
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Animate outline to follow cursor with slight delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect for interactive elements (using event delegation for dynamic and modal elements)
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .hamburger, .social-icon, .view-btn, .project-card, .skill-bars, .filter-btn, .action-btn, .modal-close')) {
        cursorOutline.classList.add('hovering');
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .hamburger, .social-icon, .view-btn, .project-card, .skill-bars, .filter-btn, .action-btn, .modal-close');
    if (target) {
        const related = e.relatedTarget;
        if (!related || !related.closest('a, button, .hamburger, .social-icon, .view-btn, .project-card, .skill-bars, .filter-btn, .action-btn, .modal-close')) {
            cursorOutline.classList.remove('hovering');
        }
    }
});

/* =========================================
   Projects Database
   ========================================= */
const projectsData = [
    {
        id: "interview-pilot-ai",
        title: "Interview Pilot AI",
        featured: true,
        category: "AI Interview Preparation Platform",
        filters: ["ai", "full-stack"],
        image: "assets/projects/interview_pilot_ai.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 6,
            featuresCount: 5,
            year: "2026",
            type: "Academic Project"
        },
        description: "An intelligent interview preparation platform that generates technical interview questions, evaluates responses, provides AI-powered feedback, and tracks user performance to improve interview readiness.",
        techStack: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Express.js", icon: "fa-solid fa-server" },
            { name: "MongoDB", icon: "fa-solid fa-database" },
            { name: "OpenAI API", icon: "fa-solid fa-robot" },
            { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" }
        ],
        features: [
            "AI Interview Questions: Automatically generates customized technical interview questions tailored to roles.",
            "Instant AI Feedback: Provides detailed performance evaluation and suggestions after each answer.",
            "Performance Dashboard: View summary stats, scoring distributions, and overall metrics.",
            "Progress Tracking: Log history of completed interview practices to observe growth trends over time.",
            "Responsive UI: Full mobile, tablet, and desktop interface support using modern design patterns."
        ]
    },
    {
        id: "interview-ace-ai",
        title: "Interview Ace AI",
        featured: false,
        category: "AI Career Assistant",
        filters: ["ai"],
        image: "assets/projects/interview_ace_ai.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 6,
            featuresCount: 5,
            year: "2026",
            type: "Personal Project"
        },
        description: "A smart interview assistant that helps candidates practice HR and technical interviews using AI-generated questions, answer evaluation, and personalized improvement suggestions.",
        techStack: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Express.js", icon: "fa-solid fa-server" },
            { name: "MongoDB", icon: "fa-solid fa-database" },
            { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" },
            { name: "OpenAI API", icon: "fa-solid fa-robot" }
        ],
        features: [
            "HR Interview Practice: Dynamic mock sessions focusing on soft skills and standard behavioral questions.",
            "Technical Interview Practice: Covers algorithms, systems design, and language-specific queries.",
            "AI Answer Evaluation: Real-time scoring and constructive critique on candidate answers.",
            "Improvement Suggestions: Actionable guidance on structuring responses using methods like STAR.",
            "Performance Reports: Comprehensive final grade with breakdown metrics at the end of each session."
        ]
    },
    {
        id: "ai-resume-analyzer",
        title: "AI Resume Analyzer",
        featured: false,
        category: "Artificial Intelligence",
        filters: ["ai"],
        image: "assets/projects/resume_analyzer.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 6,
            featuresCount: 5,
            year: "2025",
            type: "Personal Project"
        },
        description: "An AI-powered resume analyzer that evaluates resumes, calculates ATS compatibility, identifies missing skills, and recommends improvements based on job descriptions.",
        techStack: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Express.js", icon: "fa-solid fa-server" },
            { name: "MongoDB", icon: "fa-solid fa-database" },
            { name: "Python", icon: "fa-brands fa-python" },
            { name: "OpenAI API", icon: "fa-solid fa-robot" }
        ],
        features: [
            "ATS Score: Instantly checks resume compliance against common applicant tracking algorithms.",
            "Resume Analysis: Parses PDF/DOCX layouts to analyze semantic formatting, phrasing, and metrics.",
            "Skill Gap Detection: Compares CV with job descriptions to isolate missing critical qualifications.",
            "AI Suggestions: Intelligent hints to rephrase accomplishments and boost match percentage.",
            "Keyword Matching: Extract and prioritize target keywords needed to pass automatic screening filters."
        ]
    },
    {
        id: "resume-builder",
        title: "Resume Builder",
        featured: false,
        category: "Web Application",
        filters: ["web-app"],
        image: "assets/projects/resume_builder.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 3,
            featuresCount: 4,
            year: "2025",
            type: "Web Project"
        },
        description: "A web-based resume builder that allows users to create and customize professional resumes easily.",
        techStack: [
            { name: "HTML", icon: "fa-brands fa-html5" },
            { name: "CSS", icon: "fa-brands fa-css3-alt" },
            { name: "JavaScript", icon: "fa-brands fa-js" }
        ],
        features: [
            "Interactive Editor: Real-time form fields to enter and customize personal and professional details.",
            "Live Preview: Instant visual updates showing the formatted resume as changes are typed.",
            "Custom Styling: Options to personalize themes, typography, and section layouts.",
            "Export & Download: Clean, printable and exportable layout ready for job applications."
        ]
    },
    {
        id: "expense-tracker-ai",
        title: "Personal Expense Tracker AI",
        featured: false,
        category: "Finance Management",
        filters: ["ai", "full-stack", "web-app"],
        image: "assets/projects/expense_tracker.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 6,
            featuresCount: 5,
            year: "2025",
            type: "Personal Project"
        },
        description: "An AI-powered expense tracking application that monitors spending habits, categorizes expenses automatically, and provides financial insights with interactive dashboards.",
        techStack: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Express.js", icon: "fa-solid fa-server" },
            { name: "MongoDB", icon: "fa-solid fa-database" },
            { name: "Chart.js", icon: "fa-solid fa-chart-pie" },
            { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" }
        ],
        features: [
            "Expense Tracking: Record cash flows, log dates, titles, and individual cost items.",
            "AI Categorization: Uses NLP modeling to parse payment headers and auto-tag categories (e.g., Food, Travel).",
            "Monthly Reports: Automated text reports summarizing budget overruns or utility spike warnings.",
            "Budget Monitoring: Set fixed category thresholds with visual alerts when approach limit.",
            "Financial Analytics: High-quality Chart.js interactive graphics outlining spending distributions."
        ]
    },
    {
        id: "student-tracker",
        title: "Smart Student Tracker",
        featured: false,
        category: "Full Stack Web Application",
        filters: ["full-stack", "web-app"],
        image: "assets/projects/student_tracker.png",
        github: "https://github.com/Zeeshaan18",
        demo: "#",
        stats: {
            techCount: 5,
            featuresCount: 5,
            year: "2025",
            type: "Academic Project"
        },
        description: "A comprehensive student management system that enables institutions to manage student records, attendance, academic performance, and progress through an intuitive dashboard.",
        techStack: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Express.js", icon: "fa-solid fa-server" },
            { name: "MongoDB", icon: "fa-solid fa-database" },
            { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" }
        ],
        features: [
            "Student Management: Full CRUD capability to add, update, and search student profiles and metadata.",
            "Attendance Tracking: Easy-to-use digital registers logging daily status logs (present, absent, late).",
            "Academic Records: Stores grades, tracks marks averages, and prints student term results.",
            "Search & Filter: Quick-query fields to sort students by classes, IDs, names, or grades status.",
            "Secure Authentication: Role-based route shields separating administrator views from general student view."
        ]
    }
];

/* =========================================
   Project Filtering Logic
   ========================================= */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active status
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardFilters = card.getAttribute('data-filters').split(' ');
            const matches = filterValue === 'all' || cardFilters.includes(filterValue);
            
            if (matches) {
                card.classList.remove('filtered-out');
                // Re-trigger entrance animation
                card.classList.remove('animate-entrance');
                void card.offsetWidth; // Force reflow
                card.classList.add('animate-entrance');
            } else {
                card.classList.add('filtered-out');
                card.classList.remove('animate-entrance');
            }
        });
    });
});

/* =========================================
   Project Details Modal Logic
   ========================================= */
const modal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');
const modalBackdrop = document.querySelector('.modal-backdrop');

function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    // Generate features list
    const featuresHtml = project.features.map(f => {
        const colonIndex = f.indexOf(':');
        if (colonIndex !== -1) {
            const title = f.substring(0, colonIndex);
            const desc = f.substring(colonIndex + 1);
            return `
                <div class="modal-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <div><strong>${title}:</strong>${desc}</div>
                </div>
            `;
        }
        return `
            <div class="modal-feature-item">
                <i class="fa-solid fa-circle-check"></i>
                <div>${f}</div>
            </div>
        `;
    }).join('');
    
    // Generate tech stack badges
    const techHtml = project.techStack.map(t => `
        <span class="tech-badge">
            <i class="${t.icon}"></i> ${t.name}
        </span>
    `).join('');
    
    // Generate stats list
    const statsHtml = `
        <div class="modal-quick-stat">
            <span>Type</span>
            <span>${project.stats.type}</span>
        </div>
        <div class="modal-quick-stat">
            <span>Year</span>
            <span>${project.stats.year}</span>
        </div>
        <div class="modal-quick-stat">
            <span>Technologies</span>
            <span>${project.stats.techCount} Items</span>
        </div>
        <div class="modal-quick-stat">
            <span>Core Features</span>
            <span>${project.stats.featuresCount} Items</span>
        </div>
    `;

    // Populate modal structure
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>
                ${project.title}
                ${project.featured ? '<span class="featured-ribbon">⭐ Featured</span>' : ''}
            </h2>
        </div>
        <div class="modal-layout">
            <div class="modal-left">
                <div class="modal-mockup">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="modal-quick-stats">
                    ${statsHtml}
                </div>
                <div class="project-actions" style="margin-top: 10px;">
                    <a href="${project.github}" target="_blank" class="action-btn github-btn">
                        <i class="fa-brands fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo}" target="_blank" class="action-btn demo-btn">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                    </a>
                </div>
            </div>
            <div class="modal-right">
                <div class="modal-section">
                    <h4>Description</h4>
                    <p>${project.description}</p>
                </div>
                <div class="modal-section">
                    <h4>Core Features</h4>
                    <div class="modal-features-list">
                        ${featuresHtml}
                    </div>
                </div>
                <div class="modal-section">
                    <h4>Tech Stack</h4>
                    <div class="modal-tech-box">
                        ${techHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal and halt scroll
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Delegation for Opening Modal
document.body.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.view-btn');
    if (viewBtn) {
        const card = viewBtn.closest('.project-card');
        if (card) {
            const projectId = card.getAttribute('data-id');
            openModal(projectId);
        }
    }
});

// Bind close handlers
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

// Escape key press to close modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
