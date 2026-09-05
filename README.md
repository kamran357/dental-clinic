# Dental Clinic Website Template

A modern, fully customizable dental clinic website with centralized configuration system. Built with pure HTML, CSS, and JavaScript - no build process required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🌟 Features

- **Centralized Configuration** - All business information in one JSON file
- **No Build Process** - Pure HTML/CSS/JavaScript, works immediately
- **Easy Rebranding** - Change clinic details by editing one file
- **Dual Color Variants** - Teal and blue themes included
- **Fully Responsive** - Optimized for all devices
- **Professional Animations** - GSAP + Webflow IX2 interactions
- **18 Pages Included** - Home, About, Services, Blog, Legal pages, and more

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dental-clinic.git
cd dental-clinic
```

### 2. Customize Your Clinic Information

Edit `data/clinic-config.json` with your clinic details:

```json
{
  "clinic": {
    "businessName": "Your Clinic Name",
    "phone": "+1 (555) 123-4567",
    "email": "contact@yourclinic.com",
    "address": "123 Main Street",
    "city": "Your City",
    ...
  }
}
```

### 3. Run Locally

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
dental-clinic/
├── index.html                    # Home page
├── about.html                    # About page
├── service.html                  # Services page
├── blog.html                     # Blog page
├── privacy.html                  # Privacy policy
├── terms.html                    # Terms & conditions
├── cookies.html                  # Cookie policy
├── licenses.html                 # Licenses
├── 404.html                      # 404 error page
├── data/
│   └── clinic-config.json        # Central configuration file
├── assets/
│   ├── css/
│   │   └── lumora.css            # Main stylesheet
│   ├── js/
│   │   ├── clinic-config.js      # Configuration loader
│   │   ├── clinic-config-init.js # Auto-replacement engine
│   │   ├── webflow.*.js          # Webflow runtime
│   │   ├── gsap.min.js           # GSAP animation
│   │   └── ScrollTrigger.min.js  # Scroll animations
│   └── img/                      # Images and assets
├── variant-blue/                 # Blue color variant
└── REFACTORING_DOCUMENTATION.md  # Detailed technical docs
```

## 🎨 Customization

### Change Business Information

All business details are in `data/clinic-config.json`:

- Business name and tagline
- Contact information (phone, email, address)
- Opening hours
- Services list
- Dentist profiles
- Testimonials
- Social media links
- Branding assets

The system automatically updates all pages when you modify this file.

### Update Logo & Branding

1. Replace logo files in `assets/img/`:
   - `lumora-logo-dark.svg` (main logo)
   - `favicon.svg` (favicon)
   - `webclip.png` (Apple touch icon)

2. Update paths in `clinic-config.json`:

```json
"branding": {
  "logo": "assets/img/your-logo.svg",
  "favicon": "assets/img/your-favicon.svg"
}
```

### Color Variants

- **Main variant** (Teal): Root directory
- **Blue variant**: `variant-blue/` directory

Both share the same configuration file.

## 📋 Configuration Options

### Clinic Information
```json
{
  "businessName": "Your Clinic Name",
  "tagline": "Your Tagline",
  "description": "Your description",
  "phone": "+1 (555) 123-4567",
  "email": "contact@clinic.com",
  "address": "123 Main Street",
  "city": "Your City"
}
```

### Services
```json
{
  "services": [
    {
      "name": "Service Name",
      "description": "Service description",
      "icon": "🦷"
    }
  ]
}
```

### Dentist Profiles
```json
{
  "dentists": [
    {
      "name": "Dr. Name",
      "title": "Specialty",
      "yearsOfExperience": 10,
      "bio": "Bio text"
    }
  ]
}
```

See `REFACTORING_DOCUMENTATION.md` for complete configuration reference.

## 🌐 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select branch: `main` / `master`
4. Click Save

Your site will be live at `https://username.github.io/dental-clinic`

### Netlify

```bash
# Drag and drop the folder to Netlify
# Or connect your GitHub repository
```

### Vercel

```bash
vercel
```

### Traditional Hosting

Upload all files via FTP to your web host.

## 🔧 Technical Details

- **No Framework Required** - Pure HTML, CSS, JavaScript
- **Configuration System** - JSON-based, auto-updates DOM
- **Animations** - GSAP 3.x + ScrollTrigger + Webflow IX2
- **Fonts** - Sora (Google Fonts)
- **Browser Support** - Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Responsive** - Fully optimized for all screen sizes

## 📖 Documentation

- **[REFACTORING_DOCUMENTATION.md](REFACTORING_DOCUMENTATION.md)** - Complete technical documentation
- **[CLAUDE.md](CLAUDE.md)** - Project notes and development history
- **[CLONE_AND_DEPLOY.md](CLONE_AND_DEPLOY.md)** - Deployment instructions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 💼 Credits

- **Original Template**: De-branded Webflow template
- **Refactoring & Configuration System**: AI-powered development
- **AI Images**: Generated with Magnific AI
- **Animations**: GSAP + Webflow IX2

## 📞 Support

For questions or issues, please contact:
- Email: primecommercewebdevelopment@gmail.com
- Create an issue on GitHub

---

**Version:** 1.0.0  
**Last Updated:** September 5, 2026  
**Status:** Production Ready ✅

Made with ❤️ for dental professionals worldwide
