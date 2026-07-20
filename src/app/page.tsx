import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { CatalogSection } from "@/components/sections/catalog";
import { ReservationSection } from "@/components/sections/reservation";
import { PlaceholderSection } from "@/components/sections/placeholder";
import { SiteFooter } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <CatalogSection />

        <PlaceholderSection
          id="skin-designer"
          eyebrow="Make it yours"
          title="Design your own modular skin"
          description="Pick your device, choose a base material and finish, add modular panels, textures and decals, and watch the price update live before you reserve it."
          branch="feat/skin-designer"
        />

        <ReservationSection />
      </main>
      <SiteFooter />
    </>
  );
}
