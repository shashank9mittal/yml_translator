# YML Processor - Free Online YAML Translation Tool

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://yml-translator-bpseutcze-shashank9mittals-projects.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Transform and translate YAML configurations instantly with our free online tool. Perfect for developers, DevOps teams, and internationalization projects.

## 🚀 Features

- **Multiple Format Support**: JSON, YAML, and escaped JSON strings
- **Excel-Based Translation**: Upload Excel files with translation mappings
- **Real-Time Validation**: Instant feedback on input and output validity
- **Two-Column Interface**: Side-by-side input and output for easy comparison
- **Copy to Clipboard**: One-click copying of translated results
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **No Registration Required**: Completely free and anonymous

## 🎯 Use Cases

- **Internationalization (i18n)**: Translate configuration files for multiple languages
- **DevOps Automation**: Transform deployment configurations
- **Configuration Management**: Convert between different config formats
- **API Documentation**: Translate API response examples
- **Data Migration**: Transform data structures between systems

## 🛠️ How It Works

1. **Paste Your YAML/JSON**: Enter your configuration in the left panel
2. **Upload Excel File**: Column A (original labels) → Column B (translations)
3. **Process Translation**: Click the process button to transform your data
4. **Copy Results**: Get your translated configuration instantly

## 📊 Supported Formats

### Input Formats
- **Regular JSON**: `[{"label": "Home", "value": "HOME"}]`
- **YAML**: Standard YAML syntax
- **Escaped JSON**: `"[\n {\n \"label\": \"Home\"\n }]"`

### Excel Format
| Column A (Labels) | Column B (Translations) |
|-------------------|-------------------------|
| Home              | Casa                    |
| Settings          | Configuración           |
| Profile           | Perfil                  |

## 🏗️ Technical Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Excel Processing**: xlsx library
- **YAML Processing**: js-yaml library
- **Deployment**: Vercel
- **Performance**: Optimized for Core Web Vitals

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shashank9mittal/yml_translator.git

# Navigate to project directory
cd yml_translator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
npx vercel
```

## 🎨 Project Structure

```
yml-translator/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Main application page
│   │   ├── sitemap.ts          # SEO sitemap generation
│   │   └── robots.ts           # Search engine directives
│   ├── components/
│   │   ├── YmlInput.tsx        # YAML input component
│   │   ├── TranslatedOutput.tsx # Output display component
│   │   ├── FileUpload.tsx      # Excel file upload
│   │   ├── ErrorMessage.tsx    # Error handling UI
│   │   └── SuccessMessage.tsx  # Success feedback UI
│   └── utils/
│       └── translationUtils.ts # Core translation logic
├── public/
│   ├── manifest.json           # PWA manifest
│   └── favicon.ico             # Site favicon
└── README.md
```

## 🔧 Configuration

The application supports various configuration formats and automatically detects the input type. No additional configuration is required for basic usage.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this tool helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with your team

## 📞 Contact

- **Live Demo**: [yml-translator.vercel.app](https://yml-translator-bpseutcze-shashank9mittals-projects.vercel.app)
- **GitHub**: [shashank9mittal/yml_translator](https://github.com/shashank9mittal/yml_translator)
- **Issues**: [Report a Bug](https://github.com/shashank9mittal/yml_translator/issues)

---

**Made with ❤️ for the developer community**
