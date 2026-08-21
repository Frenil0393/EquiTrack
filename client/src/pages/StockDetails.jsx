import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { MOCK_STOCKS, generateMockChartData } from '../data/mockData';
import StockChart from '../components/StockChart';

const StockDetails = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [timeframe, setTimeframe] = useState('1M');
  const [chartData, setChartData] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Mock fetch
    const data = MOCK_STOCKS.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
    if (data) {
      setStock(data);
      // Generate chart data based on timeframe
      const days = timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '1Y' ? 365 : 1;
      setChartData(generateMockChartData(days));
    }
  }, [symbol, timeframe]);

  if (!stock) {
    return (
      <div className="flex-center" style={{ minHeight: '50vh' }}>
        <h3>Loading stock data...</h3>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div>
      <Link to="/dashboard" style={styles.backLink}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{stock.symbol}</h1>
          <p className="text-muted" style={{ fontSize: '1.25rem' }}>{stock.name}</p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>₹{stock.price.toFixed(2)}</h2>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            fontSize: '1.25rem',
            color: isPositive ? 'var(--success)' : 'var(--danger)',
            fontWeight: '500'
          }}>
            {isPositive ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(stock.change)}% Today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <div style={styles.timeframes}>
              {['1D', '1W', '1M', '1Y'].map(tf => (
                <button 
                  key={tf}
                  className={`btn ${timeframe === tf ? '' : 'btn-outline'}`}
                  style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
            
            <button 
              className={`btn ${isSaved ? 'btn-outline' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
              style={isSaved ? { color: '#EAB308', borderColor: '#EAB308' } : {}}
            >
              <Star size={18} fill={isSaved ? '#EAB308' : 'none'} />
              {isSaved ? 'Saved to Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
          
          <div style={{ height: '400px' }}>
            <StockChart data={chartData} isPositive={isPositive} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Company Overview
          </h3>
          <p className="text-muted" style={{ lineHeight: '1.6' }}>
            {stock.description}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Key Statistics
          </h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span className="text-muted">Day High</span>
              <span style={styles.statValue}>₹{stock.dayHigh.toFixed(2)}</span>
            </div>
            <div style={styles.statItem}>
              <span className="text-muted">Day Low</span>
              <span style={styles.statValue}>₹{stock.dayLow.toFixed(2)}</span>
            </div>
            <div style={styles.statItem}>
              <span className="text-muted">Previous Close</span>
              <span style={styles.statValue}>₹{(stock.price - (stock.price * (stock.change / 100))).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    textDecoration: 'none',
  },
  timeframes: {
    display: 'flex',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '0.25rem',
    borderRadius: '8px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  statValue: {
    fontSize: '1.125rem',
    fontWeight: '500',
  }
};

export default StockDetails;
