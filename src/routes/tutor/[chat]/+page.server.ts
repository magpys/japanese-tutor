import type { Actions } from './$types'
import type { ChatCompletionMessageParam } from 'openai/resources';
import { OPENAI_CLIENT, SYSTEM_MESSAGES } from '$lib';


export const load = async ({ depends, locals: { supabase }, params }) => {
	depends('supabase:db:chat_history');
	const { data: messages } = await supabase.from('chat_history').select('id,role,message,chat_id').eq('chat_id', params.chat).order('id');
	return { messages: messages ?? [] };
};

export const actions: Actions = {
	answer: async ({ request, locals: { supabase }, params }) => {
		const formData = await request.formData()
		const answer = formData.get('answer') as string

		// This is inefficient but I ran out of time and opted for getting it working over making it perfect.
		// I got the messages on page load so ideally I'd cache them or perhaps send them from the front end
		// rather than re-fetching them in the answer action to save a round trip to the database.
		const { data: messages } = await supabase.from('chat_history').select('id,role,message').order('id')

		let allMessages: ({ role: string; content: string })[];

		if (!messages) {
			allMessages = SYSTEM_MESSAGES;
		} else {
			allMessages = SYSTEM_MESSAGES.concat(messages.map(message => { return { role: message.role, content: message.message }}));
		}

		allMessages.push({ role: 'user', content: answer })

		const completion = await OPENAI_CLIENT.chat.completions.create({
			model: "gpt-4o-mini",
			messages: allMessages as ChatCompletionMessageParam[],
		});

		const { error } = await supabase
			.from('chat_history')
			.insert([
					{
						role: 'user',
						message: answer,
						chat_id: params.chat
					},
					{
						role: 'assistant',
						message: completion.choices[0].message.content,
						chat_id: params.chat
					}
			]
				);
		if (error) console.error(error);
	}
}