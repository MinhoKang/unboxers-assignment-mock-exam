import { AuthLoginView } from "@/features/auth/components/view/AuthLoginView";
import { LOGIN_KEYPAD_ITEMS } from "@/features/auth/constants/login";
import { useLoginPage } from "@/features/auth/hooks/useLoginPage";

const LoginPage = () => {
  const {
    activeField,
    phone,
    password,
    ctaLabel,
    isCtaDisabled,
    handleFieldSelect,
    handleKeypadClick,
    handleCtaClick,
  } = useLoginPage();

  return (
    <AuthLoginView
      phone={phone}
      password={password}
      activeField={activeField}
      ctaLabel={ctaLabel}
      isCtaDisabled={isCtaDisabled}
      keypadItems={LOGIN_KEYPAD_ITEMS}
      onFieldSelect={handleFieldSelect}
      onKeypadClick={handleKeypadClick}
      onSubmit={handleCtaClick}
    />
  );
};

export default LoginPage;
