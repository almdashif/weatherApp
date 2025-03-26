import { StyleSheet, View, TouchableOpacity, ScrollView, } from 'react-native';
import React from 'react';
import { Commonheight, Commonsize, Commonwidth, deviceHeight } from '../Utils/ResponsiveWidget';
import { IBottomtabNavigator } from 'types/IBottomtabNavigator';



const BottomTabNavigator: React.FC<IBottomtabNavigator> = ({ renderTabs = [], state, tabNames = [], tabIcons, tabOnPress, style, bottomTabStyle,  activeBackgroundColor, inActiveBackgroundColor  }) => {

    return (
        <View style={styles.flex1}>
            <ScrollView keyboardShouldPersistTaps='never' scrollEnabled={false} nestedScrollEnabled>
                <View style={styles.componentStyle}>
                    {renderTabs[state]}
                </View>

                <View style={[styles.bottomTabContainerStyle, { ...style }]}>
                    {
                        tabNames.map((val, i) => {
                            return (
                                <TouchableOpacity key={i?.toString()} disabled={state == i} onPress={tabOnPress[i]} style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: state == i ? activeBackgroundColor : inActiveBackgroundColor,height:'100%', width:Commonwidth(150), borderRadius: Commonsize(50),}, { ...bottomTabStyle }]}>
                                    {tabIcons[i]} </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </ScrollView>
        </View>

    )};

export default BottomTabNavigator

const styles = StyleSheet.create({
    flex1:{ flex: 1, width: '100%', height: deviceHeight },
    componentStyle:{ flex: 1, width: '100%', height: deviceHeight - Commonheight(50), },
    bottomTabContainerStyle: {
        width: '100%', height: Commonheight(50), shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        paddingHorizontal: Commonsize(30),
        paddingVertical: Commonsize(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderTopColor: Commoncolor.CommonLightGray,
        borderTopWidth: Commonsize(1),
    },
});