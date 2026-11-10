import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Planet Jumping — Mars Portal" },
      {
        name: "description",
        content: "An immersive cinematic journey from Mars through the inner Solar System.",
      },
      { property: "og:title", content: "Planet Jumping — Mars Portal" },
      {
        property: "og:description",
        content: "An immersive cinematic journey from Mars through the inner Solar System.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/planet-jumping.html" });
  },
});
