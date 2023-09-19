import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => prop[0] !== "$" && isPropValid(prop)}
    >
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </QueryClientProvider>
    </StyleSheetManager>
  );
}

export default App;
