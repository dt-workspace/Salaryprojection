import LandingContainer from "./src/containers/LandingContainer";
import { store } from "./src/store";
import { Provider } from "react-redux";

export default function Application() {
  return (
    <Provider store={store}>
      <LandingContainer />
    </Provider>
  );
}
