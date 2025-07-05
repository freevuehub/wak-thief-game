import { GoogleGenAI } from '@google/genai'

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export { default as createThief } from './createThief'
export { default as createThiefImage } from './createThiefImage'
export { default as throwOutThief } from './throwOutThief'
export { default as restThief } from './restThief'
