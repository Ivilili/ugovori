import React, { useState, useEffect } from "react";
import Button from "../../shared/Button/Button";
import { useNavigate } from "react-router-dom";
import * as API from "../../../api/Api";
import cs from "classnames";

import "./Contract.scss";
import SelectBox from "../../shared/SelectBox/SelectBox";

interface ContractProps {
    kupac?: any;
    brojUgovora: string;
    rokIsporuke?: any;
    status: string;
    id: any;
    refresh: () => void;
  }

const Contract = (props: ContractProps) => {
  const { kupac, rokIsporuke, status, brojUgovora, id} = props;
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState({name: status, value: status})

  let rokIsporuke2 = new Date(rokIsporuke * 1000).toLocaleDateString("hr");

  const statusi = [
    {name: "NARUČENO", value: "NARUČENO" },
    {name: "ISPORUČENO", value: "ISPORUČENO"}
  ];

  const filterStatus = statusi.filter(item => {
    if(selectedStatus.name === "KREIRANO"){
     return  item?.name !== "ISPORUČENO"
    }else {
     return item?.name !== selectedStatus.name
    }
  })

  return (
    <div className="Contract">
        <div className="Contract__content">
        <h2 className="Contract__title">{kupac}</h2>
        <div className="Contract__id"> {brojUgovora} </div>
        <p className="Contract__subtitle">{rokIsporuke2} </p>
        <SelectBox 
           items={filterStatus}
           selectedItem={selectedStatus}
           onItemSelect={(name, value) => {
            setSelectedStatus({ name: name, value: value });
            API.updateNewContract(props?.id, name).then(res => props.refresh()).catch(err => console.log(err));
          }}
          className="Contract__status-box"
          className3={cs("Contract__status", 
          status.toLowerCase() === "kreirano" &&`Contract__status--created`, 
          status.toLowerCase() === "naručeno" && `Contract__status--ordered`,
          status.toLowerCase() === "isporučeno" && `Contract__status--delivered`
          )}
          disabled={selectedStatus?.name === "ISPORUČENO"}
        />
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