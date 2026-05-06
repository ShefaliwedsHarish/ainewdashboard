export default function LyraaHeroPanel() {
  return (
    <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12">
      <div className="max-w-md space-y-6">
        <div className="flex items-center space-x-3">
          <svg viewBox="0 0 100 32" className="h-10">
            <g transform="translate(4, 16)">
              <rect x="0" y="-3" width="2.5" height="6" rx="1.25" fill="#534AB7"/>
              <rect x="5" y="-7" width="2.5" height="14" rx="1.25" fill="#6B5FCF"/>
              <rect x="10" y="-10" width="2.5" height="20" rx="1.25" fill="#7F77DD"/>
              <rect x="15" y="-5" width="2.5" height="10" rx="1.25" fill="#6B5FCF"/>
              <rect x="20" y="-8" width="2.5" height="16" rx="1.25" fill="#8B7FD9"/>
            </g>
            <text x="32" y="21" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="#2B2458" letterSpacing="-0.5">lyraa</text>
          </svg>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Your AI receptionist that never sleeps
          </h2>
          <p className="text-muted-foreground text-lg">
            Handle calls 24/7, capture leads, and book appointments automatically with Lyraa's intelligent voice AI.
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Never miss a call</h3>
              <p className="text-sm text-muted-foreground">Lyraa answers every call, even after hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Capture more leads</h3>
              <p className="text-sm text-muted-foreground">Qualify and book appointments automatically</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Save time & money</h3>
              <p className="text-sm text-muted-foreground">Reduce staffing costs while improving service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
