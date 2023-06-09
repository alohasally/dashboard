import React, { useEffect, useState } from "react";
import useSWR from "swr";
import userSWRImmutable from "swr/immutable";
import BarChartBox from "../components/BarChartBox";
import LineChartBox from "../components/LineChartBox";
import PieChartBox from "../components/PieChartBox";
import { log } from "console";
import { access } from "fs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const startDate = new Date("2023-03-15");
const year = startDate.getFullYear();
const month = startDate.getMonth() + 1;
const date = startDate.getDate();
const day = startDate.getDay();
const now = new Date();
const usedTime = now.getTime() - startDate.getTime();
const days = Math.ceil(usedTime / (1000 * 60 * 60 * 24) - 1);

// console.log(year, month, date, day, now);

type VisitorResItem = {
  date: number;
  gender: 1 | 2;
  age: 10 | 20 | 30 | 40 | 50 | 60;
  count: number;
};

type VisitorStatResult = {
  [key in number]: number;
};

type LineChartData = { date: string; count: number };
type BarChartData = { age: string; male: number; female: number };
type PieChartData = { gender: string; count: number };

const Visiter = () => {
  const { data, isLoading } = useSWR<VisitorResItem[]>(
    "http://localhost:3003/api?stat=visitorStatistic",
    fetcher
  );
  console.log(data);
  // 렌더링하기 까지 데이터를 다시 가지고 올 수 없기 때문에!
  // 함수인데 비동기적으로
  // const [data, setData] = useState();

  const [count, setCount] = useState(0);
  const [bestYear, setBestYear] = useState("2023");
  const [bestDate, setBestDate] = useState("01");
  const [bestMonth, setBestMonth] = useState("01");
  const [lineChartData, setLineChartData] = useState<LineChartData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [pieChartData, setpieChartData] = useState<PieChartData[]>([]);
  // 상태관리?

  function getTotalVisitor(data: VisitorResItem[]) {
    let total = 0;

    for (let i = 0; i < data.length; i++) {
      total += data[0].count;
    }

    return total;
  }

  function getBestDates(data: VisitorResItem[]) {
    let result: VisitorStatResult = {};
    for (let i = 0; i < data.length; i++) {
      if (result[data[i].date]) {
        result[data[i].date] += data[i].count;
      } else {
        result[data[i].date] = data[i].count;
      }
    }

    console.log(`result ${result}`);
    const resultArray = Object.entries(result);
    console.log(resultArray);
    const bestDay = resultArray.sort((a, b) => b[1] - a[1]);
    console.log(bestDay);
    const bestYear = bestDay[0][0].slice(0, 4);
    console.log(bestYear);
    const bestMonth = bestDay[0][0].slice(4, 6);
    const bestDate = bestDay[0][0].slice(6, 8);

    return {
      result,
      bestYear,
      bestDate,
      bestMonth,
    };
  }

  function getLineChartData(result: VisitorStatResult): LineChartData[] {
    //1.result 객체를 배열로 바꾸기
    let resultArray = Object.entries(result);
    let resultGraph: LineChartData[] = resultArray.map((item) => ({
      date: `${Number(item[0].slice(4, 6))}.${Number(item[0].slice(6, 8))}`,
      count: item[1],
    }));
    console.log(resultGraph);

    return resultGraph;
  }

  const initialResult = {
    "10": {
      male: 0,
      female: 0,
    },
    "20": {
      male: 0,
      female: 0,
    },
    "30": {
      male: 0,
      female: 0,
    },
    "40": {
      male: 0,
      female: 0,
    },
    "50": {
      male: 0,
      female: 0,
    },
    "60": {
      male: 0,
      female: 0,
    },
  };

  // type VisitorResItem = {
  //   date: number;
  //   gender: 1 | 2;
  //   age: 10 | 20 | 30 | 40 | 50 | 60;
  //   count: number;
  // };

  // type BarChartData = {
  //   age: number;
  //     man: number;
  //     woman: number;
  // };

  function getBarChartData(data: VisitorResItem[]): BarChartData[] {
    //1. 데이터 배열을 순회하면서 값을 확인하고 담을 객체그릇을 만들어준다.
    let resultAge = Object.entries(
      data.reduce<{
        [key: string]: {
          male: number;
          female: number;
        };
      }>((acc, item) => {
        const age = String(item.age);
        acc[age] = {
          ...acc[age],
          ...(item.gender === 1
            ? { male: (acc[age].male += item.count) }
            : { female: (acc[age].female += item.count) }),
        };
        return acc;
      }, initialResult)
    ).map((item) => ({
      age: item[0],
      male: item[1].male,
      female: item[1].female,
    }));
    return resultAge;
    //2. age가 키값이고 man,woman의 값을 가진 객체를 만들어준다.
    //3. 처음에 키값이 없을 경우에는 값을 그대로 가지고 온다.
    //4. 키캆이 있을 경우에는 값을 계속 합산한다.
    //5. 이 객체를 배열로 만들어준다.
  }

  function getPieChartData(data: VisitorResItem[]): PieChartData[] {
    let resultGender = Object.entries(
      data.reduce(
        (acc, item) => {
          if (item.gender === 1) {
            acc.male += item.count;
          } else {
            acc.female += item.count;
          }
          return acc;
        },
        {
          male: 0,
          female: 0,
        }
      )
    ).map((item) => ({
      gender: item[0],
      count: item[1],
    }));
    return resultGender;
  }

  useEffect(() => {
    if (!data) return;
    // 자바스크립트 원리 때문에 하나의 싱글 쓰레드
    // 데이터를 받아서 가지고 와도 처음 위치에 있는 곳으로 데이터를 적용시키지 못함

    //함수로 밖으로 빼내서 그 함수명만 불러오면 간단하게 할 수 있음
    const total = getTotalVisitor(data);
    const { result, bestYear, bestMonth, bestDate } = getBestDates(data);
    const lineChartdata = getLineChartData(result);
    const barChartData = getBarChartData(data);
    const pieChartData = getPieChartData(data);

    setBestYear(bestYear);
    setBestMonth(bestMonth);
    setBestDate(bestDate);
    setCount(total);
    setLineChartData(lineChartdata);
    setBarChartData(barChartData);
    setpieChartData(pieChartData);
  }, [data]);

  return (
    <div className="max-w-[1104px] mx-auto space-y-10 mt-10">
      <div className="flex ">
        <div className="w-full h-[#266px] bg-[#EDEDED] space-y-6">
          <div className="flex justify-start items-center pl-14 pt-11 space-x-2 ">
            <img src="./activity.png" alt="" />
            <h1 className="text-[24px] font-bold font-[Noto Sans KR]">
              통계 한눈에 보기
            </h1>
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
              <div className="flex justify-end items-end align-baseline pr-6 pb-5">
                <span className="text-[#B34F00] text-[36px] font-bold flex items-end h-full leading-[0.85em] ">
                  +{days}
                </span>
                <div className="text-[#6B6B6B] text-[16px]">일</div>
              </div>
            </div>
            <div className="flex bg-white h-[132px] w-full">
              <div className="flex-1 text-left pl-4 pt-4">
                <h3 className="text-[20px] text-black font-bold">
                  누적 방문자
                </h3>
                <p className="text-[14px] text-[#fff] text-opacity-0">d</p>
              </div>
              <div className="flex justify-end items-end align-baseline pr-6 pb-5">
                <span className="text-[#B34F00] text-[36px] font-bold flex items-end h-full leading-[1] ">
                  {count.toLocaleString() ?? "언디파인드"}
                </span>
                <p className="text-[#6B6B6B] text-[16px]">명</p>
              </div>
            </div>
            <div className="flex-col bg-white h-[132px] w-full space-y-3">
              <div className="flex-1 text-left pl-4 pt-4">
                <h3 className="text-[20px] text-black font-bold">
                  방문자가 가장 많은 날
                </h3>
                <p className="text-[14px] text-[#fff] text-opacity-0">d</p>
              </div>
              <div className="flex items-end justify-end align-baseline pr-6">
                <span className="flex items-end h-full leading-[1] text-[#B34F00] text-[36px] font-bold">
                  {bestYear}
                </span>
                <p className="text-[#6B6B6B] text-[16px]">년</p>
                <span className="flex items-end h-full leading-[1] text-[#B34F00] text-[36px] font-bold">
                  {bestMonth}
                </span>
                <p className="text-[#6B6B6B] text-[16px]">월</p>
                <span className="text-[#B34F00] text-[36px] font-bold h-full leading-[1]">
                  {bestDate}
                </span>
                <p className="text-[#6B6B6B] text-[16px]">일</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1104px] h-[494px] mx-auto w-full bg-[#EDEDED]">
        <div className="space-y-6">
          <div className="flex justify-start items-center pl-14 pt-11 space-x-2 ">
            <img src="./chartline.png" alt="" />
            <h1 className="text-[24px] font-bold font-[Noto Sans KR]">
              방문자 접속 통계
            </h1>
          </div>
          <div className="flex justify-center items-center  ">
            <div className="flex justify-center items-center w-[981px] bg-white h-[348px]">
              <LineChartBox data={lineChartData} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1104px] h-[494px] bg-[#EDEDED] mx-auto mt-10">
        <div className="flex space-x-18 ">
          <div className="w-[585px] h-[#399px] space-y-4 px-10">
            <div className="flex justify-start items-center pl-8 pt-11 space-x-2 ">
              <img src="./chartbar.png" alt="" />
              <h1 className="text-[24px] font-bold font-[Noto Sans KR]">
                연령별 방문자 비율
              </h1>
            </div>
            <div className="flex-1 justify-center items-center">
              <div className=" bg-white  h-[348px] ">
                <BarChartBox data={barChartData} />
              </div>
            </div>
          </div>
          <div className="h-[#266px] w-[366px] space-y-4">
            <div className="flex justify-start items-end pl-14 pt-11 space-x-2">
              <img src="./chartpieslice.png" alt="" />
              <h1 className="text-[24px]  font-bold font-[Noto Sans KR]">
                성별 방문자 비율
              </h1>
            </div>
            <div className="flex-1 justify-center items-center">
              <div className=" bg-white h-[348px]">
                <PieChartBox data={pieChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visiter;
