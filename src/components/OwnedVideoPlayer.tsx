// Exact, owner-verified source copies only. Unmapped third-party videos keep their existing player.
export const ownedVideoSource = (id: string) => id === 'dvyjdyrKFUw' ? '/media/foundstart-demo-dvyjdyrKFUw.mp4' : null;
export default function OwnedVideoPlayer({ id, title, className = '' }: { id: string; title: string; className?: string }) {
  const src = ownedVideoSource(id);
  if (!src) return null;
  return <video className={`${className} bg-black object-contain`} src={src} poster={src.replace('.mp4', '.jpg')} controls playsInline preload="none" aria-label={title}><a href={src}>{title}</a></video>;
}
