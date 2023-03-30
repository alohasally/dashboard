import React, { useState } from "react";
import tw from "tailwind-styled-components";
import "./App.css";
import Tab from "./components/Tab";
import Furniture from "./containers/Furniture";
import Option from "./containers/Option";
import Visiter from "./containers/Visiter";

type TabItem = {
  id: number;
  title: string;
  content: string;
};

const tabItems: TabItem[] = [
  { id: 1, title: "통계", content: "a" },
  { id: 2, title: "옵션", content: "b" },
  { id: 3, title: "품목", content: "c" },
];

function App() {
  const [selectedTabId, setSelectedTabId] = useState(1);
  console.log(selectedTabId);

  return (
    <div className="App">
      <div className="">
        <div className="flex items-center justify-center h-[74px]">
          <a className="" href="#">
            <img src="./logo.png" alt="logo" />
          </a>
        </div>
        <div className="flex items-center bg-[#EDEDED] h-[60px]">
          <h2 className="text-[#01353F] font-[RaemianNarae] text-[20px] pl-[24px]">
            라그란데 관리자 페이지
          </h2>
        </div>
        <div className="w-full relative ">
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-[RaemianNarae] text-[24px] text-[#fff]">
            라그란데 메타버스 사용자 데이터
          </span>
          <img className="w-full h-[146px] object-cover" src="./banner.png" />
        </div>
        <div className="max-w-[1104px] mx-auto flex justify-between items-center pt-14">
          {tabItems.map((tabItem) => {
            return (
              <Tab
                key={tabItem.id}
                tabTitle={tabItem.title}
                isSelectedTab={tabItem.id === selectedTabId}
                onClick={() => setSelectedTabId(tabItem.id)}
              />
            );
          })}
        </div>
        <div>
          {selectedTabId === 1 ? (
            <Visiter />
          ) : selectedTabId === 2 ? (
            <Option />
          ) : (
            <Furniture />
          )}
        </div>
      </div>
    </div>
  );
}

//tab(menuName)
export default App;
