/**
 * Utility Functions
 * Shared helper functions for the Prashant Cooks website
 */

(function () {
    'use strict';

    // Escape HTML to prevent XSS attacks
    function escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Debounce function for search input
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Format time string
    function formatTime(timeString) {
        return timeString || 'Not specified';
    }

    // Get difficulty color (for future use)
    function getDifficultyColor(difficulty) {
        const colors = {
            'Easy': '#4caf50',
            'Medium': '#ff9800',
            'Hard': '#f44336'
        };
        return colors[difficulty] || '#666';
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Smooth scroll to element
    function scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Get base path for GitHub Pages project sites
    // For project sites: /repo-name/, for user sites: /
    function getBasePath() {
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(s => s);
        
        // If we have segments and the first doesn't look like a file, it's likely the repo name
        if (segments.length > 0) {
            const firstSegment = segments[0];
            // Check if it's a file (has extension) or directory (repo name)
            if (!firstSegment.includes('.')) {
                // It's likely the repo name
                return '/' + firstSegment + '/';
            }
        }
        
        // Default: assume user site (root)
        return '/';
    }

    // Initialize base path on load
    (function initBasePath() {
        const pathname = window.location.pathname;
        let basePath = '/';
        
        // Detect repo name from pathname
        const segments = pathname.split('/').filter(s => s);
        if (segments.length > 0) {
            const firstSegment = segments[0];
            if (!firstSegment.includes('.')) {
                // Likely repo name
                basePath = '/' + firstSegment + '/';
            }
        }
        
        window.PrashantCooks = window.PrashantCooks || {};
        window.PrashantCooks.basePath = basePath;
    })();

    // Helper to get clean URL path (for navigation)
    function getCleanUrl(path) {
        const basePath = window.PrashantCooks?.basePath || '/';
        // Remove leading slash from path if present
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        // Remove .html if present
        const noExtension = cleanPath.replace(/\.html$/, '');
        return basePath + noExtension;
    }

    // Helper to get asset path
    function getAssetPath(path) {
        const basePath = window.PrashantCooks?.basePath || '/';
        // Remove leading slash from path if present
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return basePath + cleanPath;
    }

    // Export utilities
    window.PrashantCooks = window.PrashantCooks || {};
    window.PrashantCooks.utils = {
        ...window.PrashantCooks.utils,
        escapeHtml,
        debounce,
        formatTime,
        getDifficultyColor,
        isInViewport,
        scrollToElement,
        getBasePath,
        getAssetPath,
        getCleanUrl
    };
})();