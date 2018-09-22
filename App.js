import { createDrawerNavigator } from 'react-navigation';
import CardList from './src/components/CardList';
import Login from './src/components/Login';

export default createDrawerNavigator({
  Login,
  Home: CardList,
});
