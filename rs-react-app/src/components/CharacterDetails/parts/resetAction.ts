'use server';
import { revalidateTag } from 'next/cache';

export const revalidateCache = async (id: string) => {
  revalidateTag(`character-${id}`);
};
