import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

export default response = async () => {
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an assistant giving feedback on tech CV's/Resumes",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};
