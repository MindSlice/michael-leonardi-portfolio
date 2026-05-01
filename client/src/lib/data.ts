// Michael Leonardi Portfolio — Site Data
// Edit this file to update content without touching component code.

export const siteData = {
  name: "Michael Leonardi",
  title: "Staff-Level Hardware & Systems Architecture Leader",
  subtitle:
    "Consumer electronics · Wearables · Smart glasses · VR · Smartphones · Aerospace · Embedded systems",
  positioning:
    "I lead complex hardware and systems architecture from early technology investigation through scalable product execution, with deep experience across electrical design, firmware integration, power architecture, validation, automation, and cross-functional execution.",
  linkedin: "https://www.linkedin.com/in/mihk101",
  email: "[add-public-email@domain.com]", // TODO: Replace with your public email
  resumeUrl: "", // TODO: Add a link to a downloadable PDF resume
};

export const about = {
  paragraphs: [
    "Staff-level hardware and systems architecture leader with 18+ years of experience spanning consumer electronics, wearables, smart glasses, VR, smartphones, aerospace, and embedded systems.",
    "Across Meta, Apple, AeroVironment, and earlier engineering roles, I have led system architecture, new technology investigations (NTI), product integration, power systems, mixed-signal design, embedded firmware, automation, and cross-functional execution — from early feasibility through high-volume manufacturing.",
    "I enjoy difficult hands-on engineering problems and use personal projects to stay sharp across hardware, firmware, systems, and software. Whether it's reverse-engineering a legacy lighting control protocol, building a multi-zone audio platform, or designing a motor controller for a UAV, I bring the same rigor to personal work that I bring to production systems.",
  ],
  highlights: [
    { label: "18+", description: "Years of experience" },
    { label: "5", description: "Major employers" },
    { label: "Meta · Apple · AeroVironment", description: "Key companies" },
    { label: "Staff-Level", description: "Engineering leadership" },
  ],
};

