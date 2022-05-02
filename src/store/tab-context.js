import { createContext } from "react";

import { LOCAL_TIME } from "../constants/const";

const initialState = {
  activeTab: LOCAL_TIME,
  displayTabContent(tabName) {},
};

const TabContext = createContext(initialState);

export default TabContext;
