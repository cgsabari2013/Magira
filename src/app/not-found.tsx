import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div aria-hidden className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <div className="container-x relative text-center">
        <p className="text-gold">404</p>
        <h1 className="mt-3 text-[clamp(36px,5vw,56px)] font-semibold tracking-tight">This page took a different route.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact/" variant="glass">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
