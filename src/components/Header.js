import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { BiExit } from "react-icons/bi";

export default function Header({logOut}) {
  const { user } = useContext(UserContext);

  return (
    <HeaderContainer>
      <h1>Olá, {user.name}</h1>
      <BiExit onClick={logOut} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
