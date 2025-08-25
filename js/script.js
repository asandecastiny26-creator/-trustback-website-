// TrustBack Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileNavigation();
    initDropdownMenus();
    initSearchFunctionality();
    initAlertBanner();
    initAccessibility();
    initFormValidation();
    
    console.log('TrustBack Website loaded successfully');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const nav = document.querySelector('.main-nav');
    
    // Create mobile menu button if screen is small
    function createMobileMenuButton() {
        if (window.innerWidth <= 968) {
            let mobileButton = document.querySelector('.mobile-menu-toggle');
            
            if (!mobileButton) {
                mobileButton = document.createElement('button');
                mobileButton.className = 'mobile-menu-toggle';
                mobileButton.innerHTML = '☰ Menu';
                mobileButton.setAttribute('aria-label', 'Toggle mobile menu');
                
                nav.insertBefore(mobileButton, nav.firstChild);
                
                mobileButton.addEventListener('click', function() {
                    const navList = document.querySelector('.nav-list');
                    navList.classList.toggle('mobile-active');
                    
                    if (navList.classList.contains('mobile-active')) {
                        mobileButton.innerHTML = '✕ Close';
                        mobileButton.setAttribute('aria-expanded', 'true');
                    } else {
                        mobileButton.innerHTML = '☰ Menu';
                        mobileButton.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        } else {
            // Remove mobile button on larger screens
            const mobileButton = document.querySelector('.mobile-menu-toggle');
            if (mobileButton) {
                mobileButton.remove();
            }
            
            // Ensure nav list is visible on larger screens
            const navList = document.querySelector('.nav-list');
            navList.classList.remove('mobile-active');
        }
    }
    
    // Initial call and window resize listener
    createMobileMenuButton();
    window.addEventListener('resize', createMobileMenuButton);
}

// Enhanced Dropdown Menu Functionality
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Prevent default click behavior for dropdown toggles
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
        
        // Keyboard navigation support
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(dropdown);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                openDropdown(dropdown);
                focusFirstDropdownItem(dropdown);
            }
        });
        
        // Mouse events
        dropdown.addEventListener('mouseenter', () => openDropdown(dropdown));
        dropdown.addEventListener('mouseleave', () => closeDropdown(dropdown));
        
        // Handle dropdown item keyboard navigation
        const dropdownItems = content.querySelectorAll('a');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % dropdownItems.length;
                    dropdownItems[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = index === 0 ? dropdownItems.length - 1 : index - 1;
                    dropdownItems[prevIndex].focus();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closeDropdown(dropdown);
                    link.focus();
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
}

function toggleDropdown(dropdown) {
    const content = dropdown.querySelector('.dropdown-content');
    const isOpen = content.style.display === 'block';
    
    closeAllDropdowns();
    
    if (!isOpen) {
        openDropdown(dropdown);
    }
}

function openDropdown(dropdown) {
    const content = dropdown.querySelector('.dropdown-content');
    content.style.display = 'block';
    dropdown.setAttribute('aria-expanded', 'true');
}

function closeDropdown(dropdown) {
    const content = dropdown.querySelector('.dropdown-content');
    content.style.display = 'none';
    dropdown.setAttribute('aria-expanded', 'false');
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        closeDropdown(dropdown);
    });
}

function focusFirstDropdownItem(dropdown) {
    const firstItem = dropdown.querySelector('.dropdown-content a');
    if (firstItem) {
        firstItem.focus();
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchForm = document.querySelector('.search-box');
    const searchInput = searchForm.querySelector('input');
    const searchButton = searchForm.querySelector('button');
    
    // Handle search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch(searchInput.value);
    });
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch(searchInput.value);
    });
    
    // Search suggestions (mock functionality)
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length > 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            hideSearchSuggestions();
        }
    });
}

function performSearch(query) {
    if (!query.trim()) {
        alert('Please enter a search term.');
        return;
    }
    
    console.log('Searching for:', query);
    // In a real implementation, this would redirect to search results
    alert(`Searching for: "${query}"\n\nThis would typically redirect to search results.`);
}

