import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as API from "../../api/Api";
import cs from "classnames";
import "./Details.scss";
import Button from '../../components/shared/Button/Button';
import Product from '../../components/Details/Product/Product';

interface ProductProps {
    naziv?: string;
    dobavljac?: string;
    status?: string;
    id?: string;
  }


const Details = () => {
    const [products, setProducts] = useState<any>([]);
    const [contract, setContract] = useState<any>([]);
    let param = useParams();
    let navigate = useNavigate();

    const getContractById = () => {
        if(param?.id){
            API.getContractById(param?.id)
               .then(res => setContract(res.data))
               .catch(err => console.error(err));
        }
    } 

    const getProducts = () => {
        if(param?.id){
            API.getContractProducts(param?.id).then(res => {
                setProducts(res.data)
            }).catch(err => console.error(err));
        }
    }


    useEffect(() => {
        let mounted:boolean = true;
        if(mounted) {
        getContractById();
        getProducts();
        }
        return () =>{
          mounted = false;
        } 
    }, [param?.id]);

    let akontacijaDatum2 = new Date(contract?.datum_akontacije * 1000).toLocaleDateString("hr");
    let rokIsporuke = new Date(contract?.rok_isporuke * 1000).toLocaleDateString("hr");

  return (
    <div className="Details">
        <div className="Details__wrapper">
        <h1 className="Details__main-title lato-bold-italic" > Detalji ugovora: {contract?.broj_ugovora} </h1>
        <Button
        onClick={() => {
          navigate(`/`);
        }}
        label="Nazad na listu ugovora"
        className="Button Details__button"
        /> 
        </div>
    
      <div className="Details__content">
        <h2 className="Details__title">{contract?.kupac}</h2>
        <p className="Details__desc"> Broj ugovora: {contract?.broj_ugovora} </p>
      {contract?.datum_akontacije && (<p className="Details__desc"> Datum akontacije: {akontacijaDatum2} </p>)} 
       {contract?.rok_isporuke && (
        <p className="Details__desc">Rok isporuke: {rokIsporuke} </p>
       )} 
        <p className={cs("Details__status", 
          contract?.status?.toLowerCase() === "kreirano" &&`Contract__status--created`, 
          contract?.status?.toLowerCase() === "naručeno" && `Contract__status--ordered`,
          contract?.status?.toLowerCase() === "isporučeno" && `Contract__status--delivered`
        )}>{contract?.status}</p>
     

    </div>
    <h2 className="Details__subtitle lato-bold-italic">Artikli:</h2>
    {products?.length !== 0 ? (
    <div className="Details__grid"> 
    {products && products.map((product: ProductProps, index: number) => {
      return(
       <Product 
         key={index}  
         naziv={product?.naziv} 
         dobavljac={product?.dobavljac} 
         status={product?.status}
        />
      ) 
    })}
    </div>
      ) : (
        <div className="Details__no-content"> Artikli nisu pronađeni! </div>
      )}
   
      
    </div>
  );
};

export default Details;