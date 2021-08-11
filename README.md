# encrypted-note

Web app build with MERN stack

## Technologies
* React.js as frontend
* Node.js (express) as API
* MongoDB as Database

## Features
* JWT auth
* note encrypting using openpgp
* Creating/Editing notes
* Sharing notes between users 
* Separated password for account and PIN to decrypt notes

## Installation
Requires: Node.js version 16.1.0 & Yarn version 1.22.11

#### 1. Clone repo
```bash
git clone https://github.com/zlskey/encrypted-note.git
cd encrypted-note
```

#### 2. Enviroment variables
Rename both .env.example files into .env and change their content 

First is in ~/encrypted-note and second is in frontend directory


#### 3. Install dependencies
```bash
# ~/encrypted-note directory

npm install
cd frontend
yarn install
```
#### 4. Start app
```bash
# ~/encrypted-note directory

# for development (frontend will run on port 3000 and backend on port 5000)
npm run dev

# for production 
npm start
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