function showSearchSuggestions(query) {
    // Mock search suggestions
    const suggestions = [
        'Tax Forms',
        'Payment Options',
        'Refund Status',
        'Tax Credits',
        'Filing Deadlines',
        'IRA Contributions',
        'Business Taxes',
        'Identity Verification'
    ].filter(item => item.toLowerCase().includes(query));
    
    let suggestionsBox = document.querySelector('.search-suggestions');
    
    if (!suggestionsBox) {
        suggestionsBox = document.createElement('div');
        suggestionsBox.className = 'search-suggestions';
        document.querySelector('.search-box').appendChild(suggestionsBox);
    }
    
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions
            .slice(0, 5) // Show max 5 suggestions
            .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
            .join('');
        
        suggestionsBox.style.display = 'block';
        
        // Add click handlers to suggestions
        suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelector('.search-box input').value = this.textContent;
                hideSearchSuggestions();
                performSearch(this.textContent);
            });
        });
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    const suggestionsBox = document.querySelector('.search-suggestions');
    if (suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
}

// Alert Banner Functionality
function initAlertBanner() {
    const alertBanner = document.querySelector('.alert-banner');
    
    if (alertBanner) {
        // Add close button to alert banner
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.className = 'alert-close';
        closeButton.setAttribute('aria-label', 'Close alert');
        
        const alertContent = alertBanner.querySelector('.alert-content');
        alertContent.appendChild(closeButton);
        
        closeButton.addEventListener('click', function() {
            alertBanner.style.display = 'none';
            // Store in localStorage to remember user preference
            localStorage.setItem('alertBannerClosed', 'true');
        });
        
        // Check if user previously closed the banner
        if (localStorage.getItem('alertBannerClosed') === 'true') {
            alertBanner.style.display = 'none';
        }
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Focus management for modals and dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
            // Close any open modals or overlays
            hideSearchSuggestions();
        }
        
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });
    
    // High contrast toggle (for accessibility)
    const highContrastToggle = document.createElement('button');
    highContrastToggle.textContent = 'Toggle High Contrast';
    highContrastToggle.className = 'high-contrast-toggle';
    highContrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    
    document.querySelector('.header-tools').appendChild(highContrastToggle);
    
    highContrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        
        if (document.body.classList.contains('high-contrast')) {
            localStorage.setItem('highContrast', 'true');
            this.textContent = 'Disable High Contrast';
        } else {
            localStorage.removeItem('highContrast');
            this.textContent = 'Toggle High Contrast';
        }
    });
    
    // Apply saved high contrast preference
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
        highContrastToggle.textContent = 'Disable High Contrast';
    }
}

function handleTabNavigation(e) {
    // Improved tab navigation within dropdowns
    const openDropdown = document.querySelector('.dropdown[aria-expanded="true"]');
    
    if (openDropdown) {
        const dropdownItems = openDropdown.querySelectorAll('.dropdown-content a');
        const firstItem = dropdownItems[0];
        const lastItem = dropdownItems[dropdownItems.length - 1];
        
        if (e.shiftKey && document.activeElement === firstItem) {
            e.preventDefault();
            lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
            e.preventDefault();
            firstItem.focus();
        }
    }
}

// Form Validation
function initFormValidation() {
    // Add form validation to any forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    // SSN validation (basic pattern)
    if (field.name === 'ssn' && value && !isValidSSN(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid Social Security Number (XXX-XX-XXXX).';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.id = field.id + '-error';
    
    field.setAttribute('aria-describedby', errorElement.id);
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9]?[\d\-\(\)\s]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidSSN(ssn) {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
}

// Government Banner Toggle
document.addEventListener('DOMContentLoaded', function() {
    const bannerToggle = document.querySelector('.banner-toggle');
    
    if (bannerToggle) {
        bannerToggle.addEventListener('click', function() {
            alert('Here\'s how you know this is an official government website:\n\n• Official websites use .gov\n• Secure .gov websites use HTTPS\n• Look for a lock icon or https:// in your browser');
        });
    }
});

// Add dynamic styles for mobile menu and search suggestions
const dynamicStyles = `
    .mobile-menu-toggle {
        display: none;
        background: var(--secondary-blue);
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        margin: 10px 0;
    }
    
    @media (max-width: 968px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-list {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--primary-blue);
            z-index: 1000;
        }
        
        .nav-list.mobile-active {
            display: flex;
        }
    }
    
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--gray-300);
        border-top: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
    }
    
    .suggestion-item {
        padding: 10px 12px;
        cursor: pointer;
        border-bottom: 1px solid var(--gray-100);
    }
    
    .suggestion-item:hover {
        background: var(--gray-50);
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: var(--black);
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 2000;
        border-radius: 4px;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    .field-error {
        color: var(--red);
        font-size: 14px;
        margin-top: 4px;
    }
    
    .error {
        border-color: var(--red) !important;
    }
    
    .high-contrast-toggle {
        background: var(--gray-100);
        border: 1px solid var(--gray-300);
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .high-contrast {
        filter: contrast(200%) brightness(150%);
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
