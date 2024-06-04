// Mostrar el encabezado y la barra de navegación con una animación de retraso
$(window).on('load', function() {
  gsap.to('#header', 0, { display: "block", delay: 1 });
  gsap.to('#navigation-bar', 0.6, { display: "block", opacity: 1, delay: 0.6 });
  gsap.to('#navigation-content', 0, { display: "none" });
  gsap.to('#navigation-content', 0, { display: "flex", delay: 1 });
});

// Animación de la barra de navegación al hacer clic en el menú
$(function() {
  $('.menubar').on('click', function() {
    gsap.to('#navigation-content', 0.6, { y: 0 });
  });
  $('.navigation-close').on('click', function() {
    gsap.to('#navigation-content', 0.6, { y: "-100%" });
  });
});

// Clase para la animación de texto rotativo
$(function() {
  class TxtRotate {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.isDeleting = false;
      this.tick();
    }

    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      let delta = 150 - Math.random() * 100;
      if (this.isDeleting) delta /= 2;
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
      }

      setTimeout(() => this.tick(), delta);
    }
  }

  // Inicialización de la animación de texto rotativo
  window.onload = function() {
    setTimeout(function() {
        const elements = document.getElementsByClassName('txt-rotate');
        for (const element of elements) {
            const toRotate = element.getAttribute('data-rotate');
            const period = element.getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(element, JSON.parse(toRotate), period);
            }
        }
        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666; }";
        document.body.appendChild(css);
    }, 2000);
  };
});

// Navegación a secciones específicas de la página
$(function() {
  $('#about-link').on('click', function() {
    navigateToSection('#about');
  });
  $('#contact-link').on('click', function() {
    navigateToSection('#contact');
  });
  $('#portfolio-link').on('click', function() {
    navigateToSection('#portfolio');
  });
  $('#home-link, #home-link-logo').on('click', function() {
    navigateToSection('#header');
  });

  function navigateToSection(sectionId) {
    gsap.to('#navigation-content', 0, { display: "none", delay: 0.7 });
    gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
    gsap.to('#header, #about, #portfolio, #contact', 0, { display: "none" });
    gsap.to(sectionId, 0, { display: "block", delay: 0.7 });
    gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
  }
});

// Seguimiento del cursor del ratón
$(function() {
  const $cursor = $('.cursor');

  $(window).on('mousemove', function(e) {
    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3
    });
  });

  // Cambiar el estado del cursor al pasar sobre ciertos elementos
  $('a, .navigation-close, .menubar, .filter-button, .portfolio-image, .logo img').hover(function() {
    $cursor.addClass('hover');
  }, function() {
    $cursor.removeClass('hover');
  });
});

//Popup y Filtros
$(document).ready(function() {
  // Mostrar el popup al hacer clic en un proyecto
  $('.portfolio-image').on('click', function() {
      $('#project-popup').css('display', 'block');
  });

  // Cerrar el popup
  $('.close').on('click', function() {
      $('#project-popup').css('display', 'none');
  });

  // Cerrar el popup al hacer clic fuera de él
  $(window).on('click', function(event) {
      if ($(event.target).is('#project-popup')) {
          $('#project-popup').css('display', 'none');
      }
  });

  // Filtros
  $('.filter-button').on('click', function() {
      var filter = $(this).attr('data-filter');

      $('.filter-button').removeClass('active');
      $(this).addClass('active');

      if (filter === 'all') {
          $('.portfolio-item').show();
      } else {
          $('.portfolio-item').hide();
          $('.portfolio-item[data-category="' + filter + '"]').show();
      }
  });
});
