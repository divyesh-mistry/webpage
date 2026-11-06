# Dr. Divyesh A. Mistry - Research Portfolio

Public research and professional website for **Dr. Divyesh A. Mistry**, computational materials scientist.

The site presents work across molecular dynamics, discrete dislocation dynamics, fracture and plasticity, advanced structural alloys, high-performance computing, and reproducible research software.

## Website

Production site: `https://divyesh-mistry.github.io/webpage/`

## Main Pages

- `index.html` - professional profile, experience, featured research, education, conference activity, and contact
- `publications.html` - published articles, manuscripts under review, public preprint links, research software, conference contributions, and BibTeX citations
- `ppbDD.html` - research overview for the ASME prior-particle-boundary DDD study
- `polyDDD.html` - overview of the public polycrystalline tungsten DDD workflow

## Professional Documents

- `files/Divyesh_CV.pdf` - existing public curriculum vitae; the CVN supplied for the November 2026 webpage update is a content reference, not a replacement download

## Images and Motion

- `img/research-banner.jpg` - multiscale banner used behind the homepage name
- `img/web/` - resized, compressed copies of the original photographs and publication certificate
- Original photographs are retained in their existing folders.
- Muted simulation previews loop automatically when visible and pause off screen or in a hidden tab. Native controls remain available, manual pause is respected, and reduced-motion preferences disable automatic playback. Videos use `preload="none"` before entering view.
- The pages use system fonts and local CSS/JavaScript without a framework or external icon/font dependencies.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Validation

```bash
python3 tools/check_site.py
```

The audit checks metadata, local links and anchors, assets and video posters, duplicate IDs, main/heading landmarks, accessible label/control references, image alt text and layout dimensions, and safe external-tab attributes. GitHub Actions runs the same check on every push and pull request.

For visual review, check all pages at desktop, tablet, and narrow mobile widths. Exercise the mobile menu with pointer and Escape, each output filter, citation disclosures, and the simulation controls. Navigation and output lists remain available without JavaScript.

Content provenance and publication-status decisions are recorded in `docs/content-sources.md`.

## Author

**Dr. Divyesh A. Mistry**<br>
Professional contact: `d.mistryg@gmail.com`
