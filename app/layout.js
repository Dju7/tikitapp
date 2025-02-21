import Provider from '@/provider/provider'
import "./globals.css";


export const metadata = {
  title: "TikitApp",
  description: "application de ticket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body>{children}</body>
      </Provider>
    </html>
  );
}
