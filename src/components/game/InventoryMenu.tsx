import { Button } from '@/components/ui/button';
import { InventoryItem } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface InventoryMenuProps {
  inventory: InventoryItem[];
  equippedWeapon: string | null;
  equippedArmor: string | null;
  onEquip: (itemId: string) => void;
  onClose: () => void;
}

export default function InventoryMenu({
  inventory,
  equippedWeapon,
  equippedArmor,
  onEquip,
  onClose,
}: InventoryMenuProps) {
  const weapons = inventory.filter((i) => i.type === 'weapon');
  const armor = inventory.filter((i) => i.type === 'armor');
  const materials = inventory.filter((i) => i.type === 'material');

  const isEquipped = (itemId: string) => {
    return itemId === equippedWeapon || itemId === equippedArmor;
  };

  const renderItems = (items: InventoryItem[], showEquip: boolean) => {
    if (items.length === 0) {
      return <div className="text-gray-500 text-sm">Нет предметов</div>;
    }

    return items.map((item) => (
      <div
        key={item.id}
        className={`p-3 rounded border-2 flex items-center justify-between ${
          isEquipped(item.id)
            ? 'bg-green-900/30 border-green-600'
            : 'bg-gray-800 border-gray-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <div className="text-white font-semibold">
              {item.name}
              {item.count > 1 && (
                <span className="text-gray-400 ml-2">x{item.count}</span>
              )}
            </div>
            <div className="text-xs text-gray-400">
              {item.attack && `Урон: ${item.attack}`}
              {item.defense && `Защита: ${item.defense}`}
            </div>
          </div>
        </div>
        {showEquip && (
          <Button
            onClick={() => onEquip(item.id)}
            className={
              isEquipped(item.id)
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }
            size="sm"
          >
            {isEquipped(item.id) ? 'Одето' : 'Надеть'}
          </Button>
        )}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-gray-700 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="Backpack" size={24} />
            Инвентарь
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Icon name="Sword" size={18} />
              Оружие
            </h3>
            <div className="space-y-2">{renderItems(weapons, true)}</div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Icon name="Shield" size={18} />
              Броня
            </h3>
            <div className="space-y-2">{renderItems(armor, true)}</div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Icon name="Package" size={18} />
              Материалы
            </h3>
            <div className="space-y-2">{renderItems(materials, false)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
