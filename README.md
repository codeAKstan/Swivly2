# Swivly 2.0

**Swivly** is a marketplace platform tailored for students, enabling them to find accommodations, buy and sell items, and connect seamlessly. The platform fosters a trusted environment with advanced features like in-app communication, user reviews, and an admin moderation panel.

## 🚀 Technologies Used

### **Frontend (Next.js)**
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Axios (for API calls)

### **Backend (Django)**
- Django 4+
- Django REST Framework (DRF)
- PostgreSQL (Database)
- JWT Authentication

## 📌 Getting Started

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/codeAKstan/swivly-2.0.git
cd swivly-2.0
```

### **2️⃣ Backend Setup (Django)**

#### **Step 1: Navigate to Backend**
```bash
cd backend
```

#### **Step 2: Create a Virtual Environment**
```bash
python3 -m venv env
source env/bin/activate  # MacOS/Linux
env\Scripts\activate  # Windows
```

#### **Step 3: Install Dependencies**
```bash
pip install -r requirements.txt
```

#### **Step 4: Run Migrations**
```bash
python manage.py migrate
```

#### **Step 5: Create a Superuser**
```bash
python manage.py createsuperuser
```
Follow the prompts to set up an admin user.

#### **Step 6: Start the Backend Server**
```bash
python manage.py runserver
```
Django should now be running at `http://127.0.0.1:8000/`

---

### **3️⃣ Frontend Setup (Next.js)**

#### **Step 1: Navigate to Frontend**
```bash
cd ../frontend
```

#### **Step 2: Install Dependencies**
```bash
npm install  # or yarn install
```

#### **Step 3: Start Development Server**
```bash
npm run dev  # or yarn dev
```
The frontend should now be running at `http://localhost:3000/`

---

## 🔗 API Routes
| Method | Endpoint       | Description        |
|--------|--------------|--------------------|
| POST   | `/api/register/` | Register a new user |
| POST   | `/api/login/` | User authentication |
| GET    | `/api/products/` | Get all products |
| POST   | `/api/products/` | Add a new product |

---

## 🤝 Contributing
We welcome contributions! Follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature-new-feature
   ```
3. **Make Your Changes & Commit**
   ```bash
   git commit -m "Added a new feature"
   ```
4. **Push to GitHub**
   ```bash
   git push origin feature-new-feature
   ```
5. **Create a Pull Request**

---

## 📜 License
This project is licensed under the MIT License.

---

## 📞 Contact
- **Email:** codeAKstan@email.com
- **GitHub:** [codeAKstan](https://github.com/codeAKstan)

