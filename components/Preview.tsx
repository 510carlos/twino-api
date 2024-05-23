"use client";
import { ClassValue, clsx } from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Meteors } from "./Meteors";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
// import { NavigationMenuDemo } from './NavigationMenu'
import { SparklesCore } from "./sparkles";
import { TracingBeam } from "./tracing-beam";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const styles = {
    borderRadius: '33px',
    opacity: '.9',
    boxShadow: 'inset 0 2px 1px #333',
    borderTop: '1px solid #6366f1',
    borderBottom: '1px solid #6366f1',
}

const main = {
    marginTop: '10rem',
    background: 'rgba(255, 255, 255, .5)',
    height: '750px',
    borderRadius: '33px',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #aaa',
    boxShadow: 'inset 0 1px 2px #333',
    padding: '20px',
    color: 'white',
    fontSize: '1.5rem',
    textShadow: '0 1px 1px black',
    textAlign: 'center',
}

function SparklesPreview() {
    const imagePath = 'https://theweekendisneverover.com/twino.png';
    return (
        <>
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <TracingBeam className="">
                <div className="relative w-full flex items-center justify-center text-white text-2xl">
                    <a href="https://theweekendisneverover.com/" className="pr-5">Home</a>
                    <a href="https://www.etsy.com/shop/WeekendIsNeverOver" className="pl-5">Shop</a>
                </div>
                <div className="h-[90rem] w-full">

                    <div className="h-[8rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
                        <div className="w-[40rem] relative">

                            {/* Gradients */}
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                            {/* Core component */}
                            <SparklesCore
                                background="transparent"
                                minSize={0.4}
                                maxSize={1}
                                particleDensity={1000}
                                className="w-full h-full"
                                particleColor="#FFFFFF"
                            />

                            {/* Radial Gradient to prevent sharp edges */}
                            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                        </div>
                    </div>
                    <div style={styles} className="bg-white justify-center flex items-center h-[7rem] w-auto mx-2">
                        <img src={'https://www.theweekendisneverover.com/twino.png'} alt="logo" />
                    </div>
                    {/* <div style={main}>
                        Welcome to the website.
                    </div> */}
                    <div className="h-3/4 md:h-1/2 relative mt-20">
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 scale-[.9] bg-red-500 rounded-full blur-3xl" />
                        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-10 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">


                            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                                It is a 5 oclock somewhere!
                            </h1>

                            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                                The weekend is never over is a lifestyle committed to keeping good vibes alive one drink at a time. We are an online destination sharing drink and beverage recipes from all over the world. Our home page is a countdown clock to happy hour. Every hour counting down the minutes and seconds left to the next time it is 5 o&apos;clock somewhere around the globe.
                                Our online Etsy store sells streetwear clothing with our brand name. The idea for our logo was inspired by the American Sign Language (ASL) fingerspelling sign for the letter &ldquo;W&rdquo;, the first letter in the word Weekend.
                                Follow our journey through never-ending drink recipes from all around the globe. Whether you are working for the weekend or working on the weekend, the weekend is never over when you can take a moment to enjoy a refreshing drink.
                            </p>
                            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                                Contact Us - <a href="mailto:TheWeekendIsNeverOver@gmail.com">TheWeekendIsNeverOver@gmail.com</a>
                            </p>

                            <div style={{ height: '10rem' }}></div>


                            {/* <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
                                Explore
                            </button> */}

                            {/* Meaty part - Meteor effect */}
                            <Meteors number={20} />
                        </div>
                    </div>
                </div>
            </TracingBeam>
        </>
    );
}

export default SparklesPreview;
// import { cn } from "@/utils/cn";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
            <p className="text-black dark:text-white">
                The Navbar will show on top of the page
            </p>
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}

