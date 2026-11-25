/* ===================================================================
 * Mao Leon Portfolio - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);


    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);



   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for inicio content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };



   /* pretty print
    * -------------------------------------------------- */
    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };



   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const $inicio = $('.s-inicio'),
              $hdr = $('.s-header'),
              triggerHeight = $inicio.outerHeight() - 170;

        let lastLoc = $WIN.scrollTop();
        let lastTime = Date.now();

        $WIN.on('scroll', function () {

            let loc = $WIN.scrollTop();
            let now = Date.now();
            let dt = Math.max(now - lastTime, 1);
            let velocity = (loc - lastLoc) / dt; // px/ms hacia abajo

            lastLoc = loc;
            lastTime = now;

            if (loc > triggerHeight) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                $hdr.addClass('offset');
            } else {
                $hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                if (!$hdr.hasClass('scrolling')) {
                    if (velocity > 3.8) {
                        $hdr.addClass('yoyo');
                    }
                    $hdr.addClass('scrolling');
                }
            } else {
                $hdr.removeClass('scrolling yoyo');
            }

        });

        $hdr.on('animationend webkitAnimationEnd', function () {
            $hdr.removeClass('yoyo');
        });

    };



   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const $toggleButton = $('.header-menu-toggle');
        const $headerContent = $('.header-content');
        const $siteBody = $("body");

        $toggleButton.on('click', function(event){
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $siteBody.toggleClass('menu-is-open');
        });

        $headerContent.find('.header-nav a, .btn').on("click", function() {

            // at 900px and below
            if (window.matchMedia('(max-width: 900px)').matches) {
                $toggleButton.toggleClass('is-clicked');
                $siteBody.toggleClass('menu-is-open');
            }
        });

        $WIN.on('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
                if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
            }
        });

    };


   /* accordion
    * ------------------------------------------------------ */
    const ssAccordion = function() {

        const $allItems = $('.services-list__item');
        const $allPanels = $allItems.children('.services-list__item-body');

        $allPanels.slice(1).hide();

        $allItems.on('click', '.services-list__item-header', function() {

            const $this = $(this),
                  $curItem = $this.parent(),
                  $curPanel =  $this.next();

            if(!$curItem.hasClass('is-active')){
                $allPanels.slideUp();
                $curPanel.slideDown();
                $allItems.removeClass('is-active');
                $curItem.addClass('is-active');
            }
            
            return false;
        });
    };



   /* photoswipe
    * ----------------------------------------------------- */
    const ssPhotoswipe = function() {
        const items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.folio-item');

        // get items
        $folioItems.each( function(i) {

            let $folio = $(this),
                $thumbLink =  $folio.find('.folio-item__thumb-link'),
                $title = $folio.find('.folio-item__title'),
                $caption = $folio.find('.folio-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            let item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).find('.folio-item__thumb-link').on('click', function(e) {
                e.preventDefault();
                let options = {
                    index: i,
                    showHideOpacity: true,
                    shareEl: false
                }

                // initialize PhotoSwipe
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };



   /* slick slider
    * ------------------------------------------------------ */
    const ssSlickSlider = function() {
            
        $('.testimonial-slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6500,
            speed: 900,
            cssEase: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            pauseOnHover: true,
            pauseOnFocus: true,
            responsive: [
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    const ssAOS = function() {
        
        AOS.init( {
            offset: 100,
            duration: 600,
            easing: 'ease-in-out',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };



   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* smooth scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                window.location.hash = target;
            });
        });

    };


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow = 800;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };



   /* water blob buttons animation (refactored architecture)
    * ------------------------------------------------------ */
    const ssWaterBlobButtons = function() {

        // Configuracion para boton Contactar
        const CONTACT_BLOB_CONFIG = {
            size: {
                maxRatio: 0.35,
                enterRatio: 0.55,
                exitRatio: 0.75,
                clickPulsePx: 10
            },
            physics: {
                followEase: 0.035,
                resizeEase: 0.04,
                fadeEase: 0.06,
                waveSpeed: 0.025,
                wavePoints: 64
            },
            waves: {
                outer: {
                    scale: 1.25,
                    phaseOffset: 1.2,
                    colorCenter: 'rgba(255, 175, 65, 1.0)',
                    colorMid: 'rgba(255, 165, 55, 0.55)',
                    colorEdge: 'rgba(255, 155, 45, 0.10)'
                },
                inner: {
                    scale: 0.92,
                    phaseOffset: 0.0,
                    colorCenter: 'rgba(255, 215, 125, 1.0)',
                    colorMid: 'rgba(255, 195, 95, 0.60)',
                    colorEdge: 'rgba(255, 175, 65, 0.20)'
                }
            }
        };

        // Configuracion para boton Download CV (crecimiento progresivo pausado desde porcion moderada hasta pintar todo)
        const CV_BLOB_CONFIG = {
            size: {
                maxRatio: 1.25,
                enterRatio: 0.055,
                exitRatio: 0.04,
                clickPulsePx: 12
            },
            physics: {
                followEase: 0.04,
                resizeEase: 0.016,
                fadeEase: 0.06,
                waveSpeed: 0.022,
                wavePoints: 64
            },
            waves: {
                outer: {
                    scale: 1.35,
                    phaseOffset: 1.2,
                    colorCenter: 'rgba(255, 195, 120, 0.95)',
                    colorMid: 'rgba(255, 171, 83, 0.60)',
                    colorEdge: 'rgba(249, 134, 26, 0.15)'
                },
                inner: {
                    scale: 1.0,
                    phaseOffset: 0.0,
                    colorCenter: 'rgba(249, 134, 26, 1.0)',
                    colorMid: 'rgba(249, 134, 26, 0.95)',
                    colorEdge: 'rgba(249, 134, 26, 0.85)'
                }
            }
        };

        // Controlador desacoplado para animacion de masa liquida
        class WaterBlobController {
            constructor(btn, cfg) {
                this.btn = btn;
                this.cfg = cfg;
                this.canvas = btn.querySelector('.btn-water-blob__canvas');
                if (!this.canvas) return;
                this.ctx = this.canvas.getContext('2d');
                this.state = {
                    x: 0,
                    y: 0,
                    targetX: 0,
                    targetY: 0,
                    radius: 0,
                    targetRadius: 0,
                    alpha: 0,
                    targetAlpha: 0,
                    time: 0
                };
                this.init();
            }

            init() {
                this.handleResize();
                this.bindEvents();
                this.startLoop();
            }

            destroy() {
                window.removeEventListener('resize', this.onResizeBound);
                cancelAnimationFrame(this.animationFrameId);
            }

            getMetrics() {
                const maxDimension = Math.max(this.canvas.width, this.canvas.height);
                const maxRadius = maxDimension * this.cfg.size.maxRatio;
                return {
                    maxRadius,
                    enterRadius: maxRadius * this.cfg.size.enterRatio,
                    exitRadius: maxRadius * this.cfg.size.exitRatio
                };
            }

            getRelativePointer(event) {
                const rect = this.btn.getBoundingClientRect();
                return {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                };
            }

            handleResize() {
                this.canvas.width = this.btn.offsetWidth;
                this.canvas.height = this.btn.offsetHeight;
                this.state.x = this.canvas.width * 0.5;
                this.state.y = this.canvas.height * 0.5;
                this.state.targetX = this.state.x;
                this.state.targetY = this.state.y;
            }

            bindEvents() {
                this.onResizeBound = () => this.handleResize();
                window.addEventListener('resize', this.onResizeBound);

                this.btn.addEventListener('mouseenter', (e) => {
                    const pos = this.getRelativePointer(e);
                    const { maxRadius, enterRadius } = this.getMetrics();

                    this.state.x = pos.x;
                    this.state.y = pos.y;
                    this.state.radius = enterRadius;
                    this.state.alpha = Math.max(this.state.alpha, 0.25);

                    this.state.targetX = pos.x;
                    this.state.targetY = pos.y;
                    this.state.targetRadius = maxRadius;
                    this.state.targetAlpha = 1;
                });

                this.btn.addEventListener('mousemove', (e) => {
                    const pos = this.getRelativePointer(e);
                    const { maxRadius } = this.getMetrics();

                    this.state.targetX = pos.x;
                    this.state.targetY = pos.y;
                    this.state.targetRadius = maxRadius;
                    this.state.targetAlpha = 1;
                });

                this.btn.addEventListener('mouseleave', () => {
                    const { exitRadius } = this.getMetrics();
                    this.state.targetAlpha = 0;
                    this.state.targetRadius = exitRadius;
                });

                this.btn.addEventListener('click', () => {
                    this.state.radius += this.cfg.size.clickPulsePx;
                });
            }

            updatePhysics() {
                const { physics } = this.cfg;
                const s = this.state;

                s.x += (s.targetX - s.x) * physics.followEase;
                s.y += (s.targetY - s.y) * physics.followEase;
                s.radius += (s.targetRadius - s.radius) * physics.resizeEase;
                s.alpha += (s.targetAlpha - s.alpha) * physics.fadeEase;
                s.time += physics.waveSpeed;
            }

            drawWaveLayer(waveConfig) {
                const { ctx, state, cfg } = this;
                const layerRadius = state.radius * waveConfig.scale;
                const points = cfg.physics.wavePoints;

                const grad = ctx.createRadialGradient(
                    state.x, state.y, layerRadius * 0.05,
                    state.x, state.y, layerRadius
                );
                grad.addColorStop(0, waveConfig.colorCenter);
                grad.addColorStop(0.58, waveConfig.colorMid);
                grad.addColorStop(1, waveConfig.colorEdge);

                ctx.beginPath();
                for (let i = 0; i <= points; i++) {
                    const angle = (i / points) * Math.PI * 2;
                    const wave1 = Math.sin(angle * 3 + state.time + waveConfig.phaseOffset) * (state.radius * 0.08);
                    const wave2 = Math.cos(angle * 4 - state.time * 0.8 + waveConfig.phaseOffset) * (state.radius * 0.05);
                    const wave3 = Math.sin(angle * 2 + state.time * 1.2) * (state.radius * 0.06);

                    const r = Math.max(0, layerRadius + wave1 + wave2 + wave3);
                    const px = state.x + Math.cos(angle) * r;
                    const py = state.y + Math.sin(angle) * r;

                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();

                ctx.fillStyle = grad;
                ctx.fill();
            }

            renderFrame() {
                const { ctx, canvas, state, cfg } = this;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (state.alpha > 0.01 && state.radius > 0.5) {
                    ctx.save();
                    ctx.globalAlpha = state.alpha;

                    this.drawWaveLayer(cfg.waves.outer);
                    this.drawWaveLayer(cfg.waves.inner);

                    ctx.restore();
                }
            }

            startLoop() {
                const tick = () => {
                    this.updatePhysics();
                    this.renderFrame();
                    this.animationFrameId = requestAnimationFrame(tick);
                };
                tick();
            }
        }

        // Instanciar controladores para Contactar y Download CV
        document.querySelectorAll('.btn-water-blob--contact').forEach(function(btn) {
            new WaterBlobController(btn, CONTACT_BLOB_CONFIG);
        });

        document.querySelectorAll('.btn-water-blob--cv').forEach(function(btn) {
            new WaterBlobController(btn, CV_BLOB_CONFIG);
        });
    };



   /* visitor stats console helper (GoatCounter)
    * ------------------------------------------------------ */
    const ssVisitorStats = function() {
        const BASE_URL = 'https://mao-leon.goatcounter.com';

        const fetchCounter = async function(path) {
            const url = `${BASE_URL}/counter/${encodeURIComponent(path)}.json`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        };

        const consultarVisitas = async function(customPath) {
            const currentPath = customPath || window.location.pathname || '/';
            console.log('%c[Mao Leon · Analytics] Consultando GoatCounter...', 'color: #f9861a; font-weight: bold;');
            try {
                const [totalData, pageData] = await Promise.all([
                    fetchCounter('TOTAL').catch(() => null),
                    fetchCounter(currentPath).catch(() => null)
                ]);

                if (!totalData && !pageData) {
                    console.warn(
                        'No se pudo obtener el conteo público. Verifica en GoatCounter -> Settings que esté activado "Allow adding visitor counts on your website" y que tu bloqueador (ej. Brave Shields) no esté bloqueando goatcounter.com.'
                    );
                    return null;
                }

                const resumen = {
                    'Visitas Totales (Sitio)': totalData ? totalData.count : 'N/D',
                    'Visitas Página Actual': pageData ? pageData.count : '0',
                    'Ruta consultada': currentPath,
                    'Dashboard': BASE_URL
                };
                console.table(resumen);
                return resumen;
            } catch (err) {
                console.warn('[Mao Leon · Analytics] Error o bloqueo de red:', err.message);
                return null;
            }
        };

        window.maoStats = consultarVisitas;
        Object.defineProperty(window, 'visitas', {
            configurable: true,
            get: function() {
                consultarVisitas();
                return 'Consultando estadísticas en GoatCounter...';
            }
        });
    };


   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssAccordion();
        ssPhotoswipe();
        ssSlickSlider();
        ssAOS();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
        ssWaterBlobButtons();
        ssVisitorStats();

    })();

})(jQuery);