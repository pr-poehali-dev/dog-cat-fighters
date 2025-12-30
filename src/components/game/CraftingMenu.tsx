import { Button } from '@/components/ui/button';
import { InventoryItem } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface CraftingMenuProps {
  inventory: InventoryItem[];
  onCraft: (recipe: {
    id: string;
    name: string;
    type: 'weapon' | 'armor';
    icon: string;
    attack?: number;
    defense?: number;
    materials: { id: string; count: number }[];
  }) => void;
  onClose: () => void;
}

const recipes = [
  {
    id: 'iron-sword',
    name: 'Железный меч',
    type: 'weapon' as const,
    icon: '⚔️',
    attack: 25,
    materials: [
      { id: 'iron', count: 3 },
      { id: '2', count: 2 },
    ],
  },
  {
    id: 'gold-sword',
    name: 'Золотой меч',
    type: 'weapon' as const,
    icon: '🗡️',
    attack: 40,
    materials: [
      { id: 'gold', count: 5 },
      { id: 'iron', count: 2 },
    ],
  },
  {
    id: 'iron-armor',
    name: 'Железная броня',
    type: 'armor' as const,
    icon: '🛡️',
    defense: 15,
    materials: [
      { id: 'iron', count: 5 },
    ],
  },
  {
    id: 'pickaxe',
    name: 'Кирка',
    type: 'weapon' as const,
    icon: '⛏️',
    attack: 15,
    materials: [
      { id: 'iron', count: 2 },
      { id: '2', count: 3 },
    ],
  },
];

export default function CraftingMenu({ inventory, onCraft, onClose }: CraftingMenuProps) {
  const canCraft = (materials: { id: string; count: number }[]) => {
    return materials.every((material) => {
      const item = inventory.find((i) => i.id === material.id);
      return item && item.count >= material.count;
    });
  };

  const getMaterialName = (id: string) => {
    const item = inventory.find((i) => i.id === id);
    return item?.name || id;
  };

  const getMaterialCount = (id: string) => {
    const item = inventory.find((i) => i.id === id);
    return item?.count || 0;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-gray-700 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="Hammer" size={24} />
            Крафт оружия и брони
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="grid gap-3">
          {recipes.map((recipe) => {
            const craftable = canCraft(recipe.materials);

            return (
              <div
                key={recipe.id}
                className={`p-4 rounded border-2 ${
                  craftable
                    ? 'bg-gray-800 border-green-600'
                    : 'bg-gray-900 border-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{recipe.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{recipe.name}</h3>
                      <p className="text-sm text-gray-400">
                        {recipe.attack && `Урон: ${recipe.attack}`}
                        {recipe.defense && `Защита: ${recipe.defense}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onCraft(recipe)}
                    disabled={!craftable}
                    className={
                      craftable
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-700'
                    }
                  >
                    Создать
                  </Button>
                </div>
                <div className="text-xs text-gray-400">
                  Требуется:{' '}
                  {recipe.materials.map((mat, idx) => (
                    <span
                      key={mat.id}
                      className={getMaterialCount(mat.id) >= mat.count ? 'text-green-400' : 'text-red-400'}
                    >
                      {getMaterialName(mat.id)} {getMaterialCount(mat.id)}/{mat.count}
                      {idx < recipe.materials.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
