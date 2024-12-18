import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 52,
        maxWidth: "100%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.green[300],
        marginHorizontal: 24
    },
    title: {
        color: colors.gray[900],
        fontSize: 16,
        fontWeight: "600"
    }
});