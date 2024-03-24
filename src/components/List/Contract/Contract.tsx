import React, { useState, useEffect } from "react";
import Button from "../../shared/Button/Button";
import { useNavigate } from "react-router-dom";
import cs from "classnames";

import "./Contract.scss";


interface ContractProps {
    kupac?: any;
    brojUgovora: string;
    rokIsporuke?: any;
    status: string;
    id?: string;
  }

const Contract = (props: ContractProps) => {
  const { kupac, rokIsporuke, status, brojUgovora, id } = props;
  const navigate = useNavigate();

  return (
    <div className="Contract">
        <div className="Contract__content">
        <h2 className="Contract__title">{kupac}</h2>
        <div className="Contract__id"> {brojUgovora} </div>
        <p className="Contract__subtitle">{rokIsporuke} </p>
        <p className={cs("Contract__status", 
           status.toLowerCase() === "kreirano" &&`Contract__status--created`, 
           status.toLowerCase() === "naručeno" && `Contract__status--ordered`,
           status.toLowerCase() === "isporučeno" && `Contract__status--delivered`
            )}>{status}</p>
        </div>
       <Button
        onClick={() => {
          navigate(`/contract/${id}`);
        }}
        label="Detalji"
        className="Button__primary--outline Contract__button"
        /> 
    </div>
  );
};

export default Contract;