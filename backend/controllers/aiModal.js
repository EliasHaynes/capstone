import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from 'openai';
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const getAIResponseOnRepairs = async (req,res) => {
  const cardDesc = req.body.cardDesc
  console.log("card desc:", cardDesc);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a knowledgable and experienced mechanic. You are going to be provided the description of a maintenance a user is inquiring to you for information. The information you will provide back to them will be what the maintenance/part is, why it's important in their vehicle to perform the maintenance  and lastly identify the general service interval for the maintenance. Please structure your response by seperating the paragraph for the what the maintenance/part is, then the why its important, and lastly the general service interval. Please keep the response for each of these 3 classifications short but not at the cost of being informative.`
        }, 
        {
          role: "user",
          content: `${cardDesc}`
        }
      ]
    })
    const content = response.choices[0].message.content;
    console.log("Content:", content)
    return res.json(content)
  } catch (e) {
    console.error("Error: ", e);
  }
};

 ;
