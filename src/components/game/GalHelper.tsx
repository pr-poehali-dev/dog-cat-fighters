import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GalHelperProps {
  message: string;
  questTitle?: string;
  onAccept?: () => void;
  onClose: () => void;
}

export default function GalHelper({ message, questTitle, onAccept, onClose }: GalHelperProps) {
  return (
    <div className="fixed bottom-24 left-4 bg-gradient-to-r from-blue-900/95 to-purple-900/95 border-4 border-yellow-500 p-4 rounded-lg max-w-md animate-scale-in z-40 shadow-2xl">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-5xl animate-bounce">🦢</div>
        <div className="flex-1">
          <div className="text-yellow-400 font-bold text-sm mb-1 flex items-center gap-2">
            <Icon name="Sparkles" size={16} />
            ГАЛ ЗВОНИТ ПО ВОЛШЕБНОМУ ЗЕРКАЛУ
          </div>
          <p className="text-white text-sm leading-relaxed">{message}</p>
          {questTitle && (
            <div className="mt-2 bg-yellow-600/30 border border-yellow-500 p-2 rounded">
              <div className="text-yellow-300 text-xs font-bold">📜 НОВЫЙ КВЕСТ:</div>
              <div className="text-white text-xs">{questTitle}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {onAccept && (
          <Button
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
          >
            <Icon name="Check" size={14} className="mr-1" />
            Принять квест
          </Button>
        )}
        <Button
          onClick={onClose}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-xs"
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
}
