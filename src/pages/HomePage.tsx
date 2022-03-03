import React, { useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuth } from "../state/state";

import Checkbox from "../components/Checkbok";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

interface InputProps {
  error?: any;
}

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.loading ? "#99A9FF" : "#3858fc")};
  }

  &:focus {
    outline: 2px solid #000;
  }
`;

interface FormInput {
  email: string;
  password: string;
}

function HomePage() {
  const { signin } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    try {
      setIsLoading(true);
      signin(data.email, data.password, () => {
        setIsLoading(false);
        navigate("/profile");
      });
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage error={error} />}
        <Label>Логин</Label>
        <Input
          error={errors?.email?.message}
          type="text"
          defaultValue="steve.jobs@example.com"
          {...register("email", { required: "Обязателное поле" })}
        />
        {errors.email?.type === "required" && (
          <Message>{errors.email?.message}</Message>
        )}

        <Label>Пароль</Label>
        <Input
          error={errors.password?.message}
          type="password"
          defaultValue="password"
          {...register("password", { required: "Обязателное поле" })}
        />
        {errors.password?.type === "required" && (
          <Message>{errors.password?.message}</Message>
        )}

        <Checkbox
          checked={isChecked}
          disabled={isLoading}
          onChange={({ target }) => {
            setIsChecked(!isChecked);
          }}
        />

        <Button loading={isLoading} disabled={isLoading}>
          Войти
        </Button>
      </Form>
    </FormContainer>
  );
}

export default HomePage;
