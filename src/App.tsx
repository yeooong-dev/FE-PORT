import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import { UserProvider } from "./components/navigation/userContext";
import { DarkModeProvider } from "./components/darkmode/DarkModeContext";
import { SearchResultsProvider } from './components/search/SearchResultsContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <DarkModeProvider>
      <UserProvider>
        <StyleSheetManager
          shouldForwardProp={(prop) => prop[0] !== "$" && isPropValid(prop)}
        >
          <QueryClientProvider client={queryClient}>
            <CookiesProvider>
              <SearchResultsProvider>
                <Router />
              </SearchResultsProvider>
            </CookiesProvider>
          </QueryClientProvider>
        </StyleSheetManager>
      </UserProvider>
    </DarkModeProvider>
  );
}

export default App;
