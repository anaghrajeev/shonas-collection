export default function WhatsAppFAB() {
  return (
    <a className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-primary-container text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-transform z-50 flex items-center justify-center group" href="https://wa.me/919656777404" target="_blank" rel="noopener noreferrer">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}>chat</span>
      <span className="absolute right-full mr-4 bg-surface text-primary px-4 py-2 rounded-lg font-label-md text-label-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ambient-shadow">
        Chat with us (+91 96567 77404)
      </span>
    </a>
  );
}
