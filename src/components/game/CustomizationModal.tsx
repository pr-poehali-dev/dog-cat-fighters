import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface CustomizationModalProps {
  onClose: () => void;
  onSave: (customization: { dogEmoji: string; pierreEmoji: string }) => void;
  currentDog: string;
  currentPierre: string;
}

const dogOptions = ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩'];
const pierreOptions = ['🦜', '🦅', '🦉', '🕊️', '🦚'];

export default function CustomizationModal({
  onClose,
  onSave,
  currentDog,
  currentPierre,
}: CustomizationModalProps) {
  const [selectedDog, setSelectedDog] = useState(currentDog);
  const [selectedPierre, setSelectedPierre] = useState(currentPierre);

  const handleSave = () => {
    onSave({ dogEmoji: selectedDog, pierreEmoji: selectedPierre });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-purple-600 p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="Palette" size={24} />
            Кастомизация
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold mb-3 text-sm">🐕 СОБАКА-ВОИН</h3>
            <div className="grid grid-cols-5 gap-2">
              {dogOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedDog(emoji)}
                  className={`text-4xl p-3 rounded border-2 transition-all hover:scale-110 ${
                    selectedDog === emoji
                      ? 'border-green-500 bg-green-900/50'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 text-sm">🦜 ПОПУГАЙ ПЬЕР</h3>
            <div className="grid grid-cols-5 gap-2">
              {pierreOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedPierre(emoji)}
                  className={`text-4xl p-3 rounded border-2 transition-all hover:scale-110 ${
                    selectedPierre === emoji
                      ? 'border-blue-500 bg-blue-900/50'
                      : 'border-gray-700 bg-gray-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