export const experience = [
  {
    id: "meta-lead",
    company: "Meta",
    role: "Hardware Engineering Lead",
    location: "Seattle, WA",
    period: "May 2021 – Present",
    companyInitial: "M",
    color: "#3B82F6",
    highlights: [
      "Leads system-level electrical design, architecture, and NTI for next-generation smart glasses platforms.",
      "Drives alignment across hardware, firmware, silicon, retail, product, operations, vendors, and executive stakeholders.",
      "Spearheaded end-to-end wireless charging proof-of-concept: electrical design, embedded firmware, manufacturing builds, and executive validation reviews.",
      "Built Python automation and post-processing frameworks for structured multi-day parametric sweeps and data-driven feasibility analysis.",
      "Designed and delivered a fully analog charging architecture leveraging existing communications infrastructure.",
      "Led large-scale retail demo platform hardware architecture and execution across retail, CMS, operations, product, and vendors.",
      "Represents hardware strategy in executive forums and international vendor engagements.",
      "Recruits, mentors, and advises engineering talent.",
    ],
    tags: ["Smart Glasses", "NTI", "Wireless Charging", "Python Automation", "System Architecture", "Executive Stakeholders"],
  },
  {
    id: "meta-eng",
    company: "Meta",
    role: "Hardware Engineer",
    location: "Menlo Park, CA",
    period: "Oct 2019 – May 2021",
    companyInitial: "M",
    color: "#3B82F6",
    highlights: [
      "System hardware lead for MLB subsystem of Meta Quest Pro headset.",
      "Responsible for power architecture, peak power management, and system power analysis.",
      "System DRI for eye tracking and IR depth projection subsystems.",
      "Worked directly with cross-functional partners on product development, status, problems, and solutions.",
    ],
    tags: ["Quest Pro", "Power Architecture", "Eye Tracking", "IR Depth", "Mixed Reality"],
  },
  {
    id: "apple",
    company: "Apple",
    role: "iPhone Hardware Systems Design Engineer",
    location: "Cupertino, CA",
    period: "Jun 2013 – Oct 2019",
    companyInitial: "A",
    color: "#94A3B8",
    highlights: [
      "Led design integration, testing, and production work for iPhone products across multiple generations.",
      "Integrated SOCs, MCUs, PMUs, IMUs, optical sensors, displays, camera subsystems, rigid boards, and flex circuits.",
      "Validated analog and digital subsystems for performance, PI, SI, noise, coexistence, and factory yield.",
      "Helped design, develop, and integrate a first-of-its-kind LRA into an iPhone.",
      "Worked closely with contract manufacturers, DFM, operations, and cross-functional teams.",
    ],
    tags: ["iPhone", "SOC Integration", "Signal Integrity", "Power Integrity", "Factory Yield", "LRA"],
  },
  {
    id: "aerovironment",
    company: "AeroVironment",
    role: "Electrical Engineer",
    location: "Simi Valley, CA",
    period: "May 2008 – Jun 2013",
    companyInitial: "AV",
    color: "#10B981",
    highlights: [
      "Technical lead and embedded software designer for Army Raven gimbal team.",
      "Hardware lead for IR&D Nano Air Vehicle program.",
      "Design lead, hardware developer, and embedded software developer for a 350W field-oriented BLDC motor controller, strobe, and RF tracker assembly for Raven UAV.",
      "Designed mixed-signal, power, and inertial measurement systems.",
      "Developed ARM embedded systems using schematic capture, board layout, SPICE modeling, C/C++, and C# tools.",
    ],
    tags: ["UAV", "BLDC Motor Controller", "ARM Embedded", "Mixed-Signal", "Raven", "Nano Air Vehicle"],
  },
  {
    id: "ucr",
    company: "UC Riverside",
    role: "Graduate Student Researcher",
    location: "Riverside, CA",
    period: "May 2007 – Jun 2008",
    companyInitial: "UCR",
    color: "#F59E0B",
    highlights: [
      "Researcher for NLOS UV-optical communication system.",
      "Contributor to SPIE conference paper 6709-35.",
    ],
    tags: ["UV-Optical Comms", "NLOS", "Research", "SPIE"],
  },
  {
    id: "future-concepts",
    company: "Future Concepts",
    role: "Electrical Engineer",
    location: "La Verne, CA",
    period: "Sep 2005 – Apr 2008",
    companyInitial: "FC",
    color: "#8B5CF6",
    highlights: [
      "Worked on digital 10W 900MHz FSK transceiver radio.",
      "Design and project lead for 2kW centralized modular power system for high-precision devices.",
      "Improved RF sensitivity through matching and high-gain antennas.",
      "Designed embedded fault control and measurement system using Microchip MCU.",
    ],
    tags: ["RF Transceiver", "Power Systems", "Embedded MCU", "FSK", "Antenna Design"],
  },
];

export type ProjectType = "personal" | "professional";

