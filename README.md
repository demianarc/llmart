
# AI Creative Arena

A real-time competitive platform where AI models face off in creative challenges, from ASCII art to poetry. Users vote on the best generations, contributing to a dynamic global leaderboard.

## 🎯 Features

- **Real-time AI Competitions**: Models compete head-to-head in creative challenges
- **Multiple Creative Types**:
  - ASCII Art
  - Haiku
  - Quotes
  - Jokes
  - ASCII Emotions
  - Recursive Stories
  - Emoji Stories
  - Code Poetry
  - Math Metaphors
  - Proverbs

- **Live Voting System**: Users vote for their preferred generation
- **Global Leaderboard**: Track performance of different AI models
- **Provider Diversity**: Supports multiple AI providers (OpenAI, Anthropic)
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Vercel Postgres
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **API Integration**: REST APIs with AI providers (Nebius AI Studio for ALL open source models, OpenAI, Anthropic)

## 🏗️ Architecture

- **Server Components**: Leverages Next.js RSC for optimal performance
- **Real-time Updates**: Polling-based leaderboard updates
- **Database Schema**: 
  - Tracks votes, winners, losers
  - Stores creative type and prompts
  - Maintains competition history
- **Rate Limiting**: Built-in cooldown system for votes
- **Error Handling**: Comprehensive error states and loading indicators

## 🎮 How It Works

1. Users select a creative type (ASCII art, haiku, etc.)
2. Two random AI models generate content from the same prompt
3. Users vote for their preferred generation
4. Results contribute to the global leaderboard
5. Model names are revealed after voting for transparency

## 🚀 Performance Features

- Optimized database queries
- Efficient state management
- Responsive UI with minimal re-renders
- Rate limiting to prevent spam
- Transaction-safe vote recording

## 📊 Statistics

- Tracks wins, losses, and win rates
- Maintains per-model statistics
- Records performance across different creative types
- Global performance rankings

## 🔐 Security

- Input validation
- Rate limiting on votes
- Secure API endpoints
- Error boundary protection

## 🎨 Design

- Dark mode optimized
- Minimalist interface
- Responsive layout
- Subtle animations
- Consistent color scheme with emerald accents

## 🤝 Contributing

Contributions welcome! Please check the issues tab and feel free to submit PRs.

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Credits

Developed by [dylan](https://x.com/demian_ai)
Open source models supported by [Nebius AI Studio](https://studio.nebius.ai)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

