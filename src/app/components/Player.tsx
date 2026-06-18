import { Icon } from "./Icon";

export function Player({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`player ${compact ? "is-compact" : ""}`}>
      <div className="player-meta">
        <div>
          <strong>{compact ? "Electric Heart" : "Slow Motion"}</strong>
          <span>{compact ? "Mira Vale" : "Saint June"}</span>
        </div>
        <button className="icon-button" aria-label="Add to favorites">
          <Icon name="heart" className="h-4 w-4" />
        </button>
      </div>
      <div className="player-progress"><span /></div>
      <div className="player-times"><span>1:24</span><span>{compact ? "3:42" : "4:08"}</span></div>
      <div className="player-controls">
        <button className="icon-button" aria-label="Previous track">‹</button>
        <button className="play-main" aria-label="Play track"><Icon name="play" className="h-4 w-4" /></button>
        <button className="icon-button" aria-label="Next track">›</button>
      </div>
    </div>
  );
}
