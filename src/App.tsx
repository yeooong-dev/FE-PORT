import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <Router />
            </CookiesProvider>
        </QueryClientProvider>
    );
}

export default App;
