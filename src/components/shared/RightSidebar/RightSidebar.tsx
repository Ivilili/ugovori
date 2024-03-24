import React from "react";
import cs from "classnames";
import { useOutsideClickDetection } from "../../../lib/hooks/useOutsideClickDetection";

import "./RightSidebar.scss";

interface RightSidebarProps {
  children: React.ReactNode;
  onClose: () => void;
  sidebarRef?: any;
}

const RightSidebar = (props: RightSidebarProps) => {
  const { children, sidebarRef } = props;
  const handleOutSideClick = () => {
    props.onClose()
  };

  useOutsideClickDetection(sidebarRef, handleOutSideClick);

  return (
    <div className={cs("RightSidebar", "RightSidebar--opened")}>
      <div className="RightSidebar__container" ref={sidebarRef}>
        <div className="RightSidebar__header">
         <div className="RightSidebar__close"  onClick={() => props.onClose()}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div> 
        </div>
        <div className="RightSidebar__body">{children}</div>
      </div>
    </div>
  );
};

export default RightSidebar;