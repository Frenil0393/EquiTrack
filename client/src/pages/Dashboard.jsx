import React from 'react';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';
import { MOCK_MARKET_OVERVIEW, MOCK_TOP_GAINERS, MOCK_TOP_LOSERS, MOCK_SUGGESTED, MOCK_STOCKS } from '../data/mockData';

const Dashboard = () => {
  return (
    <div>
      {/* Header and Search Bar Section */}
      <div className="flex-between" style={styles.headerSection}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <h1 style={{ fontSize: '2.2rem' }}>Market Dashboard</h1>
            <span style={styles.liveBadge}>
              <Activity size={14} className="text-success" />
              {MOCK_MARKET_OVERVIEW.status}
            </span>
          </div>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>
            Real-time insights on NSE & BSE listed Indian equities
          </p>
        </div>
        
        {/* Proper Interactive Search Bar */}
        <SearchBar />
      </div>

      {/* Quick Search Chips */}
      <div style={styles.chipsSection}>
        <span className="text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={14} color="var(--accent-color)" /> Popular Stocks:
        </span>
        <div style={styles.chipsList}>
          {MOCK_STOCKS.map((stock) => (
            <Link
              key={stock.symbol}
              to={`/stock/${stock.symbol}`}
              style={styles.chip}
            >
              <span style={{ fontWeight: '600' }}>{stock.symbol}</span>
              <span style={{ color: stock.change >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: '0.8rem' }}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Market Overview Indices */}
      <div className="grid grid-cols-3" style={{ marginBottom: '2.5rem' }}>
        <IndexCard name="NIFTY 50" data={MOCK_MARKET_OVERVIEW.sp500} />
        <IndexCard name="SENSEX" data={MOCK_MARKET_OVERVIEW.nasdaq} />
        <IndexCard name="NIFTY BANK" data={MOCK_MARKET_OVERVIEW.dow} />
      </div>

      {/* Suggested Stocks */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Suggested For You</h2>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>Curated recommendations</span>
        </div>
        <div className="grid grid-cols-3">
          {MOCK_SUGGESTED.map(stock => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Gainers & Losers */}
      <div className="grid grid-cols-2">
        <div>
          <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem' }}>
              <TrendingUp className="text-success" />
              Top Gainers
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_TOP_GAINERS.map(stock => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem' }}>
              <TrendingDown className="text-danger" />
              Top Losers
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_TOP_LOSERS.map(stock => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexCard = ({ name, data }) => {
  const isPositive = data.change >= 0;
  return (
    <div className="card flex-between" style={{ padding: '1.5rem 1.75rem' }}>
      <div>
        <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: '500' }}>{name}</p>
        <h3 style={{ fontSize: '1.65rem', fontWeight: '700' }}>{data.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
      </div>
      <div style={{ textAlign: 'right', color: isPositive ? 'var(--success)' : 'var(--danger)' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600', fontSize: '1rem' }}>
          {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          {isPositive ? '+' : ''}{data.change}%
        </p>
      </div>
    </div>
  );
};

const styles = {
  headerSection: {
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--success)',
    padding: '0.3rem 0.65rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(16, 185, 129, 0.25)',
  },
  chipsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  chipsList: {
    display: 'flex',
    gap: '0.65rem',
    flexWrap: 'wrap',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border)',
    padding: '0.4rem 0.85rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
    color: 'var(--text-main)',
  }
};

export default Dashboard;
