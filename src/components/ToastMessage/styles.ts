import { PRIMARY_FONT_OBJECT } from 'AppTheme/fonts';
import { ColorsType, StyleRecord } from 'AppTypes';
import { moderateScaling } from 'AppUtils/styleHelper';

const styles = (colors: ColorsType) =>
  ({
    mainToastView: {
      minHeight: moderateScaling(44),
      width: '92%',
      padding: moderateScaling(20),
      borderRadius: moderateScaling(12),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItem:'center'
    },
    mainToastLoadingView: {
      minHeight: moderateScaling(44),
      width: '92%',
      padding: moderateScaling(20),
      borderRadius: moderateScaling(12),
      flexDirection: 'row',
      alignItem:'center',
      gap:20
    },
    successToast: {
      backgroundColor: colors.successToastColor,
      borderWidth: moderateScaling(1),
      borderColor:  colors.skyBlue ,
    },
    errorToast: {
      backgroundColor: colors.errorToastColor,
      borderWidth: moderateScaling(1),
      borderColor:  colors.errorBorder ,
    },
    loadingToast: {
      backgroundColor: colors.textTitleColor,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft:moderateScaling(20)
      
    },
    crossIcon: { width:moderateScaling(25),aspectRatio:1,alignSelf:'center' },
    toastText: {
      fontSize: moderateScaling(14),
      lineHeight: moderateScaling(20),
      fontFamily: PRIMARY_FONT_OBJECT[400],
      marginLeft:moderateScaling(10)
    },
  } satisfies StyleRecord);

export default styles;
