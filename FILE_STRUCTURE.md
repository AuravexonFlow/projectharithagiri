#  Project File Structure

## Complete Directory Tree

```
harithagiri-viharaya/
│
├── app/
│   ├── page.tsx                    # Landing page (Home)
│   ├── layout.tsx                  # Root layout with Navbar & Footer
│   ├── globals.css                 # Global styles & Tailwind imports
│   │
│   ├── about/
│   │   └── page.tsx                # About page
│   │
│   ├── dayaka-sabhawa/
│   │   ── page.tsx                # Donors Council page
│   │
│   ├── vihara-adhikari/
│   │   ── page.tsx                # Chief Incumbent page
│   │
│   ├── sthana/
│   │   └── page.tsx                # Temple Buildings page
│   │
│   ├── uthsawa/
│   │   └── page.tsx                # Events/Festivals page
│   │
│   └── admin/
│       ├── login/
│       │   └── page.tsx            # Secret admin login page
│       │
│       └── dashboard/
│           └── page.tsx            # Admin management dashboard
│
├── components/
│   ├── Navbar.tsx                  # Navigation component
│   └── Footer.tsx                  # Footer component
│
├── public/
│   └── images/                     # All temple images
│       ├── stupa-main.jpg          # Main stupa hero image
│       ├── stupa-close.jpg         # Close-up of stupa
│       ├── elephant-statue.jpg     # Elephant statue with Buddha
│       ├── bodhiya.jpg             # Sacred Bodhi tree
│       ├── temple-view.jpg         # Temple overview
│       ├── dhamma-hall.jpg         # Dhamma hall
│       ├── statue-house.jpg        # Statue house
│       ├── vesak.jpg               # Vesak festival
│       ├── poson.jpg               # Poson festival
│       ├── esala.jpg               # Esala Perahera
│       ├── kathina.jpg             # Kathina ceremony
│       ├── newyear.jpg             # New Year celebration
│       └── dhamma-talk.jpg         # Dhamma talks
│
├── node_modules/                   # Dependencies (auto-generated)
│
├── .gitignore                      # Git ignore rules
├── next.config.js                  # Next.js configuration
├── package.json                    # Project dependencies & scripts
├── package-lock.json               # Locked dependency versions
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
│
├── README.md                       # Full project documentation
├── QUICK_START.md                  # Quick start guide
├── BUILD_STATUS.md                 # Build status & fixes
├── PROJECT_SUMMARY.md              # Comprehensive project summary
└── FILE_STRUCTURE.md               # This file
```

---

## 📄 Key Files Explained

### Configuration Files

**`next.config.js`**
- Next.js configuration
- Image optimization settings
- YouTube remote patterns for videos

**`tailwind.config.ts`**
- Custom color palette (temple gold, green, cream)
- Font family configuration (Noto Sans Sinhala)
- Theme extensions

**`postcss.config.mjs`**
- PostCSS plugins configuration
- Tailwind CSS integration

**`tsconfig.json`**
- TypeScript compiler options
- Path aliases (@/*)
- Strict mode settings

**`package.json`**
- Project metadata
- Dependencies list
- Development scripts
- Version information

### Core Application Files

**`app/layout.tsx`**
- Root layout component
- Wraps all pages with Navbar and Footer
- Sets HTML lang to "si" (Sinhala)
- Defines metadata (title, description)

**`app/globals.css`**
- Global CSS styles
- Tailwind directives
- Custom classes (.stupa-gradient, .card-hover, .video-container)
- Noto Sans Sinhala font import

**`app/page.tsx`**
- Landing/Home page
- Hero section with stupa background
- Introduction cards
- Statistics section
- Call-to-action buttons

### Page Components

**`app/about/page.tsx`**
- Temple history
- Mission and objectives (3 pillars)
- Location information

**`app/dayaka-sabhawa/page.tsx`**
- Donors table
- Contribution amounts
- Year-wise organization
- "Become a Donor" CTA

**`app/vihara-adhikari/page.tsx`**
- Chief incumbent profile
- Photo display
- Biography
- Education & achievements

**`app/sthana/page.tsx`**
- 5 building cards
- Detailed specifications
- Photos and descriptions
- Grid layout

**`app/uthsawa/page.tsx`**
- 6 event cards
- Modal popup on click
- YouTube video player
- Photo gallery
- Interactive UI

### Admin Components

**`app/admin/login/page.tsx`**
- Secret login page
- Password authentication
- Session storage for auth state
- Error handling

**`app/admin/dashboard/page.tsx`**
- Admin management interface
- Three tabs: Donors, Events, Buildings
- CRUD operations
- Tabbed navigation
- Session-based access control

### Shared Components

**`components/Navbar.tsx`**
- Responsive navigation
- Mobile hamburger menu
- Temple logo and name
- Links to all pages
- Sticky header

**`components/Footer.tsx`**
- Contact information
- Social media links
- Copyright notice
- Three-column layout

---

## 🗂️ File Counts

- **Total Pages**: 8
- **Components**: 2
- **Images**: 13
- **Config Files**: 5
- **Documentation**: 4
- **Total Source Files**: ~20

---

## 🔧 How to Modify

### Add New Page
1. Create folder in `/app/[page-name]/`
2. Add `page.tsx` file
3. Update Navbar with link
4. Follow existing page structure

### Add New Component
1. Create file in `/components/[ComponentName].tsx`
2. Export default function
3. Import in pages where needed

### Add New Image
1. Copy to `/public/images/`
2. Use in pages with `<Image src="/images/filename.jpg" />`
3. Next.js auto-optimizes

### Update Styling
1. Edit `/app/globals.css` for global styles
2. Edit `/tailwind.config.ts` for theme colors
3. Use Tailwind classes in components

### Change Admin Password
1. Open `/app/admin/login/page.tsx`
2. Find `ADMIN_PASSWORD` constant
3. Change value
4. Save file

---

## 📊 Code Statistics

- **Largest File**: `app/admin/dashboard/page.tsx` (~366 lines)
- **Smallest File**: `components/Footer.tsx` (~40 lines)
- **Average Page Size**: ~100-150 lines
- **Total Lines of Code**: ~2,000+
- **TypeScript Files**: 10
- **CSS Files**: 1
- **Config Files**: 5

---

##  Entry Points

**Main Application**: `app/layout.tsx` → `app/page.tsx`  
**Admin Panel**: `app/admin/login/page.tsx` → `app/admin/dashboard/page.tsx`  
**Styling**: `app/globals.css` + Tailwind classes  
**Configuration**: `next.config.js`, `tailwind.config.ts`

---

##  Build Output

When you run `npm run build`, Next.js creates:
- `.next/` folder (build artifacts)
- Optimized static files
- Server-side rendered pages
- Image optimizations

This folder is gitignored and regenerated on each build.

---

## 📝 Notes

- All pages use TypeScript (.tsx extension)
- Images are optimized automatically by Next.js
- Client components marked with `'use client'` directive
- Server components by default (no directive needed)
- Responsive design built-in with Tailwind CSS
- All Sinhala text uses Noto Sans Sinhala font

---

**Last Updated**: June 16, 2026  
**Project Status**: ✅ Complete & Running
