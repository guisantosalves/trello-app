import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  organization: "org-86Vz8UQsxAlj5AhbqiFbjL9q",
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export default openai;
