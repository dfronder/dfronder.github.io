document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    if (!href.startsWith('http') && !href.startsWith('#') && !link.hasAttribute('target')) {
      e.preventDefault();

      const wrapper = document.getElementById('pageWrapper');
      wrapper.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});