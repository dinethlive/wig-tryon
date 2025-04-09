# 💇 Wig Try-On – AI Wig Preview Tool (Phase 1)

A browser-based real-time **virtual wig try-on** tool, allowing users to preview different wigs using their webcam or a photo upload.

This project is the foundation for a more advanced AI-powered Shopify app for custom wig fitting and sales.

---

## 🧪 Live Demo Features (Phase 1)

- 🧍‍♀️ Try on wigs in **real-time using webcam**
- 📤 Upload a photo and preview wigs
- 🎭 Face tracking using **MediaPipe FaceMesh**
- 💇 Overlay realistic wig images onto user’s face
- 🎨 Switch between multiple wig styles
- 📸 Download the final preview image
- ⚙️ Fully **client-side**, no backend required

---

## 🛠️ Tech Stack

| Component        | Tech                                |
|------------------|--------------------------------------|
| Frontend         | HTML, CSS, JavaScript                |
| Face Tracking    | [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh) (WebGL) |
| Image Overlay    | `<canvas>` rendering                 |
| Image Upload     | Native FileReader API                |
| Exporting Image  | `canvas.toDataURL()` + download link |
| Wig Assets       | Transparent PNG wigs (`assets/wigs/`) |

---

## 📂 Project Structure

```
wig-tryon/
├── index.html             # Main app UI
├── style.css              # App styling
├── app.js                 # Logic for camera, overlays, upload, etc.
├── /assets/
│   └── /wigs/             # Wig images (PNG format)
│       ├── wig1.png
│       ├── wig2.png
│       └── wig3.png
└── README.md              # You're here!
```

---

## 🚀 Setup & Run Locally

> This app runs **fully in-browser** — no server needed.

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/wig-tryon.git
   cd wig-tryon
   ```

2. Open `index.html` in any modern browser  
   (or run a live server using VS Code or any local HTTP server)

---

## 🔧 Current Issues & Improvements

### ❗ Current Issues:
- Wig PNGs are sometimes too tall or narrow, resulting in stretched or unnatural appearance
- Wig alignment may slightly shift on fast head movement
- No manual adjustment (drag, scale, rotate) for users
- No AI-based wig fitting or color matching yet
- Not optimized for darker/low-light environments

### 💡 Improvement Ideas:
- Use **wider, properly designed wig images** (1024x768 recommended)
- Implement **proportional scaling** based on image aspect ratio (now done ✅)
- Add **user controls**: move, resize, rotate wig
- Add **face pose detection** to adjust wig rotation slightly
- Integrate **Stable Diffusion / ControlNet** for realistic, AI-generated previews
- Add **Shopify integration** to link selected wigs to store products

---

## 🎯 Next Goals (Phase 2+)

- 🧠 Integrate AI wig fitting and personalization
- 🛍️ Shopify product linking for ecommerce flow
- 🎨 Add wig customizer: length, cap size, color, texture
- 🧑‍🎨 Add face shape detection to recommend best wig
- 💾 Save try-on history (local or cloud-based)
- 📱 Improve mobile UI & rotation support

---

## 📸 Wig Design Tips

- Use **wide, natural-looking wig PNGs**
- Preferred size: `1024x768` or `1200x900` (landscape)
- Wig must have transparent background, centered on the image
- Wig should start near the **top edge** (hairline aligned)

---

## 🙌 Credits

- Built with [MediaPipe](https://google.github.io/mediapipe/)
- Wig overlays generated using DALL·E & custom editing
- Created by [DLabs | Dineth Pramodya](https://dineth.lk)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
