// 1. Declarations (Done ONLY once)
const mobileMenuTrigger = document.querySelector('#mobile-menu');
const mainNavList = document.querySelector('.nav-list');
const allNavLinks = document.querySelectorAll('.nav-list li a');
const allDropdowns = document.querySelectorAll('.nav-list .dropdown');

// 2. Mobile Menu Toggle (Hamburger Icon)
if (mobileMenuTrigger && mainNavList) {
    mobileMenuTrigger.addEventListener('click', function() {
        this.classList.toggle('is-active');
        mainNavList.classList.toggle('active');
    });
}

// 3. Universal Mobile Dropdown Toggle
// This handles BOTH Services and Contact automatically
allDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const submenu = this.querySelector('.dropdown-menu');
            
            if (submenu) {
                const isHidden = window.getComputedStyle(submenu).display === 'none';
                
                if (isHidden) {
                    // First tap: Stop navigation and show menu
                    e.preventDefault();
                    submenu.style.display = 'block';
                } 
                // Second tap: If it's already 'block', e.preventDefault() won't run, 
                // and the browser will follow the link.
            }
        }
    });
});

// 4. Active Link Logic
const currentFileName = window.location.pathname.split("/").pop() || "index.html";

allNavLinks.forEach(link => {
    if (link.getAttribute('href') === currentFileName) {
        link.classList.add('active-page');
        
        // Highlight parent dropdown if the user is on a sub-page
        const parentLi = link.closest('.dropdown');
        if (parentLi) {
            const parentBtn = parentLi.querySelector('.dropbtn');
            if (parentBtn) parentBtn.classList.add('active-page');
        }
    }
});
