import React, { useState, useEffect } from "react";
import "./customdropdown.scss";
import { Formik, Form, ErrorMessage } from "formik";
import { Dropdown } from "semantic-ui-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IInitialValues {
  dropdownOption: any;
  dropdownOption1: any;
  dropdownOption2: any;
}

let dropdownOption: any = [
  { key: "1", value: "Rajasthan", text: "Rajasthan" },
  { key: "2", value: "Goa", text: "Goa" },
  { key: "6", value: "Odisha", text: "Odisha" },
  { key: "7", value: "Sikkim", text: "Sikkim" },
  { key: "8", value: "Punjab", text: "Punjab" },
  { key: "9", value: "Kerala", text: "Kerala" },
  { key: "10", value: "Karnataka", text: "Karntaka" },
  { key: "11", value: "Gujarat", text: "Gujarat" },
  { key: "12", value: "Tripura", text: "Tripura" },
  { key: "13", value: "Mizoram", text: "Mizoram" },
  { key: "14", value: "Bihar", text: "Bihar" },
  { key: "3", value: "Himachal pradesh", text: "Himachal Pradesh " },
  { key: "4", value: "Chandigarh", text: "Chandigarh" },
  { key: "25", value: "Jammu", text: "Jammu" },
  { key: "5", value: "Uttar Pradesh", text: "Uttar pradesh" },
  { key: "15", value: "Uttarakhand", text: "Uttarakhand" },
  { key: "16", value: "Haryana", text: "Haryana" },
  { key: "17", value: "Arunachal", text: "Arunachal" },
  { key: "18", value: "Assam", text: "Assam" },
  { key: "19", value: "Meghalaya", text: "Meghalaya" },
  { key: "20", value: "Jharkhand", text: "jharkhand" },
  { key: "21", value: "Chhattisgarh", text: "Chhattisgarh" },
  { key: "22", value: "West Bengal", text: "West Bengal" },
  { key: "23", value: "Tamil Nadu", text: "Tamil nadu" },
  { key: "24", value: "Ladakh", text: "Ladakh" }
];

function FormikForm() {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [initialValues, setInitialValues] = useState<IInitialValues>(
    undefined!
  );
  const handleSubmit = (values: any) => {
    console.log(values);
    let params = new URLSearchParams();
    for (const key in values) {    //sari key ko check krega
      if (Array.isArray(values[key])) {
        params.append(key, values[key].join(","));  //agr value array m aa ri hai to jood do or uske m , dedo
      } else {
        params.append(key, values[key]);
      }
    }
    //to remove %2C and add , in every URL
    const queryString = decodeURIComponent(params.toString());  
    navigate(`/?${queryString}`);   //url set krta hai
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.dropdownOption) {
      errors.dropdownOption = "Please select ";
    }
    if (!values.dropdownOption1) {
      errors.dropdownOption1 = "Please select";
    }

    if (!values.dropdownOption2) {
      errors.dropdownOption2 = "please select";
    }
    return errors;
  };

  useEffect(() => {
    if (!initialValues && searchParams) {
      const dropdownOptionValues = searchParams.get("dropdownOption")?.split(",") || [];   
      const dropdownOption1Values = searchParams.get("dropdownOption1")?.split(",") || [];
      const dropdownOption2Value = searchParams.get("dropdownOption2");
      setInitialValues({
        dropdownOption: dropdownOptionValues,
        dropdownOption1: dropdownOption1Values,
        dropdownOption2: dropdownOption2Value
      });
    }
  }, [initialValues, searchParams]);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Dropdown
            selection
            name="dropdownOption
            "
            multiple
            value={values?.dropdownOption}
            options={dropdownOption}
            placeholder="Select Option"
            onChange={(e, { value }) => {
              setFieldValue("dropdownOption", value);
            }}
          />
          <ErrorMessage
            name="dropdownOption"
            component="Please"
            className="error-message"
          />

          <Dropdown
            selection
            name="dropdownOption1"
            multiple
            value={values?.dropdownOption1}
            placeholder="Select Option"
            options={dropdownOption}
            onChange={(e, { value }) => {
              setFieldValue("dropdownOption1", value);
            }}
          />

          <ErrorMessage
            name="dropdownOption1"
            component="please"
            className="error-message"
          />

          <Dropdown
            selection
            name="dropdownOption2"
            value={values?.dropdownOption2}
            placeholder="Select Option"
            options={dropdownOption}
            onChange={(e, { value }) => {
              setFieldValue("dropdownOption2", value);
            }}
          />
          <ErrorMessage
            name="dropdownOption2"
            component="please"
            className="error-message"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
export default FormikForm;
