import { Button } from '@/components/ui/button';
import { Quest } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface QuestLogProps {
  quests: Quest[];
  onClose: () => void;
}

export default function QuestLog({ quests, onClose }: QuestLogProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-gray-700 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="ScrollText" size={24} />
            Журнал квестов
          </h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-3">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded border-2 ${
                quest.completed
                  ? 'bg-green-900/30 border-green-600'
                  : 'bg-gray-800 border-yellow-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    {quest.completed ? (
                      <Icon name="CheckCircle" size={18} className="text-green-500" />
                    ) : (
                      <Icon name="Clock" size={18} className="text-yellow-500" />
                    )}
                    {quest.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{quest.description}</p>
                </div>
                {quest.completed && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ЗАВЕРШЕНО
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Прогресс</span>
                  <span>
                    {quest.progress} / {quest.goal}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      quest.completed ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {quests.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              Нет доступных квестов
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded">
          <h4 className="text-white font-bold mb-2">📜 История</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Королевство собак пало под натиском коварных котов. Последний воин
            должен отомстить за своих собратьев, найти древнее оружие и
            восстановить честь королевства.
          </p>
        </div>
      </div>
    </div>
  );
}
