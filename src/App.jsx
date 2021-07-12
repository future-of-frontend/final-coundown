import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import "./App.css";

const dueDate = DateTime.fromISO("2021-07-21T19:00:00.000+03:00");

const pluralRules = new Intl.PluralRules("uk");

const getRemaining = () => dueDate.diffNow();

const plurals = {
  day: {
    one: "день",
    few: "дні",
    many: "днів",
  },
  hour: {
    one: "година",
    few: "години",
    many: "годин",
  },
  minute: {
    one: "хвилина",
    few: "хвилини",
    many: "хвилин",
  },
  second: {
    one: "секунда",
    few: "секунди",
    many: "секунд",
  },
};

const App = () => {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [days, hours, minutes, seconds] = remaining
    .toFormat("d:h:m:s")
    .split(":")
    .map(Number);

  const time = [
    {
      key: "day",
      value: days,
    },
    {
      key: "hour",
      value: hours,
    },
    {
      key: "minute",
      value: minutes,
    },
    {
      key: "second",
      value: seconds,
    },
  ];

  return (
    <div className="wrapper">
      <div className="title">У вас залишилось:</div>
      <div className="time">
        {time.map(({ key, value }) => (
          <span key={key} className="unit">
            <span className="value">{value}</span>
            <span className="label">
              {plurals[key][pluralRules.select(value)]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
