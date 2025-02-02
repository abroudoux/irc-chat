# irc-chat

This project is an Irc-Chat using the MERN stack (Express, React, Nodejs).
The server provides a REST API using Express and also a Socket.io server to handle the chat.
The client is a React app that uses the REST API to fetch the messages and the Socket.io server to send and receive messages.

Inside the chat, you can use the following commands:

- `/nick <nickname>`: Change your nickname.
- `/join <channel>`: Join a channel.
- `/quit`: Leave a channel.
- `/list`: List all the channels.
- `/users`: List all the users in the current channel.

## Installation

### Manual

Irc-Chat is a pnpm monorepo so you can launch simultaneously the server and the client.

```bash
npm run dev
```

Don't forget to install the dependencies.

```bash
pnpm install
```

The server is up at adress `http://localhost:3000/api` and the client at `http://localhost:5173`.

## Tests

You can run the tests with the following command.

```bash
pnpm test
```

## Roadmap

- Add tests for the client.
- Add all tests for the server.
- Dockerize the whole project.
- Add a CI/CD pipeline.
- Improve Socket connection handling.
- Add a user authentication system.
- Keep the messages in a database.
- Add a message history.

## License

This project is under the [MIT License](License).
