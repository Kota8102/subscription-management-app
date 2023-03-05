import Link from "next/link";

import RoundedRectangleButton from "@atoms/roundedRectangleButton";
import Title from "@atoms/title";
// import SubscriptionTable from "@organisms/subscriptionTable";
import SubscriptionTable from "@organisms/subscriptionTable";
import { useTranslation } from "@utils/useTranslation";

import styles from "./styles.module.css";

type SubscriptionWrapProps = {
  subscriptionList: { service: string; price: string; paymentFrequency: string; subscId: string }[];
};

type defineType = { service?: string; price?: string; frequency?: string; subscId?: string };

const SubscriptionWrap = (props: SubscriptionWrapProps) => {
  const { t } = useTranslation();
  const subscTableList: defineType[] = [];

  props.subscriptionList.map((v) => {
    const subscTableItem: defineType = Object.assign({});
    subscTableItem.service = v.service;
    subscTableItem.price = v.price;
    subscTableItem.frequency = v.paymentFrequency;
    subscTableItem.subscId = v.subscId;
    subscTableList.push(subscTableItem);
  });

  return (
    <>
      <div className={styles.container}>
        <Title
          content={t.HOME_SUBSCRIPTION}
          className={styles.title}
        />
        <AddSubscriptionButton content={t.ADD_SUBSCRIPTION} />
        <SubscriptionTable
          className={styles.dt}
          subscTableList={subscTableList}
        />
      </div>
    </>
  );
};

const AddSubscriptionButton = (props: { content: string }) => {
  return (
    <>
      <Link href="/addSubscription">
        <RoundedRectangleButton
          content={props.content}
          handleClick={() => {
            return;
          }}
          className={styles.addSubscriptionButton}
          type="submit"
          disabled={false}
        />
      </Link>
    </>
  );
};

export default SubscriptionWrap;
