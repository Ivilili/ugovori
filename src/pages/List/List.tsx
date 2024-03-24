import React, {useEffect, useState, useRef} from 'react';
import * as API from "../../api/Api";
import Button from '../../components/shared/Button/Button';
import SearchInput from '../../components/shared/SearchInput/SearchInput';
import Contract from '../../components/List/Contract/Contract';
import RightSidebar from '../../components/shared/RightSidebar/RightSidebar';
import SelectBox from '../../components/shared/SelectBox/SelectBox';

import "./List.scss";
import NewContract from '../../components/List/NewContract/NewContract';

interface ContractsProps {
    id: string;
    kupac: string;
    broj_ugovora: string;
    datum_akontacije: any;
    rok_isporuke?: any;
    status: string;
}

//@TODO - napraviti mogucnost izmijene rok_isporuke 
//@TODO - validacija datuma (korisnik ne moze kliknuti na prosli datum, placeholder datuma zamijeniti za hrvatski format)
//@TODO - bolja korist typescript-a (zamijeniti any)
//@TODO - dodati opcije dodati artikale



const List = () => {
    const [allContracts, setAllContracts] = useState<any>([]);
    const [filterContracts, setFilterContracts] = useState<any>();
    const [openRightSidebar, setOpenSidebar] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<any>({name: "Svi", value: "svi"});
  
    const rightSidebarRef = useRef(null);

    const filterByActive = [
      {name: "Svi", value: "svi"},
      {name: "Aktivni", value: "aktivni" },
      {name: "Neaktivni", value: "neaktivni"}
    ];

    const getContacts = () => {
      API.getAllContracts().then(res => {
          setAllContracts(res?.data);
          setFilterContracts(res?.data);
      }).catch(err => console.error(err));
    }
  
    useEffect(() => {
      let mounted:boolean = true;
      if(mounted) {
        getContacts();
      }
      return () =>{
        mounted = false;
      } 
    }, []);
  
  
    const handleSearch = (e: any) => {
      e.preventDefault();
      setFilterContracts(
        !e.target.value
          ? allContracts
          : allContracts.filter((item: ContractsProps) =>
              item.kupac.toLowerCase().includes(e.target.value.toLowerCase())
            )
      );
    };

    const filterBy = (value: string) => {
      if (value === "aktivni") {
        let filtered = [...allContracts].filter((item) =>
           item?.status.toLowerCase() !== "isporučeno"
        );
        setFilterContracts(filtered);
      }else if(value === "neaktivni") {
        let filtered = [...allContracts].filter((item) =>
        item?.status.toLowerCase() === "isporučeno"
       );
        setFilterContracts(filtered);
      }else {
        setFilterContracts(allContracts);
      }
    };

  return (
    <div className="List">
      <h1 className="List__title lato-bold-italic" >Kupoprodajni ugovori</h1>
       <div className="List__container">
        <div className="List__main-filter-wrapper">
          <SearchInput
            placeholder="Pretraga po imenu kupca..."
            onChange={(e) => handleSearch(e)}
          /> 
          <div className="List__filter-container">
          <SelectBox
              items={filterByActive}
              selectedItem={selectedFilter}
              onItemSelect={(name, value) => {
                setSelectedFilter({ name: name, value: value });
                filterBy(value);
              }}
              className="List__select-box"
             />
            <Button
              onClick={() =>  setOpenSidebar(true)}
              label="Novi ugovor"
              className="List__header-button"
             />
          </div>
        
        </div> 
        <div className="List__grid">
        {filterContracts && filterContracts?.map((item: ContractsProps) => (
          <Contract 
            key={item?.id} 
            kupac={item?.kupac} 
            brojUgovora={item?.broj_ugovora} 
            rokIsporuke={item?.rok_isporuke} 
            status={item?.status} 
            id={item?.id}
            refresh={() => getContacts()}
          />
        ))}
        </div>
    </div>
    {openRightSidebar && (
        <div>
          <RightSidebar
            onClose={() => {
              setOpenSidebar(!openRightSidebar);
            }}
            sidebarRef={rightSidebarRef}
          >
              <NewContract
              onClose={() => {
                setOpenSidebar(!openRightSidebar);
              }}
              refresh={() => getContacts()}
             />
          
          </RightSidebar>
        </div>
      )}
      
    </div>
  );
};

export default List;