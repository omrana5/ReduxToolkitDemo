import React, { useRef, useState } from 'react';
import {
  Pressable,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { trim } from 'lodash';
import * as Yup from 'yup';

import InputText from 'AppComponents/InputText';
import CustomText from 'AppComponents/CustomText';
import CustomButton from 'AppComponents/CustomButton';
import { useApp } from 'AppContex/hooks/useApp';
import { AuthStackParamList } from 'AppRoutes/types';
import { AppAnyType } from 'AppTypes';
import i18n from 'AppUtils/i18nConfig';
import getStyles from './styles';
import { SvgIcon } from 'AppComponents/SvgIcon';
import {
  AppleIcon,
  faceBookIcon,
  GoogleIcon,
  hidePasswordIcon,
  imageIcon,
  showPasswordIcon,
} from 'AppAssets/svg';
import { moderateScaling } from 'AppUtils/styleHelper';
import AppScreen from 'AppComponents/AppScreen';
import { useLogin } from 'AppApi/networkHook/useLogin';
import { handleLoginError } from 'AppUtils/apiErrorHandler';
import { ShowSuccessToast } from 'AppComponents/ToastMessage/Toast';
import { IS_DEBUG_MODE } from 'AppUtils/constants';

// ─── Response types (matching the actual API contract) ────────────────────────

interface LoginUser {
  usr_id: number;
  usr_fname: string;
  usr_lname: string;
  usr_username: string;
  usr_email: string;
  usr_profile: string;
  usr_profile_img: string;
  usr_email_verified_at: string | null;
  usr_status: number;
  role: string;
  created_at: string;
  updated_at: string;
}

interface LoginResponseData {
  user: LoginUser;
  token: string; // ← actual field name in API response (not `accessToken`)
}

interface LoginApiResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

// ─── Constants ────────────────────────────────────────────────────────────────

interface LoginScreenProps
  extends NativeStackScreenProps<AuthStackParamList, 'LoginScreen'> {
  userStore?: AppAnyType;
}

const ALLOWED_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'mailinator.com',
];

// ─── Validation schema ────────────────────────────────────────────────────────

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Enter a valid email address')
    .trim()
    .strict(true)
    .max(254, 'Enter a valid email address')
    .test('local-part-length', 'Enter a valid email address', value => {
      if (!value) return false;
      const [localPart] = value?.split('@');
      if (!localPart) return false;
      return localPart?.length >= 1 && localPart?.length <= 64;
    })
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Enter a valid email address',
    )
    .test('no-invalid-format', 'Enter a valid email address', value => {
      if (!value) return false;
      if (value?.includes('..')) return false;
      if (value?.startsWith('.') || value?.endsWith('.')) return false;
      return true;
    })
    .test('allowed-domain', 'Please use a supported email provider.', value => {
      if (!value) return false;
      const domain = value.split('@')[1]?.toLowerCase();
      return !!domain && ALLOWED_DOMAINS.includes(domain);
    }),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain uppercase, lowercase, number, special character and no spaces',
    ),
});

