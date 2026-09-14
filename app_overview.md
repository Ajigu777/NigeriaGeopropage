# NigeriaGeo Pro

**NigeriaGeo Pro** is a mobile application built with React Native and Expo, designed specifically for geographic and geospatial professionals operating in Nigeria. It provides robust offline coordinate conversion, project management, and mapping visualization tools.

## 🎯 Core Purpose
The primary goal of NigeriaGeo Pro is to facilitate accurate and fast coordinate transformations between global standards (like WGS84) and Nigerian local grid systems (such as the Nigerian Mid Belt, West Belt, and East Belt). It replaces manual conversion workflows with an intuitive, offline-first mobile interface.

---

## ✨ Key Features

### 1. Advanced Coordinate Converter
- **Point-by-Point Conversion:** Quickly transform coordinates between different Coordinate Reference Systems (CRS).
- **Live Validation:** Immediate input validation for format and bounds before conversion.
- **Support for Local CRS:** Built-in support for Nigerian coordinate belts alongside global geographic systems (Latitude/Longitude).

### 2. CSV Batch Processing
- **Bulk Imports:** Users can upload CSV files containing multiple coordinates and convert them simultaneously, vastly speeding up data processing from field surveys.

### 3. Offline Project Management
- **Local Database:** Entirely offline functionality using SQLite.
- **Project Grouping:** Save converted points into designated "Projects" (e.g., "Phase 2 Boundary Survey").
- **Data Export/Copy:** Easily copy results to the clipboard or export them for external reporting.

### 4. Interactive Map Visualization
- **MapLibre Integration:** Utilizes MapLibre React Native for rendering high-performance maps.
- **Visual Previews:** Plot both unsaved preview points (from the converter) and saved project points on the map.
- **Polylines:** Automatically draws dashed lines connecting sequential survey points to visualize boundaries or paths.
- **User Tracking:** Integrates device location services to center the map on the user's current physical position.

### 5. Seamless Onboarding & User Profiles
- New users undergo a quick onboarding flow to set up their profile (Name and Profession).
- State persistence ensures the app remembers user preferences (like the default coordinate belt and decimal places).

---

## 🛠️ Technology Stack

NigeriaGeo Pro leverages a modern React Native ecosystem to deliver a premium user experience:

| Technology | Purpose |
| --- | --- |
| **Expo & React Native** | Core framework for cross-platform mobile development. |
| **Expo Router** | File-based routing for smooth navigation (e.g., Tab navigation, modals). |
| **Expo SQLite** | Local offline database storing user profiles, projects, points, and settings (`src/db/schema.ts`). |
| **MapLibre GL** | High-performance vector maps using `@maplibre/maplibre-react-native` and MapTiler styles. |
| **Reanimated** | `react-native-reanimated` powers the dynamic and fluid UI micro-animations (e.g., sliding action panels, fading lists). |
| **Proj4js** | Underlying library used for accurate geographic projections and coordinate math (`proj4`). |

---

## 📂 Project Structure Highlights

- `src/app/`: Contains the Expo Router file-based screens.
  - `(tabs)/converter.tsx`: The main conversion interface.
  - `(tabs)/map.tsx`: The interactive MapLibre screen.
  - `csv-batch.tsx`: The batch CSV conversion screen.
- `src/db/`: SQLite repository logic and database schemas.
- `src/utils/`: Core math logic, coordinate validators, and CRS definitions (`CRS_LIST`).
- `src/components/ui/`: Reusable, animated UI components maintaining a consistent design system.
