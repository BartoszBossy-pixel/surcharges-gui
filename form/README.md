# Surcharge Rules Form - TypeScript Application

A modern TypeScript-based form application for managing surcharge rules with real-time validation, dynamic row management, and JSON-based configuration.

## 📋 Prerequisites

Before running this application, make sure you have the following installed on your system:

### Required Software
- **Node.js** (version 14.0 or higher)
  - Download from: https://nodejs.org/
  - Check version: `node --version`
- **npm** (comes with Node.js)
  - Check version: `npm --version`

### System Requirements
- **Operating System**: macOS, Linux, or Windows
- **Browser**: Modern browser with ES2020 support (Chrome, Firefox, Safari, Edge)
- **Terminal/Command Line**: Access to terminal or command prompt

## 🚀 Installation & Setup

### 1. Navigate to Project Directory
```bash
cd form
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- **TypeScript** (^5.3.0) - TypeScript compiler
- **Webpack** (^5.89.0) - Module bundler and dev server
- **webpack-dev-server** (^4.15.1) - Development server with hot reload
- **ts-loader** (^9.5.1) - TypeScript loader for Webpack
- **Various loaders** - For CSS, HTML, and file handling

### 3. Build the Project (Optional for development)
```bash
npm run build
```

This compiles TypeScript and bundles everything for production in `dist/` folder.

## 🏃‍♂️ Running the Application

### Option 1: Development Mode (Recommended)
```bash
npm start
```
This command will:
1. Start Webpack dev server with hot reload
2. Automatically compile TypeScript on changes
3. Open browser at http://localhost:3000
4. Live reload on file changes

### Option 2: Development with Manual Browser
```bash
npm run dev
```
Same as above but doesn't auto-open browser.

### Option 3: Production Build & Serve
```bash
npm run build
npm run serve
```
Builds optimized production bundle and serves it.

### Option 4: TypeScript Watch Mode (Advanced)
```bash
npm run dev:ts
```
Only watches TypeScript files (for advanced debugging).

## 🌐 Accessing the Application

After starting the development server:

- **Webpack Dev Server**: http://localhost:8000/ (auto-opens)
- **Legacy JavaScript Version**: Open `test.html` manually in browser

**Features:**
- 🔥 **Hot Reload** - Changes appear instantly
- 📦 **Module Bundling** - All files bundled efficiently
- 🎯 **Source Maps** - Debug TypeScript directly in browser
- ⚡ **Fast Compilation** - Webpack optimized builds

## 📜 Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Webpack dev server (development mode) |
| `npm run dev` | Start Webpack dev server (no auto-open) |
| `npm run build` | Build production bundle (TypeScript + Webpack) |
| `npm run build:ts` | Compile TypeScript only |
| `npm run build:webpack` | Bundle with Webpack only |
| `npm run serve` | Serve production build |
| `npm run dev:ts` | TypeScript watch mode only |
| `npm run clean` | Remove dist folder |

## 📁 Project Structure

```
form/
├── README.md                    # This file
├── package.json                 # NPM configuration & dependencies
├── webpack.config.js            # Webpack configuration
├── tsconfig.json               # TypeScript configuration
├── test-typescript.html        # HTML template (Webpack processes)
├── test.html                   # Legacy HTML file (JavaScript version)
├── form-styles.css             # Application styles (imported by Webpack)
├── main.ts                     # TypeScript entry point (Webpack entry)
├── types/
│   └── form-types.ts           # TypeScript type definitions
├── controllers/
│   ├── data-controller.ts      # Data management controller
│   ├── form-controller.ts      # Form logic controller
│   ├── data-controller.js      # Legacy JavaScript version
│   └── form-controller.js      # Legacy JavaScript version
├── data/
│   ├── trigger-variables.json  # Form configuration data
│   ├── operators.json          # Operator options
│   ├── calculation-types.json  # Calculation type options
│   ├── calculation-basis.json  # Calculation basis options
│   └── applicable-zones.json   # Applicable zones options
├── dist/                       # Webpack build output (auto-generated)
└── trash/                      # Legacy files (backup)
```

## 🔧 Development

### Webpack + TypeScript Configuration
- **TypeScript**: Strict settings in `tsconfig.json` (ES2020, strict mode)
- **Webpack**: Modern bundling with hot reload and source maps
- **Dev Server**: Live reload on file changes
- **CSS**: Imported and bundled automatically
- **Assets**: JSON files copied to dist folder

### Adding New Features
1. Edit TypeScript files (`.ts`) or CSS files
2. **Webpack automatically recompiles and reloads browser**
3. No manual refresh needed!

### Development Workflow
1. Run `npm start` once
2. Edit any `.ts`, `.css`, or `.html` files
3. **Browser updates automatically** - no manual refresh!
4. Check browser console for any errors

## 🐛 Troubleshooting

### Common Issues

**Port 8000 already in use:**
```bash
# Webpack will automatically try next available port
npm start
# Or manually specify different port in webpack.config.js
```

**Webpack compilation errors:**
```bash
# Clean and rebuild
npm run clean
npm run build
# Check terminal for detailed error messages
```

**Module resolution errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Hot reload not working:**
- Check if files are being watched correctly
- Restart dev server: `npm start`
- Check browser console for WebSocket connection errors

**CORS errors (shouldn't happen with Webpack dev server):**
- Webpack dev server handles CORS automatically
- If issues persist, check webpack.config.js configuration

## 🎯 Features

- **TypeScript**: Full type safety and modern JavaScript features
- **Webpack**: Modern bundling with hot reload and optimization
- **Hot Reload**: Instant updates without manual refresh
- **Real-time Validation**: Form validation with visual feedback
- **Dynamic Rows**: Add/remove form rows dynamically
- **JSON Configuration**: External configuration files for form options
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error handling with user feedback
- **Source Maps**: Debug TypeScript directly in browser
- **CSS Bundling**: Automatic CSS processing and injection

## 📝 Usage

1. **Adding Rules**: Click "Add New Rule" to add new surcharge rules
2. **Removing Rules**: Click the red ✕ button to remove rules
3. **Validation**: Form validates in real-time with error messages
4. **Saving**: Click "Save All Rules" to validate and collect form data
5. **Console Output**: Check browser console for detailed form data

## 🔄 Version History

- **v2.0.0**: Webpack integration with hot reload and modern bundling
- **v1.0.0**: Initial TypeScript conversion with full type safety
- **Legacy**: JavaScript version available in `trash/` folder

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify all prerequisites are installed
3. Ensure HTTP server is running on correct port
4. Check that all files are present in project structure