export const projects = [
  {
    id: "hai-onq",
    title: "HAI / OnQ RS-485 Lighting System Reverse Engineering",
    type: "personal" as ProjectType,
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    description:
      "Reverse-engineered an existing HAI / OnQ lighting control system using a Raspberry Pi-based RS-485 interface. Developed packet sniffing, command transmission, device mapping, and control logic to preserve existing wired lighting hardware while modernizing the control layer for future Home Assistant integration.",
    impact: "Demonstrates embedded systems depth, protocol reverse engineering, and practical systems thinking applied to real infrastructure.",
    tags: ["RS-485", "Raspberry Pi", "Python", "Packet Capture", "Home Assistant", "Reverse Engineering"],
    icon: "cpu",
  },
  {
    id: "rpi-home-automation",
    title: "Raspberry Pi Home Automation Controller",
    type: "personal" as ProjectType,
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    description:
      "Designed a Raspberry Pi-based home automation controller architecture involving RS-485 communication, Z-Wave integration, display/dashboard support, and Home Assistant services.",
    impact: "Demonstrates system integration, Linux services architecture, and hands-on embedded platform design.",
    tags: ["Linux", "Docker", "Home Assistant", "Z-Wave", "GPIO", "UART", "System Integration"],
    icon: "server",
  },
  {
    id: "whole-home-audio",
    title: "Whole-Home Audio Platform",
    type: "personal" as ProjectType,
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    description:
      "Built a multi-zone whole-home audio platform using Raspberry Pi, HiFiBerry DAC8x, ALSA routing, AirPlay / streaming integration, and Home Assistant control.",
    impact: "Demonstrates multi-channel audio architecture, Linux system debugging, and end-to-end platform integration.",
    tags: ["HiFiBerry DAC8x", "ALSA", "AirPlay", "Multi-Zone Audio", "Linux", "Home Assistant"],
    icon: "music",
  },
  {
    id: "wireless-charging",
    title: "Wireless Charging Proof-of-Concept",
    type: "professional" as ProjectType,
    badge: "Professional / NTI",
    badgeColor: "#3B82F6",
    description:
      "Led end-to-end development of a wireless charging proof-of-concept for a next-generation wearable platform, including electrical architecture, embedded firmware, automation, validation strategy, manufacturing builds, and executive reviews.",
    impact: "Delivered a complete NTI from blank-sheet architecture to executive-validated prototype, enabling strategic product decisions for next-gen smart glasses.",
    tags: ["Wireless Charging", "NTI", "Firmware Integration", "Parametric Validation", "Vendor Coordination", "Executive Reviews"],
    icon: "zap",
  },
  {
    id: "retail-demo",
    title: "Retail Demo Hardware Platform",
    type: "professional" as ProjectType,
    badge: "Professional / Cross-Functional",
    badgeColor: "#3B82F6",
    description:
      "Led architecture and execution of a large-scale retail demo platform involving hardware, firmware, operations, product, CMS, and vendor teams across multiple geographies.",
    impact: "Delivered a scalable, production-ready retail platform on time through structured cross-functional leadership, clear ownership frameworks, and on-site CM build management.",
    tags: ["Hardware Architecture", "Cross-Functional Leadership", "Vendor Management", "Factory Bring-Up", "CMS", "Scalable Execution"],
    icon: "layout",
  },
];

export const skills = {
  hardware: [
    "System Architecture", "Mixed-Signal Design", "Power Architecture",
    "Charging Systems", "Sensor Integration", "High-Speed Interfaces",
    "RF Systems", "PCB Design & Review", "Validation & Test",
    "Manufacturing Bring-Up", "Signal Integrity / Power Integrity", "Factory Yield Analysis",
  ],
  tools: [
    "Allegro Design Entry", "Allegro PCB Design", "Altium Designer",
    "Cadence IC Tools", "Spectre Simulator", "MPLab IDE",
    "MatLab", "OrCAD PSpice", "OrCAD Layout",
    "PADS", "LTSpice", "Lab Test Equipment",
  ],
  programming: [
    "Embedded C", "C++", "RTOS", "Python", "C#", "Bash", "Matlab",
  ],
  leadership: [
    "NTI Leadership", "Cross-Functional Execution", "Vendor Management",
    "Architecture Reviews", "Executive Communication", "Technical Mentoring",
    "Decision Frameworks", "Factory / CM Bring-Up", "Product Integration",
  ],
};

export const education = [
  {
    school: "University of California, Riverside",
    degree: "M.S. Electrical Engineering",
    year: "June 2008",
    emphasis: "Communication Systems & Theory",
    initial: "UCR",
  },
  {
    school: "California Polytechnic University, Pomona",
    degree: "B.S. Electrical Engineering",
    year: "June 2006",
    emphasis: "Radio Frequency Systems",
    initial: "CPP",
  },
];

export const honors = [
  {
    title: "Eta Kappa Nu",
    description: "National Electrical and Computer Engineering Honor Society, inducted 2006",
    icon: "award",
  },
  {
    title: "Former Secret Security Clearance",
    description: "Held from 2011, now expired",
    icon: "shield",
  },
];
