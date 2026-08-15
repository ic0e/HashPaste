import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import Markdown from 'react-markdown';

const defaultText = "console.log('Hello, world!'";

function App() {
  const [text, setText] = useState(defaultText);

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-100 overflow-hidden">
          <div className="w-[80%] h-full flex flex-row border-r border-slate-800">
            <div className="w-1/2 h-full border-r border-slate-800 flex flex-col">
              <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
                EDITOR
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
              <div className="flex-1 p-6 overflow-auto prose prose-invert max-w-none">
                <Markdown>{text}</Markdown>
              </div>
            </div>
    
          </div>
          <div className="w-[20%] h-full bg-slate-950 p-4 flex flex-col gap-4">
            <div className="text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              CONTROLS
            </div>
            
            <button 
              onClick={() => alert("TODO; connect button to link generation")}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded text-sm transition-colors"
            >
              Generate Link
            </button>
    
            <button 
              onClick={() => setText('')}
              className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded text-sm transition-colors"
            >
              Clear Editor
            </button>
          </div>
        </div>
  )
}

export default App
