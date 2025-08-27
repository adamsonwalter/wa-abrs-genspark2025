# Retragreen Interactive Presentation App

A highly modular, self-checking React presentation application built for Retragreen's AI-powered HVAC+ solutions. This app is designed to be easily maintainable and extendable without breaking existing functionality.

## Features

### 🎯 Core Features
- **Modular Slide System**: 7 different slide types (Hero, Standard, Feature, Comparison, Demo, Stats, CTA)
- **Self-Checking System**: Automatic validation on load ensures all components work correctly
- **Admin Panel**: Built-in interface for adding/editing slides and customizing appearance
- **Search Functionality**: Quick navigation through slide content
- **Keyboard Navigation**: Full keyboard support for presentation control
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Microinteractions**: Smooth animations and hover effects throughout

### 🛡️ Robustness Features
- **Error Boundaries**: Graceful error handling prevents app crashes
- **Configuration Validation**: Automatic checking of slide structure and content
- **Hot-swappable Content**: Change slides, images, and text without code changes
- **Export/Import Config**: Save and restore presentation configurations

## Quick Start

### Installation

```bash
# Clone or download the repository
cd /home/user/webapp

# Install dependencies
npm install

# Start development server
npm start
```

### Deployment to Netlify

1. **Build the production version:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Method 1: Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Method 2: Use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=build --prod
   ```

## Admin Panel Usage

Press `Alt+A` or click the settings icon to open the Admin Panel.

### Adding a New Slide

1. Open Admin Panel (Alt+A)
2. Go to "Slides" tab
3. Fill in the slide details:
   - Title (required)
   - Subtitle (optional)
   - Content text
   - Select slide type
4. Click "Add Slide"

### Modifying Existing Slides

1. In Admin Panel > Slides tab
2. Click edit icon next to any slide
3. Modify the content
4. Click Save

### Changing Theme Colors

1. Admin Panel > Theme tab
2. Click on color pickers to change:
   - Primary Color (#3F6F29)
   - Secondary Color (#6FAF54)
   - Accent Color (#264E10)

### Updating Footer

1. Admin Panel > Layout tab
2. Modify footer text
3. Changes apply immediately

## Configuration Structure

The app uses a JSON configuration file located at `src/config/presentation.config.json`:

```json
{
  "metadata": {
    "title": "Presentation Title",
    "logo": "URL to logo image"
  },
  "theme": {
    "primaryColor": "#3F6F29",
    "secondaryColor": "#6FAF54",
    "accentColor": "#264E10"
  },
  "slides": [
    {
      "id": "unique-id",
      "type": "slide-type",
      "title": "Slide Title",
      "content": {
        "text": "Main content",
        "bullets": ["Point 1", "Point 2"]
      }
    }
  ]
}
```

## Slide Types

### 1. Hero Slide
- Large title and subtitle
- Featured image/logo
- Call-to-action buttons
- Best for: Opening slides, major sections

### 2. Standard Slide
- Title, subtitle, and body text
- Support for bullet points
- Optional charts/images
- Best for: General content

### 3. Feature Slide
- Grid layout for feature cards
- Icons and descriptions
- Best for: Showcasing capabilities

### 4. Comparison Slide
- Side-by-side comparison table
- Highlighting differences
- Best for: Competitive analysis

### 5. Demo Slide
- Embedded iframe content
- Fullscreen capability
- Best for: Live demonstrations

### 6. Stats Slide
- Large numbers with labels
- Animated counters
- Best for: Key metrics

### 7. CTA Slide
- Prominent call-to-action
- Multiple action buttons
- Best for: Closing slides

## Keyboard Shortcuts

- **Arrow Down / Space**: Next slide
- **Arrow Up**: Previous slide
- **Home**: First slide
- **End**: Last slide
- **Ctrl+F**: Search slides
- **Alt+A**: Admin panel
- **F11**: Fullscreen mode
- **Escape**: Close modals/exit fullscreen

## Customization Guide

### Adding Images

1. Upload image to a hosting service or use base64
2. In Admin Panel, edit slide
3. Add to media field:
```json
"media": {
  "type": "image",
  "src": "IMAGE_URL",
  "alt": "Description"
}
```

### Adding Links

Add to slide actions:
```json
"actions": [
  {
    "text": "Button Text",
    "type": "primary",
    "action": "link",
    "url": "https://example.com"
  }
]
```

### Changing Layouts

Modify in `src/config/presentation.config.json`:
- `layout.type`: "vertical-scroll" (default)
- `layout.showNavigation`: true/false
- `layout.showProgress`: true/false
- `layout.showSlideNumbers`: true/false

## Self-Checking System

The app automatically validates:
- ✅ Configuration structure
- ✅ Slide data integrity
- ✅ Media asset availability
- ✅ Component dependencies
- ✅ Theme consistency
- ✅ Accessibility features

Check console on load for validation results.

## Troubleshooting

### Slide not appearing
1. Check slide has unique `id`
2. Verify `type` is valid
3. Check console for validation errors

### Images not loading
1. Verify image URL is accessible
2. Check CORS settings if external
3. Use base64 for small images

### Changes not saving
1. Ensure valid JSON structure
2. Check browser console for errors
3. Try export/import configuration

## Brand Colors

```css
--primary-color: #3F6F29;    /* Deep Green */
--secondary-color: #6FAF54;  /* Medium Green */
--accent-color: #264E10;     /* Dark Accent */
--light-bg-color: #D8E8C8;   /* Light Background */
```

## Performance Optimization

- Lazy loading for images
- Code splitting for slide components
- Optimized animations (60fps)
- Cached configuration
- Minimal re-renders

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2025 Retragreen - All rights reserved

## Support

For support, email: info@retrageen.com.au

---

Built with React, Tailwind CSS, and Framer Motion
Self-checking architecture ensures reliability and maintainability