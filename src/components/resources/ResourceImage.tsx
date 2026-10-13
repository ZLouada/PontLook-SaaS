'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export interface ResourceImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

export function ResourceImage({
  src,
  fallbackSrc = '/executive_training_room.jpg',
  alt,
  onError,
  className = '',
  ...props
}: ResourceImageProps) {
  const initialSrc = src && typeof src === 'string' && src.trim().length > 0 ? src.trim() : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const nextSrc = src && typeof src === 'string' && src.trim().length > 0 ? src.trim() : fallbackSrc;
    setCurrentSrc(nextSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || ''}
      className={className}
      onError={handleError}
    />
  );
}

export default ResourceImage;
