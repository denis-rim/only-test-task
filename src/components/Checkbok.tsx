import React from "react";
import styled from "styled-components";

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 1rem;
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.2rem;
  width: 1.2rem;

  border: 2px solid #000;
  border-radius: 4px;

  ${Input}:checked ~ & {
    background-color: #4a67ff;
    border: 2px solid #4a67ff;
    border-radius: 4px;
  }

  ${Input}:checked ~ .checkmark:after {
    display: block;
  }
`;

interface CheckboxProps {
  disabled: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ checked, disabled, onChange }: CheckboxProps) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Container>
        Сохранить пароль
        <Input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <Checkmark />
      </Container>
    </div>
  );
}

export default Checkbox;
