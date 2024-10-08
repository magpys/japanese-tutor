import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';

import type { Actions } from './$types'

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { error: authError } = await supabase.auth.signUp({ email, password })
		if (authError) {
			console.error(authError);
			throw error(authError.status ?? 400, authError.message);
		} else {
			redirect(303, '/?signup=success')
		}
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
		if (authError) {
			console.error(authError)
			throw error(authError.status ?? 400, authError.message);
		} else {
			redirect(303, '/tutor')
		}
	},
}