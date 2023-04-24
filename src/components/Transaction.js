import styled from "styled-components";
import { TiDelete } from "react-icons/ti";

export default function Transaction({ date, description, value, type }) {
  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{description}</strong>
      </div>
      <div>
        <Value color={type}>{value}</Value>
        <TiDelete />
      </div>
    </ListItemContainer>
  );
}

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
  div{
    display: flex;
  }
  svg{
    margin: 0 5px;
    color: #C6C6C6;
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" ? "green" : "red")};
`;
