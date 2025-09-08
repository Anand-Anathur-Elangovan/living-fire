export const metadata = {
  title: "Warranty Request | Living Fire",
  description: "Submit your warranty request for Living Fire products. Our team ensures a smooth process for claiming coverage on your premium fireplace.",
  keywords: "warranty request, Living Fire warranty, fireplace warranty, product warranty claim, service request, warranty support",
  alternates: {
    canonical: "https://www.livingfire.com.au/warranty",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfire.com.au" }],
  publisher: "Living Fire",
};



import Warranty from "./Warranty";

export default function Page() {
  return <Warranty />;
}