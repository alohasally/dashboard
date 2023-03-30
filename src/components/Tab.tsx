import React, { useState } from "react";

type TabProps = {
  tabTitle: String;
  isSelectedTab: boolean;
  onClick: () => void;
  //1. 제목
  //2. 클릭했을 때 어떻게 되는지?

  //3. 색깔 바꿀꺼니?
};

const Tab = ({ tabTitle, isSelectedTab, onClick }: TabProps) => {
  return (
    <div onClick={onClick} className="w-full">
      <div>
        <h2
          className={`font-[RaemianNarae] text-[20px] pb-[12px] ${
            isSelectedTab ? "text-[#0092A2]" : "text-[#01353F]"
          }`}
        >
          {tabTitle}
        </h2>
        <span
          className={`block border-solid border-b-4 w-full ${
            isSelectedTab ? "border-[#0092A2]" : "border-[#D9D9D9]"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default Tab;
