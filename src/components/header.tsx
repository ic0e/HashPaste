function Header() {
  return (
    <header className="border-b border-gray-800 bg-slate-950 py-2 flex-none">
      <div className="w-full px-6 flex justify-between items-center">
        <img 
          src="/hashpaste-logo.png" 
          alt="HashPaste" 
          className="h-8 w-auto cursor-pointer scale-150 origin-left transition-transform"
        />
        <a 
          href="https://github.com/ic0e/hashpaste" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 text-sm font-medium transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Header;
