// // app/components/InlineCriticalCSS.js
// export default function InlineCriticalCSS() {
//     return (
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           /* Above-the-fold styles */
//           .hero, .panel-left, .panel-right, .overlay-image { opacity: 1 !important; }
//           .text-group, .button-group { opacity: 0; }
          
//           /* Font loading */
//           @font-face {
//             font-family: 'Satoru';
//             src: url('/fonts/Satoru.woff2') format('woff2');
//             font-display: swap;
//           }
//           body { font-family: 'Satoru', sans-serif; }
//         `
//       }} />
//     );
//   }
export default function InlineCriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical above-the-fold styles */
        html, body {
          overflow-x: hidden;
          background-color: #f7f7f5;
        }
        
        /* Fallback font faces */
        @font-face {
          font-family: 'Geist Fallback';
          src: local('Arial');
          size-adjust: 105%;
          ascent-override: 90%;
          descent-override: 22%;
        }
        
        /* Layout shift protection */
        img, svg, video {
          max-width: 100%;
          height: auto;
          vertical-align: middle;
          font-style: italic;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `
    }} />
  );
}