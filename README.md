# හරිතගිරි විහාරය - Harithagiri Viharaya Website

A modern, responsive website for **Harithagiri Viharaya** temple in Haritha Gama, Sri Lanka.

## 🌟 Features

- **Landing Page** - Beautiful hero section with stupa imagery
- **About Page** (පිළිබඳව) - Temple history and mission
- **Donors Council** (දායක සභාව) - List of temple donors
- **Chief Incumbent** (විහාරාධිපති) - Profile of the head monk
- **Temple Buildings** (ස්ථාන) - Detailed information about stupa, bodhiya, and other structures
- **Events/Festivals** (ත්සව) - Event cards with YouTube video integration
- **Admin Panel** - Secret URL access for managing all content

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **Styling**: Tailwind CSS with custom theme
- **Fonts**: Noto Sans Sinhala for proper Sinhala rendering
- **Video**: YouTube iframe API integration
- **Images**: Optimized with next/image

##  Project Structure

```
harithagiri-viharaya/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with Navbar & Footer
│   ├── globals.css           # Global styles
│   ├── about/page.tsx        # About page
│   ├── dayaka-sabhawa/page.tsx    # Donors page
│   ├── vihara-adhikari/page.tsx   # Chief Incumbent page
│   ├── sthana/page.tsx       # Temple buildings page
│   ├── uthsawa/page.tsx      # Events page
│   └── admin/
│       ├── login/page.tsx    # Secret admin login
│       └── dashboard/page.tsx # Admin management panel
├── components/
│   ├── Navbar.tsx            # Navigation component
│   └── Footer.tsx            # Footer component
├── public/
│   └── images/               # Temple images
├── tailwind.config.ts        # Tailwind configuration
└── next.config.js            # Next.js configuration
```

## 🎨 Design System

### Colors
- **Gold**: `#D4AF37` - Primary accent color
- **Green**: `#2D5A3D` - Primary brand color
- **Cream**: `#FFF8E7` - Background color
- **White**: `#FFFFFF` - Cards and sections

### Typography
- **Font Family**: Noto Sans Sinhala
- **Language**: Sinhala (si)

##  Admin Access

The admin panel is accessible via a **secret URL**:
```
/admin/login
```

**Default Password**: `harithagiri2026`

### Admin Features
- ✅ Add/Edit/Delete Donors
- ✅ Manage Events with YouTube links
- ✅ Update Building Information
- ✅ Session-based authentication

## 📸 Images

All images are sourced from the `Harithagama` folder and optimized for web use. The following images are used:

- `stupa-main.jpg` - Main stupa hero image
- `stupa-close.jpg` - Close-up of the stupa
- `elephant-statue.jpg` - Elephant statue with Buddha
- `bodhiya.jpg` - Sacred Bodhi tree
- Additional placeholder images for events and buildings

## 🎥 YouTube Integration

Events can include YouTube videos by providing the **YouTube Video ID**. The system supports:
- Private/unlisted YouTube videos
- Custom video player embedded in event modal
- Automatic thumbnail generation

**Example**: For URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, use ID: `dQw4w9WgXcQ`

## 🛠️ Installation

```bash
# Navigate to project directory
cd harithagiri-viharaya

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Pages Overview

### 1. Landing Page (/)
- Hero section with stupa background
- Introduction cards
- Quick statistics
- Call-to-action buttons

### 2. About (/about)
- Temple history
- Mission and objectives
- Location information

### 3. Donors Council (/dayaka-sabhawa)
- Table of donors with contributions
- Year-wise filtering
- Add new donor functionality (admin)

### 4. Chief Incumbent (/vihara-adhikari)
- Photo and biography
- Education and achievements
- Contact information

### 5. Temple Buildings (/sthana)
- Card-based layout for each building
- Detailed specifications
- Photos and descriptions

### 6. Events (/uthsawa)
- Event cards grid
- Modal with full details
- YouTube video player
- Photo gallery

### 7. Admin Panel (/admin/login → /admin/dashboard)
- Secure login with password
- CRUD operations for all content
- Tabbed interface for different sections

##  Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices
- 📲 Tablets
-  Desktops

## 🔧 Customization

### Adding New Events
1. Login to admin panel
2. Navigate to "Events" tab
3. Fill in event details
4. Add YouTube Video ID (optional)
5. Click "Add"

### Updating Donors
1. Login to admin panel
2. Navigate to "Donors" tab
3. Add new donor or delete existing ones
4. Changes reflect immediately on the donors page

### Managing Buildings
1. Login to admin panel
2. Navigate to "Buildings" tab
3. Add/edit building information
4. Include height, year built, and description

##  Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 📝 Notes

- All content is currently stored in-memory (client-side state)
- For production, consider adding a backend (e.g., Prisma + PostgreSQL)
- Images should be optimized before uploading to production
- YouTube videos should be set to "Unlisted" for privacy

## 🙏 Acknowledgments

This website was created for **Harithagiri Viharaya** to serve the Buddhist community in Haritha Gama and beyond.

##  License

This project is proprietary and intended for use by Harithagiri Viharaya only.

---

**Developed with ❤️ for the Buddhist Community**
