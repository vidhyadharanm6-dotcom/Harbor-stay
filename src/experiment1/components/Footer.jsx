export default function Footer() {
  return (
    <footer className="bg-harbor-900 text-harbor-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Harbor Stay Hotels</span>
      </div>
    </footer>
  )
}
