import AboutUsCard from "./AboutUsCard";

export default function AboutUs() {
  const teamMember = [
    {
      name: "MS 2.O",
      role: "Founder | Software Engineer",
      instagramUrl: "https://www.instagram.com/",
      linkedInUrl: "https://www.linkedin.com/",
      details:
        "Lead architect and builder. Passionate about clean code,scalable systems and delightful user experiences.",
      image: "/images/team-member/owner.jpg",
    },
    {
      name: "Saif",
      role: "Developer | Software Engineer",
      instagramUrl: "https://www.instagram.com/",
      linkedInUrl: "https://www.linkedin.com/",
      details:
        "Lead architect and builder. Passionate about clean code,scalable systems and delightful user experiences.",
      image: "src/",
    },
    {
      name: "MS 2.O",
      role: "Founder | Software Engineer",
      instagramUrl: "https://www.instagram.com/",
      linkedInUrl: "https://www.linkedin.com/",
      details:
        "Lead architect and builder. Passionate about clean code,scalable systems and delightful user experiences.",
      image: "/images/team-member/owner.jpg",
    },
    {
      name: "Saif",
      role: "Developer | Software Engineer",
      instagramUrl: "https://www.instagram.com/",
      linkedInUrl: "https://www.linkedin.com/",
      details:
        "Lead architect and builder. Passionate about clean code,scalable systems and delightful user experiences.",
      image: "src/",
    },
  ];
  return (
    <>
      {teamMember.map((member, idx) => (
        <AboutUsCard member={member} index = {idx} />
      ))}
    </>
  );
}
