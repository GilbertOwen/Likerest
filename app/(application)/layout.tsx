import Navbar from "./_components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pt-[70px]  flex-col h-full w-full">
      <Navbar />
      {children}
    </div>
  );
}
