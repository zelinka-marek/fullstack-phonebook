import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles/index.css";

const persons = [
  { id: 1, name: "Arto Hellas" },
  { id: 2, name: "Ada Lovelace" },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App persons={persons} />
  </StrictMode>
);
