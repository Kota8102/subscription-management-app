import TableRow from "@atoms/tableRow";

import styles from "./styles.module.css";

type TableBodyProps = {
  subscriptionList: Array<defineType>;
  className: string;
  handleOpen: (subscId: string) => void;
};

type defineType = { service: string; price: string; frequency: string };

const TableBody = (props: TableBodyProps) => {
  return (
    <tbody>
      {props.subscriptionList?.map((body, index) => {
        return (
          <TableRow
            subscription={body}
            className={styles.tableBodyRow}
            key={`body${index}`}
            handleOpen={props.handleOpen}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
