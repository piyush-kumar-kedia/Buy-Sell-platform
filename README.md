# **Buy-Sell Platform**

A **full-stack OLX-like marketplace application** built with **MERN Stack (MongoDB, Express.js, React, Node.js)**.  
This platform allows users to **buy and sell products**, securely **authenticate**, and perform **CRUD operations** with **ownership checks**.  

---

## **🚀 Features**

### **Core Features**
- **User Authentication**
  - Secure **Register** & **Login** using **JWT-based authentication**
- **Authorization**
  - Only **product owners** can **edit** or **delete** their products
- **Product CRUD**
  - **Create:** Add product with **Title, Description, Price, Category**, and optional **Image**
  - **Read:** View **all products** or **individual product details**
  - **Update:** Update **only owned products**
  - **Delete:** Delete **only owned products**

### **Advanced Features**
- 🔍 **Search :** Find products by **title**   
- 🔍 **Filter :** Find products by **category**  

---

## **🛠️ Tech Stack**

- **Frontend:** React, Tailwind CSS, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  

---

### **Complete Setup Guide**
1. **Prerequisites**

Install Node.js (v18+ recommended)

Install npm (comes with Node.js)

Install MongoDB (local or cloud Atlas)

2. **Clone the Repository**
git clone https://github.com/piyush-kumar-kedia/Buy-Sell-platform.git
cd Buy-Sell-platform

3. **Backend Setup**

Navigate to backend folder:

cd backend


Install dependencies:

npm install


4) **Create a .env file in the backend folder with the following:**

PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string


5) **Start the backend server (development mode with auto-restart):**

npm run dev

Backend will run on http://localhost:3000


**Frontend Setup**

1) **Navigate to frontend folder:**

cd frontend


2) **Install dependencies:**

npm install


3) **Start the frontend development server:**

npm start


Open in browser:

http://localhost:5173/
