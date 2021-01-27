import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.colors.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`;

function Input({ onchange, ...props }) {
  return (
    <div>
      <InputContainer onChange={onchange} {...props} />
    </div>
  );
}

Input.defaultProps = {
  value: "",
};

Input.propTypes = {
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

export default Input;
