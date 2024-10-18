(function () {
  "use strict";

  // Select function helper
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  // Event listener helper function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (Array.isArray(selectEl)) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
  });

  // Scroll event listener
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // Navbar links active state on scroll
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (section) {
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  // Scrolls to an element with header offset
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header ? header.offsetHeight : 0;

    let element = select(el);
    if (element) {
      let elementPos = element.offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    }
  };

  // Toggle header scrolled class
  let selectHeader = select('#header');
  let selectTopbar = select('#topbar');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled');
        }
      } else {
        selectHeader.classList.remove('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled');
        }
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  // Back to top button
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function (e) {
    let navbar = select('#navbar');
    if (navbar) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    }
  });

  // Mobile nav dropdown activation
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      let dropdown = this.nextElementSibling;
      if (dropdown) {
        dropdown.classList.toggle('dropdown-active');
      }
    }
  }, true);

  // Scroll with offset on links with class .scrollto
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      let navbar = select('#navbar');
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        if (navbarToggle) {
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
      }
      scrollto(this.hash);
    }
  }, true);

  // Scroll with offset on page load with hash links in the URL
  window.addEventListener('load', () => {
    if (window.location.hash) {
      scrollto(window.location.hash);
    }
  });

  // Preloader
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // PureCounter logic
  document.addEventListener("DOMContentLoaded", function () {
    new PureCounter();
  });

})();

