import { LOGIN_BRANDING_LINES, LOGIN_BRANDING_SUBTITLE } from "../../constants/login";

export const AuthBranding = () => {
  return (
    <div className="flex w-full max-w-[260px] flex-col items-center justify-center text-center">
      <div className="mb-5" aria-hidden="true">
        <img
          src="/assets/logo.png"
          className="size-35 object-contain"
          alt={LOGIN_BRANDING_SUBTITLE}
        />
      </div>

      <div>
        {LOGIN_BRANDING_LINES.map((line) => (
          <p key={line.text} className={`font-sb-aggro text-[1.5rem] font-bold ${line.className}`}>
            {line.text}
          </p>
        ))}
      </div>

      <p className="font-sb-aggro text-blue-grad mt-4 font-bold">{LOGIN_BRANDING_SUBTITLE}</p>
    </div>
  );
};
