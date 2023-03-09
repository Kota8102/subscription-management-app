import Head from "next/head";

import { GetServerSideProps } from "next";

import EditSubscModal from "@organisms/editSubscModal";
import Header from "@organisms/header";
import PaymentSchedule from "@organisms/paymentSchedule";
import SubscriptionWrap from "@organisms/subscription";
import axios from "@utils/useApi";
import { getTranslation, Translation } from "@utils/useTranslation";

import Modal from "src/components/templates/modal";

import { useHome } from "./hooks";
import styles from "./styles.module.css";

type HomeProps = {
  t: Translation;
  // data: Subscription[] | null;
  data: any;
};

const Home = (props: HomeProps) => {
  const { isModalOpen, modalSubscId } = useHome();
  console.log("sss");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Header />
          <PaymentSchedule subscriptionList={props.data} />
          <SubscriptionWrap subscriptionList={props.data} />
          <Modal isOpen={isModalOpen}>
            <EditSubscModal />
          </Modal>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lang, uid } = context.query;
  const t = getTranslation(lang);

  if (uid) {
    const data = await axios
      .get(`/subsc?user_id=${uid}`)
      .then((res) => {
        const fetchedData = res.data;

        return fetchedData.map((v) => ({
          service: v.subsc_name,
          price: Number(v.price),
          nextPaymentDate: v.next_payment_date,
          paymentFrequency: v.payment_frequency,
          subscId: v.subsc_id,
        }));
      })
      .catch((err) => {
        console.log(t.ERROR_FAILED_TO_FETCH);

        return null;
      });

    return { props: { t, data } };
  } else {
    return { props: { t, data: null } };
  }
};

export default Home;
