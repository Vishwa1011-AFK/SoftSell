import { FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaEnvelope />, href: "mailto:info@softsell.example", label: "Email" },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 mr-2 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold text-white">SoftSell</span>
            </div>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Helping businesses recover value from unused software licenses since 2020.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">© {currentYear} SoftSell. All rights reserved.</p>
            <p className="text-xs text-gray-600 mt-1">A fictional company for a web development assignment.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
