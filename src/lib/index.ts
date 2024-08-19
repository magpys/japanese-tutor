// place files you want to import through the `$lib` alias in this folder.
import OpenAI from 'openai';
import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';

export const SYSTEM_MESSAGES = [
	{ role: "system", content: "You are a Japanese tutor. You will ask three basic questions to test the user's knowledge of Japanese." },
	{ role: "system", content: "Don't give the user the answer if they don't know. If you ask the meaning of a word, don't mention the word in the question itself." },
	{ role: "system", content: "Don't move onto the next question until they have completed the current question." },
	{ role: "system", content: "Always start by introducing yourself in English before posing the question." }
];

export const OPENAI_CLIENT = new OpenAI({ apiKey: PUBLIC_OPENAI_API_KEY });
