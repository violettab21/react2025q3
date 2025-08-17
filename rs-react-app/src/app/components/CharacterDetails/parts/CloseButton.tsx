'use client';
import '../characterDetails.css';
import image from '../../../../assets/close.svg';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export const CloseButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  return (
    <button
      className="closeButton"
      onClick={() => {
        const page = searchParams.get('page');

        router.push(`/${locale}?page=${page ? page : '1'}`);
      }}
    >
      <Image src={image} alt="close" />
    </button>
  );
};
