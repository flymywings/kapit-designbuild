import "./globals.css";

export const metadata = {
  title: "Mobility UI Source Baseline",
  description: "Editable React baseline derived from supplied mobile UI mockup patterns.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
