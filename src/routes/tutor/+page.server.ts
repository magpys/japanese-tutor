import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit';
import { OPENAI_CLIENT, SYSTEM_MESSAGES } from '$lib';
import type { ChatCompletionMessageParam } from 'openai/resources';

export const load = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:chats');
	const { data: chats } = await supabase.from('chats').select('id,created_at').order('created_at');
	return { chats: chats ?? [] };
};

export const actions: Actions = {
	begin: async ({ locals: { supabase } }) => {
		const { error, data } = await supabase.from('chats').insert({  }).select();
		if (error) console.error(error);

		const completion = await OPENAI_CLIENT.chat.completions.create({
			model: "gpt-4o-mini",
			messages: SYSTEM_MESSAGES as ChatCompletionMessageParam[],
		});

		const { error: chatHistoryError } = await supabase
			.from('chat_history')
			.insert([
					{
						role: 'assistant',
						message: completion.choices[0].message.content,
						message_index: 123,
						chat_id: data[0]['id']
					}
				]
			);
		if (chatHistoryError) console.error(error);

		await redirect(302, `/tutor/${data[0]['id']}`)
	}
}