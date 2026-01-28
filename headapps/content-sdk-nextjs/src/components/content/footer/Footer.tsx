import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import styles from './Footer.module.css';
import Link from 'next/link';
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FooterProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: FooterProps): React.JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <section className={styles.footerArea}>
            <div className={styles.content}>
                <h2 className={styles.title}>LET&apos;S SYNC.</h2>

                <div className={styles.primaryNav}>
                <Link href="#">Speakers</Link>
                <span>/</span>
                <Link href="#">Headphones</Link>
                <span>/</span>
                <Link href="#">Amps</Link>
                <span>/</span>
                <Link href="#">Artist Services</Link>
                </div>

                <div className={styles.secondaryNav}>
                <Link href="#">About us</Link>
                <Link href="#">Contact</Link>
                <Link href="#">Warranty</Link>
                <Link href="#">Shipping</Link>
                <Link href="#">Returns</Link>
                </div>
            </div>

            <div className={styles.soundWave} />

            <section className={styles.footer}>
                <div className={styles.socials}>
                    <Link href="#">
                        <FontAwesomeIcon icon={faFacebook} width={20} height={20} />
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faInstagram} width={22} height={22} />
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faLinkedinIn} width={24} height={24} />
                    </Link>
                </div>

                <p className={styles.copyright}>
                    © 2025 SYNC. All rights reserved.
                </p>
            </section>
        </section>
    </div>
  );
};
