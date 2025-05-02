// app/components/InlineCriticalCSS.js
export default function InlineCriticalCSS() {
    return (
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Above-the-fold styles */
          .hero, .panel-left, .panel-right, .overlay-image { opacity: 1 !important; }
          .text-group, .button-group { opacity: 0; }
          
          /* Font loading */
          @font-face {
            font-family: 'Satoru';
            src: url('/fonts/Satoru.woff2') format('woff2');
            font-display: swap;
          }
          body { font-family: 'Satoru', sans-serif; }
        `
      }} />
    );
  }