# Autonomous AI Customer Support System - Frontend

This is the frontend for a full-stack, AI-powered customer support application. It provides a modern, responsive user interface for both customers and support agents, built with Next.js and Shadcn UI.

**[View the Live Application Here!](https://support-ticket-frontend-gujjajasai.vercel.app)** 

---

## About The Project

This project is the user-facing component of a larger microservices-based application. It demonstrates a complete, role-based authentication flow and provides distinct dashboards for different user types. The highlight of the customer experience is a real-time, conversational AI assistant.

This application was built as a comprehensive portfolio project to showcase skills in modern frontend development, API integration, and state management.

### Key Features:
*   **Dual Portals:** Separate, tailored user experiences for 'Customers' and 'Agents'.
*   **Role-Based Access Control:** The UI dynamically changes based on the logged-in user's role.
*   **AI Chat Interface:** A real-time, conversational chatbot for customers, powered by a generative AI backend.
*   **Agent Dashboard:** A professional dashboard for agents to view and manage all support tickets.
*   **Responsive Design:** Built with Tailwind CSS for a great experience on any device.

### Tech Stack:
*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Component Library:** Shadcn UI
*   **Deployment:** Vercel

---

## Architecture

This frontend is one of three services that make up the complete application:

1.  **Frontend (This Repository):** The user interface built with Next.js.
2.  **[Core Backend (Java)](https://github.com/gujjajasai/support-ticket-backend):** A robust Java/Servlet backend that manages users, tickets, and the database.
3.  **[AI Agent (Node.js)](https://github.com/gujjajasai/ai-agent-service):** A specialized microservice that handles all Generative AI processing. 

---

## Getting Started

To run this project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/gujjajasai/support-ticket-frontend.git

2. Navigate to the project directory:
    ```sh
    cd support-ticket-frontend
3. Install NPM packages:
    ```sh
    npm install
4. Run the development server:
    ```sh
    npm run dev


Open http://localhost:3000 to view it in the browser.
