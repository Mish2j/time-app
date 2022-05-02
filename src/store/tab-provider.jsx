import { useState } from "react";

import { LOCAL_TIME } from "../constants/const";

import TabContext from "./tab-context";

const TabContextProvider = ({ children }) => {
  const [tab, setTab] = useState(LOCAL_TIME);

  const onTabChange = (tabName) => {
    setTab(tabName);
  };

  const tabCtxValue = {
    activeTab: tab,
    displayTabContent: onTabChange,
  };

  return (
    <TabContext.Provider value={tabCtxValue}>{children}</TabContext.Provider>
  );
};

export default TabContextProvider;
