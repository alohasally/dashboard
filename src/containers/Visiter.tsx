import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const startDate = new Date("2023-03-15");
const year = startDate.getFullYear();
const month = startDate.getMonth() + 1;
const date = startDate.getDate();
const day = startDate.getDay();
const now = new Date();
const usedTime = now.getTime() - startDate.getTime();
const days = Math.ceil(usedTime / (1000 * 60 * 60 * 24) - 1);

console.log(year, month, date, day, now);

type VisitorResItem = {
  date: number;
  gender: 1 | 2;
  age: 10 | 20 | 30 | 40 | 50 | 60;
  count: number;
};

const Visiter = () => {
  const { data } = useSWR<VisitorResItem[]>(
    "http://localhost:3003/api?stat=visitorStatistic",
    fetcher
  );

  return (
    <div className="max-w-[1104px] mx-auto space-y-10 mt-10">
      <div className="flex ">
        <div className="w-full h-[#266px] bg-[#EDEDED] space-y-6">
          <div className="flex justify-start items-center pl-14 pt-11 space-x-2 ">
            <img src="./chartline.png" alt="" />
            <h1 className="text-[24px]">통계 한눈에 보기</h1>
          </div>
          <div className="flex justify-center items-center w-[980px] mx-auto pb-8 space-x-4">
            <div className="flex h-[132px] w-full bg-white">
              <div className="flex-1 text-left pl-4 pt-4">
                <h3 className="text-[20px] text-black font-bold  ">
                  서비스 기간
                </h3>
                <p className="text-[14px] text-[#000] text-opacity-40">
                  {`${year}년 ${month}월 ${date}일 부터`}
                </p>
              </div>
              <div className="flex justify-end items-end align-baseline pr-6 pb-3">
                <span className="text-[#B34F00] text-[36px] font-bold flex items-end h-full leading-[0.85em]">
                  +{days}
                </span>
                <div className="text-[#6B6B6B] text-[16px]">일</div>
              </div>
            </div>
            <div className="bg-white h-[132px] w-full">
              <div className="text-left pl-4 pt-4">
                <h3 className="text-[20px] text-black font-bold">
                  누적 방문자
                </h3>
                <p className="text-[14px] text-[#fff] text-opacity-0">d</p>
              </div>
              <div className="flex items-center justify-end pr-6 ">
                <span className="text-[#B34F00] text-[36px] font-bold">
                  999,999,999
                </span>
                <p>명</p>
              </div>
            </div>
            <div className="bg-white h-[132px] w-full">
              <div className="text-left pl-4 pt-4">
                <h3 className="text-[20px] text-black font-bold">
                  방문자가 가장 많은 날
                </h3>
                <p className="text-[14px] text-[#fff] text-opacity-0">d</p>
              </div>
              <div className="flex items-center justify-end pr-6">
                <span className="text-[#B34F00] text-[36px] font-bold">
                  2023
                </span>
                <p>년</p>
                <span className="text-[#B34F00] text-[36px] font-bold">12</span>
                <p>월</p>
                <span className="text-[#B34F00] text-[36px] font-bold">25</span>
                <p>일</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visiter;
