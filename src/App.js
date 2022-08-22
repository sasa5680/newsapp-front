import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Pipeline, Pipe } from "react-pipeline-component";
import { BrowserRouter } from "react-router-dom";

import { AccountProvider } from "./context/AccountContext";

import Body from "./components/structure/Body";
import Footer from "./components/structure/Footer";
import Header from "./components/structure/Header";

import theme from "./styles/theme";
import Message from "./components/Message";
import Router from "./router/Router";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Pipeline
            components={[
              <AccountProvider children={<Pipe />} />,
              <BrowserRouter>
                <Header />
                <Body>
                  <Router />
                </Body>
                <Message />
                <Footer />
                <ReactQueryDevtools initialIsOpen={false} />
              </BrowserRouter>,
            ]}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
