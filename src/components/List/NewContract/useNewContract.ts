import { useFormik } from "formik";
import * as Yup from "yup";

const NewContractSchema = Yup.object().shape({
  kupac: Yup.string()
    .min(2, "Ime je prekratko")
    .max(40, "Ime je predugo")
    .required("Unesite ime i prezime kupca"),
  broj_ugovora: Yup.string().required("Unesite ime ugovora"),
  datum_akontacije: Yup.date().required("Unesite datum"),
  rok_isporuke: Yup.date().required("Unesite datum"),
  status: Yup.string(),
});

export const useNewContractFormik = (
  opts: {
    onSubmit?: any;
    initialValues?: any;
  }
) => {
  return useFormik({
    enableReinitialize: true,
    initialValues: {
      kupac:  "",
      broj_ugovora:  "",
      datum_akontacije:  "",
      rok_isporuke: "",
      status:  "",
      ...opts?.initialValues,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: NewContractSchema,
    onSubmit: async (values, formikHelpers) => {
      await opts.onSubmit(values, formikHelpers);
    },
  });
};
