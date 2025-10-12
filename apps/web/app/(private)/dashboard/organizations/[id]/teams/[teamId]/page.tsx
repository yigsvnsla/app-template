import { notFound } from "next/navigation";
import { TeamDashboard } from "./TeamDashboard";

// Mock data - replace with actual data fetching
const mockTeams = [
  {
    id: "1",
    name: "Engineering",
    slug: "engineering",
    description: "Core product development and infrastructure team",
    organizationId: "1",
    createdAt: new Date("2024-01-20"),
    metadata: {
      department: "Technology",
      location: "San Francisco, CA",
      projectCount: 12,
      budget: 500000,
    },
    TeamMember: [
      {
        id: "1",
        teamId: "1",
        userId: "1",
        role: "lead",
        createdAt: new Date("2024-01-20"),
        user: {
          email: "sarah.johnson@acme.com",
          name: "Sarah Johnson",
          image: "/professional-woman-headshot.png",
        },
      },
      {
        id: "2",
        teamId: "1",
        userId: "2",
        role: "member",
        createdAt: new Date("2024-01-22"),
        user: {
          email: "mike.chen@acme.com",
          name: "Mike Chen",
          image: "/professional-headshot.png",
        },
      },
      {
        id: "3",
        teamId: "1",
        userId: "3",
        role: "member",
        createdAt: new Date("2024-01-25"),
        user: {
          email: "alex.rivera@acme.com",
          name: "Alex Rivera",
        },
      },
      {
        id: "4",
        teamId: "1",
        userId: "4",
        role: "contributor",
        createdAt: new Date("2024-01-28"),
        user: {
          email: "jordan.lee@acme.com",
          name: "Jordan Lee",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Product Design",
    slug: "product-design",
    description: "User experience and interface design team",
    organizationId: "1",
    createdAt: new Date("2024-02-01"),
    metadata: {
      department: "Design",
      location: "Remote",
      projectCount: 8,
      budget: 300000,
    },
    TeamMember: [
      {
        id: "4",
        teamId: "2",
        userId: "4",
        role: "lead",
        createdAt: new Date("2024-02-01"),
        user: {
          email: "emma.wilson@acme.com",
          name: "Emma Wilson",
          image: "/professional-woman-headshot.png",
        },
      },
      {
        id: "5",
        teamId: "2",
        userId: "5",
        role: "contributor",
        createdAt: new Date("2024-02-05"),
        user: {
          email: "james.park@acme.com",
          name: "James Park",
        },
      },
    ],
  },
];

export default function TeamPage({ params }: { params: { slug: string; teamSlug: string } }) {
  const team = mockTeams.find((t) => t.slug === params.teamSlug);

  return <TeamDashboard team={"team"} organizationSlug={"params.slug"} />;
}
