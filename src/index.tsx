import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/app/App";
import { setupStore } from "./store";
import "./style/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
