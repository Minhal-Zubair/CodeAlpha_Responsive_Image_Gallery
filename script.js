document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.querySelector('.gallery-filter');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox .close');
    const searchInput = document.getElementById('searchInput');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');

    let filteredItems = galleryItems;
    let currentPage = 1;
    const itemsPerPage = 5;
    let currentImageIndex = 0;
    let intervalId;

    // Function to update gallery display based on current page and filtered items
    function updateGallery() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filteredItems.forEach((item, index) => {
            item.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredItems.length / itemsPerPage)}`;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(filteredItems.length / itemsPerPage);
    }

    // Function to filter items based on selected filter
    function applyFilter(filterValue) {
        if (filterValue === 'all') {
            filteredItems = galleryItems;
        } else {
            filteredItems = galleryItems.filter(item => item.classList.contains(filterValue));
        }
        currentPage = 1; // Reset to the first page
        updateGallery();
    }

    function applySearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        galleryItems.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            item.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    }

    const lazyImages = document.querySelectorAll('img[data-src]');

    const lazyLoad = (image) => {
        image.src = image.dataset.src;
        image.onload = () => {
            image.classList.add('loaded');
        };
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });

    // Event listener for filter items
    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item')) {
            filterContainer.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            applyFilter(event.target.getAttribute('data-filter'));
        }
    });
      // Event listener for search input
    searchInput.addEventListener('input', () => {
        applySearch(searchInput.value);
    });

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filteredItems = galleryItems.filter(item => 
            item.querySelector('img').alt.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // Reset to the first page
        updateGallery();
    });

    // Function to open lightbox
    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.style.display = 'flex';
        startSlideshow();
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        clearInterval(intervalId);
    }

     // Function to show next image
     function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
        lightboxImage.src = filteredItems[currentImageIndex].querySelector('img').src;
    }

    // Function to start slideshow
    function startSlideshow() {
        intervalId = setInterval(showNextImage, 3000); // Change image every 3 seconds
    }

    // Add click event listeners to gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });

    // Add click event listener to close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside of the image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item')) {
            // Deactivate existing active 'filter-item'
            filterContainer.querySelector('.active').classList.remove('active');
            // Activate new 'filter-item'
            event.target.classList.add('active');

            const filterValue = event.target.getAttribute('data-filter');
            galleryItems.forEach((item) => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const itemsPerPage = 5; // Number of items per page
    let currentPage = 1;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');

     // Function to show the current page of gallery items
     function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        galleryItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

         // Update page info
         pageInfo.textContent = `Page ${page} of ${Math.ceil(galleryItems.length / itemsPerPage)}`;

         // Update button states
         prevBtn.disabled = page === 1;
         nextBtn.disabled = page === Math.ceil(galleryItems.length / itemsPerPage);
     }

 // Event listener for Previous button
 prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

// Event listener for Next button
nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(galleryItems.length / itemsPerPage)) {
        currentPage++;
        showPage(currentPage);
    }
});

// Initial page load
showPage(currentPage);
});



