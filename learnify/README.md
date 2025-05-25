# 🎓 Learnify – Mentor Booking Platform

A fullstack web app where users can book sessions with mentors, and mentors can manage their profiles, services, bookings, and payments through their personalized dashboards.

---

## 🌐 Live Demo

🚧 https://learnify-platform-fullstack.vercel.app/

---

## ✨ Features

### 👩‍🏫 Mentor Dashboard
- View and update profile
- Add new services
- Manage bookings and payments

### 🙋 User Dashboard
- View and edit profile
- Book mentor sessions
- Track and manage past bookings

### 🔒 Secure & Responsive
- JWT-based authentication
- Tailwind CSS responsive UI
- Auto-configured Axios instances for clean API calls

---

## 🛠 Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios (with baseURL instance)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth

**Routing:**
- All route files (user, mentor, service, payment, etc.) are auto-loaded in `index.js` using a looped router import system.

---

## 📁 Folder Structure

┣ 📂backend-learnify
┃ ┣ 📂config
┃ ┃ ┣ 📜db.js
┃ ┃ ┗ 📜index.js
┃ ┣ 📂controllers
┃ ┃ ┣ 📜auth.controller.js
┃ ┃ ┣ 📜bookings.controller.js
┃ ┃ ┣ 📜mentor.controller.js
┃ ┃ ┣ 📜mentorService.controller.js
┃ ┃ ┣ 📜payment.controller.js
┃ ┃ ┗ 📜user.controller.js
┃ ┣ 📂helper
┃ ┃ ┣ 📜apiError.js
┃ ┃ ┗ 📜asyncHandler.js
┃ ┣ 📂middleware
┃ ┃ ┣ 📜auth.js
┃ ┃ ┗ 📜validate.js
┃ ┣ 📂models
┃ ┃ ┣ 📜bookings.model.js
┃ ┃ ┣ 📜payments.model.js
┃ ┃ ┣ 📜service.model.js
┃ ┃ ┗ 📜user.model.js
┃ ┣ 📂routes
┃ ┃ ┗ 📂v1
┃ ┃   ┣ 📜auth.route.js
┃ ┃   ┣ 📜booking.route.js
┃ ┃   ┣ 📜home.route.js
┃ ┃   ┣ 📜index.js
┃ ┃   ┣ 📜mentor.route.js
┃ ┃   ┣ 📜payment.route.js
┃ ┃   ┣ 📜service.route.js
┃ ┃   ┗ 📜user.routes.js
┃ ┣ 📂services
┃ ┃ ┣ 📜auth.service.js
┃ ┃ ┣ 📜bookings.service.js
┃ ┃ ┣ 📜mentor.servive.js
┃ ┃ ┣ 📜mentorService.service.js
┃ ┃ ┣ 📜payments.service.js
┃ ┃ ┣ 📜token.service.js
┃ ┃ ┗ 📜user.service.js
┃ ┣ 📂uploads
┃ ┃ ┣ 📜1747169567811-photo.jpg
┃ ┃ ┗ 📜1747466140040-photo.png
┃ ┣ 📂utils
┃ ┃ ┣ 📜httpStatus.js
┃ ┃ ┗ 📜multer.js
┃ ┣ 📂validations
┃ ┃ ┣ 📜auth.validations.js
┃ ┃ ┣ 📜service.validations.js
┃ ┃ ┗ 📜user.validations.js
┃ ┣ 📜.env
┃ ┣ 📜.gitignore
┃ ┣ 📜app.js
┃ ┣ 📜index.js
┃ ┗ 📜package.json
┣ 📂frontend-learnify
┃ ┣ 📂public
┃ ┃ ┗ 📂assets
┃ ┃   ┣ 📜onlineStudy.png
┃ ┃   ┣ 📜phone_enabled_33dp_0000F5_FILL0_wght400_GRAD0_opsz40.svg
┃ ┃   ┣ 📜students.png
┃ ┃   ┣ 📜studentsCareerPlanning.png
┃ ┃   ┣ 📜StudentsImage.png
┃ ┃   ┗ 📜trophy.png
┃ ┣ 📂src
┃ ┃ ┣ 📂apiManager
┃ ┃ ┃ ┣ 📜AuthApi.jsx
┃ ┃ ┃ ┣ 📜BookingApi.jsx
┃ ┃ ┃ ┣ 📜index.jsx
┃ ┃ ┃ ┣ 📜mentorApi.jsx
┃ ┃ ┃ ┣ 📜PaymentApi.jsx
┃ ┃ ┃ ┣ 📜ServiceApi.jsx
┃ ┃ ┃ ┗ 📜UserApi.jsx
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📜BookingCard.jsx
┃ ┃ ┃ ┣ 📜BookingsTable.jsx
┃ ┃ ┃ ┣ 📜FeaturesCard.jsx
┃ ┃ ┃ ┣ 📜Nav.jsx
┃ ┃ ┃ ┣ 📜ProfileSideBar.jsx
┃ ┃ ┃ ┣ 📜ProtectedRoute.jsx
┃ ┃ ┃ ┣ 📜ServicesCard.jsx
┃ ┃ ┃ ┣ 📜SideBar.jsx
┃ ┃ ┃ ┣ 📜StudentBookingsCard.jsx
┃ ┃ ┃ ┗ 📜TopMentors.jsx
┃ ┃ ┣ 📂const
┃ ┃ ┃ ┣ 📜env.const.js
┃ ┃ ┃ ┗ 📜index.jsx
┃ ┃ ┣ 📂helper
┃ ┃ ┃ ┗ 📜index.js
┃ ┃ ┣ 📂pages
┃ ┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┃ ┣ 📜Bookings.jsx
┃ ┃ ┃ ┃ ┣ 📜Dashboard.jsx
┃ ┃ ┃ ┃ ┣ 📜PaymentsInfo.jsx
┃ ┃ ┃ ┃ ┣ 📜Profile.jsx
┃ ┃ ┃ ┃ ┣ 📜Services.jsx
┃ ┃ ┃ ┃ ┗ 📜StudentBookings.jsx
┃ ┃ ┃ ┣ 📜AllMentors.jsx
┃ ┃ ┃ ┣ 📜index.jsx
┃ ┃ ┃ ┣ 📜MentorSessions.jsx
┃ ┃ ┃ ┣ 📜PaymentPage.jsx
┃ ┃ ┃ ┣ 📜SignIn.jsx
┃ ┃ ┃ ┗ 📜SignUp.jsx
┃ ┃ ┣ 📂routes
┃ ┃ ┃ ┗ 📜userRoute.jsx
┃ ┃ ┣ 📂store
┃ ┃ ┃ ┣ 📜mentorIdForSessions.js
┃ ┃ ┃ ┣ 📜mentorStore.js
┃ ┃ ┃ ┗ 📜userStore.js
┃ ┃ ┣ 📜App.css
┃ ┃ ┣ 📜App.jsx
┃ ┃ ┣ 📜index.css
┃ ┃ ┗ 📜main.jsx
┃ ┣ 📜.env
┃ ┣ 📜.gitignore
┃ ┣ 📜eslint.config.js
┃ ┣ 📜index.html
┃ ┣ 📜package.json
┃ ┣ 📜README.md
┃ ┣ 📜vercel.json
┃ ┗ 📜vite.config.js
┗ 📜README.md



---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/sameerdevlab/learnify-platform-fullstack.git
cd learnify-platform


** 🚀 Start Backend **

cd learnify
cd backend-learnify
npm install
npm run dev


** 🚀 Start Frontend **

cd learnify
cd frontend-learnify
npm install
npm run dev


*** 🔐 Environment Variables ***

- create a .env file in backend-learnify and provide following values

PORT = 
DB_URL = 

JWT_ACCESS_SECRET = 
JWT_ACCESS_EXPIRATION_MINUTES =
JWT_VERIFICATION_SECRET = 
JWT_VERIFICATION_EXPIRATION_MINUTES = 

CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 

RAZORPAY_KEY =
RAZORPAY_SECRET =

- create a .env file in frontend-learnify and provide following values

VITE_BACKEND_URL = 


**- 🧪 API Routing (Backend) -**

- Routes are auto-loaded from routes/ directory using a for...of loop in index.js.
- Each file exports a standard Express router.

🤝 Contributing
- Pull requests are welcome! Fork the repo, make changes, and submit a PR.




## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).