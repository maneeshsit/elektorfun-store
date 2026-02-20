import { useState } from 'react';
import { X, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';

export function AppDownloadBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72">
      {/* Collapsed pill */}
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="ml-auto flex items-center gap-2 glass border border-border/60 rounded-full shadow-xl px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/50 transition-all duration-200 group"
          style={{ boxShadow: '0 4px 24px 0 hsl(175 80% 40% / 0.15)' }}
        >
          <Smartphone className="h-4 w-4 text-primary" />
          <span>
            Get the <span className="text-primary">App</span>
          </span>
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      ) : (
        /* Expanded card */
        <div
          className="glass border border-border/60 rounded-2xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 40px 0 hsl(175 80% 40% / 0.18)' }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-primary/5">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Download the <span className="text-primary">ElektorFun</span> App
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(true)}
                className="h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Collapse"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 py-3.5">
            <p className="text-muted-foreground text-xs mb-3">
              Shop smarter on iOS &amp; Android — browse products, track orders &amp; get exclusive deals.
            </p>

            {/* Store Buttons */}
            <div className="flex items-center gap-2">
              {/* App Store */}
              <button
                className="flex-1 flex items-center justify-center gap-1.5 bg-foreground/8 hover:bg-primary/20 border border-border/50 hover:border-primary/60 text-foreground text-xs font-medium rounded-xl px-3 py-2 transition-all duration-200 group"
                onClick={() => alert('iOS App coming soon!')}
              >
                <svg className="h-4 w-4 shrink-0 text-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-muted-foreground">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </button>

              {/* Google Play */}
              <button
                className="flex-1 flex items-center justify-center gap-1.5 bg-foreground/8 hover:bg-primary/20 border border-border/50 hover:border-primary/60 text-foreground text-xs font-medium rounded-xl px-3 py-2 transition-all duration-200 group"
                onClick={() => alert('Android App coming soon!')}
              >
                <svg className="h-4 w-4 shrink-0 text-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.22.99.14l12.88-7.43-2.76-2.76-11.11 10.05zM.54 1.7C.2 2.03 0 2.56 0 3.26v17.48c0 .7.2 1.23.55 1.56l.08.08 9.79-9.79v-.23L.62 1.62l-.08.08zM20.44 10.17l-2.71-1.57-3.1 3.1 3.1 3.1 2.73-1.58c.78-.45.78-1.6-.02-2.05zM4.17.48L17.05 7.9l-2.76 2.76L3.18.62c.36-.21.77-.22 1-.14z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-muted-foreground">Get it on</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
