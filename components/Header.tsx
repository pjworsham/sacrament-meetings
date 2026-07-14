// import NavLinks from './NavLinks';

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="flex flex-col sm:justify-between sm:items-center px-4 gap-2">
        <h1 id="header-title" className="text-2xl font-bold">
          Canton Ward
        </h1>
        <p className="text-sm">{currentDate}</p>
      </div>
      {/* <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <NavLinks />
      </nav> */}
    </header>
  );
}