import React, { useState, useEffect } from "react";
import moment from "moment";
import { optionProps } from "../components/custom/select";

export const useRange = () => {
  const [range, setRange] = useState<optionProps[]>([]);

  useEffect(() => {
    let m = moment(moment(new Date()).format("YYYY-MM-DD"), "YYYY-MM-DD");
    let m_1 = moment(new Date()).format("YYYY-MM-DD").split("-");

    let today = {
      start_date: moment(new Date()).format("YYYY-MM-DD"),
      end_date: m.add(1, "day").format("YYYY-MM-DD"),
    };

    let yesterday = {
      start_date: m.subtract("2", "days").format("YYYY-MM-DD"),
      end_date: moment(new Date()).format("YYYY-MM-DD"),
    };

    let last_7_days = {
      start_date: m.subtract("7", "days").format("YYYY-MM-DD"),
      end_date: moment(new Date()).format("YYYY-MM-DD"),
    };

    let last_30_days = {
      start_date: m_1[0]
        .concat("-")
        .concat("0", (Number(m_1[1]) - 1).toString(), '-')
        .concat((Number(m_1[2]) - 1).toString()),
      end_date: moment(new Date()).format("YYYY-MM-DD"),
    };

    let this_month = {
      start_date: m_1[0].concat("-").concat(m_1[1]).concat("-01"),
      end_date: m_1[0]
        .concat("-")
        .concat("0", (Number(m_1[1]) + 1).toString())
        .concat("-01"),
    };

    let last_month = {
      end: m_1[0].concat("-").concat(m_1[1]).concat("-01"),
      end_date: m_1[0]
        .concat("-")
        .concat("0", (Number(m_1[1]) - 1).toString())
        .concat("-01"),
    };

    setRange([
      { value: JSON.stringify(today), label: "Today" },
      { value: JSON.stringify(yesterday), label: "Yesterday" },
      { value: JSON.stringify(last_7_days), label: "Last 7 days" },
      { value: JSON.stringify(last_30_days), label: "Last 30 days" },
      { value: JSON.stringify(this_month), label: "This month" },
      { value: JSON.stringify(last_month), label: "Last month" },
    ]);
  }, []);
  return range;
};
