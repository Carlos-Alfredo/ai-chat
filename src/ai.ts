// src/ai.ts
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { firebaseApp } from "./firebase";

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

export function startChat() {
  return model.startChat();
}
