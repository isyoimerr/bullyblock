export default function Escudo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Escudo de BullyBlock"
      className={className}
    >
      <circle cx="16" cy="58" r="12" fill="#1C6FCB" />
      <circle cx="104" cy="58" r="12" fill="#4CAF2A" />
      <path d="M60 6 20 22v32c0 28 18 48 40 58 22-10 40-30 40-58V22z" fill="#1B4F9C" />
      <path d="M60 16 29 28v26c0 22 14 38 31 46 17-8 31-24 31-46V28z" fill="#4CAF2A" />
      <circle cx="52" cy="44" r="11" fill="#12307A" />
      <circle cx="72" cy="42" r="10" fill="#9BE07A" />
      <path d="M34 88c1-18 9-28 18-28s17 10 18 28z" fill="#12307A" />
      <path
        d="M58 92V66a4 4 0 0 1 8 0v8a4 4 0 0 1 8 0v4a4 4 0 0 1 8 0v14c0 8-6 14-14 14s-10-4-10-10z"
        fill="#fff"
      />
    </svg>
  )
}

export function Marca({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block leading-none ${className}`}
      style={{
        fontFamily: '"Bungee", "Plus Jakarta Sans", sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.06em',
        lineHeight: 1,
        textShadow: '0 1px 0 rgba(17, 24, 39, 0.08)',
        filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))',
      }}
    >
      <span style={{ color: 'var(--azul-900)' }}>Bully</span>
      <span style={{ color: 'var(--verde-700)' }}>Block</span>
    </span>
  )
}
