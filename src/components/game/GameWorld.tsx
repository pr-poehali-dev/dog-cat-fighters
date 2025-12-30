import { PlayerState, Enemy } from '@/pages/Index';

interface GameWorldProps {
  player: PlayerState;
  enemies: Enemy[];
  location: 'kingdom' | 'mine' | 'boss-arena';
  playerEmoji: string;
}

export default function GameWorld({ player, enemies, location, playerEmoji }: GameWorldProps) {
  const getEnemySprite = (type: string) => {
    if (type === 'cat-warrior') return '😾';
    if (type === 'cat-mage') return '🙀';
    if (type === 'cat-assassin') return '😿';
    if (type === 'cat-tank') return '😼';
    if (type === 'cat-boss') return '😼';
    if (type === 'boss-dragon') return '🐉🔥';
    return '🐱';
  };

  const getBgColors = () => {
    if (location === 'boss-arena') return { bg: '#1a0a0a', floor: '#2d1414' };
    if (location === 'mine') return { bg: '#3d2817', floor: '#5a3e24' };
    return { bg: '#2d5016', floor: '#4a7c1f' };
  };

  const { bg: bgColor, floor: floorColor } = getBgColors();

  return (
    <div 
      className="relative w-full h-full"
      style={{
        background: `repeating-linear-gradient(0deg, ${bgColor} 0px, ${bgColor} 32px, ${floorColor} 32px, ${floorColor} 64px)`,
        imageRendering: 'pixelated',
      }}
    >
      <div 
        className="absolute text-4xl transition-all duration-75"
        style={{
          left: `${player.x}px`,
          top: `${player.y}px`,
          transform: player.isAttacking ? 'scale(1.2)' : 'scale(1)',
          filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))',
        }}
      >
        {playerEmoji}
      </div>

      {player.isAttacking && (
        <div
          className="absolute text-2xl animate-ping"
          style={{
            left: `${player.x + 20}px`,
            top: `${player.y}px`,
          }}
        >
          ⚔️
        </div>
      )}

      {enemies.map((enemy) => (
        enemy.isAlive && (
          <div key={enemy.id}>
            <div
              className="absolute text-4xl"
              style={{
                left: `${enemy.x}px`,
                top: `${enemy.y}px`,
                filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))',
              }}
            >
              {getEnemySprite(enemy.type)}
            </div>
            <div
              className="absolute bg-red-600 h-1 rounded"
              style={{
                left: `${enemy.x}px`,
                top: `${enemy.y - 10}px`,
                width: '40px',
              }}
            >
              <div
                className="bg-green-500 h-full rounded transition-all"
                style={{
                  width: `${(enemy.health / enemy.maxHealth) * 100}%`,
                }}
              />
            </div>
          </div>
        )
      ))}

      {location === 'mine' && (
        <>
          <div className="absolute text-3xl" style={{ left: '100px', top: '100px' }}>⛏️</div>
          <div className="absolute text-3xl" style={{ left: '600px', top: '400px' }}>💎</div>
          <div className="absolute text-2xl" style={{ left: '300px', top: '50px' }}>🪨</div>
          <div className="absolute text-2xl" style={{ left: '500px', top: '450px' }}>🪨</div>
        </>
      )}

      {location === 'kingdom' && (
        <>
          <div className="absolute text-3xl" style={{ left: '50px', top: '50px' }}>🏰</div>
          <div className="absolute text-2xl" style={{ left: '700px', top: '100px' }}>🌳</div>
          <div className="absolute text-2xl" style={{ left: '650px', top: '450px' }}>🌳</div>
        </>
      )}

      {location === 'boss-arena' && (
        <>
          <div className="absolute text-6xl animate-pulse" style={{ left: '350px', top: '50px' }}>👑</div>
          <div className="absolute text-3xl" style={{ left: '100px', top: '400px' }}>🔥</div>
          <div className="absolute text-3xl" style={{ left: '700px', top: '400px' }}>🔥</div>
          <div className="absolute text-2xl" style={{ left: '400px', top: '450px' }}>💀</div>
        </>
      )}
    </div>
  );
}