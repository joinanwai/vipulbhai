# Vipul Sanchaniya — Official Public Leadership Profile

Official responsive political profile and leadership portfolio for **Vipul Sanchaniya**, dedicated leader and grassroots public servant of the Bharatiya Janata Party (BJP) from Rajkot District, Gujarat.

---

## 🌟 Key Highlights & Features
- **Hero & Official Endorsement**: High-resolution, verified leadership photograph with Hon'ble Prime Minister Narendra Modi.
- **Featured Moments Slider**: Interactive sliding carousel showcasing 14 documented field engagements from the curated archive.
- **Categorized Photo Gallery**: 50+ high-resolution photographs with category filtering (*Leadership*, *Public Events*, *Organizational Activities*, *Community Engagement*) and an interactive HD Lightbox viewer.
- **Verified Bio-Data & Milestones**: Detailed 16+ year chronological timeline (2008–2024), BJP organizational responsibilities, and welfare initiatives.
- **Community & Social Leadership**: Documented contributions including Prajapati Samaj, Saurashtra's grand Ram Navami Rath Yatra, and Covid-19 relief kitchen operations.
- **Public Representation Desk**: Direct representation form connected to Google Sheets via Google Apps Script.

---

## 📊 Google Sheets & Google Apps Script Setup Guide

The Public Representation Form on the website writes submissions directly into a private Google Sheet owned by `harshsanchaniya2@gmail.com`.

### 1. Google Sheet Column Structure
In your Google account (`harshsanchaniya2@gmail.com`):
1. Go to [Google Sheets](https://sheets.google.com) and create a **New Spreadsheet** (e.g. named `Vipul Sanchaniya - Public Representations`).
2. Label the columns in **Row 1** (or let the script auto-create them on first run):

| Column A | Column B | Column C | Column D | Column E |
| :--- | :--- | :--- | :--- | :--- |
| **Timestamp** | **Full Name** | **Phone / Mobile** | **Subject / Area of Representation** | **Message / Details** |

---

### 2. Google Apps Script Setup
1. In your Google Sheet, click on **Extensions** → **Apps Script**.
2. Delete any existing code in the editor (`Code.gs`).
3. Copy the entire contents of [`Code.gs`](./Code.gs) from this repository and paste it into the Apps Script editor.
4. Click the **💾 Save project** icon.

---

### 3. Deploying as Web App
1. At the top right of the Apps Script editor, click **Deploy** → **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Public Representation Form API`
   - **Execute as**: `Me (harshsanchaniya2@gmail.com)`
   - **Who has access**: `Anyone` *(Important: This allows the website visitors to submit representations without requiring them to log into Google)*
4. Click **Deploy**.
5. Click **Authorize access**, choose `harshsanchaniya2@gmail.com`, click **Advanced**, and then click **Go to Untitled project (unsafe)** → **Allow**.
6. Copy the generated **Web app URL** (Format: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### 4. Configuring Environment Variable in Frontend
1. Open `.env` in the root of this project.
2. Paste your Web App URL into `VITE_GOOGLE_SHEET_API_URL`:
   ```env
   VITE_GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_ID/exec
   ```
3. Restart the Vite development server (`npm run dev`).

---

## 🛠️ Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Backend & Database**: Google Apps Script Web App (`doPost`) + Google Sheets
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design Tokens with Saffron & Navy Palettes

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/harsh8907-k/Political_Portfolio.git

# Navigate into the project directory
cd Political_Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Production Build

```bash
npm run build
```

---
© 2026 Vipul Sanchaniya. All rights reserved.
