import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const loadingMarkUp = (
  <div className="py-4 text-center">
    <h2>Loading .. </h2>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={loadingMarkUp}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
