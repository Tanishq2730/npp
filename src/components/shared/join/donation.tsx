import React, { useState } from "react";

const Donation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    panNumber: "",
    aadharFile: null as File | null,
    state: "",
    district: "",
    pinCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]:
          target.files && target.files.length > 0 ? target.files[0] : null,
      }));
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
                <h3 className="mb-4">Donate Npp</h3>

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

                    {/* Email */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Mobile Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter your mobile number"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="panNumber"
                          className="form-control"
                          placeholder="Enter your PAN number"
                          value={formData.panNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="address"
                          className="form-control"
                          placeholder="Enter your address"
                          rows={2}
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* PAN Number */}
                    

                    {/* Upload Aadhar Card */}
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Upload Aadhar Card{" "} / PAN Card / EPIC
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="aadharFile"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          State <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          placeholder="Enter your state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* District */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          District <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="district"
                          className="form-control"
                          placeholder="Enter your district"
                          value={formData.district}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Pin Code */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="pinCode"
                          className="form-control"
                          placeholder="Enter your pin code"
                          value={formData.pinCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-warning w-100 mt-2"
                    >
                      Submit
                    </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
