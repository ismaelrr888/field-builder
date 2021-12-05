import styles from "@/styles/components/FieldBuilder.module.css";

export default function FieldBuilder() {
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
        </form>
      </div>
    </div>
  );
}
