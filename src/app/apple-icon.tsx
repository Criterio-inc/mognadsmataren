import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a5f5a',
          borderRadius: '40px',
        }}
      >
        {/* Orange graph line representing maturity growth */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 100 60"
          fill="none"
        >
          <circle cx="10" cy="45" r="8" fill="#F5A623" />
          <circle cx="30" cy="28" r="8" fill="#F5A623" />
          <circle cx="50" cy="35" r="8" fill="#F5A623" />
          <circle cx="70" cy="18" r="8" fill="#F5A623" />
          <circle cx="90" cy="10" r="8" fill="#F5A623" />

          <line x1="10" y1="45" x2="30" y2="28" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" />
          <line x1="30" y1="28" x2="50" y2="35" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" />
          <line x1="50" y1="35" x2="70" y2="18" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" />
          <line x1="70" y1="18" x2="90" y2="10" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
