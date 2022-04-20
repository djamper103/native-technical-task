import {CategoriesRenderPage} from '../../components/categories/components';
import {Categories} from '../../components/categories/components/categoriesList';
import {GenresList} from '../../components/categories/components/genresList';
import {CurrentMovie} from '../../components/currentMovie';
import {FavoritePage} from '../../components/favoritePage';
import {HomePage} from '../../components/homePage';
import {Login} from '../../components/login';
import {ProfilePage} from '../../components/profilePage';
import {Settings} from '../../components/settings';
import {
  DEFAULT_PERSON_ICON,
  FAVORITE_ICON,
  HOME_ICON,
  MENU_ICON,
  SETTING_ICON,
} from '../../constants/images';

export const routes = [
  {name: 'Home', component: HomePage, image: HOME_ICON},
  {name: 'Categories', component: Categories, image: MENU_ICON},
  {name: 'Favorite Page', component: FavoritePage, image: FAVORITE_ICON},
  {name: 'Profile Page', component: ProfilePage, image: DEFAULT_PERSON_ICON},
  {name: 'Settings', component: Settings, image: SETTING_ICON},
];

export const routesStack = [
  {name: 'Current Movie', component: CurrentMovie},
  {name: 'Login', component: Login},
  {name: 'Genres', component: GenresList},
  {name: 'Categories Render', component: CategoriesRenderPage},
];
