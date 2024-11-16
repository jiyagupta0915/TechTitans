window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
      const options = document.getElementById(`options${index + 1}`);
      const sectionRect = section.getBoundingClientRect();
      
      // Check if the section is in the viewport
      if (sectionRect.top < window.innerHeight && sectionRect.bottom >= 0) {
          options.classList.add('show'); // Add class to show options
      } else {
          options.classList.remove('show'); // Remove class to hide options
      }
  });
});