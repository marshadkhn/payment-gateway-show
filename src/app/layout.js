import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Minimal Store",
  description: "Next.js + Razorpay Store without authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
