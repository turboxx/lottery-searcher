import React, {ChangeEvent, useCallback, useState} from 'react';
import {LotteryRecord} from "../../types/Lottery";
import RecordRow from "../RecordRow";

type LotteryRecordsProps = {
  records: LotteryRecord[]
};

const LotteryRecords = ({ records }: LotteryRecordsProps) => {
  const [filterNumber, setFilterNumber] = useState<string>("")

  const updateFilterNumber = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setFilterNumber(value.target.value || "");
  }, [])

  const filterCallback = useCallback((record: LotteryRecord) => {
    return record.firstDraft.result.includes(filterNumber) || record.secondDraft.result.includes(filterNumber)
  }, [filterNumber])

  return (
    <div>
      <input className="my-3" type="number" onChange={updateFilterNumber} placeholder="Search..."/>
      <div>Showing first 100 results...</div>
      <div className="flex flex-wrap overflow-hidden my-2">
        <span className="w-1/3 bold"><b>Date</b></span>
        <span className="w-1/3"><b>First Draft</b></span>
        <span className="w-1/3"><b>Second Draft</b></span>
      </div>
      {records.filter(filterCallback).slice(0, 100).map(record => <RecordRow key={record.date} record={record} search={filterNumber} />)}
    </div>
  );
};

export default LotteryRecords;
