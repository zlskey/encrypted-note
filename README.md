# encrypted-note

Web app build with MERN stack. You can try it [here](https://note.zlskey.pl)

## Technologies

-   React.js as frontend
-   Node.js (express) as API
-   MongoDB as Database

## Features

-   JWT auth
-   note encrypting using openpgp
-   password recovery using email
-   Creating/Editing notes
-   Sharing notes between users
-   Separated password for account and PIN to decrypt notes

## Installation

### With docker:

#### 1. Clone repo

```bash
git clone https://github.com/zlskey/encrypted-note.git
cd encrypted-note
```

#### 2. Preparing docker-compose

-   Rename docker-compose.yml.example to docker-compose.yml
-   Set enviroment variables inside docker-compose.yml

#### 3. Run containers

```bash
docker compose up -d --build
```

### Without docker:

Requires: Node.js version 16.1.0 & Yarn version 1.22.11

#### 1. Clone repo

```bash
git clone https://github.com/zlskey/encrypted-note.git
cd encrypted-note
```

#### 2. Enviroment variables

Rename .env.example files to .env and set your enviroment variables in

-   `~/encrypted-note/backend/.env.example`
-   `~/encrypted-note/frontend/.env.example`

#### 3. Install dependencies

```bash
# ~/encrypted-note directory

cd frontend
yarn install

cd ../backend
npm install
```

#### 4. Start app

```bash
# ~/encrypted-note directory

# frontend will run on port 3000 & backend on port 5000
# you will have to run 'npm start' in both directories
```

## License

MIT License

Copyright (c) 2021 zlskey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
