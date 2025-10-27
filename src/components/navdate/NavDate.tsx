import "./NavDate.css";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import NavDateItem from "./NavDateItem";
import NavDateNav from "./NavDateNav";

export interface DateData {
  value: string;
  date: number;
  day: string;
}

const LENGTH_OF_DAY = 24 * 60 * 60 * 1000;
const DAYS_COUNT = 35;
const DAYS_OF_WEEK = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

const now = new Date();

const today = new Date(now.getTime() - (now.getTime() % LENGTH_OF_DAY) + 1);

const dateList: DateData[] = Array.from({ length: DAYS_COUNT }, (_, i) => {
  return new Date(today.getTime() + LENGTH_OF_DAY * i);
}).map((date) => {
  return {
    value: date.toISOString().split("T")[0],
    date: date.getDate(),
    day: DAYS_OF_WEEK[date.getDay()],
  };
});

export default function NavDate(): ReactNode {
  const [activeDate, setActiveDate] = useState(dateList[0]["value"]);

  const [listTranslate, setListTranslate] = useState(0);

  const elList = useRef<HTMLUListElement>(null);
  const elListWrapper = useRef<HTMLDivElement>(null);

  const [listWidth, setListWidth] = useState(0);
  const [listWrapperWidth, setListWrapperWidth] = useState(0);

  useEffect(() => {
    if (elListWrapper.current && elList.current) {
      setListWidth(elList.current.offsetWidth);

      setListWrapperWidth(elListWrapper.current.offsetWidth);
    }
  }, []);

  return (
    <section className="nav-line">
      <div className="nav-line__list-wrapper" ref={elListWrapper}>
        <ul
          className="row nav-line__list"
          ref={elList}
          style={{
            transform: `translateX(${listTranslate}px)`,
          }}
        >
          {dateList.map(
            (dateItem: DateData): ReactNode => (
              <NavDateItem
                key={dateItem.value}
                isActiveDate={activeDate === dateItem.value}
                setActiveDate={setActiveDate}
                {...dateItem}
              />
            )
          )}
        </ul>
      </div>

      <NavDateNav
        setTranslate={setListTranslate}
        translate={listTranslate}
        translateStep={listWrapperWidth}
        maxTranslate={listWrapperWidth - listWidth}
      />
    </section>
  );
}
