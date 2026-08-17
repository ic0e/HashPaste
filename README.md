# HashPaste • [![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
HashPaste is a zero database web application that compresses and embeds text directly into URL hash fragments for instant sharing without backends, storage limits, or link expiration.

It compresses raw text using browser native compression and embeds the resulting payload directly into URL hash fragments. Because the data lives entirely within the link itself, pastes can be decoded instantly without a backend. This ensures no database storage is ever needed, the links never expire and data is recoverable even if the service shuts down.

## Try it:
**[hash-paste.vercel.app](https://hash-paste.vercel.app)**

## Use Cases

HashPaste works for any short lived text sharing: API configs, error logs, debug output, temporary notes, or code snippets. Anything you'd normally throw into a pastebin, but where you want the link itself to be the only record.

## How to Use

Type or paste your text. The preview renders markdown as you type. Hit "Generate Link" to compress and embed everything into the URL. Share the link, you don't need registration or anything else.

## Browser Support

HashPaste uses native compression (currently deflate-raw, switching to Brotli) supported by all modern browsers. URL length is limited by browser capabilities; realistically around 2MB of uncompressed text depending on your browser.

## Limitations

The only constraint is URL length. Extremely large pastes create unwieldy links and for that, use a traditional pastebin. If the link itself becomes too long to share easily, the content is too big for this tool.

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

Upcoming: 
- Brotli compression for better compression ratios, and URL length validation to match modern browser limits.
- URL shortener (conceptual idea); automatic redirects to any URL you provide, with the aim of this to be a free databaseless URL link shortener as well.

Expect any feature that can benefit from databaseless URL hashing to be added.

## License
This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
