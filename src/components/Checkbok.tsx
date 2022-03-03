import React from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label<{ disabled: boolean }>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 1rem 1.6rem;
`;

const Indicator = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  top: 0;
  left: -1.6rem;
  border: 2px solid #000;
  border-radius: 4px;

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    width: 100%;
    height: 100%;
    background: #4a67ff;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

interface CheckboxProps {
  id?: string;
  label: string;
  value: any;
  name: string;
  disabled: boolean;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  value,
  checked,
  onChange,
  name,
  id,
  label,
  disabled,
}: CheckboxProps) {
  return (
    <Label htmlFor={id} disabled={disabled}>
      {label}
      <Input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Indicator />
    </Label>
  );
}
