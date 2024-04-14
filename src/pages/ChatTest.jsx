import OpenAI from "openai";
import { useState } from "react";
import ReviewDisplay from "../components/ReviewDisplay";

const ChatTest = () => {
  const [data, setData] = useState({}); // Initial state is an empty object

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_SECRET,
    dangerouslyAllowBrowser: true,
  });

  const fetchReview = async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an assistant giving feedback on a tech CV/resume. Give your response in this JSON format: overall impression, grammar, formatting e.g. layout, content, bullet points that could be rephrased to be more impactful, and areas of improvement. Keep the responses short and concise. Keep each response to a maximum of 200 characters. There should be keys and values your response CRITICALLY MUST BE IN A FORMAT THAT CAN BE PARSED USING json.stringify in JAVASCRIPT. Wherever you think there could be improvements, you MUST mention the ALL OFs improvements. BE VERY CRITICAL",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: "",
                },
              },
            ],
          },
        ],
        model: "gpt-4-turbo",
      });
      // Assuming the API response contains the needed JSON structure in the first choice's message
      setData(JSON.parse(completion.choices[0].message.content));
    } catch (error) {
      console.error("Error fetching review:", error);
      setData({ error: "Failed to fetch review. Please try again." });
    }
  };

  return (
    <div>
      <button onClick={fetchReview}>Fetch Review</button>
      {data.overall_impression ? (
        <ReviewDisplay jsonString={JSON.stringify(data)} />
      ) : data.error ? (
        <p>{data.error}</p>
      ) : (
        <p>Click the button to fetch a review.</p>
      )}
    </div>
  );
};

export default ChatTest;
