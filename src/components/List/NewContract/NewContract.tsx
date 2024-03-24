import React from "react";
import { useNewContractFormik } from "./useNewContract";
import Button from "../../../components/shared/Button/Button";
import InputField from "../../shared/InputField/InputField";
import cs from "classnames";
import * as API from "../../../api/Api";

import "./NewContract.scss";


const NewContract = (props: any) => {

  const formik: any = useNewContractFormik({
    onSubmit: async (values: any) => {
        const data = {
          kupac: values.kupac,
          broj_ugovora: values.broj_ugovora,
          datum_akontacije: parseInt((new Date(values.datum_akontacije).getTime() / 1000).toFixed(0)),
          rok_isporuke:  parseInt((new Date(values.rok_isporuke).getTime() / 1000).toFixed(0)),
          status: "KREIRANO",
        };
        API.createNewContract(data)
        .then((res) => {
          props.refresh();
          props.onClose();
        })
        .catch((err) => {
          console.error(err);
        });  
    }
  });
 

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="NewContract__title">Novi ugovor</h3>
      <div className="NewContract__input-group-row">
        <div className="NewContract__input-group-container">
          <div className="NewContract__input-label">Kupac</div>
          <InputField
            type="text"
            className="NewContract__form-control"
            name="kupac"
            value={formik.values.kupac}
            onBlur={(e: any) => formik.handleBlur(e)}
            onChange={(e: any) => formik.handleChange(e)}
          />
          {formik.errors.kupac && formik.touched.kupac && (
            <div className="NewContract__invalid-feedback">
              {formik.errors.kupac}
            </div>
          )}
        </div>
        <div className="NewContract__input-group-container">
          <div className="NewContract__input-label">Broj ugovora</div>
          <InputField
            type="text"
            className="NewContract__form-control"
            name="broj_ugovora"
            value={formik.values.broj_ugovora}
            onBlur={(e: any) => formik.handleBlur(e)}
            onChange={(e: any) => formik.handleChange(e)}
          />
          {formik.errors.broj_ugovora && formik.touched.broj_ugovora && (
            <div className="NewContract__invalid-feedback">
              {formik.errors.broj_ugovora}
            </div>
          )}
        </div>
      </div>
      <div className="NewContract__input-group-container">
        <div className="NewContract__input-label">Datum akontacije</div>
        <InputField
          type="date"
          className="NewContract__form-control"
          name="datum_akontacije"
          value={formik.values.datum_akontacije}
          onBlur={(e: any) => formik.handleBlur(e)}
          onChange={(e: any) => formik.handleChange(e)}
        />
        {formik.errors.datum_akontacije && formik.touched.datum_akontacije && (
          <div className="NewContract__invalid-feedback">
            {formik.errors.datum_akontacije}
          </div>
        )}
      </div>
      <div className="NewContract__input-group-container">
        <div className="NewContract__input-label">Rok isporuke</div>
        <InputField
          type="date"
          className="NewContract__form-control"
          name="rok_isporuke"
          value={formik.values.rok_isporuke}
          onBlur={(e: any) => formik.handleBlur(e)}
          onChange={(e: any) => formik.handleChange(e)}
        />
        {formik.errors.rok_isporuke && formik.touched.rok_isporuke && (
          <div className="NewContract__invalid-feedback">
            {formik.errors.rok_isporuke}
          </div>
        )}
      </div>

      <div className="NewContract__buttons">
        <Button
          className={cs(
            "Button__primary--outline",
            `NewContract__discard-btn`
          )}
          label="Otkaži"
          onClick={() => {
            props.onClose();
          }}
          type="button"
        />
        <Button
          className={cs("Button", "NewContract__save-btn")}
          label="Kreiraj"
          onClick={() => {}}
          type="submit"
        />
      </div>
     
    </form>
  );
};

export default NewContract;



