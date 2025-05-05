# ShmooCon Ticket Bot API 🎫🤖
*This is part a proof-of-concept bot to automatically purchase tickets for ShmooCon, a conference that is notoriously hard to get tickets for. [See more info here.](https://github.com/ShmooConTix/ticket-bot)*

> [!CAUTION]
> This project is provided for research and educational purposes only. It is intended solely as a proof of concept. The author is not responsible for any misuse or actions taken by end users based on this code. Use at your own risk. We are not affiliated with ShmooCon in any way.

## About / Features
This serves as the API that controls everything else and is absolutely crucial to the functioning of other components. It is built with Bun and Elysia. Below is a comprehensive list of the features that it provides:

- SQLite Database to store user information, checkouts, and configuration
- Configuration management from the dashboard using a KV (key value) system
- Routes to connect to [extension](https://github.com/ShmooConTix/extension) (not used) for riddles
- Link solving / detection system from [extension](https://github.com/ShmooConTix/extension) to initalize ticket purchasing process
- WebSocket events to provide real-time updates for [bot-ts](https://github.com/ShmooConTix/bot-ts) and [dashboard](https://github.com/ShmooConTix/dashboard)
- AI riddle solving capabilities, powered by OpenAI
- Global state using `zustand`

## Installation
To run a development environment, you can run the API through the `Dockerfile`. If you aren't familiar with Docker, please consult the documentation.

## Contributing
This project / experiment is over and is not open to changes. Please contact me if you have questions.