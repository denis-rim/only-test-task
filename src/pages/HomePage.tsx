import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuth } from "../state/state";

import Checkbox from "../components/Checkbok";

interface InputProps {
  error?: any;
}

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 640px;
  width: 90vw;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input<InputProps>`
  font-size: 1rem;
  padding: 0.8rem;
  border: none;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  height: 2rem;
  background: #f5f5f5;
  color: #232323;
  outline-offset: 0.35rem;

  &:focus {
    outline: ${(props) =>
      props.error ? "2px solid #e26f6f;" : "2px solid #000"};
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #e26f6f;
`;

export const Button = styled.button<{ loading: boolean }>`
  margin-top: 2.5rem;
  font-size: 1.2rem;
  padding: 0.9rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.loading ? "wait" : "pointer")};
  background: ${(props) => (props.loading ? "#99A9FF" : "#4a67ff")};
  color: #fff;
  outline-offset: 0.15rem;

  &:focus {
    outline: 2px solid #000;
  }
`;
interface IFormInput {
  email: string;
  password: string;
}

function HomePage() {
  const { signin } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log("error: ", errors);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Логин</Label>
        <Input
          error={errors?.email?.message}
          type="text"
          defaultValue="test"
          {...register("email", { required: "Required" })}
        />
        {errors.email?.type === "required" && (
          <Message>{errors.email?.message}</Message>
        )}

        <Label>Пароль</Label>
        <Input
          error={errors}
          type="password"
          defaultValue="test"
          {...register("password", { required: "Required" })}
        />
        {errors.password?.type === "required" && (
          <Message>{errors.password?.message}</Message>
        )}

        <div>
          <Checkbox
            label="Сохранить пароль"
            name="savePassword"
            checked={isChecked}
            value={isChecked}
            disabled={isLoading}
            onChange={({ target }) => {
              setIsChecked(!isChecked);
            }}
          />
        </div>
        <Button loading={isLoading} disabled={isLoading}>
          Войти
        </Button>
      </Form>
    </FormContainer>
  );
}

export default HomePage;
