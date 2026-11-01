import { useViewportActivity } from '../hooks/useViewportActivity';
import './AnimatedBackground.css';

// Fixed positions keep the field stable across language changes and rerenders.
const stars = Array.from({ length: 64 }, (_, index) => ({
  left: `${((index * 73 + 19) % 997) / 10}%`,
  top: `${((index * 137 + 41) % 991) / 10}%`,
  size: index % 9 === 0 ? '2px' : index % 3 === 0 ? '1.5px' : '1px',
  opacity: 0.14 + (index % 5) * 0.05,
}));

export const AnimatedBackground = () => {
  const { ref, isActive } = useViewportActivity();

  return (
    <div ref={ref} data-animations-active={isActive} className="starfield-bg" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="star-dot"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
      <span className="shooting-star shooting-star-one" />
      <span className="shooting-star shooting-star-two" />
    </div>
  );
};

export default AnimatedBackground;
