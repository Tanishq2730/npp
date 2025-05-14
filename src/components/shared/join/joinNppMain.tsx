import React, { useState } from "react";

const JoinNppMain: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    belongTo: {
      gen: false,
      sc: false,
      st: false,
      obc: false,
    },
    fatherOrHusbandName: "",
    permanentAddress: "",
    age: "",
    districtBlock: "",
    agreed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      if (["gen", "sc", "st", "obc"].includes(name)) {
        setFormData((prevData) => ({
          ...prevData,
          belongTo: {
            ...prevData.belongTo,
            [name]: target.checked,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: target.checked,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="join_container">
      <div className="joinNpp">
        <div className="joinCard">
          <div className="row p-5">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="cards">
                <h3 className="mb-4">Join Npp</h3>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <select
                          name="gender"
                          className="form-control"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Belong To */}
                    <div className="mb-3">
                      <label className="form-label">Belong to</label>
                      <div className="d-flex flex-wrap gap-3">
                        {["gen", "sc", "st", "obc"].map((category) => (
                          <div className="form-check" key={category}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={category}
                              checked={
                                formData.belongTo[
                                  category as keyof typeof formData.belongTo
                                ]
                              }
                              onChange={handleChange}
                            />
                            <label className="form-check-label text-uppercase">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Father's / Husband's Name */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Father's / Husband's Name{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="fatherOrHusbandName"
                          className="form-control"
                          placeholder="Enter name"
                          value={formData.fatherOrHusbandName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Age <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          placeholder="Enter your age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="mb-3">
                      <label className="form-label">
                        Permanent Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="permanentAddress"
                        className="form-control"
                        placeholder="Enter address"
                        rows={2}
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* District & Block */}
                    <div className="mb-3">
                      <label className="form-label">
                        Name of District & Block{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="districtBlock"
                        className="form-control"
                        placeholder="Enter district & block"
                        value={formData.districtBlock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      id="agreeCheck"
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeCheck">
                      I certify that the above provided information is correct.
                    </label>
                  </div>

                  <button type="submit" className="btn btn-warning w-100 mt-2">
                    Submit
                  </button>
                </form>
                {/* Form Ends Here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinNppMain;
