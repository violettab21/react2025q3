'use client';
import refreshIcon from '../../../assets/refresh.svg';
import Image from 'next/image';
import { revalidateCache } from './resetAction';

export const Refresh = () => {
  return (
    <button className="refreshButton" onClick={() => void revalidateCache()}>
      <Image className="refresh" src={refreshIcon} alt="refresh" priority />
    </button>
  );
};
