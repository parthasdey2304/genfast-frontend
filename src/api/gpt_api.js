import axios from 'axios';

export async function getChatGPTResponse(messages, content) {
  const url = "https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions";
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      ...messages,
      { role: "user", content }
    ]
  };
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "c6150aa0fbmshc0a1461851bd7ecp100c48jsnac068272b7e6",
    "X-RapidAPI-Host": "chatgpt-best-price.p.rapidapi.com"
  };

  try {
    const response = await axios.post(url, payload, { headers });
    const assistantResponse = response.data.choices[0].message.content;
    return assistantResponse;
  } catch (error) {
    console.error('Error calling API:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
