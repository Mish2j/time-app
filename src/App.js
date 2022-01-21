import { useState } from "react";

import Container from "./components/UI/Container";

import Main from "./components/Layout/Main";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";

function App() {
  const [activeTabName, setActiveTabName] = useState("LocalTime");

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
