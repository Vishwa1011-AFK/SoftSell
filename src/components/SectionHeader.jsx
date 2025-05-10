const SectionHeader = ({ title, subtitle }) => {
    return (
      <div className="mb-10 md:mb-16"> 
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"> 
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-gray-700 max-w-2xl mx-auto text-lg md:text-xl"> 
            {subtitle}
          </p>
        )}
      </div>
    );
  };
  export default SectionHeader;