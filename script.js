document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // DOM ELEMENTS
  // ===============================
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar ul li a');
  const serviceCards = document.querySelectorAll('.service-card');
  const testimonialTrack = document.getElementById('testimonialTrack');
  const currentYear = document.getElementById('currentYear');

  // ===============================
  // MOBILE MENU TOGGLE
  // ===============================
  if (mobileMenu && navbar) {
    mobileMenu.addEventListener('click', () => {
      navbar.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar?.classList.remove('active');
      mobileMenu?.classList.remove('active');
    });
  });

  // ===============================
  // FOOTER YEAR
  // ===============================
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ===============================
  // BOOTSTRAP MODAL INIT
  // ===============================
  let bootstrapModal = null;
  const modalEl = document.getElementById('serviceModal');
  if (modalEl && window.bootstrap) {
    bootstrapModal = new bootstrap.Modal(modalEl);
  }

  // ===============================
  // SERVICES DATA
  // ===============================
  const servicesData = {
    'medical-billing': {
      title: 'Medical Billing',
      description:
        'Our Medical Billing Services manage the complete billing lifecycle—from charge capture to final reimbursement—so your practice can focus on patient care while we focus on revenue performance.<br><br>By combining certified billing professionals, payer-specific workflows, and intelligent automation, we ensure faster payments, fewer errors, and consistent cash flow—all at a transparent cost starting at just 2% of monthly collections.',
      points: [
        'End-to-end billing management, from claim creation to payment resolution',
        'Clean claim submission aligned with payer-specific rules',
        'Real-time claim tracking and follow-up',
        'Rapid resolution of rejections, edits, and underpayments',
        'Transparent reporting and performance metrics'
      ]
    },
    'medical-coding': {
      title: 'Medical Coding & Audits',
      description:
        'Our Medical Coding & Audit services ensure your clinical documentation is accurately translated into compliant, revenue-optimized codes across all specialties.<br><br>With certified coders and proactive audits, we help practices reduce denials, avoid payer scrutiny, and uncover missed revenue opportunities—without disrupting provider workflows.',
      points: [
        'AAPC® and AHIMA® certified coding professionals',
        'Specialty-specific CPT, ICD-10-CM, and HCPCS expertise',
        'Coding audits and chart reviews for accuracy and compliance',
        'Identification of undercoding and overcoding risks',
        'Alignment with payer and regulatory guidelines'
      ]
    },
    'ar-management': {
      title: 'Accounts Receivable (AR) Management',
      description:
        'Our AR Management services focus on reducing outstanding balances and shortening payment cycles through disciplined follow-ups and data-driven prioritization.<br><br>We actively pursue unpaid and underpaid claims while providing complete visibility into AR performance and recovery trends.',
      points: [
        'Timely follow-up on unpaid and underpaid claims',
        'Prioritization of high-value and aging accounts',
        'Direct payer communication and issue resolution',
        'Reduction in days in AR and aging backlogs',
        'Detailed AR analytics and recovery reporting'
      ]
    },
    'eligibility': {
      title: 'Insurance Eligibility & Verification',
      description:
        'Our Insurance Eligibility & Verification services eliminate preventable denials by validating patient coverage and benefits before services are rendered.<br><br>By confirming coverage details upfront, we help practices improve clean claim rates, reduce rework, and set accurate financial expectations with patients.',
      points: [
        'Real-time insurance eligibility and benefits verification',
        'Identification of copays, deductibles, and coinsurance',
        'Prior authorization and referral verification',
        'Payer-specific coverage validation',
        'Improved front-end accuracy and patient financial clarity'
      ]
    },
    'denial-management': {
      title: 'Denial Management & Appeals',
      description:
        'Our Denial Management & Appeals services focus on resolving current denials while preventing future ones through root-cause analysis and process improvement.<br><br>We prepare and submit timely, well-supported appeals that comply with payer guidelines and documentation requirements.',
      points: [
        'Comprehensive denial analysis and categorization',
        'Timely appeal submission with supporting documentation',
        'Root-cause identification and corrective action plans',
        'Reduction in recurring denial patterns',
        'Continuous denial trend reporting and insights'
      ]
    },
    'charge-entry': {
      title: 'Charge Entry & Payment Posting',
      description:
        'Accurate charge entry and payment posting are essential to preventing revenue leakage and maintaining financial transparency. Our specialists ensure every service is captured, posted, and reconciled correctly.<br><br>Any discrepancies are flagged immediately, enabling faster follow-up and resolution.',
      points: [
        'Accurate charge capture and validation',
        'Timely payment posting and adjustment reconciliation',
        'Identification of underpayments and posting discrepancies',
        'Support for secondary billing and patient balances',
        'Improved financial visibility and reporting accuracy'
      ]
    }
  };

  // ===============================
  // SERVICE CARD → MODAL
  // ===============================
  serviceCards.forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('a')) return;

      e.preventDefault();
      const key = card.getAttribute('data-service');
      const service = servicesData[key];

      if (!service || !bootstrapModal) return;

      document.getElementById('modalTitle').innerText = service.title;
      document.getElementById('modalDescription').innerHTML = service.description;

      const ul = document.getElementById('modalPointers');
      ul.innerHTML = '';
      service.points.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        ul.appendChild(li);
      });

      bootstrapModal.show();
      document.getElementById('mainContent')?.classList.add('blur-effect');
    });
  });

  // ===============================
  // REMOVE BLUR ON MODAL CLOSE
  // ===============================
  function removeBlur() {
    document.getElementById('mainContent')?.classList.remove('blur-effect');
  }

  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.addEventListener('click', removeBlur);
  });

  ['serviceModal', 'mobileQuoteModal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('hidden.bs.modal', removeBlur);
  });

  // ===============================
  // TESTIMONIAL SLIDER
  // ===============================
  let currentTestimonial = 0;
  const totalTestimonials = 4;
  let autoSlideInterval;

  function moveTestimonial(direction) {
    if (!testimonialTrack) return;
    currentTestimonial = (currentTestimonial + direction + totalTestimonials) % totalTestimonials;
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveTestimonial(1);
    }, 5000);
  }

  startAutoSlide();

  // ===============================
  // SMOOTH SCROLL
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  // ===============================
  // CONTACT FORM
  // ===============================
  const contactForm = document.querySelector('.contact-us form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you shortly.');
      contactForm.reset();
    });
  }

});
