# Japanese Tutor

Your very own AI-powered Japanese tutor.


## Developing

1. Install dependencies using `npm install`.
2. Provide environment variables (probably using a `.env` file):
   * `PUBLIC_SUPABASE_URL` - Your public SUPABASE URL.
   * `PUBLIC_SUPABASE_ANON_KEY` - Your public SUPABASE anon key
   * `PUBLIC_OPENAI_API_KEY` - Your openAI API key.
3. Configure your supabase database tables.
4. Start the app: `npm run dev -- --open`