import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AI-Mognadsmätaren - Mät er organisations AI-mognad';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a5f5a',
          padding: '60px',
        }}
      >
        {/* Graph icon */}
        <svg
          width="200"
          height="120"
          viewBox="0 0 100 60"
          fill="none"
          style={{ marginBottom: '40px' }}
        >
          <circle cx="10" cy="45" r="8" fill="#F5A623" />
          <circle cx="30" cy="28" r="8" fill="#F5A623" />
          <circle cx="50" cy="35" r="8" fill="#F5A623" />
          <circle cx="70" cy="18" r="8" fill="#F5A623" />
          <circle cx="90" cy="10" r="8" fill="#F5A623" />

          <line x1="10" y1="45" x2="30" y2="28" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
          <line x1="30" y1="28" x2="50" y2="35" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
          <line x1="50" y1="35" x2="70" y2="18" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
          <line x1="70" y1="18" x2="90" y2="10" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            AI-Mognadsmätaren
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#F5A623',
              textAlign: 'center',
            }}
          >
            Mät er organisations AI-mognad
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '24px',
          }}
        >
          <span>Critero AB</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
