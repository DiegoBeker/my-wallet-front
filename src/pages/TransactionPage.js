import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../constants/baseUrl";
import UserContext from "../contexts/UserContext";

export default function TransactionsPage() {
  const [form, setForm] = useState({ value: "", description: "" });
  const { tipo } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function postTransaction(event) {
    event.preventDefault();
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .post(`${BASE_URL}/transactions`, { ...form, type: tipo }, config)
        .then((response) => {
          console.log(response.data);
          navigate("/home");
        })
        .catch((err) => alert(err.response.data));
    } else {
      navigate("/");
    }
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo === "income" ? "entrada" : "saída"}</h1>
      <form onSubmit={postTransaction}>
        <input
          placeholder="Valor"
          type="text"
          name="value"
          value={form.value}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
