#!/bin/bash
# Script to inject clinic configuration system into all HTML files
# This adds the config loader scripts to the <head> section of each page

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Configuration scripts to inject (relative paths)
CONFIG_LOADER='<script src="assets/js/clinic-config.js"></script>'
CONFIG_INIT='<script src="assets/js/clinic-config-init.js"></script>'

# Injection point: just before </head>
INJECTION_MARKER='</head>'

# HTML files to process (main directory)
HTML_FILES=(
    "index.html"
    "about.html"
    "service.html"
    "blog.html"
    "privacy.html"
    "terms.html"
    "cookies.html"
    "licenses.html"
    "404.html"
)

# Variant blue files
VARIANT_BLUE_FILES=(
    "variant-blue/index.html"
    "variant-blue/about.html"
    "variant-blue/service.html"
    "variant-blue/blog.html"
    "variant-blue/privacy.html"
    "variant-blue/terms.html"
    "variant-blue/cookies.html"
    "variant-blue/licenses.html"
    "variant-blue/404.html"
)

echo "🚀 Injecting clinic configuration system..."

# Function to inject scripts before </head>
inject_config_scripts() {
    local file="$1"
    local temp_file="${file}.tmp"

    # Check if file already has the config scripts
    if grep -q "clinic-config.js" "$file" 2>/dev/null; then
        echo "   ⏭️  Skipping $file (already has config scripts)"
        return
    fi

    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "   ❌ File not found: $file"
        return
    fi

    # Inject scripts before </head>
    sed "s|${INJECTION_MARKER}|    ${CONFIG_LOADER}\n    ${CONFIG_INIT}\n${INJECTION_MARKER}|" "$file" > "$temp_file"

    # Replace original file
    mv "$temp_file" "$file"

    echo "   ✅ Injected config system into $file"
}

# Process main directory HTML files
echo ""
echo "📁 Processing main directory files..."
for file in "${HTML_FILES[@]}"; do
    inject_config_scripts "$file"
done

# Process variant-blue directory HTML files
echo ""
echo "📁 Processing variant-blue directory files..."
for file in "${VARIANT_BLUE_FILES[@]}"; do
    inject_config_scripts "$file"
done

echo ""
echo "✨ Configuration system injection complete!"
echo ""
echo "📋 Summary:"
echo "   - Configuration file: data/clinic-config.json"
echo "   - Loader script: assets/js/clinic-config.js"
echo "   - Init script: assets/js/clinic-config-init.js"
echo ""
echo "🔧 Next steps:"
echo "   1. Review data/clinic-config.json and update with actual clinic data"
echo "   2. Test pages locally to ensure configuration loads correctly"
echo "   3. Update variant-blue config path if needed (currently shares main config)"
echo ""
