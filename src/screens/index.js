import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import Routes from './routes';
import defaultStyles from '../template/styles';
import {useSelector} from 'react-redux';
import Request from '~/tools/Request';
import AppLoading from '~/components/AppLoading';

function Main() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const userStore = useSelector(state => state.user.data);

  useEffect(() => {
    const loadToken = async () => {
      let userToken;

      try {
        userToken = await Request.getToken();
      } catch (e) {}

      setIsLogged(!!userToken && userToken !== 'undefined');
      setTimeout(() => setMounted(true), 400);
    };

    loadToken();
  }, [userStore]);

  if (!mounted) {
    return <AppLoading />;
  }

  return (
    <View style={defaultStyles.root}>
      <Routes initialRouteName={isLogged ? 'DrawerAdmin' : 'DrawerStatic'} />
    </View>
  );
}

export default Main;
