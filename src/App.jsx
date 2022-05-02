import TabContextProvider from "./store/tab-provider";

import Container from "./components/UI/Container";
import Main from "./components/Layout/Main";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Container>
      <TabContextProvider>
        <Sidebar />
        <Main />
        <Footer />
      </TabContextProvider>
    </Container>
  );
}

export default App;
