import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تضع كود إرسال البيانات (API call)
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{ fontFamily: "serif", letterSpacing: "2px" }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-muted">
            We'd love to hear from you. Here is how you can reach us.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-5 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                  <h4 className="fw-bold mb-4">Contact Info</h4>

                  <div className="mb-4">
                    <h6
                      className="fw-bold text-uppercase"
                      style={{ color: "#aaa" }}
                    >
                      Address
                    </h6>
                    <p className="small">
                      123 Wearly Fashion St,
                      <br />
                      Cairo, Egypt
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6
                      className="fw-bold text-uppercase"
                      style={{ color: "#aaa" }}
                    >
                      Phone
                    </h6>
                    <p className="small">+20 100 123 4567</p>
                  </div>

                  <div className="mb-4">
                    <h6
                      className="fw-bold text-uppercase"
                      style={{ color: "#aaa" }}
                    >
                      Email
                    </h6>
                    <p className="small">support@wearly.com</p>
                  </div>
                </div>

                <div className="col-md-7 p-5 bg-white">
                  <h4 className="fw-bold mb-4" style={{ fontFamily: "serif" }}>
                    Send a Message
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label text-muted small"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0 py-2"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label text-muted small"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          className="form-control bg-light border-0 py-2"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="subject"
                          className="form-label text-muted small"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0 py-2"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="message"
                          className="form-label text-muted small"
                        >
                          Message
                        </label>
                        <textarea
                          className="form-control bg-light border-0"
                          id="message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
                        >
                          SEND MESSAGE
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
    </div>
  );
}
