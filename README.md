# Beyond UI Blog - Modern Blog Platform

A modern, responsive blog platform built with Next.js 15 and React 19. This assignment demonstrates a full-featured blog application with dynamic content fetching, theme switching, and responsive design.

## 🌟 Features

- **Modern Blog Interface**: Clean, responsive design with featured and recent posts
- **Dynamic Content**: Fetches blog posts from external API
- **Theme Support**: Light/dark mode toggle with system preference detection
- **Responsive Design**: Optimized for all device sizes
- **Featured Posts**: Hero section with featured article and sidebar
- **Recent Posts**: Grid layout showcasing latest articles
- **Individual Post Pages**: Detailed view for each blog post
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Accessibility**: ARIA labels, skip links, and semantic HTML
- **Performance**: Image optimization, caching, and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS 4, Radix UI components
- **State Management**: TanStack Query (React Query)
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tejasnasre/oronium-assigment.git
cd oronium-assigment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📱 Usage

- **Home Page**: View featured posts in the hero section and recent posts grid
- **Individual Posts**: Click any post to view the full article
- **Theme Toggle**: Use the theme switcher in the navigation to toggle between light and dark modes
- **Navigation**: Browse through different sections using the top navigation bar

## 🔌 API Integration

The application fetches blog data from:
- **API Endpoint**: `https://688daee0a459d5566b12e6ed.mockapi.io/api/v1/blog`
- **Features**: Real-time data fetching with caching (5-minute stale time)
- **Data Structure**: Posts include title, content, images, author info, and categories

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/[id]/         # Dynamic blog post pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   ├── layout/           # Layout components (Navbar)
│   ├── FeaturedPost.tsx  # Featured posts sidebar
│   ├── MainCTAImage.tsx  # Hero section component
│   └── RecentPost.tsx    # Recent posts grid
├── hooks/                # Custom React hooks
│   └── useBlog.ts        # Blog data fetching hooks
├── lib/                  # Utility functions and API
│   ├── api.ts            # API client
│   └── utils.ts          # Helper utilities
├── providers/            # React context providers
├── types/                # TypeScript type definitions
└── globals.css           # Global styles
```

## 🌐 Deployment

The application is deployed on Vercel:
- **Live URL**: [https://oronium-assigment.vercel.app](https://oronium-assigment.vercel.app)
- **Automatic Deployments**: Connected to GitHub for continuous deployment

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📝 Assignment Requirements Fulfilled

✅ Modern React/Next.js application  
✅ Responsive design implementation  
✅ External API integration  
✅ State management with React Query  
✅ TypeScript implementation  
✅ Component-based architecture  
✅ SEO optimization  
✅ Accessibility features  
✅ Performance optimization  
✅ Dark/light theme support  

## 🤝 Contributing

This is an assignment project. For any questions or feedback, please refer to the project documentation.

## 📄 License

This project is for educational/assignment purposes.
