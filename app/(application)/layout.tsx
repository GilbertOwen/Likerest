import Navbar from "./_components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pt-[82px]  flex-col h-full w-full">
      <Navbar />
      {children}
    </div>
  );
}
