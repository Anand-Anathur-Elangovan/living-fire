// hooks/useContactUs.js
import { useMutation } from "@tanstack/react-query";
import { addContactUsData } from "@/src/server-actions/contact-us/contact-us.action";  // Directly import your server action
import { toast } from "react-toastify";

// Custom hook for submitting form data
export const useContactUs = () => {
  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: addContactUsData,  // Directly call the server action (no need to go through an API route)
    onError: (err) => {
      console.error("Error submitting data:", err);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        console.log("Data submitted successfully:", response);
      } else {
        console.log("Error message:", response.message);
      }
    },
  });

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  };
};
