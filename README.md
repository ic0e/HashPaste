# HashPaste • [![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
HashPaste is a zero database web application that compresses and embeds text directly into URL hash fragments for instant sharing without backends, storage limits, or link expiration.

## Try it:
**[hash-paste.vercel.app](https://hash-paste.vercel.app)**

## Why HashPaste?

HashPaste instantly compresses raw text using browser native compression and embeds the resulting payload directly into URL hash fragments. Because the data lives entirely within the link itself, pastes can be decoded instantly without a backend. This ensures no database storage is ever needed, the links never expire and data is recoverable even if the service shuts down. No data is accessible to anyone you haven't shared a link with.

### Use cases
- ***Security;*** your data never gets sent to servers, no third party databases have access to anything you paste in.
- ***Casual use;*** HashPaste is fast, there are no registrations or CAPCHAS, generating a share link is instant.

## How to Use

Type or paste your text. The preview renders markdown as you type. Hit "Generate Link" to compress and embed everything into the URL. You can share the URL with anyone and they will be able to open it.

## Browser Support & Limitations

HashPaste uses native compression (`brotli-wasm`) supported by all modern browsers. URL length is limited by browser capabilities, realistically around 2MB of uncompressed text depending on your browser.

It is best used for short snippets (debug outputs, config files, security reports, etc.) but can theoretically be used for anything as long as link length isn't a concern.

The only constraint is URL length. Extremely large pastes create unwieldy links and for that, use a traditional pastebin. If the link itself becomes too long to share easily, the content is too big for this tool.

## Features

### Text compression
Text is compressed with Brotli before embedding into the URL, reducing payload size significantly and allowing longer pastes to fit within browser limits. The editor renders markdown in real time for better readability. Generate a link instantly with no accounts or database, anyone with the link can decode the paste.

### Password encryption
Pastes can be encrypted with a password using libsodium's `crypto_secretbox`. Encrypted content is compressed before encoding into the link. Decryption requires the correct password; without it, the paste is unreadable. No encryption keys or passwords are stored anywhere.


## Setup and Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/ic0e/hashpaste.git
cd hashpaste
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Roadmap

**Upcoming:** 
- URL shortener (conceptual idea); automatic redirects to any URL you provide, with the aim of this to be a free databaseless URL link shortener as well.

Check [Issues](https://github.com/ic0e/HashPaste/issues) for more upcoming features & more.

Expect any feature that can benefit from databaseless URL hashing to be added.

## License
This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
