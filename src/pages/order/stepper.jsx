// src/components/Stepper.jsx
import React from "react";

export default function Stepper({ currentStep, steps = [] }) {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`stepper-step ${
            index + 1 === currentStep ? "active" : ""
          } ${index + 1 < currentStep ? "completed" : ""}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
}
