import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import { UserProvider } from "./components/navigation/userContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <StyleSheetManager
        shouldForwardProp={(prop) => prop[0] !== "$" && isPropValid(prop)}
      >
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <Router />
          </CookiesProvider>
        </QueryClientProvider>
      </StyleSheetManager>
    </UserProvider>
  );
}

export default App;
