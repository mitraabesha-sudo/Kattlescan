import { Cloud, CloudOff } from "lucide-react";

interface SyncBarProps {
  pendingCount: number;
  isOnline: boolean;
}

const SyncBar = ({ pendingCount, isOnline }: SyncBarProps) => {
  if (pendingCount === 0 && isOnline) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-2.5 flex items-center justify-between text-xs font-display ${
      isOnline ? "bg-sync-pending text-sync-pending-foreground" : "bg-destructive/10 text-destructive"
    }`}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Cloud className="w-3.5 h-3.5" />
        ) : (
          <CloudOff className="w-3.5 h-3.5" />
        )}
        <span>
          {isOnline
            ? `${pendingCount} record${pendingCount !== 1 ? "s" : ""} pending sync`
            : "Offline — data queued locally"}
        </span>
      </div>
      {isOnline && pendingCount > 0 && (
        <button className="text-[10px] uppercase tracking-widest font-bold hover:underline">
          Sync Now
        </button>
      )}
    </div>
  );
};

export default SyncBar;
