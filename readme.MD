# 1 Million Checkboxes

A real-time checkbox grid built using WebSockets, Express, Socket.IO, and MongoDB.

This project demonstrates how to efficiently handle and synchronize up to 1 million checkboxes between multiple connected users using lazy loading and chunk-based rendering.

---

## Features

- Real-time checkbox updates using Socket.IO
- Supports up to 1,000,000 checkboxes
- Lazy loading with infinite scroll
- Chunk-based rendering for performance optimization
- Shared state across all connected clients
- MongoDB persistence
- Efficient DOM rendering using DocumentFragment

---

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- Vanilla JavaScript
- HTML/CSS

---

## Demo Video

[Project Demo Video](https://www.youtube.com/watch?v=gl7voqsjxiE)

---

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project folder:

```bash
cd 1million-checkbox
```

Install dependencies:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

---

## Run the Project

Start the development server:

```bash
pnpm dev
```

or

```bash
node server.js
```

---

## Project Structure

```bash
1million-checkbox/
│
├── node_modules/
├── .env
├── package.json
├── pnpm-lock.yaml
├── server.js
├── db.js
├── model.js
├── index.html
└── README.md
```

---

## How It Works

- The backend stores checkbox states in MongoDB.
- Checkboxes are loaded in chunks instead of rendering all at once.
- As the user scrolls, more checkboxes are fetched and rendered.
- Clicking a checkbox emits a Socket.IO event.
- The server updates MongoDB and broadcasts the change to all connected users in real time.

---

## Performance Optimizations

- Infinite scrolling
- Lazy rendering
- Chunk loading
- DocumentFragment usage
- Avoiding full DOM re-renders
- Real-time partial updates only


---

## License

This project is open source and available under the MIT License.