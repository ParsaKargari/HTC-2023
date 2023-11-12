import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../AuthContext";

const Donate = () => {
  const { user } = useAuth(); // Assuming the useAuth hook provides user information

  const [formData, setFormData] = useState({
    email: user?.email || "", // Use user.email from the auth context if available
    name: user?.name || "",
    info: "",
    image: null,
    size: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Start submission, disable the button
    setSubmissionSuccess(false);
    setSubmissionError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("email", user.email);
    formDataToSend.append("name", user.name);
    formDataToSend.append("info", formData.info);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("phone", formData.phone);

    try {
      const response = await fetch("/add_listing", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        // Success: Handle success response here
        console.log("Donation submitted successfully");
        setSubmissionSuccess(true);
        // Clear form data
        setFormData({
          email: user.email,
          name: user.name,
          info: "",
          image: null,
          size: "",
          phone: "",
        });
      } else {
        // Error: Handle error response here
        const data = await response.json();
        console.error("Error:", data.error);
        setSubmissionError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError("An error occurred while submitting the donation.");
    } finally {
      setIsSubmitting(false); // Submission complete, enable the button
    }
  };

  return (
    <div>
      <h1>Donate Children's Clothing</h1>
      {submissionSuccess && (
        <Alert severity="success">Donation submitted successfully.</Alert>
      )}
      {submissionError && (
        <Alert severity="error">{submissionError}</Alert>
      )}
      <form onSubmit={handleSubmit}>
      <TextField
          label="Info"
          name="info"
          value={formData.info}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <TextField
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Button
          disabled={!user || isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          {isSubmitting ? "Submitting..." : "Donate"}
        </Button>
      </form>
    </div>
  );
};

export default Donate;
