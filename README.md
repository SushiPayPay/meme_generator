# AI Meme Generator

Makes memes with AI. Powered by DallE and ChatGPT. Just enter a prompt and get a meme!

## Installation

1. **Install dependencies**

    Update and use your package manager to install the necessary dependencies:
   
    ```bash
    sudo apt update
    ```

    ```bash
    sudo apt install build-essential libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev nodejs npm
    ```

3. **Clone the repository**
    ```
    git clone https://github.com/SushiPayPay/meme_generator.git
    ```

4. **Clone the repository and install node packages**

    First, navigate to the 'client' directory and install the Node packages.

    ```bash
    npm install
    ```

    Next, navigate to the 'server' directory and install the Node packages.

    ```bash
    npm install
    ```

5. **Set up your environment file**

    Open the .env file in the server directory and add your OPENAI_API_KEY

    Create an .env file in your client directory and set the *REACT_APP_SERVER_API_URL* environment variable by adding it to your .env file as follows. The following works for local development. The backend runs on port 9000 by default.
    ```
    REACT_APP_SERVER_API_URL=http://localhost:9000
    ```

    Create another .env file in your server directory and set the *OPENAI_API_KEY* environment variable by adding it to your .env file as follows:
    ```
    OPENAI_API_KEY=<Your API key here>
    ```

## Running the Project

1. **Running the Frontend**

    For development, navigate to the 'client' directory and run:

    ```bash
    npm run dev
    ```

    For production, navigate to the 'client' directory and run:

    ```bash
    npm run build
    npm start
    ```

2. **Running the Backend**

    Navigate to the 'server' directory and run:

    ```bash
    npm start
    ```

