import { Button } from '@/components/ui/button';
import { PlayerState } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface GameUIProps {
  player: PlayerState;
  onToggleCrafting: () => void;
  onToggleInventory: () => void;
  onToggleQuests: () => void;
  onChangeLocation: (location: 'kingdom' | 'mine') => void;
  currentLocation: 'kingdom' | 'mine';
}

export default function GameUI({
  player,
  onToggleCrafting,
  onToggleInventory,
  onToggleQuests,
  onChangeLocation,
  currentLocation,
}: GameUIProps) {
  const weapon = player.inventory.find((i) => i.id === player.equippedWeapon);

  return (
    <>
      <div className="fixed top-4 left-4 bg-black/80 p-4 rounded border-2 border-gray-600 min-w-[200px]">
        <h2 className="text-white font-bold mb-2 text-sm">ПОСЛЕДНИЙ ВОИН</h2>
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">HP</div>
          <div className="w-full h-4 bg-gray-800 border border-gray-600 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all"
              style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white mt-1">
            {player.health} / {player.maxHealth}
          </div>
        </div>
        <div className="text-xs text-gray-300">
          <div>Оружие: {weapon?.icon} {weapon?.name}</div>
          <div>Урон: {weapon?.attack || 5}</div>
        </div>
      </div>

      <div className="fixed top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={onToggleInventory}
          className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          size="sm"
        >
          <Icon name="Backpack" size={16} className="mr-1" />
          Инвентарь (I)
        </Button>
        <Button
          onClick={onToggleCrafting}
          className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          size="sm"
        >
          <Icon name="Hammer" size={16} className="mr-1" />
          Крафт (C)
        </Button>
        <Button
          onClick={onToggleQuests}
          className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600"
          size="sm"
        >
          <Icon name="ScrollText" size={16} className="mr-1" />
          Квесты (Q)
        </Button>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <Button
          onClick={() => onChangeLocation('kingdom')}
          className={`${
            currentLocation === 'kingdom'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-800 hover:bg-gray-700'
          } border-2 border-gray-600`}
          size="sm"
        >
          🏰 Королевство
        </Button>
        <Button
          onClick={() => onChangeLocation('mine')}
          className={`${
            currentLocation === 'mine'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-800 hover:bg-gray-700'
          } border-2 border-gray-600`}
          size="sm"
        >
          ⛏️ Шахта
        </Button>
      </div>

      <div className="fixed bottom-20 right-4 text-white text-xs bg-black/60 p-2 rounded">
        <div>WASD / Стрелки - Движение</div>
        <div>Пробел - Атака</div>
      </div>
    </>
  );
}
