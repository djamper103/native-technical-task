import {Categories} from '../../components/categories';
import {FavoritePage} from '../../components/favoritePage';
import {HomePage} from '../../components/homePage';
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
  {name: 'FavoritePage', component: FavoritePage, image: FAVORITE_ICON},
  {name: 'ProfilePage', component: ProfilePage, image: DEFAULT_PERSON_ICON},
  {name: 'Settings', component: Settings, image: SETTING_ICON},
];
