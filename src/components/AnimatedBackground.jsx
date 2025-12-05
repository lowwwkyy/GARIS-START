import './AnimatedBackground.css';

export const AnimatedBackground = () => {
  return (
    <div className="animated-bg">
      {/* Static glow layers - CSS animations for performance */}
      <div className="glow glow-top-left" />
      <div className="glow glow-top-center" />
      <div className="glow glow-top-right" />
      <div className="glow glow-middle-left animate-pulse-slow" />
      <div className="glow glow-middle-center animate-float" />
      <div className="glow glow-middle-right animate-pulse-slow-delayed" />
      <div className="glow glow-bottom-left" />
      <div className="glow glow-bottom-center animate-pulse-slower" />
      <div className="glow glow-bottom-right" />
      
      {/* Floating orbs with CSS animations */}
      <div className="orb orb-1 animate-float-1" />
      <div className="orb orb-2 animate-float-2" />
      <div className="orb orb-3 animate-float-3" />
      
      {/* Vignette overlay */}
      <div className="vignette" />
    </div>
  );
};

export default AnimatedBackground;
