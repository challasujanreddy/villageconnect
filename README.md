# VillageConnect

**VillageConnect** is a web platform that connects urban guests with rural hosts, enabling immersive village experiences while supporting rural incomes. Hosts from villages can list their spare rooms and act as local guides, while guests can discover authentic cultural getaways, book stays, and explore local traditions.

---

##  Features

-  **Guest Experience**
  - Browse village stays and explore cultural activities
  - Book rooms and guides offered by local hosts
  - View village images, details, pricing, and reviews

-  **Host Dashboard**
  - Register as a host and list your village accommodations
  - Upload images and manage pricing, guide services, and descriptions
  - Edit or delete village listings through a dedicated dashboard

-  **Authentication & Roles**
  - Supabase-based sign-up, login, and session handling
  - Role-based access: Guests and Hosts
  - Hosts can access exclusive dashboard tools

-  **Supabase Integration**
  - Real-time database: `villages`, `profiles`, `bookings`
  - Supabase Storage for hero image uploads
  - Row-Level Security (RLS) policies for secure access

---

##  Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide Icons

---

##  Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/challasujanreddy/villageconnect.git
cd villageconnect
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file based on `.env.example` and add your Supabase keys:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the app

```bash
npm run dev
```

---

## 🗂 Folder Structure

```
src/
├── components/       # Reusable UI components
├── contexts/         # Auth context
├── hooks/            # Supabase village data hooks
├── pages/            # Route-based pages
├── utils/            # Storage utils (upload, public URL)
```

---

## 🛡 Security Notes

* Supabase RLS ensures users only access their own data.
* `.env` is gitignored and credentials should not be committed.
* All file uploads are restricted to authenticated users.

---


## 🙌 Credits

Made with ❤️ by [Sujan Reddy](https://github.com/challasujanreddy)
Powered by Supabase + React + Vite

---

## 📄 License

MIT License
