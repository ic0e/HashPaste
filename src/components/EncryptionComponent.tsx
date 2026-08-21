import { encrypt, decrypt } from "../engine/encryption";

interface PasswordProps {
  // password, setPassword
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  // encryptState, setEncryptState
  encryptState: string;
  setEncryptState: React.Dispatch<React.SetStateAction<string>>;
  // setEncrypted
  setEncrypted: React.Dispatch<React.SetStateAction<string | null>>;
  // text, setText
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export function EncryptionComponent({ password, setPassword, text, setText, encryptState, setEncryptState, setEncrypted }: PasswordProps) {
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEncryptContent = async (text: string, password: string) => {
    if (!text || !password) {
      console.error("Text and password are required");
      return;
    }

    try {
      setEncryptState("Encrypting...");

      await new Promise((resolve) => setTimeout(resolve, 50)); // renders "Encrypting" before it tries to encrypt, better UX

      const encrypted_text = await encrypt(text, password);
      setText(encrypted_text);
      setEncrypted(encrypted_text);
      setEncryptState("Successfully encrypted!");
    } catch (err) {
      console.error("Failed to encrypt: ", err);
      setEncryptState("Error encrypting!");
    }
  };

  const handleDecryptContent = async (text: string, password: string) => {
    if (!text || !password) {
      console.error("Text and password are required");
      return;
    }

    try {
      setEncryptState("Decrypting...");

      await new Promise((resolve) => setTimeout(resolve, 50)); // renders "Decrypting" before it tries to encrypt, better UX

      const decrypted = await decrypt(text, password);
      if (decrypted == "H_P_FAILED_DECRYPTION") {
        setEncryptState("Failed decrypting! Wrong password or corrupted data.");
      } else {
        setText(decrypted);
        setEncrypted(decrypted);
        setEncryptState("Successfully decrypted!");
      }
    } catch (err) {
      console.error("Failed to decrypt: ", err);
      setEncryptState("Error decrypting!");
    }
  };
  
  return (
    <>
      <div className="text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
        ENCRYPT/DECRYPT CONTENT
      </div>
  
      <label className="text-[12px] font-mono uppercase">Password</label>
      <input
        type="text"
        value={password}
        onChange={handlePasswordChange}
        className="w-full p-2 pr-20 bg-green-950/40 border border-slate-700 text-slate-200 text-xs rounded font-mono focus:outline-none focus:border-blue-500 [text-security:disc] [-webkit-text-security:disc]"
      />
      <label className="text-[10px] font-mono text-slate-400 uppercase">
        {encryptState}
      </label>
  
      <div className="flex w-full gap-3">
        <button
          type="button"
          onClick={() => handleEncryptContent(text, password)}
          className="z-10 flex-1 py-2 px-4 bg-green-950 hover:bg-green-900 text-green-50 font-medium border border-green-900/80 hover:border-green-700 transition-all duration-200 cursor-pointer text-sm text-center"
        >
          Encrypt Content
        </button>
  
        <button
          type="button"
          onClick={() => handleDecryptContent(text, password)}
          className="z-10 flex-1 py-2 px-4 bg-red-950/50 hover:bg-green-900 text-green-50 font-medium border border-red-900/60 hover:border-green-700 transition-all duration-200 cursor-pointer text-sm text-center"
        >
          Decrypt Content
        </button>
      </div>
    </>
  );
}
