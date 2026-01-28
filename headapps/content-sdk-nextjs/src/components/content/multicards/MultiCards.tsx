import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import styles from './MultiCards.module.css';
import Image from 'next/image';
interface MultiCardsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: MultiCardsProps): React.JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <section className={styles.wrapper}>
        <div className={styles.grid}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <Image
                src="/assets/images/multicards/woman-making-speakers.jpg"
                alt="Factory Floor"
                className={styles.image}
                width="1000"
                height="1000"
              />

              <div className={styles.text}>
                <h4>Made in the U.S.</h4>
                <p>
                  When Sonic Sound first started shaping the sound of rock ’n’ roll,
                  our amps were proudly built in Alabama. Decades later, some of our
                  most iconic amps are still crafted in the same factory.
                </p>
                <a href="#" className={styles.link}>
                  Learn more
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <Image
                src="/assets/images/multicards/guitar-player.jpg"
                alt="Guitar Player"
                className={styles.image}
                width="1000"
                height="1000"
              />

              <div className={styles.text}>
                <h4>Artist Series: Damian Turner</h4>
                <p>
                  Discover this sibling duo igniting the scene with explosive punk
                  anthems, untamed energy, and raw sound that’s impossible to ignore.
                </p>
                <a href="#" className={styles.link}>
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
