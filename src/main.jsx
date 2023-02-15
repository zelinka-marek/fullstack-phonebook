import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles/index.css";

const persons = [
  { id: 1, name: "Arto Hellas", tel: "202-555-0150" },
  { id: 2, name: "Ada Lovelace", tel: "202-555-0160" },
  { id: 3, name: "Ryan Florence", tel: "202-555-0196" },
  { id: 4, name: "Dan Abramov", tel: "12-43-234345" },
  { id: 5, name: "Mary Poppendieck", tel: "39-23-6423122" },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App persons={persons} />
  </StrictMode>
);
