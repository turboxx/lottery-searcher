import React from 'react';
import {LotteryRecord} from "../../types/Lottery";

const getHighlightedText = (drafts: string[], highlight?: string[]) => {
  if (!highlight?.length) {
    return drafts.join(' ');
  }

  return <span>
    { drafts.map((draftedNumber, i) =>
      <span key={i} style={highlight.includes(draftedNumber.toLowerCase()) ? { fontWeight: 'bold' } : {} }>
        { draftedNumber } { i <= draftedNumber.length - 1 ? " " : ''}
      </span>)
    }
  </span>;
}

type RecordRowProps = {
  record: LotteryRecord
  search?: string[];
};

const RecordRow = ({record, search}: RecordRowProps) => {
  return (
    <div className="flex flex-wrap overflow-hidden">
      <div className="w-1/3">{record.date}</div>
      <div className="w-1/3">{getHighlightedText(record.firstDraft.drafts, search)}</div>
      <div className="w-1/3">{getHighlightedText(record.secondDraft.drafts, search)}</div>
    </div>
  );
};

export default RecordRow;
