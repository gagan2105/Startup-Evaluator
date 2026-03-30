import "dotenv/config";

const getOpenAIAPIResponse = async (messages) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are a programming assistant.
ALWAYS format code using markdown code blocks.
Use triple backticks with language name.
Example:

\`\`\`java
code here
\`\`\`
              `,
            },
            {
              role: "user",
              content: messages,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 🔥 Debug log (VERY IMPORTANT)
    console.log("OpenAI Response:", data);

    // ❌ Handle API errors
    if (!response.ok) {
      throw new Error(data?.error?.message || "OpenAI API error");
    }

    // ❌ Handle missing choices
    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("🔥 FULL OpenAI Error:", error); // print full

    throw new Error(error.message); // ✅ show real error
  }
};

export default getOpenAIAPIResponse;