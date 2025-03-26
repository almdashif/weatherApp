import React from "react";
import { ColorValue, ViewStyle } from "react-native";

export interface IBottomtabNavigator {
    state: number;
    tabNames?: string[]; // Assuming tab names are strings
    tabIcons: React.ReactNode[]; // Assuming there are multiple tab icons, each can be a ReactNode
    tabOnPress: (() => void)[];
    style?: ViewStyle; // Same here, you can specify style type (e.g., ViewStyle)
    bottomTabStyle?: ViewStyle; // Same as above, for bottom tab style

    activeBackgroundColor: ColorValue; // The background color when the tab is active
    inActiveBackgroundColor: ColorValue; // The background color when the tab is inactive
    renderTabs: React.ReactNode[];
}