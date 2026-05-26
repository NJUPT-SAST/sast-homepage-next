import Image from "next/image";
import { people } from "@/components/home/homepage-data";
import styles from "./people-section.module.css";

export default function PeopleSection() {
  return (
    <section className={styles.peopleSection}>
      <div className={styles.peopleBackground} aria-hidden>
        <div className={styles.peopleBackgroundScene}>
          <Image src="/home/backgrounds/people/rectangle-11.png" alt="" width={116} height={116} className={`${styles.shape} ${styles.rectangle11}`} />
          <Image src="/home/backgrounds/people/rectangle-12.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle12}`} />
          <Image src="/home/backgrounds/people/rectangle-13.png" alt="" width={350} height={350} className={`${styles.shape} ${styles.rectangle13}`} />
          <Image src="/home/backgrounds/people/rectangle-14.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle14}`} />
          <Image src="/home/backgrounds/people/rectangle-15.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle15}`} />
          <Image src="/home/backgrounds/people/rectangle-16.png" alt="" width={336} height={336} className={`${styles.shape} ${styles.rectangle16}`} />
          <Image src="/home/backgrounds/people/rectangle-17.png" alt="" width={219} height={219} className={`${styles.shape} ${styles.rectangle17}`} />
          <Image src="/home/backgrounds/people/rectangle-18.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle18}`} />
          <Image src="/home/backgrounds/people/rectangle-19.png" alt="" width={117} height={116} className={`${styles.shape} ${styles.rectangle19}`} />
        </div>
      </div>

      <div className={styles.peopleInner}>
        <div className={styles.pictureWall}>
          {people.map((person) => (
            <figure
              key={person.name}
              className={`${styles.pictureItem} ${styles[person.slot]} ${styles[person.size]}`}
            >
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width: 767px) 50vw, 25vw"
                className={styles.pictureImage}
              />
              <figcaption className={styles.pictureMask}>
                <p className={styles.pictureCopy}>
                  <span className={styles.pictureName}>{person.name}</span>
                  <br />
                  {person.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
