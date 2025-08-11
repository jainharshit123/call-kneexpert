import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

// This is a wrapper around the main Toaster component to define default styles
// You will place <CustomToaster /> in your main App.jsx file
export const CustomToaster = () => (
  <Toaster
    position="bottom-center"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "9999px",
        padding: "12px 20px",
        fontSize: "14px",
      },
      // Define styles for different toast types
      success: {
        icon: <FiCheckCircle className="text-green-400" />,
        style: {
          background: "#10B981", // green-dark
          color: "white",
        },
      },
      error: {
        icon: <FiXCircle className="text-red-400" />,
        style: {
          background: "#F87171", // red-light
          color: "white",
        },
      },
    }}
  />
);

// You can also create custom toast functions if needed, though calling toast.success() directly is often enough.
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast(message, {
    icon: <FiInfo className="text-blue-400" />,
    style: {
      background: "#60A5FA", // blue-light
      color: "white",
    },
  });
};
