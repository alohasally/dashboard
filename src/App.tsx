import React from "react";
import tw from "tailwind-styled-components";
import "./App.css";
import Tab from "./components/Tab";

function App() {
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
        <Tab menuName={""} menuNumber={0} />
      </div>
    </div>
  );
}

//tab(menuName)
export default App;
