import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const StockCard = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <Link to={`/stock/${stock.symbol}`} className="card" style={styles.cardLink}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <div>
          <h3 style={styles.symbol}>{stock.symbol}</h3>
          <p style={styles.name}>{stock.name}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3 style={styles.price}>₹{stock.price.toFixed(2)}</h3>
          <p style={{
            ...styles.change,
            color: isPositive ? 'var(--success)' : 'var(--danger)'
          }}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(stock.change)}%
          </p>
        </div>
      </div>
      
      <div className="flex-between" style={styles.footer}>
        <div style={styles.range}>
          <span style={styles.rangeLabel}>Day L/H</span>
          <span style={styles.rangeValue}>₹{stock.dayLow} - ₹{stock.dayHigh}</span>
        </div>
        <div style={styles.action}>
          View Details <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

const styles = {
  cardLink: {
    display: 'block',
    textDecoration: 'none',
  },
  symbol: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  name: {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  change: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  footer: {
    borderTop: '1px solid var(--border)',
    paddingTop: '1rem',
    marginTop: '0.5rem',
  },
  range: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  rangeLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  rangeValue: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: 'var(--accent-color)',
    fontSize: '0.875rem',
    fontWeight: '500',
  }
};

export default StockCard;
