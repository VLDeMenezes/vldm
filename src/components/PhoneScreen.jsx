export default function PhoneScreen({
  locale = "en",
  title = "Mobile preview of the portfolio",
}) {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="relative h-[calc(100dvh-2rem)] w-[min(92vw,24rem)] rounded-[2.5rem] bg-black p-2 shadow-phoneMockup">
        <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white">
          <iframe
            title={title}
            src={`/${locale}`}
            className="h-full w-full border-0"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/80"
        />
      </div>
    </div>
  );
}
