---

# 🎬 **Cineversse – Your Movie Universe**

A **modern Angular web app** that brings the cinematic world to your screen.
Cineversse lets users explore **trending, upcoming, and popular movies** — fetched live from a mock API — while also allowing them to **create, edit, delete**, and **favorite** their own movie posters.

> *“Your digital universe of movies — where every film has a story.”* 🍿

---

## 🚀 **Features**

### 🎥 Movie Discovery

* Browse **trending movies** and **upcoming releases**.
* View detailed info for each movie including poster, description, and release date.
* Data is dynamically fetched from a **Mock API** for smooth performance.

### ✍️ Movie Management

* **Create** your own movie poster entries with title, poster, and description.
* **Edit or delete** existing movies anytime.
* Real-time UI updates for all CRUD operations.

### ❤️ Favorites

* Add movies to your **favorites list** for quick access later.
* Manage favorites easily with instant updates powered by **Appwrite** backend services.

---

## 🧱 **Tech Stack**

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| 💻 Frontend   | **Angular (v15+)**             |
| 🗄️ Backend     | **Appwrite** (Database & Auth) |
| 🔗 API        | **Mock API** (for movie data)  |
| 🎨 Styling    | **TailwindCSS**                |
| ⚙️ Build Tool | Angular CLI                    |
| 🧠 State      | Angular Services / RxJS        |

---

## 🗂️ **Project Structure**

```
Cineversse/
├── src/
│   ├── app/
│   │   ├── components/         # UI components (movie cards, modals, etc.)
│   │   ├── pages/              # Home, Trending, Upcoming, Favorites
│   │   ├── services/           # API + Appwrite integration
│   │   ├── models/             # Type definitions (Movie, User, etc.)
│   │   ├── app.component.html  # App entry point
│   │   ├── app.config.ts       # App configurations
│   │   ├── app.routes.ts       # All routes
│   │   └── app.component.ts    # Root component
│   ├── assets/                 # Images, icons, etc.
│   ├── environments/           # API URLs, config
│   ├── main.ts
│   ├── index.html
│   └── styles.css
└── angular.json
```

---

## ⚙️ **Getting Started**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Cineversse.git
cd Cineversse
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a file: `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  mockApiUrl: 'https://mockapi.io/api/v1/movies',
  appwriteEndpoint: 'https://cloud.appwrite.io/v1',
  appwriteProjectId: 'your_project_id'
};
```

### 4️⃣ Run the App

```bash
ng serve
```

Then open 👉 [http://localhost:4200](http://localhost:4200)

---

## 📸 **Screenshots (Optional)**

> *Add screenshots of the home page, trending list, and favorites section here.*

---

## 🧠 **Future Enhancements**

* ✅ Add movie trailer previews via YouTube API
* ✅ Implement user authentication via Appwrite
* ✅ Pagination & infinite scroll for large movie lists
* ✅ Dark mode toggle
* ✅ Search & filter functionality

---

## 🧑‍💻 **Author**

**Uttam** – *Full Stack Web Developer | Movie Buff | Builder of Digital Worlds*
📫 [LinkedIn](https://www.linkedin.com/in/uttam172)
🐙 [GitHub](https://github.com/uttam172)

---

## 🏁 **License**

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🌟 **Show Your Support!**

If you like this project:

* ⭐ Star the repo on GitHub
* 🐛 Open issues or PRs for improvements
* 💡 Share your feature ideas

> *“Cineversse – where code meets cinema.”* 🎞️

---
