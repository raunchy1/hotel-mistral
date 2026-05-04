# HOTEL MISTRAL — Website Architecture

## SYSTEM OVERVIEW

**Agent 1** extracted real data from Booking.com, TripAdvisor, and hotelmistral.it  
**Agent 2** structured it into website-ready content  
**Agent 3** defined editorial visual hierarchy and emotional pacing  
**Agent 4** builds production-ready code

---

## CREATIVE DIRECTION (Agent 3)

### Emotional Arc
1. **Calm** (hero — breathe)
2. **Trust** (intro + about — who we are)
3. **Desire** (rooms + experience — what you get)
4. **Proof** (reviews + location — others love it)
5. **Action** (CTAs — book now)

### Visual Hierarchy
- **Primary**: Typography (Playfair Display headlines)
- **Secondary**: Whitespace (generous padding, never crowded)
- **Tertiary**: Photography (full-bleed heroes, editorial grids)
- **Accent**: Muted green dots and subtle lines (never decorative noise)

### Section Pacing
- Hero: 100vh, cinematic, no clutter
- Content sections: py-24 to py-36 (96px–144px)
- Dark sections used sparingly for contrast (amenities, Alghero vibe)
- Sand (#F5F0E8) used as section separator, never background for text-heavy content

### Typography Scale
- Hero: clamp(2.25rem, 10vw, 5.5rem)
- H2: 3rem → 5rem
- H3: 1.25rem → 1.5rem
- Body: 0.9375rem → 1.125rem
- Labels: 0.6875rem, tracking 0.18em, uppercase

---

## CONTENT ARCHITECTURE (Agent 2)

### HOME (index.html)
| Section | Content Source | Purpose |
|---------|---------------|---------|
| Nav | Global | Always accessible, transparent→white on scroll |
| Hero | Creative headline + location | Emotional hook, immediate calm |
| Intro | Hotel.description (shortened) + story | Build trust, set expectations |
| Rooms Preview | rooms[0..3] cards | Show variety, link to detail |
| Experience Preview | breakfast + 3 amenities | Desire — the lifestyle |
| Amenities | amenities.property_wide | Proof of value, dark contrast |
| Testimonials | reviews[0,1,2] | Social proof, human voice |
| CTA | Booking.com link | Conversion |
| Footer | Global | Navigation + contact |

### ROOMS (rooms.html)
| Section | Content Source |
|---------|---------------|
| Header | rooms array summary |
| Double Room | rooms[0] full detail |
| Single Room | rooms[1] full detail (reversed layout) |
| Twin Room | rooms[2] full detail |
| Standard Double | rooms[3] full detail (reversed layout) |
| Room Summary | amenities.in_every_room |
| CTA | Booking.com |

### EXPERIENCE (experience.html)
| Section | Content Source |
|---------|---------------|
| Header | Creative headline |
| Breakfast | breakfast object + highlights |
| Garden | amenities.property_wide[garden] |
| Atmosphere | billiard + bar (2-col) |
| Alghero Vibe | location.description + nearby_attractions |
| CTA | Booking.com |

### ABOUT (about.html)
| Section | Content Source |
|---------|---------------|
| Header | Story hook |
| Story | Hotel.founded_year + narrative |
| Philosophy | 3 principles (simplicity, consistency, warmth) |
| Team | Family + staff |
| CTA | Booking.com |

### LOCATION (location.html)
| Section | Content Source |
|---------|---------------|
| Header | Location proposition |
| Address | Hotel.location + transport |
| Distances | location.distances (4 key stats) |
| Nearby | nearby_attractions (4 cards) |
| Transport | transport.by_car / by_public_transport |
| CTA | Booking.com |

### CONTACT (contact.html)
| Section | Content Source |
|---------|---------------|
| Header | Invitation |
| Form | Contact form (name, email, subject, message) |
| Info | Address, phone, email, hours |
| Quick Info | policies (6 FAQs) |
| CTA | Booking.com + email |

---

## TECHNICAL SPEC

- HTML5 semantic elements
- Tailwind CSS via CDN
- Custom CSS in css/styles.css for editorial effects
- Vanilla JS in js/main.js (nav scroll, mobile menu, IntersectionObserver reveals, parallax)
- No external dependencies except Google Fonts and Tailwind CDN
- All images as described placeholders with data-label attributes
