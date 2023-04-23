import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Transaction from "../components/Transaction";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import BASE_URL from "../constants/baseUrl";

export default function HomePage() {
  const [transactions, setTransactions] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(transactions);

  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .get(`${BASE_URL}/transactions`, config)
        .then((response) => {
          const auxTransactions = response.data;
          let auxBalance = 0;
          auxTransactions.forEach((transaction) => {
            if (transaction.type === "income") {
              auxBalance += Number(transaction.value);
            } else {
              auxBalance -= Number(transaction.value);
            }
          });
          setTransactions(auxTransactions.reverse());
          setBalance(auxBalance);
        })
        .catch((err) => alert(err.response.data));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  function logOut(){
    localStorage.removeItem("userData");
    navigate("/");
  }

  if (transactions === undefined) {
    return <>Carregando...</>;
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logOut}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((t) => (
            <Transaction
              date={t.date}
              description={t.description}
              value={t.value}
              type={t.type}
            />
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>
            {balance.toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button
          onClick={() => {
            navigate("/nova-transacao/income");
          }}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>

        <button
          onClick={() => {
            navigate("/nova-transacao/expense");
          }}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
