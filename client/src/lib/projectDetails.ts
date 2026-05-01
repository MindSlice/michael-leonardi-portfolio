// Deep Signal — Extended Project Detail Content
// Personal projects have rich detail pages; professional projects do not.
// Add new personal project details here as you build more projects.

export type ProjectDetail = {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  overview: string;
  motivation: string;
  sections: Array<{
    heading: string;
    body: string;
    tags?: string[];
  }>;
  outcomes: string[];
  tags: string[];
  icon: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  "hai-onq": {
    id: "hai-onq",
    title: "HAI / OnQ RS-485 Lighting System Reverse Engineering",
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    overview:
      "Reverse-engineered a legacy HAI / OnQ whole-home lighting control system to preserve the existing wired hardware infrastructure while building a modern software control layer compatible with Home Assistant.",
    motivation:
      "The existing HAI / OnQ controller was aging and no longer supported, but the physical wired lighting infrastructure was solid and worth preserving. Rather than replacing all the hardware, I reverse-engineered the RS-485 protocol to build a software bridge that allows modern home automation platforms to control the existing hardware.",
    sections: [
      {
        heading: "RS-485 Protocol Investigation",
        body:
          "Tapped the RS-485 bus using a Raspberry Pi with a USB-to-RS-485 adapter. Captured raw packet traffic during normal operation — button presses, dimmer changes, scene activations — and began building a packet dictionary by correlating observed byte sequences with known actions. Identified the framing structure, device addressing scheme, command opcodes, and checksum algorithm through iterative capture and replay.",
        tags: ["RS-485", "Protocol Analysis", "Packet Capture", "Bus Tapping"],
      },
      {
        heading: "Python Tooling & Packet Engine",
        body:
          "Developed a Python library to handle serial communication, frame parsing, command encoding, and device state tracking. Built a packet sniffer mode for passive monitoring and a command injection mode for active control. The library abstracts the raw protocol into clean Python calls like `set_dimmer(zone=3, level=75)` and `activate_scene('evening')`.",
        tags: ["Python", "Serial Comms", "pyserial", "State Machine"],
      },
      {
        heading: "Device Mapping & Command Library",
        body:
          "Systematically mapped all zones, dimmers, switches, and scenes in the home by walking through each device and recording its address and command structure. Built a YAML-based device configuration file that maps human-readable names to hardware addresses, making the system easy to maintain and extend.",
        tags: ["Device Mapping", "YAML Config", "Zone Control", "Scene Management"],
      },
      {
        heading: "Home Assistant Integration Path",
        body:
          "Designed the integration architecture for Home Assistant using a custom component that wraps the Python library. The component exposes each lighting zone as a `light` entity in Home Assistant, supporting brightness control and on/off state. The Raspberry Pi runs as a bridge device on the local network, communicating with Home Assistant via MQTT or direct API calls.",
        tags: ["Home Assistant", "MQTT", "Custom Component", "Light Entity"],
      },
    ],
    outcomes: [
      "Preserved existing wired lighting infrastructure — no hardware replacement needed",
      "Full programmatic control of all lighting zones via Python",
      "Clean integration path to Home Assistant for voice control and automation",
      "Demonstrates practical reverse engineering, embedded systems, and systems integration skills",
    ],
    tags: ["RS-485", "Raspberry Pi", "Python", "Packet Capture", "Home Assistant", "Reverse Engineering", "Embedded Systems"],
    icon: "cpu",
  },

  "rpi-home-automation": {
    id: "rpi-home-automation",
    title: "Raspberry Pi Home Automation Controller",
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    overview:
      "Designed and built a centralized Raspberry Pi-based home automation controller that integrates RS-485 lighting control, Z-Wave device management, multi-zone audio, and a local Home Assistant instance into a single cohesive platform.",
    motivation:
      "Rather than using a cloud-dependent commercial hub, I wanted a fully local, self-hosted home automation platform that I control completely. The goal was to build something that would survive internet outages, never phone home, and be fully extensible.",
    sections: [
      {
        heading: "Platform Architecture",
        body:
          "The controller runs on a Raspberry Pi 4 with a custom HAT providing RS-485, GPIO breakout, and UART interfaces. Home Assistant runs in Docker alongside supporting services. All automation logic runs locally — no cloud dependency for core functionality.",
        tags: ["Raspberry Pi 4", "Docker", "Home Assistant", "Custom HAT"],
      },
      {
        heading: "Z-Wave Integration",
        body:
          "Integrated a Z-Wave USB controller for smart switches, sensors, and door locks. Configured the Z-Wave JS integration in Home Assistant for reliable mesh network management. Mapped all Z-Wave devices and wrote automations for presence detection, security, and energy management.",
        tags: ["Z-Wave", "Z-Wave JS", "Mesh Network", "Presence Detection"],
      },
      {
        heading: "Linux Services & System Design",
        body:
          "Configured systemd services for all components, ensuring clean startup ordering and automatic recovery. Set up log rotation, health monitoring, and a watchdog process. Used Docker Compose for container orchestration with persistent volumes for configuration and data.",
        tags: ["systemd", "Docker Compose", "Log Rotation", "Watchdog"],
      },
      {
        heading: "GPIO & UART Interfaces",
        body:
          "Used GPIO for direct hardware control of relays and status LEDs. UART interfaces connect to the RS-485 bridge and other serial peripherals. Wrote Python daemons that run as systemd services to manage these hardware interfaces and expose them to Home Assistant via MQTT.",
        tags: ["GPIO", "UART", "MQTT", "Python Daemons", "Relays"],
      },
    ],
    outcomes: [
      "Fully local home automation — no cloud dependency for core functionality",
      "Unified control of lighting, climate, security, and audio from a single platform",
      "Demonstrates Linux systems engineering, Docker architecture, and embedded platform design",
      "Extensible foundation for future integrations",
    ],
    tags: ["Linux", "Docker", "Home Assistant", "Z-Wave", "GPIO", "UART", "System Integration", "Raspberry Pi"],
    icon: "server",
  },

  "whole-home-audio": {
    id: "whole-home-audio",
    title: "Whole-Home Audio Platform",
    badge: "Personal Engineering",
    badgeColor: "#06B6D4",
    overview:
      "Built a multi-zone whole-home audio platform using Raspberry Pi, HiFiBerry DAC8x (8-channel DAC), ALSA routing, AirPlay streaming, and Home Assistant integration for unified zone control.",
    motivation:
      "I wanted high-quality, multi-zone audio throughout the house without a proprietary system. The goal was to use open-source tools and commodity hardware to build something that sounds great, integrates with existing streaming services, and can be controlled from Home Assistant or any AirPlay-capable device.",
    sections: [
      {
        heading: "Hardware Platform",
        body:
          "The HiFiBerry DAC8x provides 8 independent analog output channels from a single Raspberry Pi. Each pair of channels drives a zone amplifier, supporting up to 4 independent stereo zones. The DAC connects via I2S, providing low-latency, high-quality audio output without USB audio artifacts.",
        tags: ["HiFiBerry DAC8x", "I2S", "Raspberry Pi", "Zone Amplifiers"],
      },
      {
        heading: "ALSA Routing & Multi-Zone Configuration",
        body:
          "Configured ALSA to expose each DAC channel pair as an independent audio device. Used `asoundrc` to define virtual devices for each zone and a loopback device for mixing. This allows multiple audio sources to be routed to different zones simultaneously without interference.",
        tags: ["ALSA", "asoundrc", "Audio Routing", "Virtual Devices", "Loopback"],
      },
      {
        heading: "AirPlay & Streaming Integration",
        body:
          "Deployed multiple Shairport-Sync instances (one per zone) to expose each zone as an independent AirPlay receiver. Any AirPlay-capable device — iPhone, Mac, iPad — can stream directly to any zone. Also integrated Snapcast for synchronized multi-room audio when the same source needs to play everywhere.",
        tags: ["Shairport-Sync", "AirPlay", "Snapcast", "Multi-Room Sync"],
      },
      {
        heading: "Home Assistant Control",
        body:
          "Integrated all audio zones into Home Assistant as `media_player` entities. Zone volume, source selection, and play/pause are controllable from the Home Assistant UI, automations, and voice assistants. Built automations for common scenarios: morning audio, party mode, and goodnight routines.",
        tags: ["Home Assistant", "media_player", "Automations", "Voice Control"],
      },
    ],
    outcomes: [
      "High-quality 4-zone stereo audio throughout the home",
      "AirPlay streaming from any Apple device to any zone",
      "Synchronized whole-home audio via Snapcast",
      "Full Home Assistant integration for automation and voice control",
      "Demonstrates audio systems engineering, Linux debugging, and platform integration",
    ],
    tags: ["HiFiBerry DAC8x", "ALSA", "AirPlay", "Shairport-Sync", "Snapcast", "Multi-Zone Audio", "Linux", "Home Assistant"],
    icon: "music",
  },
};
