# Harithagiri Viharaya Website - Quick Start Guide

## 🎯 What Has Been Created

A complete, modern website for **Harithagiri Viharaya** temple with the following features:

### ✅ Completed Pages

1. **Landing Page** (`/`)
   - Beautiful hero section with stupa imagery
   - Introduction cards linking to other pages
   - Quick statistics (years, donors, events, buildings)
   - Call-to-action buttons

2. **About Page** (`/about`)
   - Temple history section
   - Mission and objectives (3 pillars)
   - Location information

3. **Donors Council** (`/dayaka-sabhawa`)
   - Table displaying donor names and contributions
   - Year-wise organization
   - "Become a Donor" call-to-action

4. **Chief Incumbent** (`/vihara-adhikari`)
   - Large photo display area
   - Biography section
   - Education and achievements
   - Contact information

5. **Temple Buildings** (`/sthana`)
   - 5 building cards (Stupa, Bodhiya, Statue House, Dhamma Hall, Elephant Statue)
   - Detailed specifications for each
   - Photos and descriptions

6. **Events/Festivals** (`/uthsawa`)
   - 6 event cards (Vesak, Poson, Esala Perahera, Kathina, New Year, Dhamma Talks)
   - Click to open modal with full details
   - YouTube video integration
   - Photo gallery support

7. **Admin Panel** (`/admin/login` → `/admin/dashboard`)
   - Secret login page (no visible button on main site)
   - Password: `harithagiri2026`
   - Manage Donors, Events, and Buildings
   - Add/Edit/Delete functionality

## 🚀 How to Use

### For Visitors
1. Open http://localhost:3000 in your browser
2. Navigate using the top menu
3. Click on event cards to see videos and photos
4. All content is in Sinhala language

### For Admin
1. Visit the secret URL: http://localhost:3000/admin/login
2. Enter password: `harithagiri2026`
3. Manage content through the dashboard tabs:
   - **Donors**: Add/remove donors and their contributions
   - **Events**: Add events with YouTube video IDs
   - **Buildings**: Update building information

## 📸 Images Used

Images from the `Harithagama` folder have been copied to `/public/images/`:
- `stupa-main.jpg` - Main stupa (from IMG_20260611_093651.jpg)
- `stupa-close.jpg` - Close-up stupa (from IMG_20260611_093557.jpg)
- `elephant-statue.jpg` - Elephant statue (from IMG_20260611_094034.jpg)
- `bodhiya.jpg` - Bodhi tree (from IMG_20260611_094048.jpg)

You can add more images by:
1. Copying them to `/public/images/`
2. Updating the image paths in the respective page files

## 🎥 Adding YouTube Videos

To add videos to events:

1. Upload video to YouTube (can be private/unlisted)
2. Get the Video ID from the URL:
   - URL: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`
   - Example: For `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, use `dQw4w9WgXcQ`
3. In admin panel, edit the event and paste the Video ID
4. The video will play in a custom player on the event modal

##  Customization Guide

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  temple: {
    gold: '#D4AF37',        // Change this
    green: '#2D5A3D',       // Change this
    cream: '#FFF8E7',       // Change this
  }
}
```

### Add More Donors/Events/Buildings
Use the admin panel at `/admin/login`

### Update Text Content
Edit the respective page files in `/app/[page-name]/page.tsx`

### Add More Images
1. Copy images to `/public/images/`
2. Update image src paths in components
3. Use Next.js Image component for optimization

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Responsive Design

The website is fully responsive:
- Mobile: Single column layout, hamburger menu
- Tablet: Two-column grids
- Desktop: Three-column grids, full navigation

## 🌐 Deployment Checklist

Before deploying to production:

1. [ ] Replace placeholder text with actual content
2. [ ] Add real donor names and amounts
3. [ ] Upload actual event photos
4. [ ] Add real YouTube video IDs
5. [ ] Update contact information in Footer
6. [ ] Change admin password (edit `/app/admin/login/page.tsx`)
7. [ ] Optimize all images
8. [ ] Test all links and functionality
9. [ ] Set up proper domain name
10. [ ] Configure SSL certificate (HTTPS)

## 🛠️ Future Enhancements (Optional)

- Add backend database (Prisma + PostgreSQL)
- User authentication system
- Image upload functionality in admin
- Email notifications for new donations
- Multi-language support (English/Sinhala toggle)
- SEO optimization with meta tags
- Analytics integration (Google Analytics)
- Social media sharing buttons
- Newsletter subscription
- Online donation payment gateway

##  Support

If you need help:
1. Check the README.md file
2. Review the code comments
3. Consult Next.js documentation: https://nextjs.org/docs

##  Key Features Summary

✅ Modern, clean design with temple theme  
✅ Fully responsive (mobile, tablet, desktop)  
✅ Sinhala language support with Noto Sans Sinhala font  
✅ YouTube video integration with custom player  
✅ Secret admin panel (no visible button)  
✅ CRUD operations for all content  
✅ Card-based layouts with hover effects  
✅ Modal popups for event details  
✅ Optimized images with next/image  
✅ Fast loading with Next.js 14  

---

**Website is now ready!** 🎉

Click the preview button above to view the live website at http://localhost:3000
