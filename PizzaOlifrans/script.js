document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. Dark Mode com LocalStorage
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================================================
    // 2. Header Glassmorphism ao Rolar (com Debounce para performance)
    // ==========================================================================
    const header = document.getElementById('header');
    let isScrolling;
    
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 66); // ~4 frames a 60fps
    });

    // ==========================================================================
    // 3. Menu Mobile
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    const toggleMenu = () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });

    // ==========================================================================
    // 4. Intersection Observer para Animações (Fade In)
    // ==========================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Otimização: para de observar após animar
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .menu-item, .testimonial-card, .faq-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ==========================================================================
    // 5. 🚨 Lógica Avançada do WhatsApp com UTM Tracking Completo
    // ==========================================================================
    const whatsappBtns = document.querySelectorAll('.track-wa');
    const urlParams = new URLSearchParams(window.location.search);
    
    // Captura todos os UTMs possíveis
    const utmData = {
        source: urlParams.get('utm_source') || localStorage.getItem('utm_source') || 'direto',
        medium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || 'none',
        campaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || 'none'
    };

    // Salva no LocalStorage se vier da URL
    if (urlParams.get('utm_source')) {
        localStorage.setItem('utm_source', utmData.source);
        localStorage.setItem('utm_medium', utmData.medium);
        localStorage.setItem('utm_campaign', utmData.campaign);
    }

    const customMessage = `Olá! Vim pelo ${utmData.source} (Campanha: ${utmData.campaign}) e gostaria de fazer um pedido na Olifrans Pizza!`;
    const encodedMessage = encodeURIComponent(customMessage);
    const baseWaUrl = "https://wa.me/5511939592955?text=";

    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Rastreamento de evento (respeita LGPD)
            trackEvent('whatsapp_click', { 
                method: 'whatsapp', 
                source: utmData.source,
                campaign: utmData.campaign
            });
            
            // Atualiza o href dinamicamente para garantir a mensagem correta
            btn.href = baseWaUrl + encodedMessage;
        });
    });

    // ==========================================================================
    // 6. Banner de Cookies LGPD (Com bloqueio lógico de scripts)
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => { cookieBanner.classList.add('show'); }, 1500);
    } else {
        // Se já aceitou, garante que o tracking esteja ativo (caso o GTM tenha sido bloqueado inicialmente)
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            enableMarketingScripts();
        }
    }

    const handleCookieChoice = (choice) => {
        localStorage.setItem('cookieConsent', choice);
        cookieBanner.classList.remove('show');
        if (choice === 'accepted') {
            enableMarketingScripts();
            trackEvent('cookie_consent', { status: 'accepted' });
        } else {
            trackEvent('cookie_consent', { status: 'rejected' });
        }
    };

    cookieAccept.addEventListener('click', () => handleCookieChoice('accepted'));
    cookieReject.addEventListener('click', () => handleCookieChoice('rejected'));

    function enableMarketingScripts() {
        console.log('Scripts de marketing ativados (simulação: em produção, o GTM seria carregado dinamicamente aqui se bloqueado).');
        // Nota: Para bloqueio real, o script do GTM/Pixel deve ser injetado via JS aqui, 
        // e não hardcoded no <head>, ou usar o modo de consentimento nativo do GTM v2.
    }

    // ==========================================================================
    // 7. Formulário Inteligente com Validação e Fallback para WhatsApp
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = document.getElementById('form-submit-btn');

            // Validação básica
            if (!name || !phone || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Feedback visual de carregamento
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const formMessage = `Olá, meu nome é *${name}*.\nTelefone: ${phone}\n\nMensagem: ${message}`;
                const waLink = `https://wa.me/5511939592955?text=${encodeURIComponent(formMessage)}`;
                
                trackEvent('form_submission', { method: 'whatsapp_redirect' });
                
                window.open(waLink, '_blank');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 800); // Simula delay de rede para UX
        });
    }

    // ==========================================================================
    // 8. Botão Voltar ao Topo
    // ==========================================================================
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================================================
    // 9. Função de Rastreamento Segura (Mock para GA4/GTM/FB)
    // ==========================================================================
    window.trackEvent = function(eventName, parameters = {}) {
        // Só envia para analytics se o usuário aceitou os cookies
        if (localStorage.getItem('cookieConsent') !== 'accepted') {
            console.log(`[TRACKING BLOQUEADO LGPD] Event: ${eventName}`, parameters);
            return;
        }

        console.log(`[TRACKING] Event: ${eventName}`, parameters);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, parameters);
        }
    };
});