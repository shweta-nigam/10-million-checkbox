import express from "express";
import { connectDB } from "./db.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Checkbox } from "./model.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

await connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

let checkbox;

async function initCheckBox() {
  checkbox = await Checkbox.findOne();

  if (!checkbox) {
    console.log("Creating 1 million checkboxes...");

    checkbox = await Checkbox.create({
      states: new Array(1000000).fill(false),
    });
  }

  console.log("Initialized");
}

await initCheckBox();

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("toggle-checkbox", async ({ index, checked }) => {
    try {
      if (index < 0 || index >= checkbox.states.length) return;

      checkbox.states[index] = checked;

      await Checkbox.updateOne(
        {},
        {
          $set: {
            [`states.${index}`]: checked,
          },
        }
      );

      io.emit("update-checkbox", {
        index,
        checked,
      });

    } catch (err) {
      console.error(err);
    }
  });
});


// API for chunk loading
app.get("/states", (req, res) => {
  const start = Number(req.query.start);
  const end = Number(req.query.end);

  const slice = checkbox.states.slice(start, end);

  res.json(slice);
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});