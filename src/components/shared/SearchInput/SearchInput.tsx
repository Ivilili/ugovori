import React from "react";
import cs from "classnames";

import "./SearchInput.scss";

interface SearchInputPropsType {
  placeholder?: string;
  style?: React.CSSProperties;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
  onFocus?: (e: any) => void;
  value?: string | number;
  name?: string;
  className?: string;
}

const SearchInput = (props: SearchInputPropsType) => {
  const {
    placeholder,
    style,
    onBlur,
    onChange,
    onFocus,
    value,
    name,
    className,
  } = props;

  return (
    <div className={cs("SearchInput", className)}>
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="SearchInput__icon">
        <circle cx="9.76663" cy="9.76639" r="8.98856" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.0183 16.4849L19.5423 19.9997" stroke="#111827" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
      <input
        style={style}
        className="SearchInput__input"
        type="text"
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        name={name}
      />
    </div>
  );
};

export default SearchInput;
