"use client";

export default function IndustriesScroll() {
  const industries = [
    { name: "Agriculture", description: "Farming asset management", logo: "https://www.example-agri.com/favicon.ico", website: "https://www.example-agri.com" },
    { name: "Construction", description: "Construction tools tracking", logo: "https://www.example-constr.com/favicon.ico", website: "https://www.example-constr.com" },
    { name: "Transport", description: "Logistics solutions", logo: "https://www.example-trans.com/favicon.ico", website: "https://www.example-trans.com" },
    { name: "Energy", description: "Energy asset monitoring", logo: "https://www.example-energy.com/favicon.ico", website: "https://www.example-energy.com" },
    { name: "Defence", description: "Defence systems", logo: "https://www.example-defence.com/favicon.ico", website: "https://www.example-defence.com" },
    { name: "Strata", description: "Property management", logo: "https://www.curtisstrata.com.au/favicon.ico", website: "https://www.curtisstrata.com.au/" },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-transparent">
      <div className="flex overflow-hidden">
        <div className="flex animate-scroll space-x-4">
          {industries.concat(industries).map((industry, index) => (
            <div key={`${industry.name}-${index}`} className="flex-shrink-0 w-64 h-32 p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-700 hover:bg-gray-700/80 transition relative">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-orange-400">{industry.name}</h3>
                <p className="text-gray-300 text-xs mt-1">{industry.description}</p>
              </div>
              <a href={industry.website} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 w-32 h-24 flex items-start justify-end">
                <img src={industry.logo} alt={`${industry.name} logo`} className="w-20 h-20 object-contain" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
