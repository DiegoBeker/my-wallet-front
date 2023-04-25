import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../constants/baseUrl";
import UserContext from "../contexts/UserContext";
import { BiHome } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";

export default function TransactionsPage() {
  const [form, setForm] = useState({ value: "", description: "" });
  const [waiting, setWaiting] = useState(false);
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
    setWaiting(true);
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .post(
          `${BASE_URL}/transactions`,
          {
            value: form.value.replace(",", "."),
            description: form.description,
            type: tipo,
          },
          config
        )
        .then((response) => {
          setWaiting(false);
          navigate("/home");
        })
        .catch((err) => {
          alert(err.response.data);
          setWaiting(false);
        });
    } else {
      navigate("/");
    }
  }

  return (
    <TransactionsContainer>
      <header>
        <h1>Nova {tipo === "income" ? "entrada" : "saída"}</h1>
        <Link to="/home">
          <BiHome />
        </Link>
      </header>
      <form onSubmit={postTransaction}>
        <input
          placeholder="Valor"
          type="text"
          name="value"
          value={form.value}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          autoComplete="off"
          autoCapitalize="sentences"
          required
        />
        <button disabled={waiting}>
          {waiting ? (
            <ThreeDots
              height="20"
              width="40"
              radius="26"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : tipo === "income" ? (
            "Salvar entrada"
          ) : (
            "Salvar saída"
          )}
        </button>
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
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    align-items: center;
    h1 {
      font-size: 26px;
      font-weight: 700;
    }
    svg {
      font-size: 26px;
      color: white;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
