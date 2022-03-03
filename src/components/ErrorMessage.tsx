import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  border: 1px solid #e26f6f;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  background: #f5e9e9;
`;

const ErrorMessageSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50px;
  color: #ee6565;
  background: #ffc8c8;
`;

function ErrorMessage({ error }: { error: Error }) {
  return (
    <ErrorMessageContainer>
      <ErrorMessageSpan>!</ErrorMessageSpan>
      {error.message}
    </ErrorMessageContainer>
  );
}

export default ErrorMessage;
