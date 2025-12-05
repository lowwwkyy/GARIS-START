export const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass-card fade-in-up ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
