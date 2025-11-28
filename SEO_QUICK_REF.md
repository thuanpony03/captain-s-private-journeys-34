# 🚀 SEO Quick Reference Card

## 📝 Cần Làm Ngay (5 phút)

### 1. Google Analytics Setup
```typescript
// File: /src/pages/Index.tsx
import { initGA } from '@/lib/analytics';

useEffect(() => {
  initGA('G-YOUR-MEASUREMENT-ID'); // 👈 Thay ID này
}, []);
```

### 2. Update Domain (Find & Replace)
```
vinharound.com → yourdomain.com
```
**Trong các files:**
- index.html
- sitemap.xml  
- robots.txt
- SEOHead.tsx

### 3. Update Contact
```typescript
// FloatingZalo.tsx
"https://zalo.me/yourphone" → "https://zalo.me/0901234567"

// index.html (Structured Data)
"telephone": "+84-xxx-xxx-xxx" → "+84-901-234-567"
```

---

## 🔗 Important URLs

| Resource | URL |
|----------|-----|
| Sitemap | `https://yourdomain.com/sitemap.xml` |
| Robots | `https://yourdomain.com/robots.txt` |
| Manifest | `https://yourdomain.com/manifest.json` |

---

## 🧪 Testing URLs

| Tool | Link |
|------|------|
| Rich Results | https://search.google.com/test/rich-results |
| Mobile Test | https://search.google.com/test/mobile-friendly |
| PageSpeed | https://pagespeed.web.dev/ |
| FB Debugger | https://developers.facebook.com/tools/debug/ |
| Twitter Card | https://cards-dev.twitter.com/validator |

---

## 📊 Analytics Events

```typescript
// Form submission
trackFormSubmit('Contact Form');

// Video play
trackVideoPlay('Video Title');

// Zalo click
trackZaloClick();

// Custom event
trackEvent('action', 'category', 'label', value);
```

---

## ✅ Pre-Launch Checklist

- [ ] GA Measurement ID added
- [ ] Domain updated everywhere
- [ ] Contact info updated
- [ ] Favicons created & uploaded
- [ ] Social links updated
- [ ] Test Rich Results ✅
- [ ] Test Mobile-Friendly ✅
- [ ] Test PageSpeed (>80) ✅
- [ ] Submit sitemap to Google

---

## 📈 SEO Score: 74/100

**Technical**: 95 | **On-Page**: 85 | **Mobile**: 90

**Next Goal**: 85/100 (Excellent)

---

## 🎯 Target Keywords

**Primary**: private tour mỹ, private tour úc, vinh around

**Secondary**: du lịch mỹ cao cấp, land cruise, tour xe riêng

---

## 📚 Documentation

- `SEO_SUMMARY.md` - Full overview
- `SEO_SETUP_GUIDE.md` - Detailed setup
- `SEO_CHECKLIST.md` - Complete checklist

---

**Last Updated**: 2025-11-28
