# Three-Minute Customization

1. Open `src/App.jsx` and edit only the clearly marked business configuration section at the top.
2. Change `BUSINESS_NAME`, phone details, WhatsApp number, location, email, and social links.
3. Replace the hero image by adding `public/hero.jpg`, or change `BUSINESS.heroImage` to another path or URL.
4. Add project images to `public/gallery/`, then update `LOCAL_GALLERY_IMAGES` with paths such as `/gallery/project-1.jpg`.
5. Run `npm run build` to confirm the customized website compiles.
6. Deploy the generated production build from `dist/`.

Every business-name occurrence in the site reads from `BUSINESS_NAME` or `BUSINESS.name`, including the navigation, hero typography, document title, footer, WhatsApp messages, metadata, and structured data.
