import mysql from "mysql2";
import pool from "../mysql/connection.js";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
import { openai } from "../index.js";

const getAIResponseOnRepairs = async (req,res) => {
  const {userInput} = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assitant`
        }, 
        {
          role: "user",
          content: `${userInput}`
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

export default { getAIResponseOnRepairs };
