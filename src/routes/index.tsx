import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deimos — Earth’s Closest Environmental Matches to the Moon and Mars" },
      {
        name: "description",
        content: "Finding Earth’s closest environmental matches to selected locations on the Moon and Mars.",
      },
      { property: "og:title", content: "Deimos — Earth’s Closest Environmental Matches to the Moon and Mars" },
      {
        property: "og:description",
        content: "Finding Earth’s closest environmental matches to selected locations on the Moon and Mars.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
});
