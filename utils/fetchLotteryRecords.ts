import fs from "fs";
import parse from "csv-parse";
import {LotteryRecord} from "../types/Lottery";

const columns = [
  'date',
  'year',
  'week',
  'day',
  '1:1',
  '1:2',
  '1:3',
  '1:4',
  '1:5',
  '1:6',
  '1:extra',
  '2:1',
  '2:2',
  '2:3',
  '2:4',
  '2:5',
  '2:6',
  '2:extra',
]

const toDraft = (record: any, draft: 1 | 2) => {
  let draftResult = ``;
  let draftNumbers: { drafts: string[], extra: string } = {
    drafts: [],
    extra: record[`${draft}:extra`],
  };

  for (let i = 1; i <= 6; i += 1) {
    const draftNumber = record[`${draft}:${i}`];
    draftNumbers.drafts.push(draftNumber);
    draftResult += `${draftNumber} `;
  }

  return {
    result: draftResult.trimRight(),
    ...draftNumbers,
  };
}

const formatRecord = (record: any) => ({
  date: record.date,
  year: record.year,
  week: record.week,
  day: record.day,
  'firstDraft': toDraft(record, 1),
  'secondDraft': toDraft(record, 2),
})

export const fetchLotteryRecords = () => new Promise<LotteryRecord[]>((resolve, reject) => {
  fs.readFile(`./public/sources/sportka.csv`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      reject("Error Fetching Source File");
      return;
    }

    parse(data, {
      columns,
      delimiter: ';',
      from_line: 2,
      onRecord: formatRecord,
    }, (parseErr, output) => {
      if (parseErr) {
        console.error(parseErr);
        reject("Error Parsing Source File");
        return;
      }

      resolve(output);
    })
  });
})
