
---

# Telegram Bot

This project is a Telegram bot that uses `Telegraf` and `@polkadot/api`. This README provides steps for setting up and running the bot on your own system.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Requirements

1. **Node.js**: Ensure you have the latest version of Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

2. **npm**: This will be installed alongside Node.js and is used for managing packages.

## Installation

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```sh
   git clone https://github.com/username/repository-name.git
   ```

   Replace `username/repository-name` with the actual repository name.

2. **Navigate to the Project Directory**

   ```sh
   cd repository-name
   ```

3. **Install Dependencies**

   Make sure you are in the correct directory and run the following command:

   ```sh
   npm install
   ```

## Configuration

1. **Create a `.env` File**

   In the root directory of the project, create a `.env` file and add your sensitive information:

   ```plaintext
   DB_HOSTNAME=your-database-hostname
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_DATABASE=your-database-name
   TELEGRAM_TOKEN=your-telegram-bot-token
   GRAPHICS_SOURCE=https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/assets/
   HYDRATION_LOGO=./Assets/default/Hydration-Watcher.png
   ```

   Ensure that the `.env` file is added to `.gitignore` to prevent it from being versioned in the repository.

2. **Check `package.json`**

   Verify that all required packages are listed in `package.json`.

## Running the Bot

1. **Start the Bot**

   Use the following command to start the bot:

   ```sh
   npm start
   ```

   If you have set up a start script in `package.json`, `npm start` will run the bot.

2. **Stop the Bot**

   If you need to stop the bot, you can use:

   ```sh
   Ctrl + C
   ```

   Alternatively, if the bot is running on a server, you may use `SIGINT` or `SIGTERM` to stop it gracefully.

## Troubleshooting

- **Dependency Installation Issues**: Check if you have the correct versions of Node.js and npm. You can try:

  ```sh
  npm cache clean --force
  rm -rf node_modules
  npm install
  ```

- **Errors During Startup**: Ensure your `.env` file is correctly configured and all required packages are installed.

- **Database or API Connection Errors**: Check that your `.env` values are correct and that the database and API are accessible.

## Contributing

If you wish to contribute to the project, please create a pull request on GitHub. Ensure your changes are well-tested and do not negatively impact existing functionality before submitting.

---