// ─── LoginScreen ──────────────────────────────────────────────────────────────

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);
  const loginMutation = useLogin();

  const { colors, appTheme } = useApp();
  const isDark = appTheme === 'dark';
  const styles = React.useMemo(
    () => getStyles(colors, isDark),
    [colors, isDark],
  );

  const form = useFormik({
    initialValues: {
      email:'testpracticaluser001@mailinator.com',
      password:'Test@123',
    },
    validateOnMount: true,
    validationSchema,

    onSubmit: async values => {
      try {
        setIsLoading(true);

        const loginData = {
          email: trim(values.email).toLowerCase(),
          password: values.password,
        };

        const response = await loginMutation.mutateAsync(loginData);

        // ── Guard: API returned success: false ────────────────────────────
        if (!response?.success) {
          setIsLoading(false);
          return handleLoginError(response as AppAnyType);
        }

        // ── Extract fields from the ACTUAL response shape ─────────────────
        //   response.data.token  →  the JWT / bearer token
        //   response.data.user   →  the full user profile object
        const { token } = response?.data ?? {};

        if (!token) {
          setIsLoading(false);
          handleLoginError({ message: 'Authentication token missing.' });
          return;
        }

        ShowSuccessToast(response?.message || 'Login successful');
        setIsLoading(false);
      } catch (error: AppAnyType) {
        setIsLoading(false);
        handleLoginError(error);

        form.resetForm({
          values: { email: '', password: '' },
        });

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);

        throw error;
      }
    },
  });

  const handleFocusNext = (index: number) => {
    inputRefs?.current?.[index]?.focus();
  };

  return (
    <AppScreen style={styles.authModuleContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <KeyboardAwareScrollView
        enableAutomaticScroll
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <CustomText style={styles.textStyle}>Pliē</CustomText>
          <SvgIcon
            Icon={imageIcon}
            width={moderateScaling(50)}
            height={moderateScaling(50)}
            style={styles.svgIconStyle}
          />
        </View>

        <View style={styles.fieldView}>
          {/* ── Email ── */}
          <InputText
            isRequired={false}
            importantForAutofill="yes"
            value={form.values.email}
            errorText={form.errors.email}
            blurOnSubmit={false}
            label={i18n.t('EMAIL_LABEL')}
            onChangeText={form.handleChange('email')}
            onBlur={form.handleBlur('email')}
            autoCapitalize="none"
            error={Boolean(form.touched.email && form.errors.email)}
            returnKeyType="next"
            placeHolderColor={isDark ? colors.lightPurple : colors.iconColor}
            placeholder={i18n.t('EMAIL_PLACEHOLDER')}
            keyboardType="email-address"
            inputContainerStyle={styles.inputContainerStyle}
            textInputStyle={styles.inputTextStyle}
            ref={(ref: TextInput) => {
              inputRefs.current[0] = ref;
            }}
            onSubmitEditing={() => handleFocusNext(1)}
            extraLabelStyles={styles.marginLabelStyles}
          />

          {/* ── Password ── */}
          <InputText
            isRequired={false}
            containerStyle={styles.passwordContainer}
            errorText={form.errors.password}
            textContentType="password"
            textInputStyle={styles.inputTextStyle}
            importantForAutofill="yes"
            extraLabelStyles={styles.marginLabelStyles}
            autoCapitalize="none"
            autoCorrect={false}
            value={form.values.password}
            label={i18n.t('PASSWORD_LABEL')}
            placeHolderColor={isDark ? colors.lightPurple : colors.iconColor}
            inputContainerStyle={styles.inputContainerStyle}
            error={Boolean(form?.touched?.password && form?.errors?.password)}
            onSubmitEditing={() => handleFocusNext(6)}
            onChangeText={form?.handleChange('password')}
            onBlur={form?.handleBlur('password')}
            placeholder={i18n.t('Enter password')}
            secureTextEntry={showPassword}
            returnKeyType="done"
            ref={(ref: TextInput) => {
              inputRefs.current[1] = ref;
            }}
            rightAccessory={
              form.values.password ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setShowPassword(prev => !prev)}
                  style={styles.eyeTouchable}
                >
                  <SvgIcon
                    Icon={showPassword ? hidePasswordIcon : showPasswordIcon}
                    width={18}
                    height={18}
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
          />

          <CustomText style={styles.forgottextStyle}>
            Forgot Password?
          </CustomText>

          <CustomButton
            title={i18n.t('LOG_IN')}
            onPress={form.handleSubmit}
            textStyle={styles.continueButtonText}
            style={styles.continueButton}
            loading={isLoading}
          />

          <CustomText variant="body" style={styles.noAccount}>
            {`${i18n.t('NO_ACCOUNT')} `}
            <CustomText
              variant="body"
              style={styles.noAccountSignUp}
              onPress={() => {}}
            >
              {i18n.t('SIGN_UP')}
            </CustomText>
          </CustomText>

          <View style={styles.orLoginContainer}>
            <View style={styles.line} />
            <CustomText style={styles.text}> {i18n.t('OR')}</CustomText>
            <View style={styles.line} />
          </View>

          <Pressable style={styles.googleSignInButton}>
            <SvgIcon
              Icon={GoogleIcon}
              width={56}
              height={56}
              style={styles.googleIconStyle}
            />
            <SvgIcon
              Icon={AppleIcon}
              width={56}
              height={56}
              style={styles.googleIconStyle}
            />
            <SvgIcon
              Icon={faceBookIcon}
              width={56}
              height={56}
              style={styles.googleIconStyle}
            />
          </Pressable>

          <CustomText style={styles.guestText}>Enter as Guest</CustomText>
        </View>
      </KeyboardAwareScrollView>
    </AppScreen>
  );
};

export default LoginScreen;
