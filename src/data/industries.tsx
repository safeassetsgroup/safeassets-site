import React from "react";
import { Factory, Tractor, Wrench, Truck, ShieldCheck } from "lucide-react";

// Each solution card on the page
type SolutionBlock = {
  heading: string;
  text: string;
  imageSrc?: string;
};

// Industry object shape
export type Industry = {
  slug: string;
  label: string;
  description: string;
  link: string;                 // internal route
  icon: React.ReactNode;        // lucide icon
  website?: string;             // NEW: external site used to fetch a logo (e.g. "caterpillar.com" or "https://caterpillar.com")
  imageSrc?: string;
  solutions: SolutionBlock[];
};

// Data
export const INDUSTRIES: Industry[] = [
  {
    slug: "construction",
    label: "Construction",
    description:
      "We provide asset management for excavators, bulldozers, and loaders used in construction and development. Our tools help you track equipment health and performance to stay on schedule and budget.",
    link: "/industries/construction",
    icon: <Wrench className="h-10 w-10 text-gray-600" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/construction.png",
    // Set to the website you want the logo pulled from:
    // e.g. a partner/vendor domain, or your own landing page for this sector
    website: "", // e.g. "caterpillar.com"
    solutions: [
      {
        heading: "Predictive Maintenance for Heavy Machinery",
        text: `The construction industry operates on tight deadlines where equipment downtime can be catastrophic. Our solutions offer real-time health monitoring of heavy machinery like excavators and cranes. By using IoT sensors and telematics, we provide predictive insights that allow for scheduled maintenance, preventing costly unplanned outages.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/construction-downtime.png",
      },
      {
        heading: "Optimizing Fleet Performance",
        text: `We help you go beyond simple tracking by providing comprehensive fleet performance optimization. Our tools analyze data on fuel consumption, asset utilization, and operational hours to identify areas for improvement. This proactive approach helps you maintain a reliable fleet, ensuring project timelines are met and operational costs are kept under control.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/construction-fleet.png",
      },
    ],
  },
  {
    slug: "agriculture",
    label: "Agriculture",
    description:
      "From combines to irrigation systems, we help farmers manage their heavy machinery. Our solutions ensure equipment readiness during critical seasons, improving efficiency and yield.",
    link: "/industries/agriculture",
    icon: <Tractor className="h-10 w-10 text-green-600" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/agriculture.png",
    website: "", // e.g. "deere.com"
    solutions: [
      {
        heading: "Ensuring Readiness for Critical Seasons",
        text: `In agriculture, the timing of operations is everything. Our asset management solutions are designed to ensure your heavy machinery, from combines to sprayers, is operational during critical planting and harvesting seasons. We use equipment connectivity to monitor machine performance and environmental data, enabling you to optimize usage and anticipate maintenance needs.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/agriculture-readiness%20(2).png",
      },
      {
        heading: "Reducing Downtime to Improve Yield",
        text: `By focusing on a proactive strategy, we help you reduce unexpected breakdowns that can cost you time and money. Our predictive analytics for agricultural equipment enables you to schedule maintenance during off-seasons, ensuring maximum uptime when it matters most. This approach reduces breakdowns and improves overall farm efficiency and yield.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/Agriculture-Downtime.png",
      },
    ],
  },
  {
    slug: "transport-logistics",
    label: "Transport & Logistics",
    description:
      "For fleets of semi-trucks and heavy transport vehicles, we offer solutions to reduce maintenance costs and improve fleet reliability. We ensure your assets are always on the road and on time.",
    link: "/industries/transport-logistics",
    icon: <Truck className="h-10 w-10 text-red-600" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/transport.png",
    website: "", // e.g. "dhl.com"
    solutions: [
      {
        heading: "Optimized Maintenance for Fleet Reliability",
        text: `The transport and logistics industry relies on the constant movement of assets. Our asset management solutions provide a clear overview of your entire fleet's health, from semi-trucks to specialized transport vehicles. We use real-time data analytics to predict component failures, allowing for planned service stops instead of emergency repairs.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/transport-fleet.png",
      },
      {
        heading: "Enhancing Safety and Compliance",
        text: `Our systems go beyond reliability by helping you manage regulatory compliance and driver safety. We provide tools to track maintenance records, monitor vehicle performance, and ensure your assets are always compliant with industry standards. This not only reduces maintenance costs but also increases fleet reliability and ensures on-time deliveries.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/transport-logistics.png",
      },
    ],
  },
  {
    slug: "energy-utilities",
    label: "Energy & Utilities",
    description:
      "Our solutions for the energy and utilities sector focus on maintaining critical infrastructure and heavy machinery to ensure uninterrupted service and operational safety.",
    link: "/industries/energy-utilities",
    icon: <Factory className="h-10 w-10 text-orange-600" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/energy.png",
    website: "", // e.g. "siemens-energy.com"
    solutions: [
      {
        heading: "Ensuring Uninterrupted Service",
        text: `The energy and utilities sector operates critical infrastructure that cannot afford downtime. Our services are tailored to maintain the reliability of your assets, from power generators to grid equipment. Through continuous monitoring and predictive analytics, we identify potential issues before they cause service disruptions.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/energy-grid.png",
      },
      {
        heading: "Maximizing Operational Efficiency",
        text: `Our focus is on proactive maintenance to ensure operational continuity, safety, and regulatory compliance. We provide tools to optimize maintenance schedules based on real-world asset usage, helping you reduce costs and improve overall efficiency without compromising on reliability.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/energy-outages.png",
      },
    ],
  },
  {
    slug: "defence-security",
    label: "Defence & Security",
    description:
      "We offer secure and reliable asset management for defence and security equipment, ensuring peak performance and mission readiness through advanced predictive maintenance.",
    link: "/industries/defence-security",
    icon: <ShieldCheck className="h-10 w-10 text-black" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/defence.png",
    website: "", // e.g. "lockheedmartin.com"
    solutions: [
      {
        heading: "Mission Readiness with Advanced Analytics",
        text: `For defence and security assets, reliability and mission readiness are paramount. Our asset management solutions provide a secure and robust system for tracking and maintaining specialized equipment. We utilize predictive maintenance models to ensure all assets are in peak condition, ready to deploy when needed.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/defence-readiness.png",
      },
      {
        heading: "Secure and Reliable Asset Tracking",
        text: `Our approach minimizes unexpected failures, extends equipment lifespan, and enhances overall operational effectiveness and safety. We provide a comprehensive view of your assets' health, allowing you to make data-driven decisions that improve reliability and reduce long-term costs.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/defence-precision.png",
      },
    ],
  },
  {
    slug: "strata-property",
    label: "Strata & Property",
    description:
      "Our services assist strata and property managers in optimizing the maintenance of shared heavy equipment and infrastructure, reducing costs and extending asset life.",
    link: "/industries/strata-property",
    icon: <Factory className="h-10 w-10 text-purple-600" />,
    imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/industry_images/strata.png",
    website: "", // e.g. "strata.community"
    solutions: [
      {
        heading: "Streamlined Maintenance for Shared Assets",
        text: `Property and strata managers face the challenge of maintaining shared heavy equipment and infrastructure. Our services streamline this process by providing a clear overview of asset health and maintenance schedules. We help you transition from a reactive to a proactive maintenance strategy, which reduces costs and extends the life of valuable assets like generators and elevators.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/strata-maintenance.png",
      },
      {
        heading: "Ensuring Resident Satisfaction and Safety",
        text: `Our solutions make it easier to budget for repairs and ensure reliable operation for all residents. By preventing unexpected breakdowns and providing a clear audit trail of maintenance, you can increase resident satisfaction and build a reputation for excellent property management.`,
        imageSrc: "https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/secondary_images/strata-safety.png",
      },
    ],
  },
];
