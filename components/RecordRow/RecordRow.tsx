import React from 'react';
import {LotteryRecord} from "../../types/Lottery";

const getHighlightedText = (text: string, highlight?: string) => {
  if (!highlight) {
    return text;
  }
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) =>
    <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
  } </span>;
}

type RecordRowProps = {
  record: LotteryRecord
  search?: string;
};

const RecordRow = ({record, search}: RecordRowProps) => {
  return (
    <div className="flex flex-wrap overflow-hidden">
      <div className="w-1/3">{record.date}</div>
      <div className="w-1/3">{getHighlightedText(record.firstDraft.result, search)}</div>
      <div className="w-1/3">{getHighlightedText(record.secondDraft.result, search)}</div>
    </div>
  );
};

export default RecordRow;
