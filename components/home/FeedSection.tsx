import Image from "next/image";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "./SectionHeading";
import { STORE_CONFIG } from "@/lib/config";

const POSTS = [
  { src: "/images/lifestyle/pink-wall.jpg", alt: "Girl in a black graphic tee against a pink wall", span: "col-span-2 row-span-2" },
  { src: "/images/lifestyle/red-teal.jpg", alt: "Model in a red top and oversized jacket", span: "" },
  { src: "/images/lifestyle/masked.jpg", alt: "Guy in a mask and flannel over a tee", span: "row-span-2" },
  { src: "/images/lifestyle/heart.jpg", alt: "Teen in a white printed tee", span: "lg:row-span-2" },
  { src: "/images/lifestyle/yellow.jpg", alt: "Model in a yellow co-ord on a court", span: "row-span-2" },
  { src: "/images/lifestyle/pink-tee.jpg", alt: "Man in a pink printed tee", span: "" },
  { src: "/images/lifestyle/tomato.jpg", alt: "Model in a red graphic sweatshirt", span: "" },
  { src: "/images/lifestyle/street.jpg", alt: "Guy sitting on a dumpster in streetwear", span: "col-span-2" },
];

export function FeedSection() {
  return (
    <section aria-labelledby="feed-title" className="py-20 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="06">COMMUNITY</SectionLabel>
            <h2 id="feed-title" className="display mt-5 text-[17vw] sm:text-[13vw] lg:text-[8.5rem]">
              SEEN ON
              <br />
              THE FEED<span className="text-accent">.</span>
            </h2>
          </div>
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 lg:mb-4"
          >
            <span className="grid size-14 place-items-center rounded-full border border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
              <InstagramIcon size={22} />
            </span>
            <span>
              <span className="label block text-smoke">TAG US TO GET FEATURED</span>
              <span className="text-xl font-semibold tracking-tight">{STORE_CONFIG.instagram}</span>
            </span>
          </a>
        </div>

        <ul className="mt-10 grid auto-rows-[38vw] grid-cols-2 gap-2 sm:auto-rows-[24vw] sm:grid-cols-3 lg:mt-14 lg:auto-rows-[15vw] lg:grid-cols-5 2xl:auto-rows-[15rem]">
          {POSTS.map((post, i) => (
            <Reveal as="li" key={post.src} delay={(i % 5) * 60} className={`group relative overflow-hidden bg-bone ${post.span}`}>
              <a href={STORE_CONFIG.instagramUrl} target="_blank" rel="noreferrer" aria-label={`${post.alt} — view on Instagram`}>
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-ink/0 p-3 opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                  <span className="label flex items-center gap-2 text-paper">
                    <InstagramIcon size={14} /> {STORE_CONFIG.instagram}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
