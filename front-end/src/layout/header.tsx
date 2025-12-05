import { useState } from "react";

function Header() {
  const [isAS, setIsAS] = useState(true);

  return (
    <div className="Header">
      <header className="App-header flex items-center justify-between px-4 py-1 bg-[#27272a] text-white text-[5em] font-distressed hazard-weathered">
        <span className="concrete-text uppercase">Battlestuff</span>
        <div className="toggle-container flex flex-col items-center ml-4">
          <button
            onClick={() => setIsAS(!isAS)}
            className="relative w-10 h-24 rounded-full cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 50%, #2a2a2a 100%)',
              boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.5), 0 0 0 2px #555',
              border: '1px solid #666',
            }}
          >
            <span
              className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full transition-[top] duration-500 ease-in-out flex items-center justify-center text-xs font-sans font-bold"
              style={{
                top: isAS ? '0.25rem' : 'calc(100% - 2rem)',
                background: 'linear-gradient(165deg, #e8e8e8 0%, #b8b8b8 30%, #909090 70%, #a8a8a8 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.3)',
                color: '#333',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              {isAS ? 'AS' : 'TW'}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
