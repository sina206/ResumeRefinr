import OpenAI from "openai";

const ChatTest = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_SECRET,
    dangerouslyAllowBrowser: true,
  });

  const response = async () => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an assistant giving feedback on tech CV's/Resumes",
        },
        { role: "user", content: "How can i improve the projects?" },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
  };

  const handleClick = () => {
    console.log("hi");
    response();
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default ChatTest;
