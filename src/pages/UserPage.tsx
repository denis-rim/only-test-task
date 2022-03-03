import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../state/state";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 770px;
  width: 90vw;

  & p {
    font-size: 2.5rem;
  }

  & span {
    font-weight: 700;
    font-size: 2.5rem;
  }
`;

export const Button = styled.button`
  margin-top: 2.5rem;
  font-size: 1.2rem;
  padding: 1rem 4.5rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #f5f5f5;
  color: #000;
  outline-offset: 0.15rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #c2c2c2;
  }

  &:focus {
    outline: 2px solid #000;
  }
`;

function UserPage() {
  const { user, signout } = useAuth();

  const navigate = useNavigate();

  return (
    <Container>
      <p>
        Здравствуйте, <span>{user}</span>
      </p>
      <Button
        onClick={() =>
          signout(() => {
            navigate("/");
          })
        }
      >
        Выйти
      </Button>
    </Container>
  );
}

export default UserPage;
