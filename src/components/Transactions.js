import styled from "styled-components";
import Transaction from "./Transaction";

export default function Transactions({transactions,balance,deleteTransaction}) {
  return (
    <>
      <ul>
        {transactions.map((t) => (
          <Transaction
            key={t._id}
            id={t._id}
            date={t.date}
            description={t.description}
            value={t.value}
            type={t.type}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value color={balance >= 0 ? "positivo" : "negativo"}>
          {balance.toFixed(2).replace(".", ",")}
        </Value>
      </article>
    </>
  );
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;