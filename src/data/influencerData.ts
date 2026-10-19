export interface Influencer {
  id: string;
  name: string;
  handle: string;
  niche: string;
  category: "Tech & AI" | "Interior & Architecture" | "SaaS & Startups" | "3D & Design" | "Lifestyle & Growth";
  followers: string;
  avgReelViews: string;
  engagementRate: string;
  platforms: ("Instagram" | "YouTube" | "LinkedIn")[];
  avatar: string;
  badge: string;
  deliverables: string[];
  location: string;
  recentBrandCollabs: string[];
}

export const INFLUENCERS_LIST: Influencer[] = [
  {
    id: "rohan-sharma",
    name: "Rohan Sharma",
    handle: "@rohan_techcraft",
    niche: "Web Engineering & AI Architectures",
    category: "Tech & AI",
    followers: "340K+",
    avgReelViews: "520K+",
    engagementRate: "7.2%",
    platforms: ["Instagram", "YouTube", "LinkedIn"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    badge: "Top Tech Creator",
    deliverables: ["Dedicated Reel", "Developer Walkthrough", "Product Review"],
    location: "Bangalore, India",
    recentBrandCollabs: ["AWS", "Vercel", "GitHub"],
  },
  {
    id: "ananya-verma",
    name: "Ananya Verma",
    handle: "@ananyadesignlab",
    niche: "Spatial Aesthetics & Interior Design",
    category: "Interior & Architecture",
    followers: "420K+",
    avgReelViews: "680K+",
    engagementRate: "8.4%",
    platforms: ["Instagram", "YouTube"],
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    badge: "VoometDesign Featured",
    deliverables: ["Interior Reel", "Site Walkthrough", "Brand Aesthetic Showcase"],
    location: "Bangalore / Mumbai",
    recentBrandCollabs: ["VoometDesign", "Asian Paints", "Kohler"],
  },
  {
    id: "vikram-rao",
    name: "Vikramaditya Rao",
    handle: "@vikram.saas",
    niche: "B2B SaaS Growth & Performance",
    category: "SaaS & Startups",
    followers: "195K+",
    avgReelViews: "290K+",
    engagementRate: "6.5%",
    platforms: ["LinkedIn", "Instagram", "YouTube"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badge: "SaaS Growth Leader",
    deliverables: ["SaaS Breakdown Reel", "LinkedIn Post", "Founder Q&A"],
    location: "Bangalore, India",
    recentBrandCollabs: ["Razorpay", "HubSpot", "Notion"],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    handle: "@priya.motion3d",
    niche: "3D Motion Design & Creative Technology",
    category: "3D & Design",
    followers: "280K+",
    avgReelViews: "410K+",
    engagementRate: "7.8%",
    platforms: ["Instagram", "YouTube"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    badge: "Creative Fellow",
    deliverables: ["3D Animation Reel", "Brand Visual Teaser", "Design Tutorial"],
    location: "Bangalore, India",
    recentBrandCollabs: ["Figma", "Blender Studio", "Adobe"],
  },
  {
    id: "kabir-mehta",
    name: "Kabir Mehta",
    handle: "@kabir.codes",
    niche: "Mobile Apps & Cross-Platform UI",
    category: "Tech & AI",
    followers: "160K+",
    avgReelViews: "240K+",
    engagementRate: "6.9%",
    platforms: ["Instagram", "YouTube"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    badge: "Mobile App Expert",
    deliverables: ["App Launch Reel", "UI Speedrun", "Feature Showcase"],
    location: "Bangalore, India",
    recentBrandCollabs: ["Supabase", "Expo", "Linear"],
  },
  {
    id: "sanjana-roy",
    name: "Sanjana Roy",
    handle: "@sanjana_spaces",
    niche: "Modern Architecture & Turnkey Decor",
    category: "Interior & Architecture",
    followers: "310K+",
    avgReelViews: "490K+",
    engagementRate: "8.1%",
    platforms: ["Instagram", "YouTube"],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    badge: "Architecture Curator",
    deliverables: ["Architecture Tour Reel", "Material Review", "Decor Collab"],
    location: "Bangalore / Delhi",
    recentBrandCollabs: ["VoometDesign", "Saint-Gobain", "Jaquar"],
  },
];

export const INFLUENCER_CATEGORIES = [
  "All Creators",
  "Tech & AI",
  "Interior & Architecture",
  "SaaS & Startups",
  "3D & Design",
] as const;
