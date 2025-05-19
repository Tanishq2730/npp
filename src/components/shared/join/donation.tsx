import React, { useState } from "react";
import { client } from "app/lib/sanity";

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
    const target = e.target;
    const { name, value, type } = target;

    if (type === "file") {
      const file = (target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let aadharAsset = null;

      // Upload Aadhar file to Sanity if selected
      if (formData.aadharFile) {
        aadharAsset = await client.assets.upload("file", formData.aadharFile, {
          contentType: formData.aadharFile.type,
          filename: formData.aadharFile.name,
        });
      }

      const doc = {
        _type: "donationForm",
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        panNumber: formData.panNumber,
        state: formData.state,
        district: formData.district,
        pinCode: formData.pinCode,
        aadharFile: aadharAsset
          ? {
              _type: "file",
              asset: {
                _type: "reference",
                _ref: aadharAsset._id,
              },
            }
          : undefined,
      };

      await client.create(doc);
      alert("Form submitted successfully!");

      // Clear form after submit
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        panNumber: "",
        aadharFile: null,
        state: "",
        district: "",
        pinCode: "",
      });
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="join_container">
      <div className="joinNpp">
        <div className="joinCard">
          <div className="row p-5">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="cards">
                <h3 className="mb-4">Donate NPP</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>

                    {/* PAN */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        PAN Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        className="form-control"
                        value={formData.panNumber}
                        onChange={handleChange}
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="address"
                        className="form-control"
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Upload */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label">
                        Upload Aadhar / PAN / EPIC{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="aadharFile"
                        className="form-control"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* State */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* District */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        District <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        className="form-control"
                        value={formData.district}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Pin Code */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Pin Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        className="form-control"
                        value={formData.pinCode}
                        onChange={handleChange}
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <button type="submit" className="btn btn-warning w-100 mt-2">
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
