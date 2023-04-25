import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../constants/baseUrl";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [waiting, setWaiting] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const unserializedData = JSON.parse(storedData);
      setUser(unserializedData);
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function signIn(event) {
    event.preventDefault();
    setWaiting(true);
    axios
      .post(`${BASE_URL}/sign-in`, form)
      .then((response) => {
        console.log(response);
        const data = response.data;
        const serializedData = JSON.stringify(data);
        localStorage.setItem("userData", serializedData);
        setUser(data);
        setWaiting(false);
        navigate("/home");
      })
      .catch((err) => {
        setWaiting(false);
        alert(err.response.data);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          placeholder="Senha"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="off"
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
            "Entrar"
          )}
        </button>
      </form>
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a{
    margin-top: 10px;
  }
`;
