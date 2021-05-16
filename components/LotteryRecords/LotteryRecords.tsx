import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {LotteryRecord} from "../../types/Lottery";
import RecordRow from "../RecordRow";

type LotteryRecordsProps = {
  records: LotteryRecord[]
};

const LotteryRecords = ({ records }: LotteryRecordsProps) => {
  const [filterNumber, setFilterNumber] = useState<string>("")
  const [filteredRecords, setFilteredRecords] = useState(records);

  const updateFilterNumber = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setFilterNumber(value.target.value || "");
  }, [])

  const filterCallback = useCallback((record: LotteryRecord) => {
    const numbers = filterNumber.trim().split(' ');

    return !numbers.some(number => !record.firstDraft.drafts.includes(number)) || !numbers.some(number => !record.secondDraft.drafts.includes(number))
  }, [filterNumber])

  useEffect(() => {
    setFilteredRecords(!filterNumber ? records : records.filter(filterCallback));
  }, [filterNumber])

  const splitFilterNumber = filterNumber.trim().split(' ');

  return (
    <div>
      <input className="my-3" type="text" onChange={updateFilterNumber} placeholder="Search..."/>
      <div>Showing first 100 results...</div>
      <div className="flex flex-wrap overflow-hidden my-2">
        <span className="w-1/3 bold"><b>Date</b></span>
        <span className="w-1/3"><b>First Draft</b></span>
        <span className="w-1/3"><b>Second Draft</b></span>
      </div>
      {filteredRecords.slice(0, 100).map(record => <RecordRow key={record.date} record={record} search={splitFilterNumber} />)}
    </div>
  );
};

export default LotteryRecords;
