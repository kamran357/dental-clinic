/**
 * Prime Design - Configuration Initialization Script
 * This script automatically replaces hardcoded business data with values from clinic-config.json
 * It runs on every page load and updates the DOM without changing the UI
 */

(function() {
    'use strict';

    // Wait for config to load
    document.addEventListener('clinicConfigLoaded', function(e) {
        const config = e.detail;

        // Update page title
        updatePageTitle(config);

        // Update meta tags
        updateMetaTags(config);

        // Update logos and brand images
        updateBrandImages(config);

        // Update contact information
        updateContactInfo(config);

        // Update footer
        updateFooter(config);

        // Update social links
        updateSocialLinks(config);

        // Update business name throughout
        updateBusinessName(config);

        // Update email addresses
        updateEmailAddresses(config);

        // Update phone numbers
        updatePhoneNumbers(config);

        console.log('✓ Clinic configuration applied successfully');
    });

    function updatePageTitle(config) {
        const title = document.querySelector('title');
        if (title) {
            const currentTitle = title.textContent;
            // Replace "Prime Design" or "Lumora" with config business name
            title.textContent = currentTitle
                .replace(/Prime Design/g, config.clinic.businessName)
                .replace(/Lumora Dental/g, config.clinic.businessName);
        }
    }

    function updateMetaTags(config) {
        // Update description meta tags
        document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach(meta => {
            if (meta.content && meta.content.includes('Prime Design')) {
                meta.content = meta.content.replace(/Prime Design/g, config.clinic.businessName);
            }
        });

        // Update title meta tags
        document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(meta => {
            if (meta.content) {
                meta.content = meta.content.replace(/Prime Design/g, config.clinic.businessName);
            }
        });

        // Update OG image
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage && config.clinic.branding.ogImage) {
            ogImage.content = config.clinic.branding.ogImage;
        }
    }

    function updateBrandImages(config) {
        // Update all logo images
        document.querySelectorAll('img[alt*="Prime Design logo"], img[alt*="Lumora"], img[src*="lumora-logo"]').forEach(img => {
            img.alt = config.clinic.businessName + ' logo';
            if (img.src.includes('lumora-logo-dark')) {
                img.src = config.clinic.branding.logoDark;
            } else if (img.src.includes('lumora-logo')) {
                img.src = config.clinic.branding.logo;
            }
        });

        // Update favicon
        const favicon = document.querySelector('link[rel="shortcut icon"]');
        if (favicon && config.clinic.branding.favicon) {
            favicon.href = config.clinic.branding.favicon;
        }

        // Update apple touch icon
        const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleIcon && config.clinic.branding.webclip) {
            appleIcon.href = config.clinic.branding.webclip;
        }
    }

    function updateContactInfo(config) {
        // Update all email links
        document.querySelectorAll('a[href*="mailto:hello@"]').forEach(link => {
            const currentHref = link.href;
            const subject = currentHref.includes('?subject=') ?
                currentHref.split('?subject=')[1] : '';

            link.href = subject ?
                `mailto:${config.clinic.email}?subject=${subject}` :
                `mailto:${config.clinic.email}`;

            // Update text content if it contains email
            if (link.textContent.includes('@')) {
                link.textContent = config.clinic.email;
            }
        });

        // Update phone links
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.href = `tel:${config.clinic.phone.replace(/\s+/g, '')}`;

            // Update display text if it's showing a phone number
            if (link.textContent.match(/[\+\d\s\(\)-]+/)) {
                link.textContent = config.clinic.phoneDisplay;
            }
        });

        // Update WhatsApp links
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentUrl = new URL(link.href);
            const text = currentUrl.searchParams.get('text') || 'Hello, I would like to book an appointment';
            link.href = `https://wa.me/${config.clinic.whatsapp}?text=${encodeURIComponent(text)}`;
        });
    }

    function updateFooter(config) {
        // Update copyright text
        document.querySelectorAll('.dropdown-info_text, .footer-copyright_text').forEach(el => {
            if (el.textContent.includes('©') || el.textContent.includes('Prime Design')) {
                el.textContent = el.textContent
                    .replace(/© \d{4} Prime Design/g, config.clinic.footer.copyright)
                    .replace(/Prime Design/g, config.clinic.businessName);
            }
        });

        // Update full copyright with "Crafted by"
        document.querySelectorAll('.footer-copyright_text').forEach(el => {
            const text = el.textContent.trim();
            if (text.includes('Crafted by') || text.includes('RapidXAI')) {
                el.textContent = config.clinic.footer.fullCopyright;
            } else if (text.includes('©') && !text.includes('Crafted')) {
                el.textContent = config.clinic.footer.copyright;
            }
        });
    }

    function updateSocialLinks(config) {
        // Note: Social links are placeholders (#), keeping as is
        // In future, could update with config.clinic.socialMedia values
    }

    function updateBusinessName(config) {
        // Update all text nodes containing "Prime Design" (excluding scripts/comments)
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script, style, and already processed nodes
                    if (node.parentElement.tagName === 'SCRIPT' ||
                        node.parentElement.tagName === 'STYLE' ||
                        node.parentElement.tagName === 'NOSCRIPT') {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (node.textContent.includes('Prime Design') ||
                        node.textContent.includes('Lumora Dental')) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToUpdate = [];
        let currentNode;
        while (currentNode = walker.nextNode()) {
            nodesToUpdate.push(currentNode);
        }

        nodesToUpdate.forEach(node => {
            node.textContent = node.textContent
                .replace(/Prime Design/g, config.clinic.businessName)
                .replace(/Lumora Dental/g, config.clinic.businessName);
        });
    }

    function updateEmailAddresses(config) {
        // Update text nodes containing email addresses
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentElement.tagName === 'SCRIPT' ||
                        node.parentElement.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (node.textContent.includes('hello@primedesign.com') ||
                        node.textContent.includes('hello@lumoradental.com')) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToUpdate = [];
        let currentNode;
        while (currentNode = walker.nextNode()) {
            nodesToUpdate.push(currentNode);
        }

        nodesToUpdate.forEach(node => {
            node.textContent = node.textContent
                .replace(/hello@primedesign\.com/g, config.clinic.email)
                .replace(/hello@lumoradental\.com/g, config.clinic.email);
        });
    }

    function updatePhoneNumbers(config) {
        // Update text nodes containing phone numbers
        const phonePattern = /\+91\s*93007512816|\+1\s*\(555\)\s*123-4567/g;

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentElement.tagName === 'SCRIPT' ||
                        node.parentElement.tagName === 'STYLE' ||
                        node.parentElement.tagName === 'A') {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (phonePattern.test(node.textContent)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToUpdate = [];
        let currentNode;
        while (currentNode = walker.nextNode()) {
            nodesToUpdate.push(currentNode);
        }

        nodesToUpdate.forEach(node => {
            node.textContent = node.textContent.replace(phonePattern, config.clinic.phoneDisplay);
        });
    }

})();
