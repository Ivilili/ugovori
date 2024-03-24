import React from "react";
import cs from "classnames";

import "./Button.scss";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick: () => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { disabled, isLoading, label, className, type } = props;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={() => {
        props.onClick();
      }}
      className={cs("Button", className, disabled && `Button--disabled`)}
    >
 
      {isLoading ? (
        <div className="Button__spinner" />
      ) : (
        <>{label && <div className="Button__label">{label}</div>}</>
      )}
    </button>
  );
};

export default Button;
