# Solunar Energy

Solar energy company website built with **React 18 + Vite + Tailwind CSS + Supabase**.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Opens at **http://localhost:5173**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Routing | React Router v6 |
| Data fetching | TanStack React Query |
| Animation | Framer Motion |
| Payments (optional) | Stripe |

## Project Structure

```
solunar-energy/
├── .env                          # Supabase credentials
├── index.html                    # HTML entry point with SEO meta tags
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite config with path aliases
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
├── jsconfig.json                 # JS path aliases (@/ = src/)
├── eslint.config.js              # Linter config
├── components.json               # shadcn/ui config
│
├── supabase/
│   └── migrations/
│       └── 001_create_tables.sql  # DB schema: all 7 tables
│
├── entities/                     # Data model schemas (reference only)
│   ├── BlogPost                  # Blog articles
│   ├── ContactInfo               # Company contact details
│   ├── CustomerReview            # Testimonials
│   ├── Product                   # Store products
│   ├── QuoteRequest              # Quote inquiry form submissions
│   ├── Service                   # Services offered
│   └── SolarPackage              # Pre-configured solar packages
│
└── src/
    ├── main.jsx                  # App entry point
    ├── index.css                 # Global CSS + Tailwind directives
    ├── App.jsx                   # Root: providers, routing, auth gating
    │
    ├── lib/
    │   ├── db.js                 # Database adapter (maps all calls to Supabase)
    │   ├── supabase.js           # Supabase client initialization
    │   ├── AuthContext.jsx        # Auth state management (fully local)
    │   ├── cart-context.jsx       # Shopping cart state (localStorage)
    │   ├── query-client.js        # TanStack Query client setup
    │   ├── utils.js              # cn() utility for Tailwind merging
    │   └── PageNotFound.jsx       # 404 page
    │
    ├── pages/
    │   ├── Home.jsx              # Home page (composes all sections)
    │   ├── Store.jsx             # Solar products store with cart
    │   ├── BlogPost.jsx          # Single blog post page (by slug)
    │   ├── Admin.jsx             # Admin panel (CRUD for all entities)
    │   ├── Login.jsx             # Login form
    │   ├── Register.jsx          # Registration with OTP verification
    │   ├── ForgotPassword.jsx    # Password reset request
    │   └── ResetPassword.jsx     # Password reset form
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx        # Top navigation bar
    │   │   ├── Footer.jsx        # Site footer with contact info
    │   │   └── WhatsAppButton.jsx # Floating WhatsApp chat button
    │   │
    │   ├── home/                 # Home page sections
    │   │   ├── HeroSection.jsx   # Hero banner
    │   │   ├── AboutSection.jsx  # About the company
    │   │   ├── ServicesSection.jsx  # Services grid (from DB)
    │   │   ├── PackagesSection.jsx  # Solar packages (from DB)
    │   │   ├── WhyUsSection.jsx  # Why choose us
    │   │   ├── ReviewsSection.jsx   # Customer reviews (from DB + form)
    │   │   ├── QuoteSection.jsx  # Multi-step quote request form
    │   │   ├── BlogSection.jsx   # Blog previews (from DB)
    │   │   ├── StorePreviewSection.jsx  # Store products preview
    │   │   └── ContactSection.jsx  # Contact info & CTA
    │   │
    │   ├── store/
    │   │   ├── ProductCard.jsx   # Product card component
    │   │   └── CartDrawer.jsx    # Slide-out cart drawer
    │   │
    │   ├── ui/                   # shadcn/ui components (in use)
    │   │   ├── button.jsx
    │   │   ├── input.jsx
    │   │   ├── label.jsx
    │   │   ├── input-otp.jsx
    │   │   ├── sheet.jsx
    │   │   ├── toast.jsx
    │   │   ├── toaster.jsx
    │   │   └── use-toast.jsx
    │   │
    │   ├── AuthLayout.jsx        # Auth page layout wrapper
    │   ├── GoogleIcon.jsx        # Google logo SVG
    │   └── UserNotRegisteredError.jsx  # Auth error display
    │
    └── hooks/
        └── (none currently)
```

## pages/

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with all sections (hero, services, packages, reviews, quote form, blog, contact) |
| Store | `/store` | Product listing with category filters + cart |
| Admin | `/admin` | Full CRUD for quotes, products, services, packages, reviews, blog |
| Login | `/login` | Email/password login + Google OAuth |
| Register | `/register` | Sign up with email verification (OTP) |
| ForgotPassword | `/forgot-password` | Request password reset email |
| ResetPassword | `/reset-password?token=...` | Set new password |
| BlogPost | `/blog/:slug` | Single blog article (renders markdown) |
| 404 | `*` | Page not found |

## Database

7 Supabase tables, seeded with sample data:

| Table | Content |
|---|---|
| `services` | 6 services (Solar Installation, Batteries, Net Metering, etc.) |
| `solar_packages` | 5 packages (3kW Starter → 20kW+ Enterprise) |
| `blog_posts` | 3 articles |
| `customer_reviews` | 4 approved testimonials |
| `products` | (empty — add your own) |
| `quote_requests` | (empty — populated by form submissions) |
| `contact_infos` | (empty — add your company info) |

### Connecting to DB directly

```bash
PGPASSWORD="LPqYiLEtrs8Ea2Qp" psql \
  -h aws-1-ap-south-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.qzhrgvadbqdsxvqhoamr
```

## Scripts

```bash
npm run dev        # Start dev server (hot reload)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Auto-fix lint issues
npm run typecheck  # TypeScript type checking
```

## Customization

### Changing the WhatsApp number

Update it in these files:
- `src/components/layout/WhatsAppButton.jsx` — floating button
- `src/components/home/ContactSection.jsx` — contact info display
- `src/components/home/PackagesSection.jsx` — "Get Price" links
- `src/components/layout/Navbar.jsx` — phone link
- `src/components/layout/Footer.jsx` — phone link

### Changing email / contact info

Edit the `ContactSection.jsx` and `Footer.jsx` components.

### Adding admin users

Use Supabase Dashboard → Authentication → Users to create users. Then in the SQL Editor:
```sql
UPDATE auth.users SET raw_user_meta_data =
  raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

## Base44 Removal

This project was originally exported from base44. All base44 dependencies have been removed:
- `@base44/sdk` and `@base44/vite-plugin` uninstalled
- Custom `db.js` adapter replaces the base44 SDK
- Auth is handled by Supabase Auth instead of base44 auth
- All mock/fallback code cleaned up
