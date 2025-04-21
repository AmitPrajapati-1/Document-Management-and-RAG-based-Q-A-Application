# Document-Management-and-RAG-based-Q-A-Application
# 📚 Document Q&A Oasis

An intelligent document management system with AI-powered Question & Answer functionality!  
Upload your documents (PDF, DOCX, TXT), and ask questions — get instant answers from your document content.

---

## ✨ Features

- 📝 Upload documents (PDF, DOCX, TXT files)
- 🔍 Ask questions about uploaded documents
- 📂 View, manage, and delete uploaded documents
- 🔒 Secure authentication with JWT
- ⚡ Real-time document parsing (PDF.js, docx-preview)
- 🌐 Full-stack: React + Node.js + Express
- 🚀 CORS enabled for smooth frontend-backend integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT Authentication
- CORS middleware
- pdfjs-dist & docx-preview libraries

---

## 📂 Folder Structure

    
    document-qa-oasis/
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── utils/
    │   ├── uploads/
    │   ├── .env
    │   ├── server.js
    │   └── package.json
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── utils/
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── public/
    │   ├── tailwind.config.js
    │   └── package.json
    ├── README.md
    └── .gitignore
---

## 🚀 Getting Started

### Prerequisites

- ✅ Node.js installed
- ✅ MongoDB installed (or use MongoDB Atlas)
- ✅ npm (Node Package Manager)

---
## 📦 Installation

  ### 1. Clone the repository
      
      git clone https://github.com/your-username/document-qa-oasis.git
      cd document-qa-oasis
  ### 2. Setup Backend
      
      cd backend
      npm install
  ## Create a .env file inside the backend folder:
      
       PORT=3002
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key

  ## Start the backend server:
      
      npm run dev
  ## Server will run at: http://localhost:3002      
  
  ### 3. Setup Frontend
      
     cd frontend
    npm install
  ## Start the React app:
    
    npm start
  ## Frontend will run at: http://localhost:3000

### 🗂️ .env Templates
 ## Backend .env:
     
     PORT=3002
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/documentqa
    JWT_SECRET=supersecretkey
## ⚡ Make sure you replace placeholders with your real credentials.
## 🔥 Usage

- Sign Up / Log In with your email.
- Upload your documents (PDF, DOCX, TXT).
- View uploaded documents.
- Ask questions related to your documents.
- Get instant AI-based answers!

---

## 📷 Screenshots (Optional)
- Upload Document
- Ask Questions  
(Add screenshots if you want — just put the images inside a `/screenshots` folder.)

---

## 🚧 Future Improvements

- 📜 Document summarization
- 🔎 Search by document tags
- 👥 Multi-user collaboration
- 🤖 Chatbot-style document conversation
- 🎤 Voice-based Q&A feature

---

## 🤝 Contributing

Pull requests are welcome.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 🪪 License

This project is licensed under the MIT License.

### 🧹 Short GitHub Repository Description:
    
    An AI-powered Document Management and Q&A System built with React, Node.js, Express, and MongoDB.  
    Upload documents and ask smart questions — get instant answers! 🚀

  




