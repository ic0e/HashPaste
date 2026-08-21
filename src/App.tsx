import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import Markdown from "react-markdown";
import { compressText, decompressText } from "./engine/compression";
import { EncryptionComponent } from "./components/EncryptionComponent";
import Header from "./components/Header";

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setIsCopied] = useState("Copy");
  const [linkIsCopied, setLinkIsCopied] = useState("Copy");
  const [encryptState, setEncryptState] = useState("");
  const [encrypted_text, setEncrypted] = useState<string | null>(null);

  const [password, setPassword] = useState("");

  useEffect(() => {
    const rawHash = window.location.hash;
    const cleanHash = rawHash.replace("#", "");

    if (!cleanHash) return;

    (async () => {
      try {
        const text = await decompressText(cleanHash);
        setText(text);
        setGeneratedUrl(window.location.href);
      } catch (err) {
        console.error("Decompression failed:", err);
      }
    })();
  }, []);

  useEffect(() => {
    setCount(text.length);
  }, [text])

  const handleGenerateLink = async () => {
    try {
      const hash = await compressText(text);

      const fullUrl = `${window.location.origin}/#${hash}`;

      setGeneratedUrl(fullUrl);

      window.location.hash = hash;
    } catch (err) {
      console.error("ERROR:", err);
      alert(`Error: ${(err as Error).message}`);
    }
  };

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied("Copied!");

      setTimeout(() => setIsCopied("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLinkCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setLinkIsCopied("Copied!");

      setTimeout(() => setLinkIsCopied("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (encrypted_text) {
      handleGenerateLink(); // call this in the useEffect or it won't generate the proper link
    }
  }, [encrypted_text]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
      <Header />
      <div className="flex h-screen w-screen bg-mist-900 text-slate-100 overflow-hidden">
        <div className="w-[80%] h-full flex flex-row border-r border-slate-800">
          <div className="w-1/2 h-full border-r border-slate-800 flex flex-col">
            <div className="flex items-center p-3 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>EDITOR</span> <span className="pl-5">CHARACTERS: {count}</span>
              <button
                className="ml-auto flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                onClick={() => handleCopy(text)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                >
                  <path d="M20 2H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H10V4h10z" />
                  <path d="M14 20H4V10h2V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h-2z" />
                </svg>
                <span>{copied}</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeMirror
                value={text}
                height="100%"
                theme="dark"
                extensions={[markdown()]}
                onChange={(val) => setText(val)}
                className="h-full text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto"
              />
            </div>
          </div>

          <div className="w-1/2 h-full flex flex-col bg-slate-900">
            <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
              PREVIEW
            </div>
            <div className="flex-1 p-6 overflow-auto prose prose-invert max-w-none bg-mist-900">
              <Markdown>{text}</Markdown>
            </div>
          </div>
        </div>
        <div className="w-[20%] h-full bg-slate-950 p-4 flex flex-col gap-4">
          <div className="text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            CONTROLS
          </div>

          <button
            type="button"
            onClick={handleGenerateLink}
            className="z-10 w-full py-2 px-4 bg-green-950 hover:bg-green-900 text-green-50 font-medium border border-green-900/80 hover:border-green-700 transition-all duration-200 cursor-pointer text-sm"
          >
            Generate Link
          </button>

          {generatedUrl ? (
            <div className="p-1 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
              <label className="text-[10px] font-mono text-slate-400 uppercase">
                Shareable Link
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-full p-2 pr-20 bg-green-950/40 border border-slate-700 text-slate-200 text-xs rounded font-mono focus:outline-none focus:border-blue-500"
                />
                <button
                  className="absolute right-1.5 flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 rounded text-[11px] transition-colors"
                  onClick={() => handleLinkCopy(generatedUrl)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M20 2H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H10V4h10z" />
                    <path d="M14 20H4V10h2V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h-2z" />
                  </svg>
                  <span>{linkIsCopied}</span>
                </button>
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-500 italic">
              No link generated yet
            </span>
          )}

          <button
            onClick={() => setText("")}
            className="z-10 w-full py-2 px-4 bg-gray-900 hover:bg-green-950 text-green-50 font-medium border border-green-950/80 hover:border-green-700 transition-all duration-200 cursor-pointer text-sm"
          >
            Clear Editor
          </button>
          <EncryptionComponent 
            password={password} 
            setPassword={setPassword} 
            text={text} 
            setText={setText} 
            encryptState={encryptState} 
            setEncryptState={setEncryptState} 
            setEncrypted={setEncrypted} 
          />

      </div>
      </div>
    </div>
  );
}

export default App;
