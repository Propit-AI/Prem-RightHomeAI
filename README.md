# RightHomeAI 🏠🤖

**Find your perfect home with AI-powered assistance**

RightHomeAI is an intelligent real estate platform that leverages artificial intelligence to help users discover their ideal home through natural conversations and smart recommendations.

## 📸 Screenshots

### Main Interface
![RightHomeAI Homepage](/public/screenshots/homeSS.png)

### AI Chat Interface
![AI Conversation](/public/screenshots/chatSS.png)

<!-- ### Voice Interaction
![Voice Feature](./screenshots/voice-interaction.png) -->

### Mobile Experience
<img src="/public/screenshots/mobileSS.png" alt="Mobile View" width="300"/>

*Experience the power of AI-driven home search*

## ✨ Features

- 🗣️ **Voice-Enabled Search** - Natural voice interactions for property discovery
- 🤖 **AI-Powered Recommendations** - Intelligent property matching based on preferences
- 💬 **Conversational Interface** - Chat with AI to refine your home search
- 🎯 **Personalized Results** - Tailored recommendations based on your criteria
- 📱 **Responsive Design** - Seamless experience across all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production-ready applications
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend & APIs
- **OpenAI API** - Advanced language model for natural conversations
- **Vapi.ai** - Voice AI integration for speech-to-text and text-to-speech
- **Next.js API Routes** - Serverless backend functions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Vapi.ai API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/righthomeai.git
   cd righthomeai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   VAPI_API_KEY=your_vapi_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
righthomeai/
├── pages/              # Next.js pages and API routes
├── components/         # Reusable React components
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and API clients
├── public/            # Static assets
├── types/             # TypeScript type definitions
└── .env.local         # Environment variables
```

## 🔧 Configuration

### OpenAI Setup
The application uses OpenAI's GPT models for natural language processing. Make sure to:
- Set your API key in the environment variables
- Configure rate limits and usage monitoring
- Customize the AI prompts for real estate contexts

### Vapi.ai Integration
Voice functionality is powered by Vapi.ai:
- Configure voice models and languages
- Set up real-time speech processing
- Customize voice interaction flows

## 🚀 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing powerful language models
- **Vapi.ai** for voice AI capabilities
- **Next.js** team for the amazing framework
- **Vercel** for seamless deployment platform

## 📞 Contact

- **Developer**: [Your Name]
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile]
- **Twitter**: [@yourhandle]

---

⭐ If you found this project helpful, please give it a star on GitHub!