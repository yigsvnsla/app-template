import { notFound } from "next/navigation";
import { TeamsGrid } from "./TeamsGrid";

// Mock data - replace with actual data fetching
const mockOrganizations = [
  {
    id: "1",
    name: "Acme Corporation",
    slug: "acme-corp",
    createdAt: new Date("2024-01-15"),
    logo: "/generic-company-logo.png",
    metadata: {
      industry: "Technology",
      size: "50-200",
      location: "San Francisco, CA",
      website: "https://acme.com",
    },
    Member: [],
    Invitation: [],
  },
];

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
  {
    id: "3",
    name: "Marketing",
    slug: "marketing",
    description: "Brand strategy and growth marketing team",
    organizationId: "1",
    createdAt: new Date("2024-02-10"),
    metadata: {
      department: "Marketing",
      location: "New York, NY",
      projectCount: 15,
      budget: 400000,
    },
    TeamMember: [
      {
        id: "6",
        teamId: "3",
        userId: "6",
        role: "lead",
        createdAt: new Date("2024-02-10"),
        user: {
          email: "lisa.martinez@acme.com",
          name: "Lisa Martinez",
          image: "/professional-woman-headshot.png",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Customer Success",
    slug: "customer-success",
    description: "Customer support and success operations",
    organizationId: "1",
    createdAt: new Date("2024-02-15"),
    metadata: {
      department: "Operations",
      location: "Austin, TX",
      projectCount: 6,
      budget: 250000,
    },
    TeamMember: [
      {
        id: "7",
        teamId: "4",
        userId: "7",
        role: "lead",
        createdAt: new Date("2024-02-15"),
        user: {
          email: "david.kim@acme.com",
          name: "David Kim",
          image: "/professional-headshot.png",
        },
      },
      {
        id: "8",
        teamId: "4",
        userId: "8",
        role: "member",
        createdAt: new Date("2024-02-18"),
        user: {
          email: "sophia.brown@acme.com",
          name: "Sophia Brown",
        },
      },
    ],
  },
];

export default function TeamsPage({ params }: { params: { slug: string } }) {
  const organization = mockOrganizations.find((org) => org.slug === params.slug);

  // if (!organization) {
  //   notFound();
  // }

  return <TeamsGrid organization={"organization"} teams={[]} />;
}
