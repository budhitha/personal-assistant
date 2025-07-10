# Personal Assistant Web App

A simple web-based personal assistant app built with **FastAPI** (backend) and **React + TailwindCSS** (frontend).

---

## Features

- Chat interface powered by FastAPI REST API
- Modern UI with React and Tailwind CSS
- Easy to extend with AI or automation features

---

## Local Development

### Backend (FastAPI)

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. **Run the server:**
   ```bash
   uvicorn main:app --reload --port 8001
   ```
   (Make sure you run this from the directory containing `main.py`.)

### Frontend (React + Tailwind)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   The app runs at [http://localhost:3000](http://localhost:3000) by default.

---

## Production Build & Deployment

### Build Frontend

1. From the `frontend` directory:
   ```bash
   npm run build
   ```
   This creates a production build in `frontend/build/`.

2. **(Optional) Serve with FastAPI**
   - You can serve the static frontend from FastAPI using `StaticFiles`:
   - In your `main.py`:
     ```python
     from fastapi.staticfiles import StaticFiles
     app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")
     ```
   - Make sure the build folder path matches your project structure.

3. **Deploy Backend**
   - Deploy your FastAPI app using [Uvicorn](https://www.uvicorn.org/) or with a process manager like [Gunicorn](https://gunicorn.org/) and [Nginx](https://nginx.org/).
   - Example:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 80
     ```

4. **(Optional) Deploy with Docker**
   - You can create a Dockerfile that serves both frontend and backend.

---

## API Example

- **POST** `/api/chat`
  - **Request:**  
    ```json
    {
      "message": "Hello!"
    }
    ```
  - **Response:**  
    ```json
    {
      "reply": "You said: Hello!"
    }
    ```

---

## Customization

- Update the backend in `backend/main.py` to add more endpoints or integrate AI logic.
- Modify UI components in `frontend/src/` as needed.

---

## License

MIT