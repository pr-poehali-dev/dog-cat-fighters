import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CharacterSelectorProps {
  currentCharacter: 'dog' | 'pierre';
  onSelectCharacter: (char: 'dog' | 'pierre') => void;
  onCustomize: () => void;
}

export default function CharacterSelector({
  currentCharacter,
  onSelectCharacter,
  onCustomize,
}: CharacterSelectorProps) {
  return (
    <div className="fixed top-4 right-4 bg-black/90 border-2 border-gray-600 p-3 rounded-lg z-40">
      <div className="text-white text-xs mb-2 font-bold">ПЕРСОНАЖ:</div>
      <div className="flex gap-2 mb-2">
        <Button
          onClick={() => onSelectCharacter('dog')}
          className={`${
            currentCharacter === 'dog'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-700 hover:bg-gray-600'
          } text-2xl px-3 py-2`}
          title="Собака-воин"
        >
          🐕
        </Button>
        <Button
          onClick={() => onSelectCharacter('pierre')}
          className={`${
            currentCharacter === 'pierre'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          } text-2xl px-3 py-2`}
          title="Попугай Пьер"
        >
          🦜
        </Button>
      </div>
      <Button
        onClick={onCustomize}
        className="w-full bg-purple-600 hover:bg-purple-700 text-xs py-2"
        size="sm"
      >
        <Icon name="Palette" size={14} className="mr-1" />
        Кастомизация
      </Button>
    </div>
  );
}
