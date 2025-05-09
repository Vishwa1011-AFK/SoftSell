const Navbar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SoftSell</h1>
          <div>
            <a href="#home" className="px-3">Home</a>
            <a href="#howitworks" className="px-3">How It Works</a>
            <a href="#whyus" className="px-3">Why Us</a>
            <a href="#contact" className="px-3">Contact</a> 
            <span className="text-sm">Navigation placeholder</span>
          </div>
        </div>
      </nav>
    );
  };
  export default Navbar;