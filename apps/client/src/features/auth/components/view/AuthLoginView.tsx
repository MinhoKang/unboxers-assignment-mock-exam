import type {
  TActiveLoginField,
  TLoginKeypadAction,
  TLoginKeypadItem,
} from "../../types/authTypes";
import { AuthBranding } from "../branding/AuthBranding";
import { AuthLoginForm } from "../form/AuthLoginForm";

interface AuthLoginViewProps {
  phone: string;
  password: string;
  activeField: TActiveLoginField;
  ctaLabel: string;
  isCtaDisabled: boolean;
  keypadItems: readonly TLoginKeypadItem[];
  onFieldSelect: (field: TActiveLoginField) => void;
  onKeypadClick: (item: TLoginKeypadAction) => void;
  onSubmit: () => void;
}

export const AuthLoginView = ({
  phone,
  password,
  activeField,
  ctaLabel,
  isCtaDisabled,
  keypadItems,
  onFieldSelect,
  onKeypadClick,
  onSubmit,
}: AuthLoginViewProps) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8ff]">
      <div className="absolute inset-0" />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-10">
        <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-10 md:flex-row md:items-center md:gap-[44px]">
          <AuthBranding />
          <div aria-hidden="true" className="bg-brand-ink/15 hidden h-[359px] w-[2px] md:block" />
          <AuthLoginForm
            phone={phone}
            password={password}
            activeField={activeField}
            ctaLabel={ctaLabel}
            isCtaDisabled={isCtaDisabled}
            keypadItems={keypadItems}
            onFieldSelect={onFieldSelect}
            onKeypadClick={onKeypadClick}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </main>
  );
};
