const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-gray-800 text-gray-300 py-8 text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm">
            © {currentYear} SoftSell. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            A fictional company for a web development assignment.
          </p>
        </div>
      </footer>
    );
  };
  export default Footer;