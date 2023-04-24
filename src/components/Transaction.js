import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function Transaction({ id, date, description, value, type , deleteTransaction}) {
  const navigate = useNavigate();

  function editTransaction() {
    navigate(`/editar-registro/${type}`, {
      state: { id: id, value: value, description: description },
    });
  }

  function handleDeleteTransaction() {
    deleteTransaction(id);
  }

  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong onClick={editTransaction}>{description}</strong>
      </div>
      <div>
        <Value color={type}>{value.replace(".", ",")}</Value>
        <TiDelete onClick={handleDeleteTransaction} />
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
  div {
    display: flex;
    align-items: center;
  }
  svg {
    margin-left: 5px;
    color: #c6c6c6;
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" ? "green" : "red")};
`;
