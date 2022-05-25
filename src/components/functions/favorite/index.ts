import {FavoriteStateType} from '../../../types/favorite';
import {MovieData} from '../../../types/movieData';

export const checkFavoriteItem = (data: MovieData, favoriteState: any) => {
  return favoriteState.filter((el: FavoriteStateType) => el.id === data.id)
    .length > 0
    ? true
    : false;
};
