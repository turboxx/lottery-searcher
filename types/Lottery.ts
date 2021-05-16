export type LotteryDraft = {
  drafts: string[];
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
