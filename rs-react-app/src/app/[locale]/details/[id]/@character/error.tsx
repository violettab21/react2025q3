'use client';

import { useEffect } from 'react';
import { GENERIC_ERROR } from '../../../../../constants';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <p>{GENERIC_ERROR}</p>
    </>
  );
}
