import React from "react";
import cs from "classnames";

import "./InputField.scss";

interface InputFieldProps {
  name?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
  onIconClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  error?: boolean;
}

const InputField = (props: InputFieldProps) => {
  const {
    onIconClick,
    name,
    placeholder,
    type,
    disabled,
    value,
    onBlur,
    onChange,
    style,
    error,
    className,
  } = props;
  return (
    <div className={cs("InputField", className)}>
      <div
        className={cs(
          "InputField__container",
          disabled && `InputField__container--disabled`,
          error && `InputField__container--error`
        )}
      >
        <input
          name={name}
          style={style}
          placeholder={placeholder}
          className={cs(
            "InputField__input",
            disabled && `InputField__input--disabled`
          )}
          type={type}
          disabled={disabled}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;