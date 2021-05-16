import * as React from 'react'
import Layout from '../components/Layout'
import {GetStaticProps, NextPage} from 'next'
import {LotteryRecord} from "../types/Lottery";
import {fetchLotteryRecords} from "../utils/fetchLotteryRecords";
import LotteryRecords from "../components/LotteryRecords/LotteryRecords";

type Props = {
  lotteryRecords: LotteryRecord[];
}

const IndexPage: NextPage<Props> = ({ lotteryRecords }: Props) => {
  return (
    <Layout title="Sportka Lottery Records">
      <div className="mb-5">
        <h1>Sportka Lottery Records 🔮</h1>
        <h2># Records {lotteryRecords.length}</h2>
        <h2>Last record {lotteryRecords[0].date}</h2>
      </div>
      <LotteryRecords records={lotteryRecords}/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lotteryRecords = await fetchLotteryRecords();

  return {
    props: {
      lotteryRecords,
    },
  };
};

export default IndexPage
