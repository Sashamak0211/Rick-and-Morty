import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { ICharacter } from '@/entities';
import { getCharacter, getCharacters, IApiCharacter } from '@/shared';

export const useCharactersQuery = (params = {}) => {
  return useQuery<ICharacter[]>({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
    placeholderData: keepPreviousData,
  });
};

export const useCharacterByIdQuery = (id?: number) => {
  return useQuery<IApiCharacter>({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id!),
    enabled: typeof id === 'number',
  });
};
