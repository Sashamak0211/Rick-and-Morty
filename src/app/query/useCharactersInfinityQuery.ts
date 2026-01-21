import { useInfiniteQuery } from '@tanstack/react-query';

import { ICharacter, IGetAllCharactersParams } from '@/entities';
import { getCharacters } from '@/shared';

export const useCharacterInfinityQuery = (params: IGetAllCharactersParams) => {
  return useInfiniteQuery<ICharacter[]>({
    queryKey: ['characters', 'infinity', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCharacters({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length > 0) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};
