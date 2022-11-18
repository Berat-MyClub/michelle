import styled from "styled-components";

export default styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.color && props.color};
  border: 3px solid #f6a201;
  border-radius: 10px;
  margin-top: 1rem;
`;
