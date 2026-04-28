document.addEventListener("DOMContentLoaded", () => {
  initAudioToggle();
  initHeroScrollEffect();
  initMainSlider();
  initClientVideoCards();
  initCrossfadeSections();
  initSelectedServicesPanel();
});

function initAudioToggle() {
  const audio = document.getElementById("siteAudio");
  const toggle = document.getElementById("soundToggle");
  if (!audio || !toggle) return;

  let isPlaying = false;

  toggle.addEventListener("click", async () => {
    try {
      if (isPlaying) {
        audio.pause();
        toggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        await audio.play();
        toggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
      isPlaying = !isPlaying;
    } catch (error) {
      console.warn("No se pudo reproducir el audio:", error);
    }
  });
}

function initHeroScrollEffect() {
  const heroMedia = document.getElementById("heroMedia");
  if (!heroMedia) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    heroMedia.style.transform = `translateY(${scrollY * -0.18}px)`;
  });
}

function initMainSlider() {
  const track = document.getElementById("mainSliderTrack");
  if (!track) return;

  const slides = track.children;
  let index = 0;

  setInterval(() => {
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4500);
}

function initClientVideoCards() {
  const track = document.getElementById("clientsTrack");
  const cards = document.querySelectorAll(".client-card");
  if (!track || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      track.classList.add("paused");
      const thumb = card.querySelector(".client-thumb");
      const videoUrl = card.dataset.video;

      if (!thumb.querySelector("iframe")) {
        thumb.innerHTML = `
          <iframe
            src="${videoUrl}"
            title="Video cliente"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      }
    });
  });
}

function initCrossfadeSections() {
  initFadeGroup(".crossfade-slide", 4000);
}

function initFadeGroup(selector, intervalTime) {
  const slides = document.querySelectorAll(selector);
  if (!slides.length) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, intervalTime);
}

function initSelectedServicesPanel() {
  const checkboxes = document.querySelectorAll('input[name="evento[]"]');
  const target = document.getElementById("selectedServicesList");
  if (!checkboxes.length || !target) return;

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateSelectedServices);
  });

  function updateSelectedServices() {
    const selected = Array.from(checkboxes)
      .filter(item => item.checked)
      .map(item => item.value);

    if (!selected.length) {
      target.innerHTML = `<span>Selecciona opciones</span>`;
      return;
    }

    target.innerHTML = selected.map(item => `<span>${item}</span>`).join("");
  

  }
}
