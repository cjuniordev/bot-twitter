# bot-twitter

## A Twitter robot, which picks up the trend topic, searches for a phrase related to the topic and tweets that phrase.

![Badge](https://img.shields.io/badge/nodejs-v12.14.0-<#51cf66>)
![Badge](https://img.shields.io/badge/npm-v6.14.8-<#5c940d>)
![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fcjuniordev)

### Prerequisites

Intall the requisites:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

### To run

```bash
# Clone this repository
$ git clone <https://github.com/cjuniordev/bot-twitter.git>

# Access the project folder
$ cd bot-twitter

# Install dependencies
$ npm install puppeteer
$ npm install dotenv
```

### Configure environment variables

```bash
# Create a new file called .env

# Into .env, create a variables and set your credentials, in this structure:

  USER_TWITTER=your_user_twitter
  PASS_TWITTER=yout_password_twitter
  
# Save file
```

### Run bot
```bash
$ node index.js
```
