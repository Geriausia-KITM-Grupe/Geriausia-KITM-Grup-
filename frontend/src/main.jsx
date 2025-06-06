import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <Layout>
    <App />
  </Layout>
);
