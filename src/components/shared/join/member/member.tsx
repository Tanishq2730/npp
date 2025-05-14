import React from "react";

const Member: React.FC = () => {
  return (
    <form className="form">
      <h2>Hello</h2>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" placeholder="Enter your full name" />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          placeholder="Enter your residential address"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">PAN Number</label>
        <input className="form-control" placeholder="Enter your PAN" />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Aadhar Card</label>
        <input type="file" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload PAN Card</label>
        <input type="file" className="form-control" />
      </div>

      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" id="certify" />
        <label className="form-check-label" htmlFor="certify">
          I certify that the above provided information is correct.
        </label>
      </div>

      <button type="button" className="btn btn-warning w-100">
        Next
      </button>
    </form>
  );
};

export default Member;
