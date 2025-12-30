import { useState, useEffect, useCallback } from 'react';
import GameWorld from '@/components/game/GameWorld';
import MobileControls from '@/components/game/MobileControls';
import GameUI from '@/components/game/GameUI';
import CraftingMenu from '@/components/game/CraftingMenu';
import InventoryMenu from '@/components/game/InventoryMenu';
import QuestLog from '@/components/game/QuestLog';
import CutsceneModal from '@/components/game/CutsceneModal';
import CharacterSelector from '@/components/game/CharacterSelector';
import CustomizationModal from '@/components/game/CustomizationModal';
import GalHelper from '@/components/game/GalHelper';

export interface PlayerState {
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isAttacking: boolean;
  inventory: InventoryItem[];
  equippedWeapon: string | null;
  equippedArmor: string | null;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'material' | 'armor';
  icon: string;
  count: number;
  attack?: number;
  defense?: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  type: 'cat-warrior' | 'cat-mage' | 'cat-assassin' | 'cat-tank' | 'cat-boss' | 'boss-dragon';
  isAlive: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  goal: number;
}

export default function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [cutscene, setCutscene] = useState<'intro' | 'boss-appear' | 'victory' | null>('intro');
  const [currentCharacter, setCurrentCharacter] = useState<'dog' | 'pierre'>('dog');
  const [dogEmoji, setDogEmoji] = useState('🐕');
  const [pierreEmoji, setPierreEmoji] = useState('🦜');
  const [showCustomization, setShowCustomization] = useState(false);
  const [galMessage, setGalMessage] = useState<{ text: string; quest?: string } | null>(null);
  const [bossUnlocked, setBossUnlocked] = useState(false);

  const [player, setPlayer] = useState<PlayerState>({
    x: 100,
    y: 250,
    health: 100,
    maxHealth: 100,
    direction: 'down',
    isAttacking: false,
    inventory: [
      { id: '1', name: 'Деревянный меч', type: 'weapon', icon: '🗡️', count: 1, attack: 10 },
      { id: '2', name: 'Дерево', type: 'material', icon: '🪵', count: 5 },
    ],
    equippedWeapon: '1',
    equippedArmor: null,
  });

  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: 'e1', x: 300, y: 200, health: 50, maxHealth: 50, type: 'cat-warrior', isAlive: true },
    { id: 'e2', x: 500, y: 300, health: 50, maxHealth: 50, type: 'cat-warrior', isAlive: true },
    { id: 'e3', x: 650, y: 150, health: 80, maxHealth: 80, type: 'cat-mage', isAlive: true },
    { id: 'e4', x: 200, y: 400, health: 60, maxHealth: 60, type: 'cat-assassin', isAlive: true },
    { id: 'e5', x: 550, y: 450, health: 100, maxHealth: 100, type: 'cat-tank', isAlive: true },
  ]);

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 'q1',
      title: 'Месть за короля',
      description: 'Победи 5 котов',
      completed: false,
      progress: 0,
      goal: 5,
    },
    {
      id: 'q2',
      title: 'Оружейник',
      description: 'Скрафти железный меч',
      completed: false,
      progress: 0,
      goal: 1,
    },
  ]);

  const [showCrafting, setShowCrafting] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<'kingdom' | 'mine' | 'boss-arena'>('kingdom');
  const [keys, setKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showIntro) {
        setGalMessage({
          text: 'Привет, воин! Я Гал, твой верный помощник. Я буду звонить тебе через волшебное зеркало и давать квесты. Удачи!',
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    const deadEnemies = enemies.filter((e) => !e.isAlive).length;
    if (deadEnemies >= 5 && !bossUnlocked) {
      setBossUnlocked(true);
      setTimeout(() => {
        setGalMessage({
          text: 'Невероятно! Ты победил всех котов! Но... я чувствую тёмную силу. Кот Альфа на драконе появился в Арене Босса!',
          quest: 'Победи Кота Альфа',
        });
      }, 1000);
    }
  }, [enemies, bossUnlocked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cutscene) return;
      setKeys((prev) => new Set(prev).add(e.key.toLowerCase()));

      if (e.key === ' ') {
        e.preventDefault();
        handleAttack();
      }
      if (e.key === 'c') setShowCrafting((prev) => !prev);
      if (e.key === 'i') setShowInventory((prev) => !prev);
      if (e.key === 'q') setShowQuests((prev) => !prev);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [cutscene]);

  useEffect(() => {
    const moveSpeed = currentCharacter === 'pierre' ? 4 : 3;
    const interval = setInterval(() => {
      if (keys.size === 0 || player.isAttacking || cutscene) return;

      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = prev.direction;

        if (keys.has('w') || keys.has('arrowup')) {
          newY = Math.max(0, prev.y - moveSpeed);
          newDirection = 'up';
        }
        if (keys.has('s') || keys.has('arrowdown')) {
          newY = Math.min(500, prev.y + moveSpeed);
          newDirection = 'down';
        }
        if (keys.has('a') || keys.has('arrowleft')) {
          newX = Math.max(0, prev.x - moveSpeed);
          newDirection = 'left';
        }
        if (keys.has('d') || keys.has('arrowright')) {
          newX = Math.min(750, prev.x + moveSpeed);
          newDirection = 'right';
        }

        return { ...prev, x: newX, y: newY, direction: newDirection };
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [keys, player.isAttacking, cutscene, currentCharacter]);

  const handleAttack = useCallback(() => {
    if (player.isAttacking) return;

    setPlayer((prev) => ({ ...prev, isAttacking: true }));

    const attackRange = 50;
    const weapon = player.inventory.find((item) => item.id === player.equippedWeapon);
    const baseDamage = weapon?.attack || 5;
    const damage = currentCharacter === 'pierre' ? baseDamage * 1.2 : baseDamage;

    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        if (!enemy.isAlive) return enemy;

        const distance = Math.sqrt(
          Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2)
        );

        if (distance < attackRange) {
          const newHealth = Math.max(0, enemy.health - damage);
          const newIsAlive = newHealth > 0;

          if (!newIsAlive && enemy.isAlive) {
            setQuests((prevQuests) =>
              prevQuests.map((quest) =>
                quest.id === 'q1' && !quest.completed
                  ? {
                      ...quest,
                      progress: Math.min(quest.progress + 1, quest.goal),
                      completed: quest.progress + 1 >= quest.goal,
                    }
                  : quest
              )
            );

            if (enemy.type === 'boss-dragon') {
              setTimeout(() => setCutscene('victory'), 500);
            }

            if (currentLocation === 'mine') {
              const materials = [
                { id: 'coal', name: 'Уголь', icon: '🪨' },
                { id: 'iron', name: 'Железо', icon: '⚙️' },
                { id: 'gold', name: 'Золото', icon: '✨' },
              ];
              const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
              addToInventory(randomMaterial.id, randomMaterial.name, 'material', randomMaterial.icon, 1);
            }
          }

          return { ...enemy, health: newHealth, isAlive: newIsAlive };
        }

        return enemy;
      })
    );

    setTimeout(() => {
      setPlayer((prev) => ({ ...prev, isAttacking: false }));
    }, 300);
  }, [player, currentLocation, currentCharacter]);

  const addToInventory = (
    id: string,
    name: string,
    type: 'material' | 'weapon' | 'armor',
    icon: string,
    count: number
  ) => {
    setPlayer((prev) => {
      const existingItem = prev.inventory.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...prev,
          inventory: prev.inventory.map((item) =>
            item.id === id ? { ...item, count: item.count + count } : item
          ),
        };
      }

      return {
        ...prev,
        inventory: [...prev.inventory, { id, name, type, icon, count }],
      };
    });
  };

  const craftItem = (recipe: {
    id: string;
    name: string;
    type: 'weapon' | 'armor';
    icon: string;
    attack?: number;
    defense?: number;
    materials: { id: string; count: number }[];
  }) => {
    const hasMaterials = recipe.materials.every((material) => {
      const item = player.inventory.find((i) => i.id === material.id);
      return item && item.count >= material.count;
    });

    if (!hasMaterials) return;

    setPlayer((prev) => ({
      ...prev,
      inventory: prev.inventory
        .map((item) => {
          const material = recipe.materials.find((m) => m.id === item.id);
          if (material) {
            return { ...item, count: item.count - material.count };
          }
          return item;
        })
        .filter((item) => item.count > 0),
    }));

    addToInventory(recipe.id, recipe.name, recipe.type, recipe.icon, 1);

    if (recipe.id === 'iron-sword') {
      setQuests((prev) =>
        prev.map((quest) =>
          quest.id === 'q2' ? { ...quest, progress: 1, completed: true } : quest
        )
      );
    }
  };

  const equipItem = (itemId: string) => {
    const item = player.inventory.find((i) => i.id === itemId);
    if (!item) return;

    setPlayer((prev) => ({
      ...prev,
      equippedWeapon: item.type === 'weapon' ? itemId : prev.equippedWeapon,
      equippedArmor: item.type === 'armor' ? itemId : prev.equippedArmor,
    }));
  };

  const handleLocationChange = (loc: 'kingdom' | 'mine' | 'boss-arena') => {
    setCurrentLocation(loc);

    if (loc === 'boss-arena' && !enemies.some((e) => e.type === 'boss-dragon')) {
      setCutscene('boss-appear');
      setTimeout(() => {
        setEnemies((prev) => [
          ...prev,
          {
            id: 'boss',
            x: 400,
            y: 100,
            health: 300,
            maxHealth: 300,
            type: 'boss-dragon',
            isAlive: true,
          },
        ]);
      }, 3000);
    }
  };

  const playerEmoji = currentCharacter === 'dog' ? dogEmoji : pierreEmoji;

  return (
    <div className="relative w-full h-screen bg-[#1a1a2e] overflow-hidden">
      {cutscene && (
        <CutsceneModal
          scene={cutscene}
          onClose={() => {
            setCutscene(null);
            if (showIntro) setShowIntro(false);
          }}
        />
      )}

      <GameWorld player={player} enemies={enemies} location={currentLocation} playerEmoji={playerEmoji} />

      {!showIntro && (
        <>
          <CharacterSelector
            currentCharacter={currentCharacter}
            onSelectCharacter={setCurrentCharacter}
            onCustomize={() => setShowCustomization(true)}
          />

          <GameUI
            player={player}
            onToggleCrafting={() => setShowCrafting(!showCrafting)}
            onToggleInventory={() => setShowInventory(!showInventory)}
            onToggleQuests={() => setShowQuests(!showQuests)}
            onChangeLocation={handleLocationChange}
            currentLocation={currentLocation}
            bossUnlocked={bossUnlocked}
          />
        </>
      )}

      {showCrafting && (
        <CraftingMenu inventory={player.inventory} onCraft={craftItem} onClose={() => setShowCrafting(false)} />
      )}

      {showInventory && (
        <InventoryMenu
          inventory={player.inventory}
          equippedWeapon={player.equippedWeapon}
          equippedArmor={player.equippedArmor}
          onEquip={equipItem}
          onClose={() => setShowInventory(false)}
        />
      )}

      {showQuests && <QuestLog quests={quests} onClose={() => setShowQuests(false)} />}

      {showCustomization && (
        <CustomizationModal
          currentDog={dogEmoji}
          currentPierre={pierreEmoji}
          onSave={(custom) => {
            setDogEmoji(custom.dogEmoji);
            setPierreEmoji(custom.pierreEmoji);
          }}
          onClose={() => setShowCustomization(false)}
        />
      )}

      {galMessage && (
        <GalHelper
          message={galMessage.text}
          questTitle={galMessage.quest}
          onAccept={
            galMessage.quest
              ? () => {
                  setQuests((prev) => [
                    ...prev,
                    {
                      id: 'q-boss',
                      title: galMessage.quest!,
                      description: 'Победи финального босса',
                      completed: false,
                      progress: 0,
                      goal: 1,
                    },
                  ]);
                }
              : undefined
          }
          onClose={() => setGalMessage(null)}
        />
      )}

      <MobileControls
        onMove={(direction) => {
          const moveSpeed = currentCharacter === 'pierre' ? 6 : 5;
          setPlayer((prev) => {
            let newX = prev.x;
            let newY = prev.y;

            if (direction === 'up') newY = Math.max(0, prev.y - moveSpeed);
            if (direction === 'down') newY = Math.min(500, prev.y + moveSpeed);
            if (direction === 'left') newX = Math.max(0, prev.x - moveSpeed);
            if (direction === 'right') newX = Math.min(750, prev.x + moveSpeed);

            return { ...prev, x: newX, y: newY, direction };
          });
        }}
        onAttack={handleAttack}
      />
    </div>
  );
}
