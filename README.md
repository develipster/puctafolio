# PUC-tafolio

A comprehensive portfolio website showcasing my **Computer Engineering** journey at _Pontificia Universidad Católica de Chile_.

## 🎯 Project Overview

PUC-tafolio is a modern, interactive portfolio built with cutting-edge web technologies. The centerpiece features a dynamic knowledge graph that visualizes my academic coursework and technical skills through an engaging node-based interface.

## ✨ Key Features

- **Interactive Knowledge Graph**: D3.js-powered visualization of academic courses and their interconnections
- **Technical Blog**: MDX-based blog system documenting development process and technical insights
- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript 5, and Tailwind CSS 4
- **Responsive Design**: Optimized for all devices with clean, minimalist aesthetics
- **Performance Optimized**: Server-side rendering and static generation for fast loading

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript 5.3.3
- **Styling**: Tailwind CSS 4.0 (alpha)
- **Data Visualization**: D3.js 7.9.0
- **Content**: MDX for blog posts
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 🏗 Project Structure

```
puctafolio/
├── puctafolio-front/           # Next.js application
│   ├── app/                    # App Router directory
│   │   ├── blog/              # Blog system
│   │   │   ├── posts/         # MDX blog posts
│   │   │   └── [slug]/        # Dynamic blog routes
│   │   ├── components/        # Reusable React components
│   │   ├── graph/             # Knowledge graph implementation
│   │   │   ├── graph.tsx      # D3.js graph component
│   │   │   ├── knowledge.tsx  # Data types and interfaces
│   │   │   └── knowledge.json # Course and connection data
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies and scripts
│   └── .nvmrc                 # Node.js version specification
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/develipster/puctafolio.git
   cd puctafolio/puctafolio-front
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📊 Knowledge Graph

The interactive knowledge graph is the heart of this portfolio, featuring:

- **Physics-based simulation** using D3.js force layout
- **Drag and drop interactions** for exploring course relationships
- **Zoom and pan capabilities** for detailed navigation
- **Visual hierarchy** highlighting core engineering subjects
- **Scalable architecture** for adding new courses and connections

### Graph Structure

- **Central Node**: Computer Engineering Degree
- **Core Subjects**: Software Engineering, Database Systems, AI, etc.
- **Specialized Courses**: Connected to their respective core areas
- **Interactive Elements**: Click-to-navigate (planned feature)

## 📝 Blog System

The integrated blog documents the development journey:

- **Technical deep-dives** into implementation decisions
- **MDX support** for rich content with embedded React components
- **Automatic routing** with Next.js App Router
- **SEO optimized** with proper metadata and structured data

## 🎨 Design Philosophy

- **Minimalist aesthetic** focusing on content and functionality
- **Clean typography** using the Geist font family
- **Responsive design** ensuring great experience across devices
- **Performance first** with optimized builds and static generation
- **Accessibility** following modern web standards

## 🚀 Deployment

The project is deployed on Vercel with:

- **Automatic deployments** from the main branch
- **Preview deployments** for pull requests
- **Edge optimization** for global performance
- **Analytics integration** with Vercel Speed Insights

Live site: [Puctafolio Vercel App](https://puctafolio.vercel.app/)

## 🔧 Development Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📈 Future Enhancements

- [ ] Click-to-navigate functionality for graph nodes
- [ ] Individual course detail pages with projects and assignments
- [ ] Advanced filtering and search capabilities
- [ ] Mobile-optimized graph interactions
- [ ] Integration with GitHub API for project showcasing
- [ ] Dark mode theme toggle
- [ ] Multi-language support (Spanish/English)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share feedback on the user experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Note**: This project was initially based on the [Vercel Portfolio Template](https://github.com/vercel/examples/tree/main/solutions/portfolio) (MIT Licensed) and has been extensively modified and customized.

## 📧 Contact

**Felipe Olivares** - Computer Engineering Graduate
- Email: develipster@gmail.com
- GitHub: [@develipster](https://github.com/develipster)
- LinkedIn: [Felipe Olivares](https://www.linkedin.com/in/felipe-olivares-l/)

---

*Built with ❤️ and modern web technologies at Pontificia Universidad Católica de Chile*