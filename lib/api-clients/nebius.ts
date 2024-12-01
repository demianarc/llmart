import { OpenAI } from 'openai'

export const nebiusClient = new OpenAI({
  apiKey: process.env.NEBIUS_API_KEY,
  baseURL: 'https://api.studio.nebius.ai/v1',
  dangerouslyAllowBrowser: true
})