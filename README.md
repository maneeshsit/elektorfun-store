# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7ba7ba27-a35a-4d76-83a3-e5c96da23c09

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7ba7ba27-a35a-4d76-83a3-e5c96da23c09) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7ba7ba27-a35a-4d76-83a3-e5c96da23c09) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

## Executive Summary
**Goal:** Transform the existing Elektorfun Store web application into a Progressive Web App (PWA) and a native
mobile application (Android/iOS) using a hybrid development approach to maximize code reusability.
**Recommended Approach:** **React (Web) + Capacitor (Mobile Wrapper) + Ionic (UI Components).**

---

## Phase 1: Audit & Discovery (Week 1)

Before writing new code, we must understand the current architecture of the `elektorfun-store` repository.

### 1.1 Codebase Analysis
*   **Tech Stack Identification:**
    *   Clone the repository locally.
    *   Identify the framework (React, Vue, or Angular).
    *   Identify the CSS framework (Tailwind, Bootstrap, Styled Components).
    *   Identify State Management (Redux, Context API, Zustand).
*   **Feature Mapping:**
    *   **User Flow:** Home -> Product List -> Product Detail -> Cart -> Checkout -> User Profile.
    *   **Data Source:** Determine if it uses a mock API, a local JSON file, or connects to a live backend
(Firebase, Supabase, Stripe).

### 1.2 Gap Analysis
*   **Mobile Readiness:** Is the current web app responsive? Mobile-first design is non-negotiable for an app
store release.
*   **Performance:** Audit "Lighthouse" scores. Mobile apps require high performance (Load < 3s).

---

## Phase 2: Architecture & Stack Selection

To support Web, Android, and iOS with one codebase, we will use the **"Hybrid Web"** approach.

### Recommended Stack
1.  **Frontend Core:** React.js (keeping the existing core) or Next.js (if better SEO is needed for the web
version).
2.  **Cross-Platform Runtime:** **Capacitor.js** (by Ionic).
    *   *Why?* Unlike React Native (which requires learning a new language/components), Capacitor allows you to
take your existing React code, wrap it in a native container, and access Native Device APIs (Camera, GPS, Haptics)
via JavaScript bridges.
3.  **UI Framework:** **Ionic Framework** or **Tailwind CSS**.
    *   Ionic provides pre-built native-style UI components (iOS style lists, Android Material Design).
4.  **Backend (Optional Upgrade):** If the current repo is a frontend-only demo, you need a backend.
    *   *Suggestion:* **Supabase** (PostgreSQL + Auth + Storage) or **Firebase**.

---

## Phase 3: Development Roadmap

### Step 3.1: Refactor for Mobile (The "Mobile-First" Refactor)
*   **Navigation:** Replace top navigation bars with a **Bottom Tab Bar** (Home, Search, Cart, Profile). This is
standard for iOS/Android UX.
*   **Touch Targets:** Ensure all buttons are at least 44x44px for touch accessibility.
*   **Responsive Grid:** Convert product grids from 4 columns (desktop) to 2 columns (tablet) to 1 column
(mobile).

### Step 3.2: Integrate Capacitor
1.  Install Capacitor in the project.
2.  Create the configuration file (`capacitor.config.ts`).
3.  Add Android and iOS platforms:
    ```bash
    npm install @capacitor/core @capacitor/cli
    npx cap init
    npx cap add android
    npx cap add ios
    ```

### Step 3.3: Native Feature Integration
*   **Push Notifications:** Integrate FCM (Firebase Cloud Messaging) to alert users about new products or order
status.
*   **Image Picker:** Allow users to upload avatars or product images directly from their phone gallery.
*   **Biometric Auth:** Add FaceID/Fingerprint authentication for faster login on the mobile app.

---

## Phase 4: UI/UX Design Guidelines

### Web (Desktop & Mobile Browser)
*   **Design:** Retain the current layout but ensure strict fluid typography.
*   **SEO:** Ensure metadata is dynamic for product pages to rank on Google.

### iOS & Android Apps
*   **Platform Specifics:** Even though it's one codebase, the UI should respect the OS guidelines (i.e., iOS
needs the "Back" chevron in the top left; Android needs the hardware back button handling).
*   **Splash Screen:** Create an animated splash screen using the brand logo.
*   **Offline Mode:** Use Service Workers to cache the product catalog so users can browse even without internet.

---

## Phase 5: Backend & Database (If Required)

If `elektorfun-store` is currently a frontend-only template, you must implement a backend.

1.  **Database Schema:**
    *   `Users`: ID, email, password_hash, address.
    *   `Products`: ID, name, price, image_url, description, stock_quantity.
    *   `Orders`: ID, user_id, total, status, timestamp.
2.  **API:**
    *   REST or GraphQL endpoints to fetch products and handle checkout.
3.  **Payment Gateway:**
    *   **Stripe:** Use Stripe Elements for a secure, PCI-compliant checkout flow.

---

## Phase 6: Testing & QA

### 6.1 Automated Testing
*   **Unit Tests:** Jest (for logic).
*   **E2E Tests:** Cypress (to simulate user flows on the web version).

### 6.2 Mobile Device Testing
*   Use **BrowserStack** or **Sauce Labs** to test on 50+ real devices.
*   **Crucial Checks:**
    *   Does the keyboard push the "Buy" button up when typing in the address field?
    *   Does the "Add to Cart" animation play smoothly?

---

## Phase 7: Deployment & Release

### 7.1 Web Deployment
*   **Host:** Vercel or Netlify (Zero-config deployment for React/Next.js).
*   **Domain:** Configure `elektorfun-store.com` to point to the host.

### 7.2 App Store Deployment
*   **Google Play Store:**
    *   Generate a Keystore file.
    *   Build the APK/AAB: `npx cap build android`.
    *   Create Play Console developer account ($25 one-time fee).
*   **Apple App Store:**
    *   Enroll in the Apple Developer Program ($99/year).
    *   Generate iOS distribution certificates.
    *   Build the IPA: `npx cap build ios`.
    *   Upload via Xcode or Transporter app.

---

## Summary of Tasks

| Category | Task | Priority |
| :--- | :--- | :--- |
| **Audit** | Clone and analyze existing repo structure | High |
| **Design** | Convert Navigation to Bottom Tabs | High |
| **Dev** | Integrate Capacitor for Mobile Wrapper | High |
| **Dev** | Implement Native Features (Camera/Notifications) | Medium |
| **Backend** | Set up Database & API (if needed) | High |
| **QA** | Cross-device testing (Android vs iOS) | High |
| **Deploy** | Publish to Play Store & App Store | High |

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
