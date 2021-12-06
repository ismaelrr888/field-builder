import { Leaf } from "@/components/Leaf";
import { useForm } from "@/hooks/useForm";
import styles from "@/styles/components/FieldBuilder.module.css";
import { isEmpty } from "@/validations/isEmpty";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Text } from "slate";
import { Editable, Slate, withReact } from "slate-react";

export default function FieldBuilder() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const decorate = useCallback(([node, path]) => {
    const ranges = [];

    if (Text.isText(node)) {
      const { text } = node;
      const initSelection = 40;
      const endSelection = text.length;

      ranges.push({
        anchor: { path, offset: initSelection },
        focus: { path, offset: endSelection },
        highlight: true,
      });
    }

    return ranges;
  }, []);

  const [errors, setErrors] = useState({
    label: "",
    choices: "",
  });

  const toFindDuplicates = (arry: string[]) =>
    arry.filter((item, index) => arry.indexOf(item) !== index);

  const checkValidations = (values: any): any => {
    let errorsObj = {
      label: "",
      choices: "",
    };
    setErrors(errorsObj);
    const duplicateElements: string[] = toFindDuplicates(values.choices);
    if (isEmpty(values.label)) {
      errorsObj.label = "Is require";
    }
    if (values.choices.length > 50) {
      errorsObj.choices = "Can't be more than 50 elements";
    }
    if (duplicateElements.length > 0) {
      errorsObj.choices = "Sorry we found duplicate elements";
    }
    const choiceChecked: string[] = values.choices.filter(
      (item: string) => item.length > 40
    );
    if (choiceChecked.length > 0) {
      errorsObj.choices =
        "Sorry we found choice(s) with more than 40 characters";
    }

    setErrors(errorsObj);
    return errorsObj;
  };

  const { formValues, handleInputChange, handleSubmit, handleClear } = useForm(
    {
      label: "",
      type: false,
      defaultValue: "",
      order: "",
    },
    (values: any) => {
      let choices: string[] = [];
      value.forEach((item) => {
        item.children.forEach((itemCh) => {
          choices = [...choices, itemCh.text];
        });
      });
      values.choices = choices;

      const errorsObj = checkValidations(values);
      if (!errorsObj.label && !errorsObj.choices) {
        const payload = {
          ...values,
          choices: choices,
        };
        console.log(payload);
      }
    }
  );

  const { label, defaultValue, order } = formValues;

  return (
    <div className={`card ${styles.card}`}>
      <div className={`card-header ${styles.cardHeader}`}>Field Builder</div>
      <div className="card-body">
        <form noValidate>
          <div className="row g-3 align-items-center">
            <div className="col-2">
              <label htmlFor="label" className="col-form-label">
                Label
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="label"
                className={`form-control ${errors.label && "is-invalid"}`}
                aria-describedby="labelInLine"
                name="label"
                value={label}
                onChange={handleInputChange}
              />
              {errors.label && (
                <div className="invalid-feedback">{errors.label}</div>
              )}
            </div>
          </div>
          <div className="row g-3 align-items-center mt-2">
            <div className="col-2">
              <label htmlFor="inputType" className="col-form-label">
                Type
              </label>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-row align-items-center">
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Multi Select
                </label>
                <input
                  className="form-check-input"
                  style={{ margin: "0 6px 0 14px" }}
                  type="checkbox"
                  id="flexCheckDefault"
                  name="type"
                  onChange={handleInputChange}
                />

                <label style={{ color: "#585858" }}>A Value is required</label>
              </div>
            </div>
          </div>
          <div className="row g-3 align-items-center mt-2">
            <div className="col-2">
              <label htmlFor="defaultValue" className="col-form-label">
                Default Value
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="defaultValue"
                className="form-control"
                aria-describedby="labelDefaultValue"
                name="defaultValue"
                value={defaultValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-2">
              <label htmlFor="defaultValue" className="col-form-label">
                Choices
              </label>
            </div>
            <div className="col-auto">
              <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              >
                <Editable
                  style={{ width: 270, minHeight: 120 }}
                  className={`form-control ${errors.choices && "is-invalid"}`}
                  renderLeaf={(props) => <Leaf {...props} />}
                  decorate={decorate}
                />
              </Slate>
              {errors.choices && (
                <div className="invalid-feedback">{errors.choices}</div>
              )}
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-2">
              <label htmlFor="order" className="col-form-label">
                Order
              </label>
            </div>
            <div className="col-auto">
              <select
                className="form-select"
                aria-label="size 3 select example"
                style={{ minWidth: 270 }}
                name="order"
                value={order}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="alphabetical">
                  Display choices in Alphabetical
                </option>
              </select>
            </div>
          </div>
          <div className="row g-3 align-items-center mt-4 mb-5">
            <div className="col-2"></div>
            <div className="col-auto">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-success"
                style={{
                  backgroundColor: "#5BB85B",
                  marginRight: 5,
                  fontWeight: 600,
                }}
              >
                Save changes
              </button>{" "}
              OR
              <button
                onClick={() => {
                  handleClear();
                  setValue([
                    {
                      type: "paragraph",
                      children: [{ text: "" }],
                    },
                  ]);
                }}
                type="button"
                className="btn btn-link"
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: 5,
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
