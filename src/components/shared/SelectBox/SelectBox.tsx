import React, { useRef, useState } from "react";
import cs from "classnames";
import { useOutsideClickDetection } from "../../../lib/hooks/useOutsideClickDetection";

import "./SelectBox.scss";


export interface ItemsType {
  name: string;
  value: string;
}

interface SelectBoxProps {
  items: ItemsType[];
  className?: string;
  className2?: string;
  className3?: string;
  style?: any;
  selectedItem: any;
  onItemSelect: (name: string, value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  active?: boolean;
}

const SelectBox = (props: SelectBoxProps) => {
  const {
    items,
    selectedItem,
    className,
    style,
    disabled,
    className2,
    className3,
    isLoading,
    active,
  } = props;
  const [showItems, setShowItems] = useState(false);

  const dropDownRef = useRef(null);

  const onItemSelect = (name: string, value: string) => {
    props.onItemSelect(name, value);
    setShowItems(!showItems);
  };

  const handleOutSideClick = () => {
    setShowItems(false);
  };

  useOutsideClickDetection(dropDownRef, handleOutSideClick);

  return (
    <div
      ref={dropDownRef}
      className={cs("SelectBox", className, active && "SelectBox--active")}
      style={style}
    >
      <div
        onClick={() => {
          if (!disabled) {
            setShowItems(!showItems);
          }
        }}
        className={cs(
          "SelectBox__head",
          disabled && "SelectBox__head--disabled",
          className2
        )}
      >
        {isLoading ? (
          <div className="spinner SelectBox__spinner" />
        ) : (
          <div
            className={cs(
              "SelectBox__label",
              active && "SelectBox__label--active",
              disabled && "SelectBox__label--disabled",
              className3
            )}
          >
            {selectedItem?.name}
          </div>
        )}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={cs("SelectBox__icon", active && "SelectBox__icon--active")}>
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div
        className={cs(
          "SelectBox__body",
          "cardStyle",
          showItems && "SelectBox__body--active"
        )}
      >
        {items?.map((item, index) => {
          return (
            <div
              onClick={() => onItemSelect(item?.name, item?.value)}
              className="SelectBox__item"
              key={index}
            >
              <div
                className={cs(
                  `SelectBox__item-label`,
                  props.selectedItem?.name === item?.name &&
                    "SelectBox__item-label--active"
                )}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
