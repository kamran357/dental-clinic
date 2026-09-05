/**
 * Prime Design Clinic Configuration Loader
 * Loads centralized business information and exposes it globally
 */

(function() {
    'use strict';

    // Global clinic config object
    window.ClinicConfig = {
        data: null,
        loaded: false,
        callbacks: []
    };

    /**
     * Load clinic configuration from JSON file
     */
    function loadConfig() {
        fetch('data/clinic-config.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load clinic configuration');
                }
                return response.json();
            })
            .then(config => {
                window.ClinicConfig.data = config;
                window.ClinicConfig.loaded = true;

                // Execute all pending callbacks
                window.ClinicConfig.callbacks.forEach(callback => callback(config));
                window.ClinicConfig.callbacks = [];

                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('clinicConfigLoaded', { detail: config }));
            })
            .catch(error => {
                console.error('Error loading clinic configuration:', error);
            });
    }

    /**
     * Execute callback when config is loaded
     * @param {Function} callback - Function to execute with config data
     */
    window.ClinicConfig.onLoad = function(callback) {
        if (window.ClinicConfig.loaded) {
            callback(window.ClinicConfig.data);
        } else {
            window.ClinicConfig.callbacks.push(callback);
        }
    };

    /**
     * Get config value by path (e.g., 'clinic.businessName')
     * @param {string} path - Dot-notation path to config value
     * @returns {*} Config value or undefined
     */
    window.ClinicConfig.get = function(path) {
        if (!window.ClinicConfig.loaded || !window.ClinicConfig.data) {
            console.warn('Clinic config not yet loaded');
            return undefined;
        }

        return path.split('.').reduce((obj, key) => obj && obj[key], window.ClinicConfig.data);
    };

    /**
     * Apply configuration to HTML elements with data attributes
     */
    window.ClinicConfig.apply = function() {
        if (!window.ClinicConfig.loaded) {
            console.warn('Cannot apply config - not yet loaded');
            return;
        }

        const config = window.ClinicConfig.data;

        // Update elements with data-config attribute
        document.querySelectorAll('[data-config]').forEach(element => {
            const configPath = element.getAttribute('data-config');
            const value = window.ClinicConfig.get(configPath);

            if (value !== undefined) {
                if (element.tagName === 'IMG') {
                    element.src = value;
                } else if (element.tagName === 'A' && element.hasAttribute('href')) {
                    element.href = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update meta tags
        document.querySelectorAll('meta[data-config]').forEach(meta => {
            const configPath = meta.getAttribute('data-config');
            const value = window.ClinicConfig.get(configPath);

            if (value !== undefined) {
                const attr = meta.getAttribute('property') || meta.getAttribute('name') || 'content';
                if (attr === 'property' || attr === 'name') {
                    meta.setAttribute('content', value);
                }
            }
        });

        // Update title if present
        const titleElement = document.querySelector('title[data-config]');
        if (titleElement) {
            const configPath = titleElement.getAttribute('data-config');
            const value = window.ClinicConfig.get(configPath);
            if (value !== undefined) {
                document.title = value;
            }
        }
    };

    /**
     * Helper functions for common operations
     */
    window.ClinicConfig.helpers = {
        /**
         * Format phone number for tel: link
         */
        getTelLink: function() {
            const phone = window.ClinicConfig.get('clinic.phone');
            return phone ? 'tel:' + phone.replace(/\s+/g, '') : '#';
        },

        /**
         * Get WhatsApp link
         */
        getWhatsAppLink: function(message) {
            const whatsapp = window.ClinicConfig.get('clinic.whatsapp');
            const text = message || 'Hello, I would like to book an appointment';
            return whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}` : '#';
        },

        /**
         * Format email for mailto: link
         */
        getEmailLink: function(subject) {
            const email = window.ClinicConfig.get('clinic.email');
            const subjectParam = subject ? '?subject=' + encodeURIComponent(subject) : '';
            return email ? 'mailto:' + email + subjectParam : '#';
        },

        /**
         * Get Calendly booking link
         */
        getCalendlyLink: function() {
            return window.ClinicConfig.get('calendly.url') || '#';
        }
    };

    // Auto-load configuration when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadConfig);
    } else {
        loadConfig();
    }

})();
