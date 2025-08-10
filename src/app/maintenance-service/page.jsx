export const metadata = {
  title: "Fireplace Maintenance & Service Request | Living Fire",
  description: "Schedule a professional fireplace maintenance or service request with Living Fire. Our experts ensure your fireplace operates safely and efficiently.",
  keywords: "fireplace maintenance, fireplace service request, fireplace repair, gas fireplace service, wood fireplace maintenance, Melbourne fireplace service, Living Fire support",
  alternates: {
    canonical: "https://livingfires.com.au/maintenance-service",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
  publisher: "Living Fire",
};


import MaintenanceService from "./MaintenanceService";

export default function Page() {
  return <MaintenanceService />;
}