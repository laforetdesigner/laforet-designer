import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
