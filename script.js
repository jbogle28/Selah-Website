const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-list');
const navItems = document.querySelectorAll('.nav-list li a');

// 2. Existing toggle function
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// 3. New Active Link Logic
// This loops through every link and checks if its address matches the current page
const currentPath = window.location.pathname;

navItems.forEach(link => {
    // If the link's href matches the current path, add the 'active-page' class
    if (link.getAttribute('href') === currentPath.split("/").pop()) {
        link.classList.add('active-page');
    }
});
