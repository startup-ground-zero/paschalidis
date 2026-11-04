(function(){
        'use strict';

        // Language toggle
        function applyLang(isGreek) {
            document.body.classList.toggle('lang-el', isGreek);
            document.getElementById('langToggle').textContent = isGreek ? 'EN' : 'ΕΛ';
            document.documentElement.lang = isGreek ? 'el' : 'en';
            document.querySelectorAll('[data-aria-en]').forEach(function(el){
                el.setAttribute('aria-label', isGreek ? el.dataset.ariaEl : el.dataset.ariaEn);
            });
        }
        window.toggleLang = function(e) {
            e.preventDefault();
            var isGreek = !document.body.classList.contains('lang-el');
            applyLang(isGreek);
            try { localStorage.setItem('site-lang', isGreek ? 'el' : 'en'); } catch (err) {}
        };
        applyLang(document.body.classList.contains('lang-el'));

        // Preloader
        document.addEventListener('DOMContentLoaded', function(){
            setTimeout(function(){
                document.getElementById('preloader').classList.add('done');
                var grid = document.getElementById('revealGrid');
                grid.classList.add('hidden');
                document.querySelector('.hero').classList.add('loaded');
            }, 350);
        });

        // Nav scroll
        var nav = document.getElementById('nav');
        var backTop = document.getElementById('backTop');
        var lastScroll = 0;

        window.addEventListener('scroll', function(){
            var y = window.scrollY;
            nav.classList.toggle('scrolled', y > 60);
            backTop.classList.toggle('visible', y > 600);
            lastScroll = y;
        }, {passive:true});

        // Back to top
        backTop.addEventListener('click', function(){
            window.scrollTo({top:0, behavior:'smooth'});
        });

        // Mobile menu
        var toggle = document.getElementById('navToggle');
        var links = document.getElementById('navLinks');
        toggle.addEventListener('click', function(){
            var open = links.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        document.querySelectorAll('.nav-links a').forEach(function(a){
            a.addEventListener('click', function(){
                links.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded','false');
                document.body.style.overflow = '';
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
            var href = anchor.getAttribute('href');
            if(href === '#') return;
            anchor.addEventListener('click', function(e){
                var target = document.querySelector(href);
                if(!target) return;
                e.preventDefault();
                target.scrollIntoView({behavior:'smooth', block:'start'});
            });
        });

        // Scroll reveal
        var revealObs = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, {threshold:0.08, rootMargin:'0px 0px -30px 0px'});

        document.querySelectorAll('.reveal').forEach(function(el){ revealObs.observe(el); });

        // Counter animation
        function animateCounter(el, target){
            var current = 0;
            var increment = target / 50;
            var timer = setInterval(function(){
                current += increment;
                if(current >= target){
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 30);
        }
        var statsObs = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    document.querySelectorAll('.counter').forEach(function(c){
                        animateCounter(c, parseInt(c.getAttribute('data-target')));
                    });
                    statsObs.unobserve(entry.target);
                }
            });
        }, {threshold:0.4});
        var statsEl = document.querySelector('.stats');
        if(statsEl) statsObs.observe(statsEl);

        // Form
        var form = document.getElementById('contactForm');
        if(form){
            form.addEventListener('submit', function(){
                var btn = document.getElementById('submitBtn');
                btn.textContent = 'SENDING...'; btn.disabled = true;
            });
        }
        var formEl = document.getElementById('contactFormEl');
        if(formEl){
            formEl.addEventListener('submit', function(){
                var btn = document.getElementById('submitBtnEl');
                btn.textContent = 'ΑΠΟΣΤΟΛΗ...'; btn.disabled = true;
            });
        }

        // Cookies
        function readStore(key){ try { return localStorage.getItem(key); } catch (err) { return null; } }
        function writeStore(key, value){ try { localStorage.setItem(key, value); } catch (err) {} }
        if(!readStore('cookies_accepted')){
            setTimeout(function(){
                document.getElementById('cookieBar').classList.add('show');
            }, 2500);
        }
        window.acceptCookies = function(){
            writeStore('cookies_accepted','true');
            document.getElementById('cookieBar').classList.remove('show');
        };

        // Hero slideshow
        var slides = document.querySelectorAll('.hero-slide');
        var currentSlide = 0;
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(slides.length > 1 && !reduceMotion){
            setInterval(function(){
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }

    })();
