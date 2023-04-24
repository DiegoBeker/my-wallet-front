import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import BASE_URL from "../constants/baseUrl";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function signUp(event) {
    event.preventDefault();
    setWaiting(true);
    if (form.password === form.confirmPassword) {
      const body = { ...form };
      delete body.confirmPassword;

      axios
        .post(`${BASE_URL}/sign-up`, body)
        .then((response) => {
          setWaiting(false);
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data);
          setWaiting(false);
        });
    } else {
      alert("Senhas não são iguais!");
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
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
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
