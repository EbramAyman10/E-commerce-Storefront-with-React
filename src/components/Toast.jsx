import { useEffect } from "react";
import "./toast.css";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
}
