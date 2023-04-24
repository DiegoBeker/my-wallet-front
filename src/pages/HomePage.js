import styled from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import BASE_URL from "../constants/baseUrl";
import Header from "../components/Header";
import { Oval } from "react-loader-spinner";
import Transactions from "../components/Transactions";

export default function HomePage() {
  const [transactions, setTransactions] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  function logOut() {
    localStorage.removeItem("userData");
    navigate("/");
  }

  if (transactions === undefined) {
    return (
      <HomeContainer>
        <LoaderContainer>
          <Oval
            height={80}
            width={80}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#dedede"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </LoaderContainer>
      </HomeContainer>
    );
  }
  return (
    <HomeContainer>
      <Header logOut={logOut} />

      <TransactionsContainer>
        {transactions.length === 0 ? (
          <NoTransactionsMessage>Não há registros de entrada ou saída</NoTransactionsMessage>
        ) : (
          <Transactions transactions={transactions} balance={balance} />
        )}
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
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
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

const LoaderContainer = styled.div`
  height: 80px;
  width: 80px;
  margin: auto;
`;

const NoTransactionsMessage = styled.p`
  width: 180px;
  font-size: 20px;
  font-weight: 400;
  color: #868686;
  margin: auto;
  text-align: center;
`;
