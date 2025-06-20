import { toast } from "sonner";
import { useState } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      // cb is an async function that returns data directly
      const result = await cb(...args);
      setData(result);

      // Show success toast when data is received (entry created)
      toast.success("Journal entry created successfully!", {
        description: "Your entry has been saved and is now visible in your journal.",
      });
    } catch (err) {
      setError(err);
      toast.error(`Error: ${err.message}`, {
        description: "There was an error fetching the data. Please try again later.",
      });
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;