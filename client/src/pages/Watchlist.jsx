import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_STOCKS } from '../data/mockData';

const STORAGE_KEY = 'equitrack_watchlist';

const DEFAULT_WATCHLIST = [
  { symbol: 'RELIANCE', addedOn: '2026-08-16' },
  { symbol: 'HDFCBANK', addedOn: '2026-08-17' },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_WATCHLIST;
    } catch {
      return DEFAULT_WATCHLIST;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const handleRemove = (symbol) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  // Merge with full stock data
  const watchlistStocks = watchlist
    .map((item) => {
      const stockData = MOCK_STOCKS.find((s) => s.symbol === item.symbol);
      return stockData ? { ...stockData, addedOn: item.addedOn } : null;
    })
    .filter(Boolean);

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Star className="text-accent" />
          My Watchlist
        </h1>
        <span className="text-muted" style={{ fontSize: '0.9rem' }}>
          {watchlistStocks.length} {watchlistStocks.length === 1 ? 'stock' : 'stocks'}
        </span>
      </div>

      {watchlistStocks.length === 0 ? (
        <div className="card flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
          <Star size={48} className="text-muted" />
          <h3>Your watchlist is empty</h3>
          <p className="text-muted">Search for stocks and add them to your watchlist.</p>
          <Link to="/dashboard" className="btn">Explore Markets</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {watchlistStocks.map((stock) => (
            <div key={stock.symbol} className="card flex-between" style={{ padding: '1rem 1.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ minWidth: '140px' }}>
                  <Link to={`/stock/${stock.symbol}`} style={styles.symbolLink}>
                    <h3>{stock.symbol}</h3>
                  </Link>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>{stock.name}</p>
                </div>

                <div>
                  <p style={{ fontWeight: '600' }}>₹{stock.price?.toFixed(2)}</p>
                  <p className={stock.change >= 0 ? 'text-success' : 'text-danger'} style={{ fontSize: '0.875rem' }}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </p>
                </div>

                <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                  Added: {stock.addedOn}
                </div>
              </div>

              <button
                className="btn btn-outline"
                style={{ padding: '0.5rem', color: 'var(--danger)', borderColor: 'transparent' }}
                onClick={() => handleRemove(stock.symbol)}
                title="Remove from Watchlist"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  symbolLink: {
    color: 'var(--accent-color)',
    textDecoration: 'none',
  },
};

export default Watchlist;