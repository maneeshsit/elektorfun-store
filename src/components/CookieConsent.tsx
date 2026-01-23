import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface CookiePreferences {
  analytics: boolean;
  preferences: boolean;
  advertising: boolean;
}

const COOKIE_CONSENT_KEY = 'elektorfun_cookie_consent';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    preferences: false,
    advertising: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (consent: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, preferences: true, advertising: true });
  };

  const handleRefuseAll = () => {
    saveConsent({ analytics: false, preferences: false, advertising: false });
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Cookie settings
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
            Our website uses cookies which are necessary for running the website and for providing the services you request. We would also like to set the following optional cookies on your device. You can change these settings any time later by clicking "Change cookie settings" at the bottom of any page. For more information, please read our{' '}
            <a href="#" className="text-foreground underline hover:text-primary transition-colors font-medium">
              Cookie Information.
            </a>
          </p>

          <div className="space-y-5">
            {/* Analytics */}
            <div className="flex gap-3">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked === true }))
                }
                className="mt-1 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="font-semibold text-foreground cursor-pointer block">
                  Analytics
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  We collect statistics to understand how many visitors we have, how our visitors interact with the site and how we can improve it. The collected data does not directly identify anyone.
                </p>
              </div>
            </div>

            {/* Preferences */}
            <div className="flex gap-3">
              <Checkbox
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, preferences: checked === true }))
                }
                className="mt-1 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="preferences" className="font-semibold text-foreground cursor-pointer block">
                  Preferences
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  We store choices you have made so that they are remembered across visits in order to provide you a more personalized experience.
                </p>
              </div>
            </div>

            {/* Advertising and tracking */}
            <div className="flex gap-3">
              <Checkbox
                id="advertising"
                checked={preferences.advertising}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, advertising: checked === true }))
                }
                className="mt-1 border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1">
                <label htmlFor="advertising" className="font-semibold text-foreground cursor-pointer block">
                  Advertising and tracking
                </label>
                <p className="text-sm text-muted-foreground mt-1">
                  Your browsing behavior is tracked across websites by advertising and social network service providers. You may see tailored advertising and content on other websites based on your browsing profile.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Button
              onClick={handleAcceptSelected}
              variant="outline"
              className="rounded-full px-6 py-2 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-medium"
            >
              Accept selected
            </Button>
            <Button
              onClick={handleRefuseAll}
              variant="outline"
              className="rounded-full px-6 py-2 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-medium"
            >
              Refuse all
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
