# Japanese Tutor

Your very own AI-powered Japanese tutor.

## Versions

* Node - 20.12.2

## Developing

1. Install dependencies using `npm install`.
2. Provide environment variables (probably using a `.env` file):
   * `PUBLIC_SUPABASE_URL` - Your public SUPABASE URL.
   * `PUBLIC_SUPABASE_ANON_KEY` - Your public SUPABASE anon key
   * `OPENAI_API_KEY` - Your openAI API key.
3. Configure your supabase database tables (see the `supabase_scripts` folder).
4. Start the app: `npm run dev -- --open`
