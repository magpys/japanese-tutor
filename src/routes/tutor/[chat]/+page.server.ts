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
						message_index: 123,
						chat_id: params.chat
					},
					{
						role: 'assistant',
						message: completion.choices[0].message.content,
						message_index: 123,
						chat_id: params.chat
					}
			]
				);
		if (error) console.error(error);
	}
}