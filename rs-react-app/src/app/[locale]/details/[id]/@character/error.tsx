'use client';

import { useEffect } from "react";
import { CharacterDetailsWrapper } from "../../../../../components/CharacterDetails/parts/CharacterDetailsWrapper";
import { CloseButton } from "../../../../../components/CharacterDetails/parts/CloseButton";
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from "../../../../../constants";


export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <CharacterDetailsWrapper>
        <>
          <CloseButton />
          <p>{error.message === '404' ? NOT_FOUND_MESSAGE : GENERIC_ERROR}</p>
        </>
      </CharacterDetailsWrapper>
    </>
  );
}
