import Container from '@/components/ui/Container';

export default function EmptyState({ message }: { message: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-line bg-white px-8 py-16 text-center">
          <span
            className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-gold text-gold"
            aria-hidden
          >
            ✦
          </span>
          <p className="text-lg text-slate">{message}</p>
        </div>
      </Container>
    </section>
  );
}
