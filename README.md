# Memorise

A smart flashcard application that helps you learn, practice, and reinforce knowledge using AI-powered content generation and spaced repetition algorithms.

## 🚀 Live Demo

- **Frontend:** https://memorise.up.railway.app  
- **Backend API:** https://memorise-backend.up.railway.app  
- **API Docs (Swagger):** https://memorise-backend.up.railway.app/api/schema/swagger-ui/

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Flashcards & Decks CRUD**  
  Create, read, update, and delete both flashcards and their corresponding decks.

- **Individual Flashcard Browser**  
  Browse and list all flashcards within any specific deck, with a clear and searchable interface.

- **AI Agent for Flashcard Generation**  
  An integrated AI assistant (powered by OpenAI) that generates flashcards from topics, text, or explanations.

- **Spaced Repetition Algorithm**  
  A review system inspired by Anki's SRS model, using fields such as **ease factor**, **status**, **interval**, **streak**, and **due date** to schedule optimal review times and maximize retention.

## Tech Stack

- **Frontend:** React + TypeScript, styled with TailwindCSS  
- **Build Tool:** Vite  
- **Backend:** Django REST Framework  
- **Database:** SQLite  
- **Authentication:** JSON Web Tokens (JWT)  
- **AI Integration:** OpenAI API  
- **Version Control:** Git & GitHub  
- **Project Management:** Jira and Confluence

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) and **npm**
- **Python** (v3.8 or higher)
- **Git**
- **OpenAI API Key** - Sign up at [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation

### Clone the Repository

```bash
git clone https://github.com/MagicExist/MemoRise.git
cd MemoRise
```

### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd front-end
npm install
```

### Backend Setup

Navigate to the backend directory and set up a Python virtual environment:

```bash
cd ../back-end
python3 -m venv venv
```

**Activate the virtual environment:**

**Linux / macOS:**
```bash
source venv/bin/activate
```

**Windows (PowerShell):**
```bash
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
venv\Scripts\activate
```

**Install Python dependencies:**

```bash
pip install -r requirements.txt
```

**Run database migrations:**

```bash
python manage.py migrate
```

**Create environment file:**

Create a `.env` file in the `back-end` directory:

```bash
# back-end/.env
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key. You can obtain one from [OpenAI's platform](https://platform.openai.com/api-keys).

⚠️ **Important:** Never commit your `.env` file to version control. It should already be included in `.gitignore`.

## Running the Application

### Start the Backend Server

From the `back-end` directory with your virtual environment activated:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Start the Frontend Development Server

Open a new terminal, navigate to the `front-end` directory, and run:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in your terminal)

## Usage

Once both servers are running, you can start using Memorise:

### Access the Application

- Open your browser and navigate to `http://localhost:5173`
- The frontend will communicate with the backend API at `http://localhost:8000`

### API Documentation

The Django REST API is accessible at `http://localhost:8000/api/schema/swagger-ui/`

**Authentication**
- `POST /api/token/verify/` - Verify authentication token
- `POST /api/token/refresh/` - Refresh authentication token

**Users**
- `GET /api/users/` - List all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get user details

**Decks**
- `GET /api/decks/` - List all decks
- `POST /api/decks/` - Create a new deck
- `GET /api/decks/{id}/` - Get deck details
- `PUT /api/decks/{id}/` - Update a deck
- `PATCH /api/decks/{id}/` - Partially update a deck
- `DELETE /api/decks/{id}/` - Delete a deck
- `GET /api/decks/{id}/flashcards/` - Get all flashcards in a deck

**Flashcards**
- `GET /api/flashcards/` - List all flashcards
- `POST /api/flashcards/` - Create a new flashcard
- `GET /api/flashcards/{id}/` - Get flashcard details
- `PUT /api/flashcards/{id}/` - Update a flashcard
- `PATCH /api/flashcards/{id}/` - Partially update a flashcard
- `DELETE /api/flashcards/{id}/` - Delete a flashcard
- `POST /api/flashcards/{id}/review/` - Review a flashcard (updates SRS data)
- `GET /api/flashcards/study/` - Get flashcards due for study session

**AI Features**
- `POST /api/ai/flashcards/` - Generate flashcards using AI from a given topic or text

You can test these endpoints using:
- **Swagger UI:** `http://localhost:8000/api/schema/swagger-ui/`
- **Django REST Framework browsable API:** Visit endpoints directly in browser
- **API clients:** Postman, Insomnia, or similar tools
- **curl:** Command line HTTP requests

### Key Features in Action

**AI-Powered Flashcard Generation**
- Navigate to the deck creation page
- Use the AI generation feature to create flashcards from any topic
- The AI will generate relevant questions and answers based on your input

**Spaced Repetition Study**
- Access your study session to review due flashcards
- Rate your recall (Again, Hard, Good, Easy)
- The algorithm automatically schedules the next review based on your performance

### Development Tips

- **Frontend changes** will hot-reload automatically
- **Backend changes** require restarting the Django server
- **Database schema changes** require running migrations:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

## Project Structure

```
MemoRise/
├── back-end/                    # Django backend API
│   ├── core/                    # Core Django app
│   │   ├── models.py            # Database models (User, Deck, Flashcard)
│   │   ├── serializer.py        # DRF serializers
│   │   ├── views.py             # API views and business logic
│   │   └── urls.py              # URL routing
│   ├── MemoRiseApi/             # Django project settings
│   │   └── settings.py          # Project configuration
│   ├── manage.py                # Django management script
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables (not in repo)
│
└── front-end/                   # React/TypeScript frontend
    ├── src/                     # Application source code
    │   ├── components/          # React components
    │   ├── pages/               # Page components
    │   ├── services/            # API services
    │   └── utils/               # Utility functions
    ├── package.json             # NPM dependencies
    └── vite.config.ts           # Vite configuration
```

## Troubleshooting

### Port Already in Use

If you encounter a "port already in use" error:

- **Frontend:** The dev server will typically prompt you to use another port
- **Backend:** Stop any other Django processes or specify a different port:
  ```bash
  python manage.py runserver 8001
  ```

### Virtual Environment Issues

If you have trouble activating the virtual environment, ensure you're in the `back-end` directory and have Python 3 installed correctly.

### Database Issues

If you encounter database errors, try:

```bash
python manage.py makemigrations
python manage.py migrate
```

If problems persist, you may need to delete the `db.sqlite3` file and run migrations again (⚠️ this will delete all data).

### OpenAI API Issues

- Ensure your API key is correctly set in the `.env` file
- Check that you have sufficient credits in your OpenAI account
- Verify the `.env` file is in the `back-end` directory (not `back-end/MemoRiseApi/`)

### CORS Issues

If you encounter CORS errors:
- Ensure the Django server is running on `http://localhost:8000`
- Check that `CORS_ALLOWED_ORIGINS` in `settings.py` includes your frontend URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Developed with ❤️ by [Johhan](https://github.com/MagicExist) - [Ximena](https://github.com/ximena-2301) - [Jairo](https://github.com/Jairocanaveral23) - [Alejo](https://github.com/AlejxD)**

For more information or to report issues, please visit the [GitHub repository](https://github.com/MagicExist/MemoRise).
