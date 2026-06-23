import HeroCatalog from "@/components/HeroCatalog";
import StoreShowcase from "@/components/StoreShowcase";
import CategoryShowcase from "@/components/CategoryShowcase";
import ConciergeSection from "@/components/ConciergeSection";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <main>
      <HeroCatalog />
      <StoreShowcase />
      <CategoryShowcase />
      <ConciergeSection />
      <ClosingCTA />
    </main>
  );
}
