# Clinic Configuration System - Refactoring Documentation

## Overview
This document describes the centralized configuration system implemented for the Lumora Dental (Prime Design) website. The system eliminates hardcoded business information and makes the website easily reusable for other dental clinics.

## Architecture

### 1. Central Configuration File
**Location:** `data/clinic-config.json`

This JSON file contains all business information:
- Clinic details (name, description, contact info)
- Dentist profiles
- Services list
- Testimonials
- Statistics
- Branding assets
- Social media links
- Footer copyright info

### 2. Configuration Loader
**Location:** `assets/js/clinic-config.js`

This JavaScript module:
- Loads the configuration file via fetch API
- Exposes a global `ClinicConfig` object
- Provides helper methods for common operations
- Fires a `clinicConfigLoaded` event when ready

**API Methods:**
```javascript
// Wait for config to load
ClinicConfig.onLoad(function(config) {
    // Use config data
});

// Get config value by path
ClinicConfig.get('clinic.businessName');
ClinicConfig.get('clinic.phone');

// Helper functions
ClinicConfig.helpers.getTelLink();
ClinicConfig.helpers.getWhatsAppLink('Custom message');
ClinicConfig.helpers.getEmailLink('Subject');
ClinicConfig.helpers.getCalendlyLink();
```

### 3. Configuration Initializer
**Location:** `assets/js/clinic-config-init.js`

This script automatically updates the DOM when the configuration loads:
- Updates page titles and meta tags
- Replaces business names throughout the page
- Updates contact information (phone, email)
- Updates logos and brand images
- Updates footer copyright
- Maintains the exact UI appearance

## Implementation Details

### What Gets Replaced Automatically

1. **Page Titles & Meta Tags**
   - `<title>` content
   - Meta description tags
   - OpenGraph and Twitter card tags

2. **Business Name**
   - All instances of "Prime Design" or "Lumora Dental"
   - Logo alt text

3. **Contact Information**
   - Email addresses: `hello@primedesign.com` → config value
   - Phone numbers: `+91 93007512816` → config value
   - WhatsApp links
   - Tel: links

4. **Branding Assets**
   - Logo images
   - Favicon
   - Apple touch icon
   - OG images

5. **Footer**
   - Copyright text
   - "Crafted by" attribution

### How It Works

1. **Page Load Sequence:**
   ```
   HTML loads
   ↓
   clinic-config.js loads config file
   ↓
   'clinicConfigLoaded' event fires
   ↓
   clinic-config-init.js updates DOM
   ↓
   Page displays with configured data
   ```

2. **No UI Changes:** The system only replaces text and attribute values. All CSS, animations, and layout remain identical.

3. **Performance:** Config loads asynchronously. A brief moment may show original values before replacement (typically <100ms).

## Files Modified

### Main Directory
- ✅ index.html
- ✅ about.html
- ✅ service.html
- ✅ blog.html
- ✅ privacy.html
- ✅ terms.html
- ✅ cookies.html
- ✅ licenses.html
- ✅ 404.html

### Variant Blue Directory
- ✅ variant-blue/index.html
- ✅ variant-blue/about.html
- ✅ variant-blue/service.html
- ✅ variant-blue/blog.html
- ✅ variant-blue/privacy.html
- ✅ variant-blue/terms.html
- ✅ variant-blue/cookies.html
- ✅ variant-blue/licenses.html
- ✅ variant-blue/404.html

All files now include:
```html
<script src="assets/js/clinic-config.js"></script>
<script src="assets/js/clinic-config-init.js"></script>
```

## Customization Guide

### To Rebrand for a New Clinic

1. **Update Configuration File:**
   Edit `data/clinic-config.json` with new clinic details:
   ```json
   {
     "clinic": {
       "businessName": "New Clinic Name",
       "phone": "+1 (555) 123-4567",
       "email": "contact@newclinic.com",
       ...
     }
   }
   ```

2. **Replace Logo Images (Optional):**
   - Replace `assets/img/lumora-logo-dark.svg`
   - Update path in config file

3. **Test Locally:**
   ```bash
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```

4. **Deploy:**
   All pages will automatically use new configuration

### To Add New Configurable Fields

1. Add field to `data/clinic-config.json`
2. Update `clinic-config-init.js` to handle the new field
3. Or use `ClinicConfig.get()` in custom scripts

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ ES6 features used (fetch, arrow functions, template literals)
- ⚠️ IE11: Not supported (uses fetch API)

## Testing Checklist

- [ ] Business name appears correctly on all pages
- [ ] Phone numbers link to correct tel: URLs
- [ ] Email addresses link to correct mailto: URLs
- [ ] WhatsApp links work with correct number
- [ ] Logos display correctly
- [ ] Footer copyright shows correct year and text
- [ ] Meta tags contain correct information
- [ ] Page titles are correct
- [ ] No console errors
- [ ] UI/design unchanged from original

## Troubleshooting

### Config not loading
- Check browser console for errors
- Verify `data/clinic-config.json` exists and is valid JSON
- Check network tab: config file should load with 200 status

### Values not updating
- Verify `clinicConfigLoaded` event fires (check console)
- Check that scripts load in correct order (config.js before config-init.js)

### CORS errors during local testing
- Use local web server (python http.server)
- Don't open HTML files directly (file://)

## Future Enhancements

Potential additions:
- [ ] Support for multiple languages
- [ ] Theme/color customization via config
- [ ] Admin panel for editing config
- [ ] Automatic form submission endpoints configuration
- [ ] Multi-location support (multiple clinic addresses)

## Maintenance Notes

- Config file is shared between main and variant-blue directories
- To have different configs per variant, create separate config files
- All hardcoded values have been preserved in the original HTML (backwards compatible)
- The system augments existing HTML rather than replacing it

## Benefits

1. **Reusability:** Easy to rebrand for different clinics
2. **Maintainability:** Single source of truth for business data
3. **Consistency:** All pages use same information
4. **No Build Step:** Pure JavaScript, works immediately
5. **Non-invasive:** Original HTML remains intact

## Version History

- **v1.0** (2026-09-05): Initial implementation
  - Central config file created
  - Auto-replacement system implemented
  - All 18 HTML files updated

---

**Created:** September 5, 2026  
**Author:** AI Assistant (Kiro)  
**Contact:** primecommercewebdevelopment@gmail.com
