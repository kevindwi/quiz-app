import { useEffect, useState } from "react";
import { fetchQuestion } from "../api/opentdbApi";
import type { Question } from "../types";

export const useData = () => {
  const [state, setState] = useState<Question[]>();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await fetchQuestion();

      setState(data);
    };

    dataFetch();
  }, []);

  return { data: state };
};
