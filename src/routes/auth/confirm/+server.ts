import type { EmailOtpType } from '@supabase/supabase-js'
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash')
	const type = url.searchParams.get('type') as EmailOtpType | null
	const next = url.searchParams.get('next') ?? '/'

	/**
	 * Clean up the redirect URL by deleting the Auth flow parameters.
	 *
	 * `next` is preserved for now, because it's needed in the error case.
	 */
	const redirectTo = new URL(url)
	redirectTo.pathname = next
	redirectTo.searchParams.delete('token_hash')
	redirectTo.searchParams.delete('type')

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ type, token_hash })
		if (!error) {
			redirectTo.searchParams.delete('next')
			redirect(303, redirectTo)
		}
	}

	throw new Error('Authentication failed');

	redirectTo.pathname = '/auth/error'
	redirect(303, redirectTo)
}