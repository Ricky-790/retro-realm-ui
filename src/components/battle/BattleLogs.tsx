export function BattleLogs() {
  const battleLogs = [
    "You used Thunderbolt.",
    "Opponent suffered 18 dmg.",
    "Opponent used Hyperbeam.",
    "You defended poor. Suffered 10 dmg."
  ];

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-pixel text-base text-white mb-4 mt-3 text-center">
        Battle Logs
      </h3>
      
      <div className="flex-1 bg-blue-800/50 border-2 border-blue-600 rounded p-3 overflow-y-auto">
        <div className="space-y-2">
          {battleLogs.map((log, index) => (
            <div key={index} className="font-pixel text-xs text-white">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
