'use client';
import '../characterDetails.css';
import refreshIcon from '../../../assets/refresh.svg';
import Image from 'next/image';
import { revalidateCache } from './resetAction';

export const Refresh = ({ id }: { id: string }) => {
  return (
    <button
      className="refreshImageContainer"
      onClick={() => {
        void revalidateCache(id);
      }}
    >
      <Image className="refresh" src={refreshIcon} alt="refresh" priority />
    </button>
  );
};
