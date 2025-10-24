import axios from "axios";
import type { Question } from "../types";

export async function fetchQuestion(amount = 5): Promise<Question[]> {
  const res = await axios.get("https://opentdb.com/api.php", {
    params: { amount, category: 27, difficulty: "easy", type: "multiple" },
  });

  return res.data.results;
}
