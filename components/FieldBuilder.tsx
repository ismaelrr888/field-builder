import { useForm } from "@/hooks/useForm";
import styles from "@/styles/components/FieldBuilder.module.css";

const countries: string[] = [
  "Asia",
  "Australia",
  "Europe",
  "Americas",
  "Africa",
];

export default function FieldBuilder() {
  const { formValues, handleInputChange, handleSubmit } = useForm(
    {
      label: "",
      type: "",
    },
    (formData) => console.log(formData)
  );

  const { label } = formValues;

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
                className="form-control"
                aria-describedby="labelInLine"
                name="label"
                value={label}
                onChange={handleInputChange}
              />
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
                  value=""
                  id="flexCheckDefault"
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
              <textarea
                className="form-control"
                id="floatingTextarea"
                rows={4}
                style={{ minWidth: 270 }}
              ></textarea>
            </div>
          </div>
          <div className="row g-3 align-items-center mt-2">
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
              >
                <option selected>Display choices in Alphabetical</option>
                {countries
                  .sort((a: any, b: any) => a - b)
                  .map((country: string, key: number) => (
                    <option key={key} value={country}>
                      {country}
                    </option>
                  ))}
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
