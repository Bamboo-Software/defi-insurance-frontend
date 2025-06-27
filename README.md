# Defi Insurance Frontend

<p align="center">
  <a href="https://react.dev/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo" /></a>
</p>

## Overview
- [About Project](#about-project)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Resources](#resources)
- [Support](#support)
- [Stay in touch](#stay-in-touch)
- [License](#license)

## About Project

Defi Insurance Frontend is the user interface for a decentralized insurance platform, designed for transparency, security, and scalability.

**Built with:**
- <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React"/> [React](https://react.dev/)
- <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/> [Vite](https://vitejs.dev/)
- <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/> [TypeScript](https://www.typescriptlang.org/)
- <img src="https://img.shields.io/badge/Ethers.js-5C3F7C?logo=ethers&logoColor=white" alt="Ethers.js"/> [Ethers.js](https://docs.ethers.org/)
- <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker"/> [Docker](https://www.docker.com/)
- Avalanche Blockchain

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm/yarn
- Docker (for containerized deployment)

### Installation

#### 1. Install Node.js (v18 or higher)
- Download and install from [nodejs.org](https://nodejs.org/)
- Or, using nvm (Node Version Manager):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  # Restart your terminal, then:
  nvm install 18
  nvm use 18
  ```

#### 2. Install pnpm
```bash
npm install -g pnpm
```

#### 3. Install Docker
- Download and install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
- Or follow the [official Docker installation guide](https://docs.docker.com/get-docker/)

#### 4. Clone the repository and install dependencies
```bash
git clone <your-repo-url>
cd <project-folder>
pnpm install
```

### Run with Docker

```bash
docker build -t defi-insurance-frontend .
docker run --env-file .env -p 80:80 defi-insurance-frontend
```

### Development commands

```bash
# Start the development server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview

# Lint the code
pnpm lint
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_BASE_URL=https://defi-insurance.bamboosoft.io/api/
VITE_INSURANCE_CONTRACT_ADDRESS=0x96C40a105c4dcA72e18a16EE511eA51bf4443685
VITE_INSURANCE_USDC_TOKEN_ADDRESS=0x5425890298aed601595a70AB815c96711a31Bc65
```

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Avalanche Documentation](https://docs.avax.network/)
- [Docker Documentation](https://docs.docker.com/)

## Support

This project is open source and MIT-licensed. For questions and support, please open an issue or discussion on the repository.

## Stay in touch

- Website - [https://defi-insurance.bamboosoft.io/](https://defi-insurance.bamboosoft.io/)
- Author - [Your Name or Team]
- Twitter - [@yourtwitter](https://twitter.com/yourtwitter)

## License

This project is [MIT licensed](./LICENSE).
