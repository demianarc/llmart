const nextConfig = {
  env: {
    NEBIUS_API_KEY: process.env.NEBIUS_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;