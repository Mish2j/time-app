import { useState } from "react";

import Container from "./components/UI/Container";
import Main from "./components/Layout/Main";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import { LOCAL_TIME } from "./constants/const";

function App() {
  const [activeTabName, setActiveTabName] = useState(LOCAL_TIME);

  return (
    <Container>
      <Sidebar
        onTabContentChange={(tabContent) => setActiveTabName(tabContent)}
      />
      <Main tabName={activeTabName} />
      <Footer />
    </Container>
  );
}

export default App;
