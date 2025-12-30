import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MobileControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onAttack: () => void;
}

export default function MobileControls({ onMove, onAttack }: MobileControlsProps) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8 pointer-events-none z-50">
      <div className="relative w-32 h-32 pointer-events-auto">
        <Button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          onTouchStart={() => onMove('up')}
          size="icon"
        >
          <Icon name="ChevronUp" size={24} />
        </Button>
        <Button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          onTouchStart={() => onMove('down')}
          size="icon"
        >
          <Icon name="ChevronDown" size={24} />
        </Button>
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          onTouchStart={() => onMove('left')}
          size="icon"
        >
          <Icon name="ChevronLeft" size={24} />
        </Button>
        <Button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          onTouchStart={() => onMove('right')}
          size="icon"
        >
          <Icon name="ChevronRight" size={24} />
        </Button>
      </div>

      <div className="pointer-events-auto">
        <Button
          className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 border-4 border-red-800 text-2xl font-bold"
          onTouchStart={onAttack}
          onClick={onAttack}
        >
          ⚔️
        </Button>
      </div>
    </div>
  );
}
