/**
 * Logo Laforet Designer — SVG inline (couleur contrôlée par CSS)
 */
export default function Logo({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 438.5 512.5"
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-label="Laforet Designer"
    >
      <path d="M275.6,127.4c2.9,0,5.8,0.5,8.7,1.5c14,4.9,21.3,20.3,16.4,34.2l-15.8,46l-36.4,101.7
        c-1.8,6.7-3.8,16.9-3.8,24.8c0,14.2,3.6,27.5,10,38.9c13.2,23.5,38.2,39.2,67.6,39.2h27.6v-28.6h-27.6
        c-27.5,0-49-21.8-49-49.4c0-4.5,1.2-12,2.9-17.7L329,173.2c0.6-2,1.1-3.7,1.5-5.3c1.2-5.2,1.2-8.7,1.2-13.6
        c0-6.8-1-13.2-2.9-19.2c-0.8-2.7-1.8-5.3-3-7.7c-8.2-17.2-24.3-28.6-43.3-28.6h0H88.7v28.6h108.5L88.7,413.7H119
        l108.8-286.3L275.6,127.4z"/>
    </svg>
  )
}
