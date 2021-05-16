export type LotteryDraft = {
  1: string,
  2: string,
  3: string,
  4: string,
  5: string,
  6: string,
  result: string;
  extra: string;
};

export type LotteryRecord = {
  date: string;
  year: string;
  week: string;
  day: string;
  firstDraft: LotteryDraft;
  secondDraft: LotteryDraft;
}
