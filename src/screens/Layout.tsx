import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import HomeScreen from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { updateTab } from '../redux/tabSlice';
import { Commonsize } from 'Utils/ResponsiveWidget';
import HistoryPage from './HistoryPage';
import { darkTheme, lightTheme } from '../themes/colors';
import { Icon4, Icon7 } from '../Utils/CommonIcons';



const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tab = useSelector((state: RootState) => state.tab.tab);

          const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
          const theme = isDarkMode ? darkTheme : lightTheme;


    return (
        <View style={styles.flex1}>


            <BottomTabNavigator
                state={tab}
                renderTabs={[
                    <HomeScreen key="home" />,
                    <HistoryPage key="history" />,
                ]}
                tabNames={['HomeScreen', 'History']}
                tabIcons={[
                    <Icon4 name={'home'} size={Commonsize(20)} style={{ color: theme.text }} key="home" />,
                    <Icon7 name={'history'} size={Commonsize(20)} style={{ color: theme.text }} key="history" />,
                ]}
                style={{ backgroundColor: theme.cardBackground, borderTopColor: theme.cardBackground }}
                activeBackgroundColor={theme.background}
                inActiveBackgroundColor={theme.cardBackground}
                tabOnPress={[
                    (() => dispatch(updateTab(0))),
                    (() => dispatch(updateTab(1))),
                ]}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    flex1: { flex: 1, width: '100%', height: '100%' },
});

export default Layout;
