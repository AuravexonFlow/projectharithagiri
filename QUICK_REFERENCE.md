# ️ Quick Reference Card - Harithagiri Viharaya Website

## 🚀 Server Status
✅ **Running**: http://localhost:3001  
✅ **Status**: All systems operational  

---

## 🔗 Important URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | http://localhost:3001 | Landing page with hero section |
| About | http://localhost:3001/about | Temple history & mission |
| Donors | http://localhost:3001/dayaka-sabhawa | Donor list & contributions |
| Chief Incumbent | http://localhost:3001/vihara-adhikari | Head monk profile |
| Buildings | http://localhost:3001/sthana | Temple structures info |
| Events | http://localhost:3001/uthsawa | Festivals & ceremonies |
| Admin Login | http://localhost:3001/admin/login | Secret admin access |
| Admin Dashboard | http://localhost:3001/admin/dashboard | Content management |

---

## 🔐 Admin Access

**URL**: `/admin/login` (no visible button on site)  
**Password**: `harithagiri2026`  

### Admin Features:
- ✅ Add/Edit/Delete Donors
- ✅ Manage Events with YouTube links
- ✅ Update Building Information
- ✅ Session-based authentication

---

##  Images Location

All images in: `/public/images/`

Currently available (13 images):
- stupa-main.jpg, stupa-close.jpg
- elephant-statue.jpg, bodhiya.jpg
- temple-view.jpg, dhamma-hall.jpg, statue-house.jpg
- vesak.jpg, poson.jpg, esala.jpg
- kathina.jpg, newyear.jpg, dhamma-talk.jpg

---

## 🎥 Adding YouTube Videos

1. Upload to YouTube (private/unlisted OK)
2. Get Video ID from URL:
   ```
   https://www.youtube.com/watch?v=VIDEO_ID_HERE
   Use: VIDEO_ID_HERE
   ```
3. In admin panel → Events → Edit event → Paste ID
4. Video plays in custom player on event modal

---

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production
npm start

# Install dependencies
npm install
```

---

## 🎨 Design System

**Colors:**
- Gold: `#D4AF37`
- Green: `#2D5A3D`
- Cream: `#FFF8E7`
- White: `#FFFFFF`

**Font:** Noto Sans Sinhala  
**Framework:** Next.js 14 + Tailwind CSS  

---

## 📱 Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (two columns)
- Desktop: > 1024px (three columns)

---

## 🛠️ Common Tasks

### Add New Donor
1. Login to admin (`/admin/login`)
2. Go to "Donors" tab
3. Fill: Name, Amount, Year
4. Click "Add"

### Add New Event
1. Login to admin
2. Go to "Events" tab
3. Fill: Name, Date, Description, YouTube ID
4. Click "Add"

### Change Admin Password
Edit: `/app/admin/login/page.tsx`  
Find: `const ADMIN_PASSWORD = 'harithagiri2026'`  
Change the value

### Add More Images
1. Copy to `/public/images/`
2. Update image paths in pages
3. Next.js auto-optimizes

---

##  Deployment Steps

1. Replace placeholder content
2. Add real donor/event data
3. Upload actual photos
4. Add YouTube video IDs
5. Update contact info in Footer
6. Change admin password
7. Run: `npm run build`
8. Deploy to Vercel/Netlify/etc.

---

## 📞 Support Files

- `README.md` - Full documentation
- `QUICK_START.md` - Getting started guide
- `PROJECT_SUMMARY.md` - Complete overview
- `FILE_STRUCTURE.md` - Directory tree
- `BUILD_STATUS.md` - Build fixes & status

---

## ✨ Key Features

✅ Modern temple-themed design  
✅ Fully responsive (mobile/tablet/desktop)  
✅ Sinhala language support  
✅ YouTube video integration  
✅ Secret admin panel  
✅ Easy content management  
✅ Fast loading (Next.js 14)  
✅ SEO-friendly structure  

---

## 🎯 Next Steps

1. ✅ View site at http://localhost:3001
2. Test all pages & navigation
3. Access admin panel
4. Replace placeholders with real data
5. Deploy when ready

---

**Built with ❤️ for Harithagiri Viharaya**  
*Last Updated: June 16, 2026*
