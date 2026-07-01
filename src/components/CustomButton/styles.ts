import { StyleSheet } from "react-native";

import { CustomStyles } from "AppTypes";
import { moderateScaling } from "AppUtils/styleHelper";


const createStyles = <T extends CustomStyles>(styles: T) =>
  StyleSheet.create(styles);

const styles = createStyles({
  imageUrlView: {
    flexDirection: "row",
    alignItems: "center",
  },
  externalStyle: {
    minHeight: moderateScaling(25),
    flexDirection: "row",
  },
});

export default styles;
