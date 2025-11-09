import React, { useMemo, useState } from 'react';

function createSvgPlaceholder(text = 'Image', options = {}) {
    const {
        width = 1200,
        height = 600,
        bg = '#EEF2FF',
        fg = '#1E40AF',
        subfg = '#475569'
    } = options;

    const safeText = (text || 'Image').slice(0, 60);
    const subtitle = 'Hình minh hoạ';

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="${bg}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g opacity="0.08">
    <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width,height)/3}" fill="${fg}"/>
  </g>
  <text x="50%" y="48%" text-anchor="middle" fill="${fg}" font-family="Inter,Segoe UI,Roboto,Arial" font-size="${Math.min(42, width/18)}" font-weight="700">${safeText}</text>
  <text x="50%" y="60%" text-anchor="middle" fill="${subfg}" font-family="Inter,Segoe UI,Roboto,Arial" font-size="${Math.min(20, width/36)}">${subtitle}</text>
</svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ImageWithFallback(props) {
    const { src, alt, className, style, fallbackSrc } = props;
    const [error, setError] = useState(false);

    const dynamicFallback = useMemo(() => createSvgPlaceholder(alt || 'Hình ảnh'), [alt]);

    const handleError = () => {
        if (!error) {
            setError(true);
        }
    };

    const resolvedSrc = error || !src ? (fallbackSrc || dynamicFallback) : src;

    return (
        <img
            src={resolvedSrc}
            alt={alt || ''}
            className={className}
            style={style}
            onError={handleError}
            loading="lazy"
        />
    );
}

export default ImageWithFallback;



