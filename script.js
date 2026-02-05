// ================================
// NAVEGACIÓN
// ================================

// Toggle menú móvil
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Active link en scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ================================
// SMOOTH SCROLLING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Cerrar menú móvil si está abierto
            navMenu.classList.remove('active');
        }
    });
});

// ================================
// ANIMACIONES AL SCROLL
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar tarjetas de contenido
document.querySelectorAll('.content-card, .economy-card, .rights-card, .reflection-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Añadir sombra al navbar cuando se hace scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ================================
// CONTADOR ANIMADO (para estadísticas)
// ================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Activar contadores cuando sean visibles
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            const value = entry.target.textContent.replace(/[^0-9]/g, '');
            if (value) {
                animateCounter(entry.target, parseInt(value));
                entry.target.dataset.counted = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
    statObserver.observe(stat);
});

// ================================
// EFECTO PARALLAX EN HERO
// ================================

const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ================================
// ANIMACIÓN DE ESCRITURA PARA TÍTULOS
// ================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ================================
// EASTER EGG: Konami Code
// ================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Cambiar tema a modo oscuro temporalmente
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎉 ¡Has desbloqueado el modo ciudadano digital experto! 🎉');
    }, 3000);
}

// ================================
// TOOLTIP PERSONALIZADO
// ================================

const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = element.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.transform = 'translateX(-50%)';
        
        element.tooltipElement = tooltip;
    });
    
    element.addEventListener('mouseleave', () => {
        if (element.tooltipElement) {
            element.tooltipElement.remove();
            element.tooltipElement = null;
        }
    });
});

// ================================
// LOADING ANIMATION
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animación de entrada para el hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            // Opcional: descomentar para efecto de escritura
            // typeWriter(heroTitle, originalText, 100);
        }, 300);
    }
});

// ================================
// COPIAR AL PORTAPAPELES
// ================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✓ Copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #27AE60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ================================
// MODO OSCURO (OPCIONAL)
// ================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia de modo oscuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ================================
// IMPRESIÓN OPTIMIZADA
// ================================

window.addEventListener('beforeprint', () => {
    // Expandir todas las secciones colapsables antes de imprimir
    document.querySelectorAll('.collapsible').forEach(el => {
        el.classList.add('expanded');
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.collapsible').forEach(el => {
        el.classList.remove('expanded');
    });
});

// ================================
// ANALYTICS (si se necesita)
// ================================

function trackEvent(category, action, label) {
    // Placeholder para analytics
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Trackear clics en enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        trackEvent('Navigation', 'Click', e.target.textContent);
    });
});

// ================================
// PROTECCIÓN CONTRA COPIA (OPCIONAL)
// ================================

// Descomentar si quieres proteger el contenido
/*
document.addEventListener('copy', (e) => {
    e.preventDefault();
    const selection = window.getSelection().toString();
    e.clipboardData.setData('text/plain', 
        selection + '\n\nFuente: Micrositio de Ciudadanía Digital\n' + window.location.href
    );
    showNotification('Texto copiado con atribución');
});
*/

// ================================
// PERFORMANCE MONITORING
// ================================

if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
        // Browser doesn't support this
    }
}

// ================================
// ACCESIBILIDAD: SKIP TO CONTENT
// ================================

document.addEventListener('keydown', (e) => {
    // Alt + 1 para ir al contenido principal
    if (e.altKey && e.key === '1') {
        e.preventDefault();
        document.querySelector('#informacion')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ================================
// ANIMACIONES CSS ADICIONALES
// ================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .custom-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.85rem;
        pointer-events: none;
        z-index: 10000;
        animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Estilos para menú móvil activo */
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            animation: slideDown 0.3s ease;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    /* Modo oscuro */
    .dark-mode {
        --bg-primary: #1A1F3A;
        --bg-secondary: #2D3561;
        --text-primary: #E1E8ED;
        --text-secondary: #BDC3C7;
        --border: #4A5283;
    }
    
    .dark-mode .navbar {
        background: rgba(26, 31, 58, 0.98);
    }
    
    .dark-mode .content-card,
    .dark-mode .economy-card,
    .dark-mode .rights-card {
        background: #2D3561;
        border-color: #4A5283;
    }
`;

document.head.appendChild(style);

// ================================
// INICIALIZACIÓN
// ================================

console.log('🎓 Micrositio de Ciudadanía Digital cargado correctamente');
console.log('💡 Tip: Presiona Alt+1 para saltar al contenido principal');

// Log de bienvenida en consola
console.log('%c Ciudadanía Digital ', 'background: #2D3561; color: white; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c Apropiaciones Digitales - Módulo 2 ', 'background: #E84545; color: white; font-size: 14px; padding: 5px;');
