import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isVisible, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('~/space-station');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const CORRECT_PASSWORD = 'T!asb9Hg7$MBmWXF';

  useEffect(() => {
    if (isVisible && !isAuthenticated) {
      setHistory(['Космическая станция POEHALI.DEV', 'Терминал: 1754297590205DEMO', '', 'Введите пароль для доступа:']);
    }
  }, [isVisible, isAuthenticated]);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible, history]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (!isAuthenticated) {
      if (cmd === CORRECT_PASSWORD) {
        setIsAuthenticated(true);
        setHistory(prev => [
          ...prev,
          `Password: ${'*'.repeat(cmd.length)}`,
          '',
          '✅ Доступ разрешен',
          '🚀 Добро пожаловать в космическую станцию POEHALI.DEV',
          '',
          'Доступные команды: help, status, launch, abort, clear, exit',
          ''
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          `Password: ${'*'.repeat(cmd.length)}`,
          '❌ Неверный пароль. Попробуйте снова:',
          ''
        ]);
      }
      return;
    }

    const newHistory = [...history, `${currentPath}$ ${cmd}`];

    switch (cmd.toLowerCase().trim()) {
      case 'help':
        newHistory.push(
          'Доступные команды:',
          '  help     - показать эту справку',
          '  status   - статус космической станции',
          '  launch   - запустить ракету 🚀',
          '  abort    - аварийное прекращение миссии',
          '  clear    - очистить экран',
          '  exit     - выйти из терминала',
          ''
        );
        break;

      case 'status':
        newHistory.push(
          '🛰️  СТАТУС КОСМИЧЕСКОЙ СТАНЦИИ',
          '================================',
          '🟢 Главные системы: ОНЛАЙН',
          '🟢 Навигация: АКТИВНА',
          '🟢 Связь: СТАБИЛЬНАЯ',
          '🟢 Жизнеобеспечение: 98%',
          '🟡 Топливо: 76%',
          '🔋 Энергия: 89%',
          '',
          'Готовность к запуску: ✅',
          ''
        );
        break;

      case 'launch':
        newHistory.push(
          '🚀 ИНИЦИАЦИЯ ЗАПУСКА...',
          '⚡ Проверка систем...',
          '🔥 Запуск двигателей...',
          '🌌 Курс проложен к звездам!',
          '',
          '✨ Миссия началась! Поехали! ✨',
          ''
        );
        break;

      case 'abort':
        newHistory.push(
          '🔴 АВАРИЙНОЕ ПРЕКРАЩЕНИЕ МИССИИ',
          '⚠️  Отключение всех систем...',
          '🛑 Возвращение на базу...',
          '📡 Миссия прервана',
          ''
        );
        break;

      case 'clear':
        setHistory(['']);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push(`bash: ${cmd}: команда не найдена`, '');
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-green-500 rounded-lg w-full max-w-4xl h-[600px] shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-green-500 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-green-400 font-mono text-sm">1754297590205DEMO</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="p-4 h-[calc(100%-60px)] overflow-y-auto font-mono text-sm"
        >
          {history.map((line, index) => (
            <div key={index} className="text-green-400 whitespace-pre-wrap">
              {line}
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-center text-green-400">
            <span className="mr-2">
              {isAuthenticated ? `${currentPath}$ ` : 'Password: '}
            </span>
            <input
              ref={inputRef}
              type={isAuthenticated ? "text" : "password"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-green-400 caret-green-400"
              autoComplete="off"
            />
            <span className="animate-pulse">▋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;