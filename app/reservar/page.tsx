import { BookTable } from "@/components/BookTable";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function ReservationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <BookTable />
      </main>
      <Footer />
    </>
  );
}
