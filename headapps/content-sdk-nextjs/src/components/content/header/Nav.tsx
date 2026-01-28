import React from 'react';
import Image from 'next/image';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import Style from '../../../styles/Header.module.css';

interface NavProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: NavProps): React.JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className={Style.headerWrapper}>
        <div className={Style.logo}>
            <a href="#">
                <Image src="/images/demo-logo.png" alt="Logo" width={80} height={64} />
            </a>
        </div>
        <div className={Style.navWrapper}>
            <ul className={Style.navLinks}>
                
                <a href="#">
                    <li className={Style.navLink}>Speaker</li>
                </a>
                <a href="#">
                    <li className={Style.navLink}>Headphones</li>
                </a>
                <a href="#">
                    <li className={Style.navLink}>Amps</li>
                </a>
                <a href="#">
                    <li className={Style.navLink}>Pro</li>
                </a>
                 <a href="#">
                    <li className={Style.navLink}>Artist Services</li>
                </a>
            </ul>
            <ul className={Style.navLinks}>
                <a href="#">
                    <li className={Style.navLink}>Support</li>
                </a>
                <a href="#">
                    <li className={Style.navLink}>Search</li>
                </a>
                <a href="#">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-shopping" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18" height="18"><path fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                </a>
            </ul>
        </div>
      </div>
    </div>
  );
};
