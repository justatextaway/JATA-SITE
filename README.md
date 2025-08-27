# Just a Text Away (JATA-SITE)

A teen-led support platform providing peer support, academic assistance, and protection from harassment. Compassion on standby— always just a text away.

## 🌟 Features

- **Peer Support Platform**: Safe space for teens to seek help and guidance
- **Academic Assistance**: Connect with experts for scholarships, tests, and personal growth
- **Harassment Protection**: Support for reporting and documenting incidents
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Contact Form**: Integrated feedback system with email notifications

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: CSS Custom Properties (Variables), Flexbox, Grid
- **Icons**: Font Awesome 6.5.0
- **Typography**: Google Fonts (Poppins)
- **Backend**: Node.js with Nodemailer for email handling
- **Deployment**: Vercel Serverless Functions (or similar platform)

## 📁 Project Structure

```
JATA-SITE-main/
├── api/
│   └── feedback.js          # Email API endpoint
├── pics/                    # Image assets
│   ├── logo.png
│   ├── team-photos/
│   └── backgrounds/
├── index.html              # Homepage
├── team.html               # Team page
├── updates-and-blogs.html  # Updates and blog posts
├── forum.html              # Contact/feedback form
├── style.css               # Main stylesheet
├── script.js               # JavaScript functionality
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/arya-codess/JATA-SITE.git
   cd JATA-SITE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   ADMIN_EMAIL=your-email@gmail.com
   ADMIN_PASS=your-gmail-app-password
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   This will start a local server at `http://localhost:3000`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ADMIN_EMAIL` | Gmail address to receive feedback | Yes |
| `ADMIN_PASS` | Gmail app password or account password | Yes |

**Note**: For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password instead of your regular password

## 🎨 Design System

### Color Palette
- **Primary**: `#6E2E2E` (Dark Maroon)
- **Secondary**: `#A17258` (Brown)
- **Accent**: `#D4A574` (Light Brown)
- **Background**: `#F5F0E6` (Beige)
- **Card Background**: `#FFF8F0` (Light Beige)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Base Size**: 16px (1rem)

### Spacing Scale
- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- **Mobile Navigation**: Hamburger menu with slide-out navigation
- **Responsive Grids**: Flexible layouts that adapt to screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Alt Text**: Descriptive alt text for all images
- **Form Labels**: Associated labels for all form inputs

## 🔧 API Endpoints

### POST `/api/feedback`

Handles feedback form submissions and sends emails.

**Request Body:**
```json
{
  "name": "Optional Name",
  "message": "Required message content"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback sent successfully"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel Project Settings → Environment Variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASS`
3. Framework Preset: "Other" (static)
4. Build Command: None
5. Output Directory: `.`
6. Deploy

### Other Platforms

The site can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📝 Content Management

### Adding Team Members

1. Add photo to `pics/` directory
2. Update `team.html` with new member information
3. Ensure proper alt text for accessibility

### Blog Posts & Updates

1. Create new HTML files for blog posts
2. Update `updates-and-blogs.html` with new content
3. Follow the existing card structure

### Updating Information

- **Contact Details**: Update footer links and email addresses
- **Team Information**: Modify `team.html` as needed
- **Mission Statement**: Update content in `index.html`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Navigation works on all devices
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Links work as expected
- [ ] Responsive design on different screen sizes
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Considerations

- **Environment Variables**: Never commit sensitive data
- **Input Validation**: All form inputs are validated
- **CORS**: Proper CORS headers for API requests
- **Rate Limiting**: Consider implementing rate limiting for production
- **HTTPS**: Always use HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Use semantic HTML5 elements
- Follow CSS naming conventions (BEM methodology)
- Write clean, documented JavaScript
- Ensure accessibility compliance
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

- **Email**: justatextaway.org@gmail.com
- **Instagram**: [@justatextaway_](https://www.instagram.com/justatextaway_/)
- **Linktree**: [justatextaway](https://linktr.ee/justatextaway)

## 🙏 Acknowledgments

- Built by teens, for teens
- Special thanks to all contributors and supporters
- Inspired by the need for accessible teen mental health support

---

**Remember**: This platform is designed to provide support and guidance. For emergency situations, please contact appropriate emergency services or mental health professionals.

*Last updated: January 2025*
